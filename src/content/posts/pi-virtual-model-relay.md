---
author: Kha Nguyen
pubDatetime: 2026-11-27T19:37:09.000+07:00
title: "Plan with one model, code with another: my relay in Pi"
slug: pi-virtual-model-relay
featured: false
draft: false
tags:
  - ai
  - pi
  - ollama
  - coding-agents
description: "How I use Pi's virtual model API and a small decision model in Ollama to pass one coding session between a planning model and a coding model."
---

When I ask a coding agent to change something, the work has two parts. First the agent finds its way around: it reads files, works out where the change goes, maybe writes a plan. Then it writes the change. I use Claude Opus (`claude-opus-5-5`) for the first part and OpenAI's Sol (`gpt-6.2-sol`) for the second.

Switching between them by hand is a chore. I’d have to watch the agent read file after file just to catch the moment before it starts editing.

So I built **Relay**. In Pi's model picker it's a single entry, `router/relay`. Behind it, Opus plans, Sol codes, and a small model running on my own machine in [Ollama](https://ollama.com/) helps decide when to pass the baton.

That small model never writes code. It only answers yes-or-no questions. Plain code makes the actual decision.

Say I'm working on a search page. The empty state is what people see when their search finds nothing. Here's how the handoffs might go:

1. I type "Make the empty state clearer." Opus starts reading files.
2. After a few reads, the local model says yes, this asks for a change, and yes, the agent has read enough. The next request goes to Sol, and Sol makes the edit.
3. I type "Actually, say 'No results'." The local model calls it a small correction, so Sol keeps going.
4. I type "Why do we have two empty-state components?" That's a new question, so it goes back to Opus.

## What a virtual model is

[Pi](https://github.com/earendil-works/pi) is the coding agent I use in my terminal. Picking a model in Pi normally means picking who answers. A [virtual model](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/virtual-models.md) looks the same in the picker, but picking it really picks a small function I wrote.

One prompt can take several requests to a model. Say Opus asks to read a file. Pi runs that tool and sends the result back in another request. Relay can switch models between those two requests without waiting for me to type again.

I register Relay with `pi.registerVirtualModel()`. Before each request, Pi calls my `route()` function with the conversation and a reason: did I just type a message, is the agent continuing after a tool ran, or is Pi doing something else? My function returns the model to use and its thinking level (how much effort to spend reasoning).

`route()` can also save a small note. During the agent's work, Pi hands that note back on later requests in the same conversation, even after older messages get summarized. Relay's note holds one word: `planning` or `coding`.

This isn't two agents talking to each other. It's one conversation. When Sol takes over, it sees what Opus read and said, tool results included. I can see which model Pi picked in the footer, without leaving the conversation.

## Handoff one: planning to coding

I didn't invent the basic rule. Pi ships an example router, [Jev](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/jev-router.ts), that switches models after the first successful `edit` or `write` tool call. It's a reliable sign that coding has started. But by then the planning model has already made the first edit, and I wanted Sol to make it.

So before a request that continues the same turn, like the one after a file read, Relay asks the local model two questions. It only does this while still planning and if Opus hasn’t already made a successful edit:

1. **Did I ask for a change?** "Make the empty state clearer" is a yes. "Where does the empty state come from?" is a no, and so is "Give me a plan for changing it."
2. **Has the agent read enough to edit next?**

The local model gets the start of my message, a bit of what the agent last said, and up to six short tool call descriptions, like `read src/components/EmptyState.tsx`. It doesn't get the tool output.

Each answer comes back as a score between 0 and 1. Both scores must meet or exceed a cutoff. If they do, the next request goes to Sol, which gets first crack at the edit. Otherwise, Opus keeps going and Relay can ask again. The Jev rule still applies: a successful `edit` or `write` moves the work to Sol without another check.

## Handoff two: back to planning

Once Sol is coding, Relay stops asking whether the agent is ready. The next question comes when I send a new message: is this a small follow-up to the change Sol just made?

This time the local model sees the start of my previous request, the end of the agent's last reply, and the start of my new message. A wording tweak counts. So can asking to rerun a test for the same change. A new task or design question doesn’t.

If the correction score meets the cutoff, Sol stays on. Otherwise, the message goes back to Opus. I'd rather have Opus handle the occasional small tweak than let the coding phase roll straight into a new design discussion.

## The small model on my machine

Ollama runs open models on your own computer. I use two decision models from the Ollama library, `tev1:4b` and `d3:4b`, each with about 4 billion parameters. They don't write chat replies. You give them some text and a few questions, and they return a structured answer with a score for each question.

I register both models in Pi as _classifiers_: models that score answers to a specific question. Ollama has a dedicated API for this called System One. Pi already knows how to call it, so my extension reuses that code instead of trying to pull a “yes” out of a chat reply.

Relay offers two thinking levels, `low` and `medium`. They don't set how hard one model thinks. Each one picks a preset:

| Relay level | Opus thinks at | Sol thinks at | Local model | Time limit | Readiness cutoff (each score) | Correction cutoff |
| ----------- | -------------- | ------------- | ----------- | ---------- | ----------------------------- | ----------------- |
| `low`       | `medium`       | `low`         | `tev1:4b`   | 2 s        | 0.7                           | 0.6               |
| `medium`    | `xhigh`        | `medium`      | `d3:4b`     | 4 s        | 0.9                           | 0.8               |

These are settings, not test results. The cutoffs carried over from earlier versions of the router, and I still need to recheck them on these models. A cutoff of 0.9 doesn't mean the model is right nine times out of ten.

Pi waits for the classifier before it sends the real request. If Ollama is down, hits the time limit, or sends back an answer Relay can't use, I don't let that one check decide the rest of the turn. A failed readiness check keeps that request on Opus. The next check can still send the work to Sol, and so can a successful edit. A failed correction check sends the new message back to Opus.

Only the routing questions run locally. The planning, coding and summarizing all happen on hosted models.

## When the conversation gets too big for Sol

Each model can only read so much text in one request. That limit is its context window. Opus can build up a conversation that's too long to hand to Sol as-is.

Pi checks against the context window of the model Relay actually picked. If the conversation is too close to that limit, Pi [compacts it](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/compaction.md): it summarizes older messages and keeps the recent ones as they are.

The summary is a separate request outside the agent's normal work, which Pi marks as `direct`. Relay sends the summary request to Claude Sonnet at `medium`. The coding request still goes to Sol, and the phase doesn't change.

Pi measures that window in tokens, the chunks of text a model reads. I set Relay to compact once Sol (or whichever model Pi picked) would have fewer than 68,000 tokens of room left:

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

That number is breathing room, not the length of the summary. There's also a cost even if the conversation fits: when I switch models, Sol can't reuse the work Opus cached for that conversation. That's another reason I don't want them swapping back and forth after every file read.

## A variant for reviews

I also have `router/relay-plus`, a separate variant that checks each new message for review intent first. A review goes to Claude Fable. If the check says the next step is an authorized fix, Relay Plus hands it to Sol (`gpt-6.1-sol` in that variant) and brings Fable back after a successful `edit` or `write`.

What I like about plain Relay is that I can change the rules without changing how I ask for work. I still say “make the empty state clearer,” then “actually, say ‘No results’.” I don't have to interrupt the session to pick who's up next.
