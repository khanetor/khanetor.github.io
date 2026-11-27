---
author: Kha Nguyen
pubDatetime: 2026-11-27T19:37:09.000+07:00
title: "Switching models mid-task in Pi with a local decision model"
slug: pi-virtual-model-relay
featured: false
draft: false
tags:
  - ai
  - pi
  - ollama
  - coding-agents
description: "Using Pi's virtual model API and a small System One decision model in Ollama to pass one coding session between a planning model and a coding model."
---

A coding agent's work on a change usually has two parts. First it finds its way around: it reads files, works out where the change goes, maybe writes a plan. Then it writes the change. I've been trying an idea in [Pi](https://github.com/earendil-works/pi), the coding agent I use in my terminal: let Claude Opus (`claude-opus-5-5`) do the first part, let OpenAI's Sol (`gpt-6.2-sol`) do the second, and let a small local model decide when to switch.

Doing that switch by hand is a chore. I'd have to watch the agent read file after file just to catch the moment before it starts editing.

Two pieces make it easy to automate. Pi has _virtual models_: one entry in the model picker that can send each request to a different real model. And there are _decision models_, which don't chat at all. Give them a yes-or-no question and they score how likely the answer is yes. I run [`d3:4b`](https://ollama.com/library/d3), a [System One](https://docs.typesafe.ai/concepts/system-one) decision model similar to TypeSafe's [Jev](https://docs.typesafe.ai/introduction), locally in [Ollama](https://ollama.com/).

My virtual model is called Relay (`router/relay`). The decision model never writes code. It only answers questions, and a few lines of plain code make the actual decision.

Say I'm working on a search page. The empty state is what people see when their search finds nothing. Here's how the handoffs might go:

1. I type "Make the empty state clearer." Opus starts reading files.
2. After a few reads, the decision model says yes, this asks for a change, and yes, the agent has read enough. The next request goes to Sol, and Sol makes the edit.
3. I type "Actually, say 'No results'." The decision model calls it a small correction, so Sol keeps going.
4. I type "Why do we have two empty-state components?" That's a new question, so it goes back to Opus.

## What a virtual model is

Picking a model in Pi normally means picking who answers. A [virtual model](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/virtual-models.md) looks the same in the picker, but picking it really picks a small function I wrote.

One prompt can take several requests to a model. Say Opus asks to read a file. Pi runs that tool and sends the result back in another request. A virtual model can switch models between those two requests without waiting for me to type again.

I register Relay with `pi.registerVirtualModel()`. Before each request, Pi calls its `route()` function with the conversation and a reason: did I just type a message, is the agent continuing after a tool ran, or is Pi doing something else? The function returns the model to use and its thinking level (how much effort to spend reasoning).

`route()` can also save a small note. During the agent's work, Pi hands that note back on later requests in the same conversation, even after older messages get summarized. Relay's note holds one word: `planning` or `coding`.

This isn't two agents talking to each other. It's one conversation. When Sol takes over, it sees what Opus read and said, tool results included. I can see which model Pi picked in the footer, without leaving the conversation.

## Handoff one: planning to coding

The basic rule comes from Pi's [Jev router example](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/jev-router.ts). It switches models after the first successful `edit` or `write` tool call, which is a reliable sign that coding has started. But by then the planning model has already made the first edit, and I wanted Sol to make it.

So before a request that continues the same turn, like the one after a file read, Relay asks the decision model two questions. It only does this while still planning and if Opus hasn't already made a successful edit:

1. **Did I ask for a change?** "Make the empty state clearer" is a yes. "Where does the empty state come from?" is a no, and so is "Give me a plan for changing it."
2. **Has the agent read enough to edit next?**

The decision model gets the start of my message, a bit of what the agent last said, and up to six short tool call descriptions, like `read src/components/EmptyState.tsx`. It doesn't get the tool output.

Each answer comes back as a probability between 0 and 1. Both must meet or exceed a cutoff. If they do, the next request goes to Sol, which gets first crack at the edit. Otherwise, Opus keeps going and Relay can ask again. The Jev example's rule still applies: a successful `edit` or `write` moves the work to Sol without another check.

## Handoff two: back to planning

Once Sol is coding, Relay stops asking whether the agent is ready. The next question comes when I send a new message: is this a small follow-up to the change Sol just made?

This time the decision model sees the start of my previous request, the end of the agent's last reply, and the start of my new message. A wording tweak counts. So can asking to rerun a test for the same change. A new task or design question doesn't.

If the answer meets the cutoff, Sol stays on. Otherwise, the message goes back to Opus. I'd rather have Opus handle the occasional small tweak than let the coding phase roll straight into a new design discussion.

## The router in code

Here's the core of the virtual model. I've left the classifier and tool-result checks in helpers. `routeTo()` looks up the chosen model in Pi's registry and returns it with the thinking level and, when applicable, the phase:

```ts
pi.registerVirtualModel<RouterState>({
  provider: "router",
  id: "relay",
  name: "Relay",
  thinkingLevels: ["low", "medium"],
  async route(request, ctx) {
    // Compaction summaries and other requests outside the agent's work
    if (request.reason === "direct") {
      return routeTo(ctx, "anthropic", "claude-sonnet-5-5", "medium");
    }

    let state = request.state ?? { phase: "planning" };
    if (request.reason === "user") {
      if (state.phase === "coding" && !(await isCorrection(request, ctx))) {
        state = { phase: "planning" };
      }
    } else if (
      state.phase === "planning" &&
      (editedThisTurn(request.messages) ||
        (request.reason === "continuation" &&
          (await readyToCode(request, ctx))))
    ) {
      state = { phase: "coding" };
    }

    return state.phase === "coding"
      ? routeTo(
          ctx,
          "openai-codex",
          "gpt-6.2-sol",
          request.thinkingLevel,
          state
        )
      : routeTo(
          ctx,
          "anthropic",
          "claude-opus-5-5",
          PLAN_LEVEL[request.thinkingLevel] ?? "high",
          state
        );
  },
});
```

A new message from me (`"user"`) can only move the work back to planning. A step in the middle of a task (`"continuation"`) can only move it forward to coding. `isCorrection()` and `readyToCode()` are where the decision model comes in.

## Asking the decision model

Ollama runs open models on your own computer, and it serves decision models through a System One endpoint. Pi already ships a client for that API. So a short extension registers `d3:4b` with Pi as a _classifier_ (Pi's name for this kind of model) under an `ollama` provider, reusing that client. Nobody has to pull a "yes" out of a chat reply.

Relay calls `ctx.modelRegistry.classify()` with those short conversation excerpts and questions. It checks that it got valid scores before using them.

In my setup, `d3:4b` gets at most 4 seconds. Both readiness answers need 0.9, and a correction needs 0.8. These are settings, not test results. They carried over from earlier versions of the router, and I still need to recheck them on this model. A cutoff of 0.9 doesn't mean the model is right nine times out of ten.

A virtual model's thinking levels don't have to mean "think harder". The router decides what they mean. With `medium` selected, Relay also turns Opus up to `xhigh`. If you want, a level can also pick a different decision model, a shorter time limit or looser cutoffs. I do that with `low`, but the idea works fine without it.

Pi waits for the decision model before it sends the real request. If Ollama is down, hits the time limit, or sends back an answer Relay can't use, I don't let that one check decide the rest of the turn. A failed readiness check keeps that request on Opus. The next check can still send the work to Sol, and so can a successful edit. A failed correction check sends the new message back to Opus.

Only the routing questions run locally. The planning, coding and summarizing all happen on hosted models.

## When the conversation gets too big for Sol

Each model can only read so much text in one request. That limit is its context window, measured in tokens, the chunks of text a model reads. In my Anthropic-to-OpenAI handoff, the window shrinks: Pi lists Opus at one million tokens and Sol at 500,000. If both models have similarly large windows, the switch itself is less likely to force a summary. For example, [GLM-5.2](https://huggingface.co/zai-org/GLM-5.2) and [DeepSeek V4 Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) both advertise million-token windows, though the limit you get depends on where you run them.

Pi checks against the context window of the model Relay actually picked. If the conversation is too close to that limit, Pi [compacts it](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/compaction.md): it summarizes older messages and keeps the recent ones as they are.

The summary is a separate request outside the agent's normal work, which Pi marks as `direct`. Relay sends it to Claude Sonnet at `medium`, which is cheaper per token than Opus. I don't need the planning model just to summarize the conversation. The coding request still goes to Sol, and the phase doesn't change.

I set Relay to compact once the picked model would have fewer than 68,000 tokens of room left:

```json
{
  "compaction": {
    "enabled": true,
    "modelOverrides": {
      "router/relay": { "reserveTokens": 68000 }
    }
  }
}
```

For Sol, that means Pi compacts once the conversation passes 432,000 tokens. The reserve is breathing room, not the length of the summary.

There's also a cost even if the conversation fits: when I switch models, Sol can't reuse the work Opus cached for that conversation. That's another reason I don't want them swapping back and forth after every file read.

## Where you could take it

The pattern is small: a virtual model does the routing, a decision model makes the judgment calls, and plain code owns the rules and the fallbacks. The decision model only gets the questions a tool result can't answer. Did I ask for a change? Has the agent read enough? Is this still the same job?

You don't need my exact setup. Pi's example router uses TypeSafe's hosted Jev, and Ollama has other decision models, such as Cloudflare's [Clef](https://ollama.com/library/clef). You can add phases, too. I have a variant that sends code reviews to Claude Fable and hands authorized fixes to Sol (`gpt-6.1-sol` in that variant).
