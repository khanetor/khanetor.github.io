---
author: Kha Nguyen
pubDatetime: 2026-11-27T00:00:00.000+07:00
title: "Two code reviewers in Pi: who gets the final say?"
slug: pi-review-subagents
featured: false
draft: false
tags:
  - ai
  - agents
  - pi
  - code-review
description: "How I built two Pi review subagents, and why one gives a local decision model the final say on fixed review rules."
---

An agent writes a change. I ask it to review the change. It tells me the code does what it was designed to do. Fine, but I already had that opinion: it was the one that wrote the code.

I want the reviewer to start with the diff and the requirements, not the conversation that produced the patch. That's why I use a subagent in [Pi](https://github.com/earendil-works/pi), my coding agent. I built two: `llm-reviewer`, where one large language model (LLM) does the whole review, and `decision-reviewer`, where an LLM investigates but a small local model gives binding verdicts on specific review rules. The second isn't another reviewer reading the whole patch. It answers one question at a time.

## A fresh pair of eyes is a Markdown file

Pi ships a [subagent example](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent) that I use unchanged. It's an extension, not a special review API: it uses Pi's [`registerTool()` API](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md#piregistertooldefinition) to give the main agent a `subagent` tool. I can say “Use `llm-reviewer` to review my uncommitted changes against these requirements.” The tool finds the definition in `~/.pi/agent/agents/` and starts a separate `pi` process. The child gets the delegated task, not the parent conversation. It reads the same working tree and sends its report back as the tool result.

Each definition is a Markdown file. The header sets the name, description, model and tools; the body adds instructions to the child's system prompt. This is the tool list for `decision-reviewer`. For `llm-reviewer`, the only difference in the list is that `rule_check` is absent:

```yaml
tools: read, grep, find, ls, bash, rule_check
```

Neither reviewer gets `edit` or `write`. They have `bash` to run things like `git diff`, which also means they _could_ write files. “Read-only” is an instruction, not a sandbox. A fresh conversation keeps the author's reasoning out of the review; it doesn't change what the child process can access.

## llm-reviewer: keep the whole job with one model

My first reviewer builds on [ponytail-review](https://github.com/DietrichGebert/ponytail), a skill (a reusable set of instructions) that says to read the code around the diff, not just the changed lines. Follow the callers, read the tests, and ask what happens at the load this code actually sees. I add rules about requirements, unnecessary code, comments and tests. A claim like “tested” in a PR description is something to verify, not a fact.

My favorite rule is **no case, no finding**. “This might mishandle dates” isn't a finding. “At midnight in Helsinki, this job uses yesterday's UTC date to look up today's orders” is a case worth investigating. The report should name a file and line, explain what goes wrong, and propose the smallest fix. It sorts findings into **Must fix**, **Should fix** and **Nice to have**, and changes no code.

That's the simpler design: one reviewer definition on top of the shared skill. But the same model that writes “this is a bug” also decides whether it has made a convincing case. And if a strict rule goes soft halfway through a long review, a clean report doesn't tell me whether the model checked the rule and found nothing, or never applied it.

## decision-reviewer: separate the investigation from the ruling

Some questions need the whole repo. “Is this export dead?” means looking for callers, public entry points and code that loads it indirectly. Others are narrow enough to write down in advance. “Is this comment a license header, public API documentation, or a directive a tool reads?” still takes judgment, but the possible answers are fixed.

`decision-reviewer` reads `llm-reviewer.md` for the shared review method. For fixed questions it calls `rule_check` instead of deciding on its own. The questions live in `decision-reviewer.rules.yaml`. The reviewer chooses a rule ID and submits an exact excerpt, a reference like `src/orders.ts:42`, and any context the rule calls for. It doesn't get to rewrite the question.

Take `comment.allowed`. Say a patch adds `// Temporary workaround until the old importer is gone`. The reviewer sends the comment, the line it sits on or above, and the requested context: the language and whether the declaration is public API. If the result is `violation`, the comment has to show up in the report. A separate check, `comment.destination`, can say the explanation belongs in the commit message or PR description. That tells me what to do with the comment; it doesn't tell me whether the workaround itself is correct.

There are also checks for what a new test contributes, whether a hunk serves a requirement, and whether a draft finding names a concrete case. A hunk being in scope doesn't prove the change met every requirement. The LLM still has to look for what's missing.

### What the local model actually does

Pi calls a decision model a `classifier`. Instead of chatting, it answers a typed question about some data: yes or no, or one of a set of labels. My `ollama-model-registration.ts` extension registers `d3:4b` in local [Ollama](https://ollama.com), reusing Pi's built-in System One client. `decision-rules.ts` registers `rule_check` inactive by default. The decision reviewer's tool list enables it in that child process.

The tool loads the rule's question and criteria from YAML and calls `ctx.modelRegistry.classify()` with those and the evidence. Then ordinary code interprets the model's scores. For a rule with a violation condition, a violation score of **0.8 or higher** is `violation`; **0.2 or lower** is `clean`; in between is `uncertain`. For a rule that only assigns a label, like finding severity, the tool returns the label as the verdict only if its confidence reaches 0.8. Those thresholds are my policy for when to use an answer, not measured accuracy.

## What “binding” buys me

A `clean` verdict closes one rule on one item. It doesn't clear the patch. A `violation` can't be silently dropped. If the LLM disagrees, the instructions say to keep the verdict under **Disputed** with its reason. If the model is uncertain, the reviewer tries once more if it has more evidence, then reports any unresolved result under **Uncertain**. Every draft finding, including bugs the LLM found on its own, gets checked for a concrete case and severity. The report ends with a tally of checks, violations, uncertainties and disputes.

The reviewer also checks for instructions aimed at AI in the diff, commit messages and PR text before evaluating the change. That's a warning step, not a security guarantee: a clean answer doesn't make those instructions safe to follow. If `rule_check` is missing or a call errors, the reviewer is told to report `Review not run: <reason>` rather than quietly fall back to being `llm-reviewer`.

“Binding” is a rule for the reviewer, not a merge gate. The tool fixes the question and computes the verdict, but the LLM still decides what evidence to send and the runner doesn't verify that it called every applicable rule. The local model can get the answer wrong, too. I want to see those disagreements, not hide them behind a number.

I keep both because the second review buys me something specific at a cost. `llm-reviewer` has fewer moving parts and doesn't need Ollama. `decision-reviewer` needs a local service and extra calls, and sometimes the evidence has to be split to fit the model's window. What I get back is a clearer record of how the fixed rules were applied, where the two models disagreed, and what they couldn't decide. I don't need two models to read the whole patch. I need one to investigate it and, for the rules I've written down, another that the first can't casually talk over.
