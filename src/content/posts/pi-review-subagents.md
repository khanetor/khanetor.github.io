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
description: "How I built two code-review subagents in Pi: one where a single LLM does everything, and one where a small local model gets the final say on fixed review rules."
---

An agent writes a patch. I ask it to review the patch. It tells me the code does what it was designed to do. Fine, but it was the one that designed it.

I want a reviewer to start with the changes and the requirements, not the conversation that produced them. In [Pi](https://github.com/earendil-works/pi), my coding agent, I use two reviewers that start fresh:

- **llm-reviewer**: one large language model (LLM) reads the change and writes the whole review.
- **decision-reviewer**: an LLM still reads the whole change, but for a short list of fixed rules it has to ask a small model running on my laptop, and that model's answer is binding.

## A subagent is a fresh agent with a job description

A subagent is a second agent that my main agent can hand a task to. In Pi I use the [example extension](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent) as shipped, without changing its code. It gives my main agent a `subagent` tool, and each call starts a new `pi` process for the task.

The new process gets the task, but not the chat that led up to it. It can still work in the same folder: it reads the code, runs `git diff` to see what changed, and sends its report back to my main agent.

Each agent is a Markdown file in `~/.pi/agent/agents/`. A short header picks the model and the tools. The rest of the file becomes extra system prompt: standing instructions the agent reads before any task. Here's the header of my first reviewer:

```yaml
name: llm-reviewer
description: Independent, read-only code review in a fresh context. ...
tools: read, grep, find, ls, bash
model: openai-codex/gpt-6.2-astra:high
```

There's no `edit` or `write` tool in the list, but `bash` can still write files. “Read-only” is a rule in the instructions, not a lock. And the task itself can still carry my reasoning, so I tell the reviewer what to check, not why I think the patch is fine.

## Reviewer one: one model does everything

llm-reviewer builds on [ponytail-review](https://github.com/DietrichGebert/ponytail), a skill by Dietrich Gebert. A skill is a reusable set of instructions an agent loads when a task calls for it. This one reviews like the person who gets the call when the code breaks. Read the code around the diff, not just the changed lines. Follow the callers, read the tests, and think about the load the code will actually see.

One rule sets the tone: **no case, no finding**. "This might mishandle dates" doesn't count. "At midnight in Helsinki, this job uses yesterday's UTC date to look up today's orders" does. Every finding names a file and line, says what goes wrong, and proposes the smallest fix. Findings land in **Must fix**, **Should fix** and **Nice to have**, and the reviewer never changes the code itself.

My agent file adds its own checks on top. Does the change meet every requirement, and build nothing nobody asked for? Is there a simpler version? Do the new tests prove anything? Is there dead code? The comment rule is strict: apart from license headers, docs on public APIs and directives that tools read, every new comment is a finding, and the report says where its content should live instead: a test, a better name, or the commit message. And when a pull request (PR) description says "tested", that's a claim to check, not a fact.

What bothers me is that the model writes a finding and then judges whether it made a good case. The same goes for rules the model doesn't flag: a clean report doesn't tell me whether it checked a rule and found nothing, or never looked.

## Reviewer two: the LLM investigates, a small model rules

“Is this function really unused?” can send a reviewer all over a repository looking for code that calls it. “Does this finding name a file, a line and a concrete case?” is a much smaller question. It takes judgment, but you can write down what counts as a yes.

`decision-reviewer` keeps the LLM for the investigation and hands those smaller questions to a decision model.

### What a decision model is

A decision model doesn't chat. You give it some data and a question with fixed answers, like yes or no or one of a few labels, and it gives back an answer with probabilities. It can't write a paragraph or run a command. The answers you defined are all it can say. Pi calls this kind of model a `classifier`.

I run a small one, [`d3:4b`](https://ollama.com/library/d3:4b), on my laptop with Ollama, a tool for running models locally. Ollama serves the model. A short extension tells Pi how to call it.

### How a rule check works

decision-reviewer reads llm-reviewer's file and follows the same method and report format, so both reviewers share one set of instructions. What it adds is one tool, `rule_check`, and a YAML file of rules. The file turns parts of the review into fixed questions. Here's a shortened version of the rule for comments:

```yaml
comment.allowed:
  type: bool
  instructions: Is this comment one of the allowed kinds?
  criteria:
    true: Legal or license header, public API doc, or a directive a tool reads
    false: Any other comment
  violation: false
```

The decision model sees the question and the possible answers. The last line is for my code: it says a "no" is the answer that means trouble.

Here's how a check goes. Say a patch adds `// Temporary workaround until the old importer is gone`. The LLM calls `rule_check` with the rule's name, where the comment sits (say, `src/orders.ts:42`), the exact comment with its line of code, and the context the rule asks for: the language, and whether that code is a public API. The LLM picks the rule and the evidence. It doesn't get to write the question. The tool reads that from the YAML file.

Then plain code, not the LLM, turns the model's probability into a verdict. My threshold is 0.8:

- Violation score of 0.8 or higher: **violation**.
- Violation score of 0.2 or lower: **clean**.
- Anywhere in between: **uncertain**.

For a rule that only picks a label, like how serious a finding is, the tool uses the label if its score reaches 0.8. These are cutoffs for when to act on the model's answer, not a measure of how often it's right.

If that comment comes back as a violation, a second rule asks where its content should go. The answer might be “put it in the commit message.” That tells me what to do with the comment, not whether the workaround is correct. That's still the LLM's job.

`rule_check` starts out inactive. I add it to `decision-reviewer`'s tool list, leaving `llm-reviewer`'s list alone:

```yaml
tools: read, grep, find, ls, bash, rule_check
```

## What "binding" means

A verdict only helps if the LLM can't quietly work around it. So most of decision-reviewer's instructions are a procedure:

- **Violations stay in the report.** If the LLM disagrees, it can't drop the verdict. It lists it under **Disputed** with its reason, and I decide who's right.
- **Uncertain stays uncertain.** The reviewer retries once if it has more evidence. If the model still can't decide, the item goes under **Uncertain**, and the LLM doesn't fill in its own answer.
- **The LLM's own findings get checked.** Every draft finding, including bugs the LLM found by itself, goes through the concrete-case and severity rules. A finding with no concrete case gets reworked, or rejected under Disputed.
- **The input gets checked first.** A PR description can contain text aimed at the reviewer rather than a person. That's prompt injection: instructions tucked into the data a model reads. This check warns about it in the diff, commit messages or PR text. The reviewer is told not to follow those instructions, even if the check finds nothing.
- **No model, no review.** If `rule_check` is missing or fails, the reviewer reports `Review not run: <reason>` and stops. A review that quietly fell back to the LLM's own judgment would look exactly like a real one, and that's worse than no review.
- **Everything is counted.** The report ends with `Decision model: N checks, X violations, Y uncertain, Z disputed`, and it won't say a plain "Ship" while unresolved checks could still change the verdict.

"Binding" has limits, and I'd rather say them out loud. It's a rule the reviewer follows, not something that blocks a merge. The LLM still chooses which evidence to send, and nothing checks that it ran every rule that applied. And a small model can simply be wrong.

## I ran both on this post

Before publishing, I ran both reviewers in parallel on the PR for this post.

llm-reviewer caught two wording mistakes. I'd written that my extension registers the model "in" Ollama, when it only tells Pi how to reach a model Ollama already serves. I'd also written that a fresh start keeps the author's reasoning out of the review. It keeps the conversation out, but the task can still carry my reasoning. Both are fixed above.

`decision-reviewer` pointed out jargon I'd missed. Its report also showed two violations, both disputed by the LLM. The local model took a paragraph explaining reviewer instructions for an instruction aimed at the reviewer. It also flagged my comparison of the two designs as out of scope, even though that's what the post is about. I kept the comparison. This is one review of a draft, not a test of how well the model reviews code.

## So which one?

I keep both. `llm-reviewer` is the one to reach for when I just want a fresh read. `decision-reviewer` needs Ollama running and sometimes has to split up evidence to fit the smaller model's input limit. I use it when I want to see where a fixed rule was hard to apply. On this post, the extra model didn't settle the argument. It let me see there was one.
