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
description: A concept for a phone OS that owns the attention layer instead of the apps — notifications-first home screen, store-published native apps with web-like always-latest updates and open sideloading, and an OS-owned, fairly shared AI layer. Why past attempts failed, and how to enter through a small market instead.
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

**TL;DR:** this post is a concept for a phone OS where the **OS owns the attention layer**, apps are **published in the store like today but always update like web apps** (sideloading stays open), and **AI is an OS service, shared fairly, private by default**. All of it runs through one **capability broker** — a single OS service every app must go through, which grants permissions and enforces per-app fair shares and verified trust tiers.

## The core idea: the OS owns notifications

Today every app owns its own channel into your attention: badges, banners, push, vibration. The OS just transports them. The result is a thousand little slot machines.

The concept flips it: the OS owns the notification channel, and apps _request_ attention through a structured protocol. The home screen is notifications-first, with four screens:

- **Now** — the AI-prioritized surface: a "what matters now" summary with suggested actions, items sorted by deadline, and a "filed for you" section showing the quota layer in action (a sender that exceeded its quota is blocked, items with no deadline are archived, expired alerts are quietly removed).
- **Inbox** — the full mailbox: verified-sender badges, a security-critical lane (a bank login alert that cannot be deferred), due dates on every item, decaying urgency ratings.
- **Schedule** — notifications placed on your timeline by deadline, with live items (a delivery window) updating their own slots and quiet days shown as quiet.
- **Media** — the OS-level now-playing screen: transport controls, artwork, and the app's own branding (icon, accent color), for any app — native or web — that registers a media session through the SDK.

<figure>
  <svg
    viewBox="0 0 1280 640"
    role="img"
    aria-label="Mockup of the home-screen screens: Now, Inbox, Schedule, Media"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>text { font-family: system-ui, sans-serif; }</style>
    <!-- Phone 1: Now -->
    <g>
      <rect x="20" y="20" width="280" height="600" rx="36" fill="#fdfbf6" stroke="#d9d2c0" />
      <rect x="120" y="32" width="80" height="12" rx="6" fill="#e5dfd0" />
      <text x="160" y="76" text-anchor="middle" font-size="17" font-weight="600" fill="#2b2925">Now</text>
      <rect x="44" y="92" width="232" height="28" rx="14" fill="#efe9da" />
      <rect x="48" y="95" width="54" height="20" rx="10" fill="#2f6f4f" />
      <text x="75" y="109" text-anchor="middle" font-size="10" fill="#ffffff">Now</text>
      <text x="133" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Inbox</text>
      <text x="191" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Schedule</text>
      <text x="249" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Media</text>
      <rect x="44" y="136" width="232" height="84" rx="12" fill="#ffffff" stroke="#e2dcc9" />
      <text x="56" y="160" font-size="11" font-weight="600" fill="#2b2925">What matters now</text>
      <text x="56" y="178" font-size="9" fill="#6b675e">2 actions suggested</text>
      <rect x="56" y="190" width="96" height="20" rx="10" fill="#2f6f4f" />
      <text x="104" y="203" text-anchor="middle" font-size="9" fill="#ffffff">Pay invoice</text>
      <rect x="160" y="190" width="88" height="20" rx="10" fill="#e8e2d2" />
      <text x="204" y="203" text-anchor="middle" font-size="9" fill="#2b2925">Track Posti</text>
      <text x="44" y="244" font-size="10" font-weight="600" fill="#2b2925">By deadline</text>
      <rect x="44" y="256" width="232" height="44" rx="10" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="274" font-size="10" fill="#2b2925">Helen invoice</text>
      <text x="54" y="290" font-size="9" fill="#8a857a">due Fri 17:00 · payable</text>
      <rect x="44" y="312" width="232" height="44" rx="10" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="330" font-size="10" fill="#2b2925">Posti delivery</text>
      <text x="54" y="346" font-size="9" fill="#8a857a">live window 14:00–16:00</text>
      <rect x="44" y="368" width="232" height="44" rx="10" fill="#ffffff" stroke="#e2dcc9" />
      <text x="54" y="386" font-size="10" fill="#2b2925">Mimmi</text>
      <text x="54" y="402" font-size="9" fill="#8a857a">2 messages · today</text>
      <text x="44" y="436" font-size="10" font-weight="600" fill="#8a857a">Filed for you</text>
      <text x="54" y="456" font-size="9" fill="#8a857a">Zalando — blocked (over quota)</text>
      <text x="54" y="476" font-size="9" fill="#8a857a">Vero — filed to next week</text>
      <text x="54" y="496" font-size="9" fill="#8a857a">Expired alert — removed</text>
      <rect x="120" y="604" width="80" height="6" rx="3" fill="#e5dfd0" />
    </g>
    <!-- Phone 2: Inbox --> <g> <rect x="340" y="20" width="280" height="600" rx="36" fill="#fdfbf6" stroke="#d9d2c0" /> <rect x="440" y="32" width="80" height="12" rx="6" fill="#e5dfd0" /> <text x="480" y="76" text-anchor="middle" font-size="17" font-weight="600" fill="#2b2925">Inbox</text> <rect x="364" y="92" width="232" height="28" rx="14" fill="#efe9da" /> <text x="395" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Now</text> <rect x="426" y="95" width="54" height="20" rx="10" fill="#2f6f4f" /> <text x="453" y="109" text-anchor="middle" font-size="10" fill="#ffffff">Inbox</text> <text x="511" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Schedule</text> <text x="569" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Media</text> <rect x="364" y="136" width="232" height="56" rx="12" fill="#fbeae8" stroke="#e5b8b3" /> <text x="376" y="158" font-size="10" font-weight="600" fill="#8f1d14">OP Bank ✓ verified — new login</text> <text x="376" y="176" font-size="9" fill="#8f1d14">Security-critical — cannot be deferred</text> <rect x="364" y="208" width="232" height="48" rx="10" fill="#ffffff" stroke="#e2dcc9" /> <text x="374" y="228" font-size="10" fill="#2b2925">Kanta ✓ — appointment reminder</text> <text x="374" y="244" font-size="9" fill="#8a857a">due tomorrow · urgency high</text> <rect x="364" y="268" width="232" height="48" rx="10" fill="#ffffff" stroke="#e2dcc9" /> <text x="374" y="288" font-size="10" fill="#2b2925">Nordea ✓ — card notice</text> <text x="374" y="304" font-size="9" fill="#8a857a">due in 4 days · urgency decaying</text> <rect x="364" y="328" width="232" height="48" rx="10" fill="#ffffff" stroke="#e2dcc9" /> <text x="374" y="348" font-size="10" fill="#2b2925">Suomi.fi — tax decision ready</text> <text x="374" y="364" font-size="9" fill="#8a857a">due Fri · government sender</text> <text x="364" y="408" font-size="9" fill="#8a857a">Every item shows its due date and a decaying</text> <text x="364" y="426" font-size="9" fill="#8a857a">urgency rating; verified senders get a badge.</text> <rect x="440" y="604" width="80" height="6" rx="3" fill="#e5dfd0" /> </g> <!-- Phone 3: Schedule --> <g> <rect x="660" y="20" width="280" height="600" rx="36" fill="#fdfbf6" stroke="#d9d2c0" /> <rect x="760" y="32" width="80" height="12" rx="6" fill="#e5dfd0" /> <text x="800" y="76" text-anchor="middle" font-size="17" font-weight="600" fill="#2b2925">Schedule</text> <rect x="684" y="92" width="232" height="28" rx="14" fill="#efe9da" /> <text x="715" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Now</text> <text x="773" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Inbox</text> <rect x="804" y="95" width="54" height="20" rx="10" fill="#2f6f4f" /> <text x="831" y="109" text-anchor="middle" font-size="10" fill="#ffffff">Schedule</text> <text x="889" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Media</text> <text x="684" y="140" font-size="10" font-weight="600" fill="#2b2925">Today</text> <rect x="684" y="152" width="232" height="48" rx="10" fill="#e8f0ea" stroke="#bcd6c6" /> <text x="694" y="172" font-size="10" fill="#2b2925">14:00–16:00 Posti delivery (live)</text> <text x="694" y="188" font-size="9" fill="#2f6f4f">slot updates itself</text> <rect x="684" y="212" width="232" height="48" rx="10" fill="#ffffff" stroke="#e2dcc9" /> <text x="694" y="232" font-size="10" fill="#2b2925">17:00 Helen invoice due</text> <text x="694" y="248" font-size="9" fill="#8a857a">reminder placed by deadline</text> <text x="684" y="288" font-size="10" font-weight="600" fill="#2b2925">Saturday</text> <rect x="684" y="300" width="232" height="40" rx="10" fill="#f1ede1" stroke="#e2dcc9" /> <text x="694" y="324" font-size="9" fill="#8a857a">Quiet day — nothing scheduled</text> <text x="684" y="368" font-size="9" fill="#8a857a">Notifications are placed on your timeline by</text> <text x="684" y="386" font-size="9" fill="#8a857a">deadline; quiet days are shown as quiet.</text> <rect x="760" y="604" width="80" height="6" rx="3" fill="#e5dfd0" /> </g> <!-- Phone 4: Media --> <g> <rect x="980" y="20" width="280" height="600" rx="36" fill="#fdfbf6" stroke="#d9d2c0" /> <rect x="1080" y="32" width="80" height="12" rx="6" fill="#e5dfd0" /> <text x="1120" y="76" text-anchor="middle" font-size="17" font-weight="600" fill="#2b2925">Media</text> <rect x="1004" y="92" width="232" height="28" rx="14" fill="#efe9da" /> <text x="1035" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Now</text> <text x="1093" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Inbox</text> <text x="1151" y="109" text-anchor="middle" font-size="10" fill="#6b675e">Schedule</text> <rect x="1182" y="95" width="54" height="20" rx="10" fill="#2f6f4f" /> <text x="1209" y="109" text-anchor="middle" font-size="10" fill="#ffffff">Media</text> <rect x="1004" y="136" width="232" height="200" rx="16" fill="#e8e2d2" /> <text x="1120" y="248" text-anchor="middle" font-size="64" fill="#b0a88f">&#9834;</text> <rect x="1004" y="352" width="126" height="22" rx="11" fill="#e8f0ea" /> <text x="1067" y="367" text-anchor="middle" font-size="9" fill="#2f6f4f">via Spotify &#10003; verified</text> <text x="1004" y="402" font-size="12" font-weight="600" fill="#2b2925">Song title</text> <text x="1004" y="420" font-size="10" fill="#6b675e">Artist — Album</text> <rect x="1004" y="440" width="232" height="5" rx="2.5" fill="#e5dfd0" /> <rect x="1004" y="440" width="120" height="5" rx="2.5" fill="#2f6f4f" /> <text x="1004" y="458" font-size="9" fill="#8a857a">1:12</text> <text x="1236" y="458" text-anchor="end" font-size="9" fill="#8a857a">3:45</text> <circle cx="1080" cy="500" r="18" fill="#ffffff" stroke="#e2dcc9" /> <text x="1080" y="505" text-anchor="middle" font-size="13" fill="#2b2925">&#9198;</text> <circle cx="1120" cy="500" r="20" fill="#2f6f4f" /> <text x="1120" y="506" text-anchor="middle" font-size="14" fill="#ffffff">&#9654;</text> <circle cx="1160" cy="500" r="18" fill="#ffffff" stroke="#e2dcc9" /> <text x="1160" y="505" text-anchor="middle" font-size="13" fill="#2b2925">&#9197;</text> <text x="1004" y="556" font-size="9" fill="#8a857a">OS controls any registered media session,</text> <text x="1004" y="572" font-size="9" fill="#8a857a">also from lock screen and notification lane</text> <rect x="1080" y="604" width="80" height="6" rx="3" fill="#e5dfd0" /> </g> </svg> <figcaption class="text-center"> The four home-screen screens — Now, Inbox, Schedule, Media — as a static mockup, with the quota mechanics, example senders (the OP Bank security lane, a live Posti delivery window, an over-quota Zalando card), and a media session (Spotify) wired in. </figcaption> </figure>

The mechanics that make it work are quotas, not vibes: each sender gets a budget, verified senders (banks, government, health services) get a higher tier and a badge, security-critical items are never deferrable, and everything else decays. The design principle is **calm by default** — information density is not the goal; calm control is. Windows Phone proved that notification-first can be right and still feel wrong; the missing piece was the quota layer.

Media gets the same treatment, because a portable device is personal and music usually is. The fourth screen is a **now-playing surface owned by the OS**: any app — native or web — that registers a [W3C Media Session](https://www.w3.org/TR/mediasession/) through the SDK gets transport controls, artwork, and its branding rendered in the media tab and lock screen, while the app keeps its own UI; media focus and background playback go through the same capability broker. The web tier implements Media Session too, and that is also the YouTube story: Google is unlikely to ever ship a native app for a rival OS — no Google Maps and no official YouTube app is a large part of how Windows Phone died — so instead we make the _web_ experience first-class: YouTube in our web tier gets OS media controls, background-playback policy, and picture-in-picture, with the DMA's web distribution making that a legitimate channel.

## Why the EU has no OS, and why this can't wait for demand

Sanctions worked for China because they created a forced shortage that local industry could fill, with state coordination and a billion-user market. The EU has none of that: US software is not just available but free and excellent, so the demand never arises; manufacturing died with Nokia/Ericsson; capital and procurement are fragmented into 27 regimes; and the EU's instinct is to regulate the foreign platform (DMA, GDPR) rather than build its own — regulation has never once produced a European product. The security umbrella removes the last shred of urgency: Europe only thinks about being cut off when Washington hints at it.

The strategic consequence: **you cannot wait for the demand to arise — the concept has to create its own small, artificial shortage.** That's what the wedge market is: a small market where our layer is the default and the alternatives are demonstrably worse. And the EU's regulatory reflex is the ally to exploit: DMA sideloading and default-choice screens are real cracks in the Google ecosystem, and "digital sovereignty you can hold" is fundable from EU sovereignty budgets.

## Go-to-market

Enter through a small market's must-have apps first — in Finland that's concentrated and institutionally motivated: bank apps (OP/Nordea), Kanta health, Suomi.fi government services, Posti/Matkahuolto shipping, payments, then messaging (WhatsApp is the genuinely hard one). That same list is the sender-conversion list for the notification protocol in both variants below. Then partner with a real OEM — **big enough to ship volume, small enough to need a story**. HMD/Nokia is the natural cultural fit; Vivo/Honor have the hardware but are structurally committed to their own skins. Skip Sailfish/Jolla-style software-only plays (a decade proves they don't move the market) and skip pure Android overlays ("if it's optional, why bother" — opt-in attention management has a ceiling of enthusiasts; it has to be OEM-default).

On the Google question it's binary: shipping the Play Store requires full GMS certification, and you can't have "Play Store but our notification channel" on the same device. So there are exactly two variants:

- **Variant A — de-Googled device + curated app wedge.** No GMS, so parts of the Play Store break (anything needing FCM push, the Maps SDK, or Google in-app payments); viability comes from the wedge — Finland's institutional apps run as PWAs or "email plus a secure action link". Without the wedge it's just a worse phone; with the wedge, it's the sovereign version.
- **Variant B — Google-certified device, our layer as the default surface.** The Play Store stays intact and apps work; our notification layer is the OEM-default home surface, and a structured sender protocol enters from the side — verified senders get richer rendering and quota priority, everything else gets an AI-parsed fallback.

Recommendation: **Variant B first** on a mid-tier OEM, **Variant A as a second product line** in Finland/Nordics once the wedge apps are ported. On gaming, no decision is needed now: mobile gaming is big, but we won't build games in React Native — a real game wants a real engine, and if demand appears it can be served later (e.g. through the Wasm tier). Since Variant B ships Google-certified, the Play Store's gaming catalog is present from day one, so deferring costs nothing.

The honest risk in the OEM route: the OEM owns the customer, not you. If the device sells poorly you're dropped in one cycle; if it sells well, the OEM (or Google, via licensing pressure) captures the value. The mitigation is structural: make the protocol and the association the asset, the OEM merely the first licensee — so switching OEMs doesn't restart from zero.

## Why we could win

Three moats, none of which require being bigger than Apple or Google. **OEM-default exclusivity**: attention features only matter as the default surface, and a mid-tier OEM needs a story — we are that story, contractually the first licensee. **The protocol and the verified-sender network**: once banks, Kanta, and Posti adopt the structured sender protocol, switching costs rise for every later app and every later OEM — the network is the asset, not the hardware. **Regulation**: the DMA already forces sideloading, alternative stores, and web distribution in the EU, so the "store optional" model rides the law instead of fighting it, and EU sovereignty budgets can fund the wedge. The honest gap: Apple or Google could copy the notification layer — but shipping it as an OEM-default surface conflicts with their own store economics, which is exactly the space we occupy.

## Apps: native bytecode packages over `calm://`, updated like the web

The web's update model is the part mobile got wrong: deploys are atomic (all-or-nothing, no half-updated states), and every user is on the latest version after a refresh. App stores give you review, discovery, and trust badges — but also review delays, 15–30% fees, and a client base fragmented across many installed versions, which makes backward compatibility and API versioning a permanent chore.

So the store keeps what users actually expect — **an app is a packaged build you find by name in the store and install with one tap** — while delivery borrows the web's one good idea: apps are also addressable by a **custom scheme, not an HTTP URL** (think `calm://apps/<id>`). The package is a signed bundle of **Hermes bytecode + manifest + assets**, executed by our own runtime with tight OS integration — capabilities through the broker, Skia/Graphite rendering — **truly native, never a webview app**. The store hosts the catalog and serves packages over that scheme; every launch does stale-while-revalidate — serve the installed copy, fetch the new one in the background — and atomically swaps in the latest version, so users converge within hours. "Installing" pins the app and grants its declared capabilities. The version-fragmentation problem mostly goes away by design; what remains is the OS↔app capability interface, which the OS keeps versioned and shims (N−1, N−2). Direct-`calm://` links and sideloading stay possible (the DMA forces that anyway) — that's the open part — but the store is the primary catalog, because that's where users look for a new app.

This is feasible today, and there are existing projects that prove each piece — we just shouldn't copy them wholesale:

- **Why not QuickApps/MiniApps**: install-free and always-latest, yes — but they're web-tech hybrids (JS logic + webview UI) with per-vendor dialects, standardized by a W3C working group that closed in 2026, and in Europe only Huawei devices ship the framework. Adopting it would tie a European-sovereignty OS to a Chinese-OEM-controlled format with PWA's richness ceiling. We borrow the packaging/lifecycle _concept_, not the runtime. (For the record, the W3C MiniApps work lives under the [MiniApp white paper](https://www.w3.org/TR/mini-app-white-paper/) and the [OW2 Quick App Initiative](https://quick-app-initiative.ow2.io/page/context/).)
- **Why not just PWA**: since we're building our own OS, platform quirks like iOS's missing Web Bluetooth/NFC aren't the point — the point is depth of integration. HTML in a webview can't do tight hardware and system integration (Bluetooth, NFC, background execution, OS-level notification rendering) without a growing pile of permission prompts. PWA stays as the fallback/web tier, not the main one.
- **What to build on**: **React Native as an out-of-tree platform** on a Linux-based OS — developers already know JS/React, and asking them to learn Rust, QML, or Dart would kill adoption.
  - RN's New Architecture (Fabric + JSI + TurboModules, default since 0.76) was explicitly designed to make [out-of-tree platforms](https://reactnative.dev/docs/out-of-tree-platforms) maintainable — react-native-windows, -macos, -web and [react-native-skia](https://github.com/Shopify/react-native-skia) (Linux/macOS) prove the seams.
  - Apps ship **Hermes bytecode bundles** served over the `calm://` scheme from the store (or a developer's own host for sideloads) — what's web-like is the update path: stale-while-revalidate, atomic swap. Rendering goes through **Skia/Graphite** (react-native-skia, now on the WebGPU-based Graphite backend), so there's one GPU path instead of per-widget native views — and no webview anywhere.
  - OS capabilities (camera, NFC, push, background) are exposed once as TurboModules through the capability broker; **Wasm/WASI ([WASI-NN](https://github.com/WebAssembly/wasi-nn))** covers sandboxed logic.
  - The EU's [DMA](https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en) — alternative marketplaces, sideloading, and web distribution on iOS in the EU — is the regulatory tailwind that makes "store optional" legally established in our target market.

## App quality in an open store: a badge, not a gate

Gates leak, so we design for openness. The DMA already forces sideloading, alternative marketplaces, and web distribution in the EU — and Apple's own notarization-only alternative stores let prohibited apps through (the "Hot Tub" case), while Apple rejected 22,000 submissions in 2025 for hidden or undocumented features that only appear after approval. Open distribution is the regulatory and technical future; the design question is how to make harm hard and visible, not how to pretend exclusion works.

**Badge, not a gate.** A gate excludes: only reviewed apps can install, and a lapsed fee removes them (Apple's model). Our store is the primary catalog — apps are packaged and published there, found by name, installed with one tap — while direct-`calm://` links and sideloading stay open for anyone. Review adds a badge on top of that; the one rule that keeps it a badge rather than a gate: **unverified apps stay fully visible and installable — labeled "unverified", never hidden or demoted to invisibility.** The only hard block is a failed malware scan, which is appealable.

**1. A universal security floor, free for every app.** Every package is signed and passes an automated notarization-style scan (malware signatures, private APIs, entitlements, declared-capability vs. actual-behavior) — and because apps are bytecode bundles, the OS auto-diffs and re-scans **every update**, catching bait-and-switch mechanically. On top of that, the sandbox and capability broker mean a malicious app can't do much even if it slips through: dangerous capabilities (SMS, contacts, accessibility services, device admin, installing other apps) are off by default and granted per app, and notifications, AI, and background execution all pass through the capability broker.

**2. Trust is earned through the badge — and auditable by anyone.** The verified-publisher badge requires published source and a reproducible build (the [F-Droid](https://f-droid.org/docs/Reproducible_Builds/) model): the shipped Hermes bytecode must rebuild bit-for-bit from source, so the community can audit any app without trusting the reviewer. AI agents review 100% of submissions — practical here because apps are inspectable bytecode with a declared capability manifest: static checks, update diffs, and sandboxed dynamic runs where an agent clicks through the app while its network calls are watched. A small maintainer group then reviews a risk-stratified sample — new publishers, flagged apps, high-download apps, sensitive categories (finance, health, kids), and every appeal — plus random audits; volunteers handle triage and build verification, a paid core makes final calls. Review logs and rejection reasons are public, so the community can audit the reviewers too. Identity comes from eIDAS 2.0 / national eID (free, government-issued EUDI wallets) rather than a paid D-U-N-S-style check — stronger accountability at zero cost. Volume is on our side: our wedge-market submission count is orders of magnitude below Apple's 9.1M a year.

**3. Vulnerable users get a per-account gate, not a global one.** Safeguarded and child accounts default to **verified-only installs**, with age-appropriate content ratings enforced plus screen time and capability restrictions. Age assurance uses the EUDI wallet's attribute attestations — selective disclosure can prove someone is over 13/18 without revealing identity or birthdate, which is exactly what eIDAS 2.0 was built for. Kids-category and user-generated-content moderation rules (Apple's guidelines 1.1/1.2 are a good reference bar) are enforced in badge review.

**Fees.** Publishing, signing, the automated scan, and listing are free. The **annual fee (per developer account, not per app)** exists only for the **verified-publisher badge** — it pays the maintainers and the AI review infrastructure; it buys a service, not the right to exist on the platform. **Payments are unified through the store, not fragmented per developer**: one checkout for paid apps and in-app purchases — a single, familiar UX — with the payment directed straight to the seller's account. The store takes **0% commission**; it only passes through payment-processing and VAT costs (a few percent, PSP-level, never 15–30%). Paid apps work with or without the badge — the badge adds faster review, discovery priority, and higher capability quotas, not payment ability. Two tiers: free/community-reviewed (no badge) and paid/verified.

**The honest tradeoff.** An open store will contain more scams and low-effort apps than Apple's — that is the price of no gate. The harm is kept low not by prevention but by the floor, labels, ranking, safeguarded accounts, and fast takedown (kill switch, public takedown log, one-tap reporting). Shipping openness without those safeguards would be irresponsible; shipping them is the design.

## AI: an OS service, shared fairly, private by default

AI is becoming a necessity, and if it's shared by all apps, the OS must be the one enforcing safety, privacy, and efficiency — otherwise one app can hog the NPU, overheat or drain the battery, or keep running AI in standby all night.

The precedent exists: Android's [**AICore**](https://developer.android.com/ai/gemini-nano) system service manages the shared on-device model (Gemini Nano) with per-app quotas, foreground-only inference by default, and battery-linked daily caps; Apple exposes its on-device model via the Foundation Models framework with Private Cloud Compute as an auditable cloud tier. Hardware is ready — 2026 flagship NPUs deliver 40–70+ TOPS, 3B models run at 40–50 tok/s on-device via [**ExecuTorch**](https://pytorch.org/executorch/) (GA since late 2025, 12+ backends) or MLX.

Our version would be a **System AI Service** that owns the model set (open-weight, INT4-quantized, distributed over the OS's signed update channel — verifiable, and no vendor black box), and brokers access through the same capability broker as notifications:

- **fair-share scheduling, not rationing**: the OS scheduler owns NPU dispatch and batches across apps, so each app gets a fair slice of the shared model and no single app can hog it — your own AI usage is never capped. On top of that: thermal and battery guards that throttle inference when the device is hot or the battery is low, no background/standby inference unless the user opts in, and a per-app "AI usage" dashboard showing where the capacity went;
- **priority lanes**: system/security (scam-call detection, OTP parsing) > user-initiated foreground > background (off unless opted in), with busy errors and a graceful fallback to a smaller model;
- **two API tiers**: mediated task APIs (summarize, classify, extract — output passes a safety filter, no raw model access) and a rate-limited raw prompt API for verified publishers;
- **privacy by construction**: inference runs isolated with no network access, no training on user data, an audit log of which app used AI when (not the content); cloud escalation only per-task with explicit consent, through a verifiable private-compute tier (attestation, published images — the PCC model), default off.

One broker, three resources — attention, apps, intelligence — each with per-app limits, verified trust tiers, and calm-by-default behavior; and the same consent-and-limits philosophy for your profile (next section).

## Personalization that stays personal

Spotify-style recommendations are where on-device AI and an open profile standard combine. Today services profile you in their data centers and the profile is theirs; here the profile is yours. The OS ships a **portable private profile**: an open, user-controlled store — a [Solid](https://solidproject.org/) pod or EUDI-wallet-style verifiable attributes — that lives wherever _you_ choose (self-hosted, or a provider you pick, like a password manager), encrypted, exportable, and movable between providers. Services can ask consented questions and read only the attributes you permit, per app and per purpose; they cannot build a shadow profile, because the profile never leaves your control and every read is logged and revocable. Personalization itself then runs on-device: the System AI Service computes recommendations against your local profile, so "personalized" means personal — not a model of you sitting in someone else's data center. Spotify can ask "what mood are you in?" with your consent; it cannot quietly infer and store it.

## Risks

| Risk                                   | Mitigation                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| OEM dependence / capture               | Protocol-first licensing; multiple OEM candidates from day one                                                            |
| App chicken-and-egg                    | Finland wedge list: convert banks, Kanta, Posti first — a handful of entities covers daily necessity                      |
| Google licensing pressure on Variant B | Ship Variant A in the EU where DMA cracks exist; keep protocol open                                                       |
| Version/compat tail                    | Web-like atomic distribution; OS-owned capability interface with shims                                                    |
| AI abuse (hogging, battery drain)      | Fair-share limits + thermal/battery guards in the broker; per-app kill switch; audit log                                  |
| Privacy backlash                       | On-device by default, no training on user data, verifiable PCC for opt-in escalation                                      |
| Execution: RN out-of-tree port cost    | Biggest engineering item — budget a small dedicated core team; Skia-rendering route keeps scope to the core component set |

## Where this goes next

This is a concept, not a roadmap — but the pieces are all real in 2026: OS-owned notification channels with quotas, Hermes-bytecode app distribution over `calm://`, Skia-rendered RN on a custom platform, and fairly shared on-device AI on 40–70+ TOPS NPUs. The failure modes of the past (Windows Phone, Sailfish) were ecosystem and timing, not vision. The next concrete step would be the same one as always: a very short list of wedge entities whose senders we convert first, and one mid-tier OEM who ships it as default.

If you've read this far and work on (or near) any of these layers — attention protocols, RN out-of-tree platforms, on-device inference scheduling — I'd genuinely like to hear your take.
