---
author: Kha Nguyen
pubDatetime: 2026-11-20T00:00:00.000+07:00
title: "A calm, notifications-first phone OS: a concept"
slug: calm-notifications-first-os
featured: false
draft: false
tags:
  - mobile
  - os
  - concept
  - notifications
  - privacy
  - ai
description: A concept for a phone OS that owns the attention layer instead of the apps — notifications-first home screen, web-like app distribution without a store gate, and an OS-owned, fairly shared AI layer. Why past attempts failed, and how to enter through a small market instead.
---

I was a Microsoft employee while Windows Phone was being pushed, and I've been thinking about why it failed ever since. The live tiles were actually notification-first — arguably ahead of their time — but the bright tiles on a dark background kept me alert and stressed rather than calm. And design aside, the real killer was the app gap: there simply weren't the apps people needed. That's the lesson I keep coming back to: **an OS doesn't win on vision, it wins on having the few apps that matter in the market you enter.**

<figure>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Nokia_Lumia_730%2C_Startbildschirm.JPG/960px-Nokia_Lumia_730%2C_Startbildschirm.JPG"
    alt="Windows Phone Start screen with live tiles on a Nokia Lumia 730"
  />
  <figcaption class="text-center">
    Windows Phone's Start screen: live tiles, notification-first — but bright on dark. Photo via
    <a href="https://commons.wikimedia.org/wiki/File:Nokia_Lumia_730,_Startbildschirm.JPG">Wikimedia Commons</a>
    (CC BY-SA 4.0).
  </figcaption>
</figure>

This post is the concept I've been developing over a long series of discussions: a phone OS
where the **OS owns the attention layer**, apps are **distributed like web apps** (no store as
a gate), and **AI is an OS service, shared fairly, private by default** — all enforced by one
broker with per-app fair shares and verified trust tiers.

## The core idea: the OS owns notifications

Today every app owns its own channel into your attention: badges, banners, push, vibration.
The OS just transports them. The result is a thousand little slot machines.

The concept flips it: the OS owns the notification channel, and apps _request_ attention
through a structured protocol. The home screen is notifications-first, with three views:

- **Now** — the AI-prioritized surface: a "what matters now" summary with suggested actions,
  items sorted by deadline, and a "filed for you" section showing the economics in action
  (a sender that exceeded its quota is blocked, items with no deadline are archived, expired
  alerts are quietly removed).
- **Inbox** — the full mailbox: verified-sender badges, a security-critical lane (a bank
  login alert that cannot be deferred), due dates on every item, decaying urgency ratings.
- **Schedule** — notifications placed on your timeline by deadline, with live items (a
  delivery window) updating their own slots and quiet days shown as quiet.

<figure>
  <svg
    viewBox="0 0 960 400"
    role="img"
    aria-label="Mockup of the three home-screen views: Now, Inbox, Schedule"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>text { font-family: system-ui, sans-serif; }</style>
    <!-- Phone 1: Now -->
    <g>
      <rect x="20" y="20" width="280" height="360" rx="28" fill="#fdfbf6" stroke="#d9d2c0" />
      <rect x="120" y="30" width="80" height="10" rx="5" fill="#e5dfd0" />
      <text x="160" y="66" text-anchor="middle" font-size="16" font-weight="600" fill="#2b2925">Now</text>
      <rect x="44" y="80" width="232" height="24" rx="12" fill="#efe9da" />
      <rect x="48" y="83" width="72" height="18" rx="9" fill="#2f6f4f" />
      <text x="84" y="96" text-anchor="middle" font-size="10" fill="#ffffff">Now</text>
      <text x="160" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Inbox</text>
      <text x="236" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Schedule</text>
      <rect x="44" y="116" width="232" height="64" rx="10" fill="#ffffff" stroke="#e2dcc9" />
      <text x="56" y="136" font-size="11" font-weight="600" fill="#2b2925">What matters now</text>
      <text x="56" y="151" font-size="9" fill="#6b675e">2 actions suggested</text>
      <rect x="56" y="158" width="86" height="16" rx="8" fill="#2f6f4f" />
      <text x="99" y="169" text-anchor="middle" font-size="8" fill="#ffffff">Pay invoice</text>
      <rect x="148" y="158" width="80" height="16" rx="8" fill="#e8e2d2" />
      <text x="188" y="169" text-anchor="middle" font-size="8" fill="#2b2925">Track Posti</text>
      <text x="44" y="200" font-size="10" font-weight="600" fill="#2b2925">By deadline</text>
      <rect x="44" y="208" width="232" height="26" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="225" font-size="9" fill="#2b2925">Helen invoice — due Fri 17:00</text>
      <rect x="44" y="240" width="232" height="26" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="257" font-size="9" fill="#2b2925">Posti delivery — live 14:00–16:00</text>
      <rect x="44" y="272" width="232" height="26" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="289" font-size="9" fill="#2b2925">Mimmi — 2 messages</text>
      <text x="44" y="318" font-size="10" font-weight="600" fill="#8a857a">Filed for you</text>
      <text x="54" y="334" font-size="9" fill="#8a857a">Zalando — blocked (over quota)</text>
      <text x="54" y="350" font-size="9" fill="#8a857a">Vero — filed to next week · expired removed</text>
    </g>
    <!-- Phone 2: Inbox -->
    <g>
      <rect x="340" y="20" width="280" height="360" rx="28" fill="#fdfbf6" stroke="#d9d2c0" />
      <rect x="440" y="30" width="80" height="10" rx="5" fill="#e5dfd0" />
      <text x="480" y="66" text-anchor="middle" font-size="16" font-weight="600" fill="#2b2925">Inbox</text>
      <rect x="364" y="80" width="232" height="24" rx="12" fill="#efe9da" />
      <text x="404" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Now</text>
      <rect x="444" y="83" width="72" height="18" rx="9" fill="#2f6f4f" />
      <text x="480" y="96" text-anchor="middle" font-size="10" fill="#ffffff">Inbox</text>
      <text x="556" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Schedule</text>
      <rect x="364" y="116" width="232" height="40" rx="10" fill="#fbeae8" stroke="#e5b8b3" />
      <text x="376" y="133" font-size="9" font-weight="600" fill="#8f1d14">OP Bank ✓ verified — new login</text>
      <text x="376" y="147" font-size="8" fill="#8f1d14">Security-critical — cannot be deferred</text>
      <rect x="364" y="164" width="232" height="30" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="374" y="177" font-size="9" fill="#2b2925">Kanta ✓ — appointment reminder</text>
      <text x="374" y="189" font-size="8" fill="#8a857a">due tomorrow · urgency high</text>
      <rect x="364" y="200" width="232" height="30" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="374" y="213" font-size="9" fill="#2b2925">Nordea ✓ — card notice</text>
      <text x="374" y="225" font-size="8" fill="#8a857a">due in 4 days · urgency decaying</text>
      <rect x="364" y="236" width="232" height="30" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="374" y="249" font-size="9" fill="#2b2925">Suomi.fi — tax decision ready</text>
      <text x="374" y="261" font-size="8" fill="#8a857a">due Fri · government sender</text>
      <text x="364" y="290" font-size="9" fill="#8a857a">Every item shows its due date and a decaying</text>
      <text x="364" y="304" font-size="9" fill="#8a857a">urgency rating; verified senders get a badge.</text>
    </g>
    <!-- Phone 3: Schedule -->
    <g>
      <rect x="660" y="20" width="280" height="360" rx="28" fill="#fdfbf6" stroke="#d9d2c0" />
      <rect x="760" y="30" width="80" height="10" rx="5" fill="#e5dfd0" />
      <text x="800" y="66" text-anchor="middle" font-size="16" font-weight="600" fill="#2b2925">Schedule</text>
      <rect x="684" y="80" width="232" height="24" rx="12" fill="#efe9da" />
      <text x="724" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Now</text>
      <text x="800" y="96" text-anchor="middle" font-size="10" fill="#6b675e">Inbox</text>
      <rect x="840" y="83" width="72" height="18" rx="9" fill="#2f6f4f" />
      <text x="876" y="96" text-anchor="middle" font-size="10" fill="#ffffff">Schedule</text>
      <text x="684" y="122" font-size="10" font-weight="600" fill="#2b2925">Today</text>
      <rect x="684" y="130" width="232" height="30" rx="8" fill="#e8f0ea" stroke="#bcd6c6" />
      <text x="694" y="143" font-size="9" fill="#2b2925">14:00–16:00 Posti delivery (live)</text>
      <text x="694" y="155" font-size="8" fill="#2f6f4f">slot updates itself</text>
      <rect x="684" y="166" width="232" height="30" rx="8" fill="#ffffff" stroke="#e2dcc9" />
      <text x="694" y="179" font-size="9" fill="#2b2925">17:00 Helen invoice due</text>
      <text x="694" y="191" font-size="8" fill="#8a857a">reminder placed by deadline</text>
      <text x="684" y="222" font-size="10" font-weight="600" fill="#2b2925">Saturday</text>
      <rect x="684" y="230" width="232" height="30" rx="8" fill="#f1ede1" stroke="#e2dcc9" />
      <text x="694" y="248" font-size="9" fill="#8a857a">Quiet day — nothing scheduled</text>
      <text x="684" y="286" font-size="9" fill="#8a857a">Notifications are placed on your timeline by</text>
      <text x="684" y="300" font-size="9" fill="#8a857a">deadline; quiet days are shown as quiet.</text>
    </g>
  </svg>
  <figcaption class="text-center">
    The three home-screen views — Now, Inbox, Schedule — as a static rendering of the interactive
    mockup from the original discussion, with the quota mechanics and example senders (the OP Bank
    security lane, a live Posti delivery window, an over-quota Zalando card) wired in.
  </figcaption>
</figure>

The mechanics that make it work are quotas, not vibes: each sender gets a budget, verified
senders (banks, government, health services) get a higher tier and a badge, security-critical
items are never deferrable, and everything else decays. The design principle is **calm by
default** — information density is not the goal; calm control is. Windows Phone proved that
notification-first can be right and still feel wrong; the missing piece was the quota layer.

## Apps: distributed like web apps, without the store as a gate

The web's distribution model is the part mobile got wrong: a URL is the distribution, deploys
are atomic, and every user is on the latest version after a refresh. App stores give you
review, discovery, and trust badges — but also review delays, 15–30% fees, and a client base
fragmented across many installed versions, which makes backward compatibility and API
versioning a permanent chore.

So the concept pushes the store to be more like the web: an **app is a signed package and
manifest addressed by a URL**, served from any host. "Installing" just pins it and grants its
declared capabilities; launching does stale-while-revalidate and atomically swaps the package,
so users converge to the latest version within hours. The store remains as an _optional_
discovery and **verified-publisher badge** layer — review becomes a trust signal, not a
gate. The version-fragmentation problem mostly disappears structurally; what remains is the
OS↔app capability interface, which the OS versions and shims (N−1, N−2).

This is feasible today, and there are existing projects that prove each piece — we just
shouldn't copy them wholesale:

- **Why not QuickApps/MiniApps**: install-free and always-latest, yes — but they're web-tech
  hybrids (JS logic + webview UI) with per-vendor dialects, standardized by a W3C working
  group that closed in 2026, and in Europe only Huawei devices ship the framework. Adopting it
  would tie a European-sovereignty OS to a Chinese-OEM-controlled format with PWA's richness
  ceiling. We borrow the packaging/lifecycle _concept_, not the runtime. (For the record, the
  W3C MiniApps work lives under the [MiniApp white paper](https://www.w3.org/TR/mini-app-white-paper/)
  and the [OW2 Quick App Initiative](https://quick-app-initiative.ow2.io/page/context/).)
- **Why not just PWA**: since we're building our own OS, platform quirks like iOS's missing Web
  Bluetooth/NFC aren't the point — the point is depth of integration. HTML in a webview can't do
  tight hardware and system integration (Bluetooth, NFC, background execution, OS-level
  notification rendering) without a growing pile of permission prompts. PWA stays as the
  fallback/web tier, not the main one.
- **What to build on**: **React Native as an out-of-tree platform** on a Linux-based OS.
  Developers already know JS/React — asking them to learn Rust, QML, or Dart would kill
  adoption. RN's New Architecture (Fabric + JSI + TurboModules, default since 0.76) was
  explicitly designed to make [out-of-tree platforms](https://reactnative.dev/docs/out-of-tree-platforms)
  maintainable — react-native-windows, -macos, -web and
  [react-native-skia](https://github.com/Shopify/react-native-skia) (Linux/macOS) prove the
  seams. Apps ship **Hermes
  bytecode bundles** loaded from a URL, which _is_ the web-like distribution model; rendering
  goes through **Skia/Graphite** (via react-native-skia, now on the WebGPU-based Graphite
  backend) so there's one GPU path instead of per-widget native views; OS capabilities
  (camera, NFC, push, background) are exposed once as TurboModules through the capability
  broker; and **Wasm/WASI ([WASI-NN](https://github.com/WebAssembly/wasi-nn))** covers
  sandboxed logic. The EU's [DMA](https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en)
  — alternative marketplaces, sideloading, and web distribution on iOS in the EU — is the
  regulatory tailwind that makes "store optional" legally established in our target market.

## App quality in an open store: a badge, not a gate

Gates leak, so we design for openness. The DMA already forces sideloading, alternative
marketplaces, and web distribution in the EU — and Apple's own notarization-only alternative
stores let prohibited apps through (the "Hot Tub" case), while Apple rejected 22,000 submissions
in 2025 for hidden or undocumented features that only appear after approval. Open distribution
is the regulatory and technical future; the design question is how to make harm hard and
visible, not how to pretend exclusion works.

**Badge, not a gate.** A gate excludes: only reviewed apps can install, and a lapsed fee removes
them (Apple's model). A badge ranks and labels: anyone can distribute, and review only adds
trust signals. The one rule that keeps ours a badge: **unverified apps stay fully visible and
installable — labeled "unverified", never hidden or demoted to invisibility.** The only hard
block is a failed malware scan, which is appealable.

**1. A universal security floor, free for every app.** Every package is signed and passes an
automated notarization-style scan (malware signatures, private APIs, entitlements,
declared-capability vs. actual-behavior) — and because apps are bytecode bundles, the OS
auto-diffs and re-scans **every update**, catching bait-and-switch mechanically. On top of that,
the sandbox and capability broker mean a malicious app can't do much even if it slips through:
dangerous capabilities (SMS, contacts, accessibility services, device admin, installing other
apps) are off by default and granted per app, and notifications, AI, and background execution
all pass through the quota broker.

**2. Trust is earned through the badge — and auditable by anyone.** The verified-publisher badge
requires published source and a reproducible build (the
[F-Droid](https://f-droid.org/docs/Reproducible_Builds/) model): the shipped Hermes bytecode must
rebuild bit-for-bit from source, so the community can audit any app without trusting the
reviewer. AI agents review 100% of submissions — practical here because apps are inspectable
bytecode with a declared capability manifest: static checks, update diffs, and sandboxed
dynamic runs where an agent clicks through the app while its network calls are watched. A small
maintainer group then reviews a risk-stratified sample — new publishers, flagged apps,
high-download apps, sensitive categories (finance, health, kids), and every appeal — plus
random audits; volunteers handle triage and build verification, a paid core makes final calls.
Review logs and rejection reasons are public, so the community can audit the reviewers too.
Identity comes from eIDAS 2.0 / national eID (free, government-issued EUDI wallets) rather than a
paid D-U-N-S-style check — stronger accountability at zero cost. Volume is on our side: our
wedge-market submission count is orders of magnitude below Apple's 9.1M a year.

**3. Vulnerable users get a per-account gate, not a global one.** Safeguarded and child accounts
default to **verified-only installs**, with age-appropriate content ratings enforced plus screen
time and capability restrictions. Age assurance uses the EUDI wallet's attribute attestations —
selective disclosure can prove someone is over 13/18 without revealing identity or birthdate,
which is exactly what eIDAS 2.0 was built for. Kids-category and user-generated-content
moderation rules (Apple's guidelines 1.1/1.2 are a good reference bar) are enforced in badge
review.

**Fees.** Distribution, signing, the automated scan, and listing are free. The **annual fee
(per developer account, not per app)** exists only for the **verified-publisher badge** — it
pays the maintainers and the AI review infrastructure. It buys a service, not the right to exist
on the platform, and there is no commission on payments (0%; the DMA already forces external
payments). Two tiers: free/community-reviewed (no badge) and paid/verified (badge, faster
review, discovery priority, higher capability quotas).

**The honest tradeoff.** An open store will contain more scams and low-effort apps than Apple's —
that is the price of no gate. The harm is kept low not by prevention but by the floor, labels,
ranking, safeguarded accounts, and fast takedown (kill switch, public takedown log, one-tap
reporting). Shipping openness without those safeguards would be irresponsible; shipping them is
the design.

## AI: an OS service, shared fairly, private by default

AI is becoming a necessity, and if it's shared by all apps, the OS must be the one enforcing
safety, privacy, and efficiency — otherwise one app can hog the NPU, overheat or drain the
battery, or keep running AI in standby all night.

The precedent exists: Android's [**AICore**](https://developer.android.com/ai/gemini-nano)
system service manages the shared on-device model (Gemini Nano) with per-app quotas,
foreground-only inference by default, and battery-linked daily caps; Apple exposes its
on-device model via the Foundation Models framework with Private Cloud Compute as an
auditable cloud tier. Hardware is ready — 2026 flagship NPUs deliver 40–70+ TOPS, 3B models
run at 40–50 tok/s on-device via [**ExecuTorch**](https://pytorch.org/executorch/) (GA since
late 2025, 12+ backends) or MLX.

Our version would be a **System AI Service** that owns the model set (open-weight, INT4-
quantized, distributed over the OS's signed update channel — verifiable, and no vendor
black box), and brokers access through the same capability broker as notifications:

- **fair-share scheduling, not rationing**: the OS scheduler owns NPU dispatch and batches
  across apps, so each app gets a fair slice of the shared model and no single app can hog it —
  your own AI usage is never capped. On top of that: thermal and battery guards that throttle
  inference when the device is hot or the battery is low, no background/standby inference unless
  the user opts in, and a per-app "AI usage" dashboard showing where the capacity went;
- **priority lanes**: system/security (scam-call detection, OTP parsing) > user-initiated
  foreground > background (off unless opted in), with busy-error and graceful fallback to a
  smaller model;
- **two API tiers**: mediated task APIs (summarize, classify, extract — output passes a safety
  filter, no raw model access) and a rate-limited raw prompt API for verified publishers;
- **privacy by construction**: inference runs isolated with no network access, no training on
  user data, an audit log of which app used AI when (not the content); cloud escalation only
  per-task with explicit consent, through a verifiable private-compute tier (attestation,
  published images — the PCC model), default off.

One broker, three resources: attention, apps, intelligence — each with per-app limits,
verified trust tiers, and calm-by-default behavior.

## Why the EU has no OS, and why this can't wait for demand

Sanctions worked for China because they created a forced shortage that local industry could
fill, with state coordination and a billion-user market. The EU has none of that: US software
is not just available but free and excellent, so the demand never arises; manufacturing died
with Nokia/Ericsson; capital and procurement are fragmented into 27 regimes; and the EU's
instinct is to regulate the foreign platform (DMA, GDPR) rather than build its own — regulation
has never once produced a European product. The security umbrella removes the last shred of
urgency: Europe only thinks about being cut off when Washington hints at it.

The strategic consequence: **you cannot wait for the demand to arise — the concept has to
create its own small, artificial shortage.** That's what the wedge market is: a small market
where our layer is the default and the alternatives are demonstrably worse. And the EU's
regulatory reflex is the ally to exploit: DMA sideloading and default-choice screens are real
cracks in the Google ecosystem, and "digital sovereignty you can hold" is fundable from EU
sovereignty budgets.

## Go-to-market

Enter through a small market's must-have apps first — in Finland that's concentrated and
institutionally motivated: bank apps (OP/Nordea), Kanta health, Suomi.fi government services,
Posti/Matkahuolto shipping, payments, then messaging (WhatsApp is the genuinely hard one).
That same list is the sender-conversion list for the notification protocol in both variants
below. Then partner with a real OEM — **big enough to ship volume, small enough to need a story**.
HMD/Nokia is the natural cultural fit; Vivo/Honor have the hardware but are structurally
committed to their own skins. Skip Sailfish/Jolla-style software-only plays (a decade proves
they don't move the market) and skip pure Android overlays ("if it's optional, why bother" —
opt-in attention management has a ceiling of enthusiasts; it has to be OEM-default).

On the Google question it's binary: shipping the Play Store requires full GMS certification,
and you can't have "Play Store but our notification channel" on the same device. So: **Variant
B first** — a Google-certified device where our layer is the default home/notification surface
and a structured sender protocol enters from the side (verified senders get richer rendering
and quota priority; everything else gets AI-parsed fallback); **Variant A as a second product
line** in Finland/Nordics — a de-Googled device plus a curated app wedge, where the
institutional apps run as PWAs or "email plus a secure action link". The de-Googled version
without the wedge is just a worse phone; with the wedge, it's the sovereign version.

The honest risk in the OEM route: the OEM owns the customer, not you. If the device sells
poorly you're dropped in one cycle; if it sells well, the OEM (or Google, via licensing
pressure) captures the value. The mitigation is structural: make the protocol and the
association the asset, the OEM merely the first licensee — so switching OEMs doesn't restart
from zero.

## Risks

| Risk                                   | Mitigation                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| OEM dependence / capture               | Protocol-first licensing; multiple OEM candidates from day one                                       |
| App chicken-and-egg                    | Finland wedge list: convert banks, Kanta, Posti first — a handful of entities covers daily necessity |
| Google licensing pressure on Variant B | Ship Variant A in the EU where DMA cracks exist; keep protocol open                                  |
| Version/compat tail                    | Web-like atomic distribution; OS-owned capability interface with shims                               |
| AI abuse (hogging, battery drain)      | Fair-share limits + thermal/battery guards in the broker; per-app kill switch; audit log             |
| Privacy backlash                       | On-device by default, no training on user data, verifiable PCC for opt-in escalation                 |

## Where this goes next

This is a concept, not a roadmap — but the pieces are all real in 2026: OS-owned notification
channels with quotas, Hermes-bytecode app distribution, Skia-rendered RN on a custom platform,
and fairly shared on-device AI on 40–70+ TOPS NPUs. The failure modes of the past (Windows Phone, Sailfish)
were ecosystem and timing, not vision. The next concrete step would be the same one as always:
a very short list of wedge entities whose senders we convert first, and one mid-tier OEM who
ships it as default.

If you've read this far and work on (or near) any of these layers — attention protocols, RN
out-of-tree platforms, on-device inference scheduling — I'd genuinely like to hear your take.
