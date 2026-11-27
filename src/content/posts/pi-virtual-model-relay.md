---
author: Kha Nguyen
pubDatetime: 2026-11-27T19:37:09.000+07:00
title: "One model in the picker, two phases in Pi"
slug: pi-virtual-model-relay
featured: false
draft: false
tags:
  - ai
  - pi
  - ollama
  - coding-agents
description: "How I use Pi’s virtual model API and a local Ollama classifier to hand off between planning and coding in one session."
---

“Make the empty state clearer.” And then, after the change: “Actually, say ‘No results’.” Those are both coding requests, but I don't want the same thing from the agent each time. The first asks it to find the right component and understand how it fits. The second is a correction to work it just did. I don't want to switch models by hand between those two messages. More importantly, I don't want to guess at the start of a task when the agent will have read enough to make the first edit.

So I made **Relay**, a [virtual model in Pi](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/virtual-models.md). I select `router/relay` once. Opus explores and plans, Sol writes code, and a small model running in Ollama helps decide when to pass the baton. The local model doesn't write any code. It answers a few yes-or-no questions; the router applies the rules.

## One selection, one conversation

[Pi](https://github.com/earendil-works/pi) is the terminal coding agent I use. A model normally means the thing answering my prompt. In Pi, a _virtual_ model is an entry in the same `/model` picker, but selecting it really selects a function. I register Relay with `pi.registerVirtualModel()`, and before dispatching a request Pi calls its `route()` function. The function gets the conversation, why Pi is making the request, and the router's saved state. It returns the actual model and its thinking level.

Relay saves one piece of state: `phase`, either `planning` or `coding`. Pi keeps it on the session branch, so it follows the branch and survives compaction. This isn't two agents chatting or running in parallel. Sol gets the ongoing conversation, including the tool results from Opus's exploration, not a fresh prompt asking it to reconstruct the work. I still have one session and one selected model; Pi's footer can show me which underlying model answered.

## The first handoff: before the first edit, when possible

A fresh session starts on Opus (`claude-opus-5-5`). The [Jev router example](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/jev-router.ts) in Pi gave me a useful rule: a successful `edit` or `write` is a clear sign that implementation has started. The catch is that the planner has already made the first edit by the time I see that signal. I wanted Sol (`gpt-6.2-sol`) to be able to make that edit instead.

While Relay is still planning, it can ask the decision model two questions before a follow-up request, for example after Opus has read some files:

1. **Did I ask for a change?** “Make the empty state clearer” is a yes. “Where does the empty state come from?” is not. Neither is “Give me a plan for changing it.”
2. **Has the agent read enough to edit next?** The evidence is a clipped copy of my request, some text from the latest assistant message, and up to six recent tool calls from this turn. The classifier sees short call descriptions, not the full files or their tool outputs.

Both scores have to clear the cutoff. If they do, the next request goes to Sol, without waiting for Opus to touch a file. If they don't, Relay keeps planning. The original rule still works: if Opus gets a successful `edit` or `write` result, subsequent work can go to Sol without consulting the classifier. That also means “planning” is a routing phase, not a read-only mode.

## The return trip: a correction or a new task?

Once Sol takes over, Relay doesn't keep asking whether it's ready to code. The next decision comes when I send another message. Now the classifier gets short excerpts of my previous request, the end of the last assistant reply before the new message, and the new message itself. It gets one question: **Is this a small follow-up to the same change?**

“Actually, say ‘No results’” can stay on Sol. “Why do we have two empty-state components?” should go back to Opus. I'd rather send an ambiguous correction back to the planner than have the coding phase carry straight into a new design discussion.

## What runs locally

A separate Pi extension registers `tev1:4b` and `d3:4b` as [classifier models](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/custom-provider.md), not chat models. I run both in [Ollama](https://ollama.com/). Pi already has a System One client that speaks Ollama's `/v1/systemone` protocol, so my extension reuses that client rather than parsing a chat response for a “yes.” The classifier returns structured scores, and Relay decides what counts as enough.

The two thinking levels I see in Pi are really two presets:

| Relay setting | Opus thinking | Sol thinking | Local classifier | Timeout | Cutoff for each readiness score | Correction cutoff |
| ------------- | ------------- | ------------ | ---------------- | ------- | ------------------------------- | ----------------- |
| `low`         | `medium`      | `low`        | `tev1:4b`        | 2 s     | 0.7                             | 0.6               |
| `medium`      | `xhigh`       | `medium`     | `d3:4b`          | 4 s     | 0.9                             | 0.8               |

Those are settings, not benchmark results. The thresholds carried over from earlier variants; I don't treat a score of 0.9 as proof that the model is right nine times out of ten. The call also adds a wait before Pi can start the routed request. If Ollama isn't running, times out, or doesn't give Relay usable scores, the agent can still work: the router waits for a successful edit to switch to Sol and defaults to Opus on the next user message. Only the routing judgment is local; the models doing the planning, coding, and summarizing are still hosted.

## The handoff has to fit

Opus can build up more conversation than Sol can take in one request. Pi checks the context against the model Relay actually picked. If it needs to shrink the conversation, Pi does its usual [compaction](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/compaction.md): summarize older messages and keep recent ones as-is. Relay sends the summary request, which Pi marks as `direct`, to Sonnet (`claude-sonnet-5-5`) at `medium`. The original coding request still goes to Sol and the phase doesn't change.

Here's the relevant bit of my settings:

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

That reserve is headroom: Pi starts compaction when context usage exceeds the routed model's window minus 68,000 tokens. It isn't a request for a 68,000-token summary. A model switch can also lose the prompt cache, meaning the next model may have to process conversation text the previous one had cached.

I have a separate `router/relay-plus` variant for reviews. It checks new messages for review intent first, sends reviews to Fable, and can hand an authorized fix to Sol before going back to Fable after a successful edit. Plain Relay is the version that makes the idea clearest for me: use code for the rules and the fallback, and ask the small model only for the judgments a tool result can't give me. Did I ask for an edit? Is it time to make it? Is this still the same job?
