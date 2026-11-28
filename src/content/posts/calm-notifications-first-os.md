---
author: Kha Nguyen
pubDatetime: 2026-11-20T00:00:00.000+07:00
title: "A calm, notifications-first phone OS: a concept"
slug: calm-notifications-first-os
featured: false
draft: false
ogImage: ../../assets/images/calm-notifications-first-os-og.png
tags:
  - mobile
  - os
  - concept
  - notifications
  - privacy
  - ai
description: "A concept for a notifications-first phone OS — OS-owned attention layer, web-like app updates, fairly shared AI, and a Finland wedge go-to-market."
---

Tuesday, 9:41. Your phone is already talking to you before you've touched it: a badge here, a banner there, a tile flipping over to show something you didn't ask for right now. Multiply that by a hundred apps and you get the modern phone. Noisy, and not by accident.

I worked at [Microsoft](https://www.microsoft.com) while [Windows Phone](https://en.wikipedia.org/wiki/Windows_Phone) was being pushed, and its Start screen still haunts me. The live tiles were notification-first, arguably ahead of their time: unread counts and previews sitting on the home screen itself, no app-opening required. Look at the photo below: the 8 on the messaging tile is an unread count, updating live on the home screen itself. That was the right idea.

But the bright tiles on a dark background kept me alert and stressed rather than calm. And design aside, the real killer was the app gap: there simply weren't the apps people needed. That's the lesson I keep coming back to: an OS doesn't win on vision. It wins on having the few apps that matter in the market you enter.

<figure>
  <img
    src="https://images.pexels.com/photos/4957/person-woman-hand-smartphone.jpg?auto=compress&cs=tinysrgb&w=1260"
    alt="A person holding a Nokia Windows Phone outdoors, its Start screen showing live tiles with a notification badge: 8 unread messages on the messaging tile"
    width="1260"
    height="840"
  />
  <figcaption class="text-center">
    Windows Phone's Start screen was notification-first: the 8 on the messaging tile is a live
    unread count, updating on the home screen itself. Photo:
    <a href="https://www.pexels.com/photo/apps-digital-hand-media-4957/">JÉ'SHOOTS via Pexels</a>
    (Pexels License).
  </figcaption>
</figure>

**TL;DR:** this post sketches a phone OS where the **OS owns the attention layer**. Apps request attention through a structured protocol instead of owning their own channels. Apps install from a store like today but always update like web apps, sideloading stays open, and AI runs as a shared OS service, private by default. One capability broker sits underneath all of it, granting permissions and enforcing per-app fair shares and verified trust tiers. It enters through Finland's must-have institutions with a mid-tier OEM shipping it as the default surface, because an OS wins on the few apps that matter, not on vision.

## The core idea: the OS owns notifications

Right now every app owns its own channel into your attention: badges, banners, push, vibration. The OS just transports them. The result is a thousand little slot machines, each pulling its own lever.

The concept flips that. The OS owns the notification channel, and apps _request_ attention through a structured protocol: a fixed format that says who sent the item, how urgent it is, and when it expires. The home screen _is_ the notifications, organized into four screens.

**Now** is the AI-prioritized surface. Picture a Tuesday morning. The top card reads: your electricity invoice (€84.20) is due Friday, two packages arrive today between 12 and 15, and Mimmi asked about badminton on Thursday. Underneath, items sort by deadline. The invoice from Helen Electricity carries a verified badge. The Posti delivery window is live and updates its own slot. Mimmi's question has no deadline, so it's marked optional. And at the bottom, a "filed for you" tray shows the system quietly working: Zalando blocked after twelve pushes in one day, a Vero tax reminder filed to 30 Nov, an expired HSL alert and a one-line Yle digest archived. Nothing there interrupts you.

**Inbox** is the full mailbox: verified-sender badges, a security-critical lane where a bank login alert from OP cannot be deferred, due dates on every item, and urgency ratings that decay as they age. **Schedule** places items on your timeline by deadline, with live items moving their own slots and quiet days shown as quiet. **Media** is an OS-owned now-playing screen: any app, native or web, that registers a [W3C Media Session](https://www.w3.org/TR/mediasession/) gets transport controls, artwork, and its branding on the media screen and the lock screen.

<figure>
  <img
    src="/images/calm-notifications-first-os-mockup.svg"
    alt="Mockup of the home-screen screens: Now, Inbox, Schedule, Media"
    width="1280"
    height="640"
  />
  <figcaption class="text-center"> The four home screens side by side: Now, Inbox, Schedule, and Media, with the quota mechanics wired in (the OP Bank security lane, a live Posti delivery window, an over-quota Zalando card) and a Spotify media session. </figcaption>
</figure>

Media gets a second mention because of what it buys us elsewhere. Google is unlikely to ever ship native Maps or YouTube for a rival OS, and that absence is a large part of how Windows Phone died. So instead of waiting for native apps, the concept makes the _web_ tier first-class: YouTube in the browser gets OS media controls, background playback, and picture-in-picture, and the EU's DMA already makes web distribution a legitimate channel rather than a hack.

## Calm by default: quotas, not vibes

The mechanics underneath are quotas, not vibes. Each sender gets a budget. Verified senders (banks, government, health services) get a higher tier and a badge. Security-critical items are never deferrable. Everything else decays. Information density is not the goal; calm control is.

Windows Phone proved that notification-first can be right and still feel wrong. What was missing was not the idea of tiles. It was the quota layer underneath them.

## Why now, and how it would enter

Europe has no OS of its own, and the reason isn't engineering. Sanctions worked for China because they created a forced shortage that local industry could fill, backed by state coordination and a billion-user market. The EU has none of that. US software isn't just available; it's free and excellent, so the demand never arises. Manufacturing died with Nokia and Ericsson. Capital and procurement are fragmented across 27 regimes. And the EU's instinct is to regulate the foreign platform, the [DMA](https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en) and [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), rather than build its own. Regulation has never once produced a European product. The security umbrella removes the last shred of urgency: Europe only thinks about being cut off when Washington hints at it.

So this concept can't wait for demand to arise. It has to create its own small, artificial shortage. That's the wedge market: a small market where our layer is the default and the alternatives are demonstrably worse.

Finland is the natural wedge. Its must-have apps are concentrated and institutionally motivated: the bank apps (OP, Nordea), Kanta for health, Suomi.fi for government services, Posti and Matkahuolto for shipping, payments, navigation (HERE, TomTom, or OSM-based apps such as OsmAnd and Organic Maps), and then messaging, where WhatsApp is the genuinely hard one. That same list is the sender-conversion list for the notification protocol.

Maps are a launch title, not an afterthought: a console launch lives or dies on its launch titles, and this wedge list is ours. Turn-by-turn guidance comes from those navigation options, because browser Google Maps can search but can't guide, and its SDK is gone in Variant A anyway. The other half of Google Maps, the fresh business index, stays reachable in the browser tier, and the OS can broker the handoff: search there, navigate in a native app. On Variant B, Google Maps ships natively, so maps ride Variant B like gaming. This post does not fully explore maps yet; treat this as a sketch, not a strategy.

Then partner with a real OEM, big enough to ship volume and small enough to need a story. [HMD](https://www.hmd.com)/Nokia is the natural cultural fit; Vivo and Honor have the hardware but are structurally committed to their own skins. Skip Sailfish-style software-only plays (a decade proves they don't move the market) and skip pure Android overlays: if attention management is optional, why bother? It has to be OEM-default.

The Google question is binary. Shipping the Play Store requires full GMS certification, and you can't have "Play Store but our notification channel" on the same device. So there are two variants. **Variant A** is a de-Googled device plus a curated app wedge: without GMS, parts of the Play Store break (anything needing Google's FCM push, the Maps SDK, or Google payments), and viability comes from the wedge apps running as PWAs or as "email plus a secure action link." Without the wedge it's just a worse phone; with it, it's the sovereign version. **Variant B** is a Google-certified device with our layer as the OEM-default home surface, where verified senders get richer rendering and quota priority while everything else gets an AI-parsed fallback. The recommendation: Variant B first on a mid-tier OEM, Variant A as a second product line in Finland and the Nordics once the wedge apps are ported. On gaming no decision is needed now: a real game wants a real engine, not React Native, and since Variant B ships certified, the Play Store's gaming catalog is present from day one. Car integration (CarPlay/Android Auto style) is likewise deferred for launch: Bluetooth media controls already work in most cars via the OS media session, and navigation can run phone-mounted.

Why could this win? Three moats, none of which require being bigger than Apple or Google. **OEM-default exclusivity**: attention features only matter as the default surface, and a mid-tier OEM needs a story. We are that story, contractually the first licensee. **The protocol and the verified-sender network**: once banks, Kanta, and Posti adopt the structured sender protocol, switching costs rise for every later app and every later OEM. The network is the asset, not the hardware. **Regulation**: the DMA already forces sideloading, alternative stores, and web distribution, so a "store optional" model rides the law instead of fighting it, and EU sovereignty budgets can fund the wedge. The honest gap: Apple or Google could copy the notification layer, but shipping it as an OEM-default surface conflicts with their own store economics. That conflict is exactly the space we occupy. The other honest risk is the OEM itself: it owns the customer. Sell poorly and you're dropped in one cycle; sell well and the OEM, or Google through licensing pressure, captures the value.

## Apps that update like the web

The web's update model is the part mobile got wrong. A deploy is atomic, and every user is on the latest version after a refresh. App stores give you review, discovery, and trust badges, but also review delays, 15–30% fees, and a user base fragmented across many installed versions, which makes backward compatibility a permanent chore.

So the store keeps what users actually expect (you find an app by name and install it with one tap) while delivery borrows the web's one good idea. Apps are also addressable by a custom scheme, `calm://apps/<id>`. The package is a signed bundle of [Hermes](https://github.com/facebook/hermes) bytecode, a manifest declaring what the app wants to do, and its assets. Every launch serves the installed copy and fetches the new one in the background, then swaps atomically. Users converge on the latest version within hours, and version fragmentation mostly goes away by design. What remains is the OS-to-app capability interface, which the OS keeps versioned and shims, supporting the previous two interface versions. Installing pins the app and grants its declared capabilities. Sideloading stays open (the DMA forces that anyway), but the store remains the primary catalog because that's where users look for a new app.

The runtime choice is deliberate. We'd build on [React Native as an out-of-tree platform](https://reactnative.dev/docs/out-of-tree-platforms) on a Linux-based OS, rendered through Skia: truly native, never a webview. Developers already know JS and React, and asking them to learn Rust, QML, or Dart would kill adoption. RN's New Architecture was explicitly designed to make out-of-tree platforms maintainable, and react-native-skia on Linux proves the seams. OS capabilities (camera, NFC, push, background execution) are exposed once as TurboModules through the capability broker, and Wasm/WASI covers sandboxed logic. We considered QuickApps-style mini-apps and rejected them: per-vendor dialects tied to a Chinese OEM, with a webview richness ceiling. PWAs stay as the fallback web tier, not the main one, because HTML in a webview can't do tight hardware integration without a growing pile of permission prompts.

## An open store: a badge, not a gate

Gates leak, so we design for openness. Unverified apps stay fully visible and installable, labeled "unverified", never hidden or demoted to invisibility. The only hard block is a failed malware scan, and that is appealable. On top of that, every package gets a universal security floor for free: it's signed and passes an automated notarization-style scan, and because apps are bytecode bundles the OS re-scans every update and diffs it against the previous version, which catches bait-and-switch mechanically. The sandbox and capability broker mean that even a malicious app which slips through can't do much: SMS, contacts, accessibility services, device admin, and installing other apps are off by default and granted per app.

The **verified-publisher badge** is how trust is earned, and it's auditable by anyone. It requires published source and a reproducible build (the [F-Droid](https://f-droid.org/docs/Reproducible_Builds/) model): the shipped bytecode must rebuild bit-for-bit from source, so the community can audit any app without trusting the reviewer. AI agents review 100% of submissions, practical here because apps are inspectable bytecode with a declared capability manifest: static checks, update diffs, and sandboxed runs where an agent clicks through the app while its network calls are watched. A small maintainer group then reviews a risk-stratified sample (new publishers, flagged apps, high-download apps, sensitive categories, every appeal) plus random audits. Review logs and rejection reasons are public, so the community can audit the reviewers too. Identity comes from [eIDAS 2.0](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1183), the EU digital ID wallet, free for citizens, rather than a paid D-U-N-S-style check. Safeguarded and child accounts default to verified-only installs, with age assurance via the wallet's attribute attestations, proving over-13 or over-18 without revealing identity or birthdate.

Publishing, signing, the automated scan, and listing are free. The annual fee, per developer account rather than per app, exists only for the verified-publisher badge; it pays for the maintainers and the AI review infrastructure. It buys a service, not the right to exist on the platform. Payments are unified through the store: one checkout for paid apps and in-app purchases, with the payment directed straight to the seller's account. The store takes **0% commission** and only passes through payment-processing and VAT costs. Paid apps work with or without the badge.

The honest tradeoff: an open store will contain more scams and low-effort apps than Apple's. That is the price of no gate. The harm is kept low not by prevention but by the floor, labels, ranking, safeguarded accounts, and fast takedown: a kill switch, a public takedown log, one-tap reporting.

## AI and your profile, as OS services

AI is becoming a necessity, and if it's shared by all apps, the OS must be the one enforcing safety, privacy, and efficiency. Otherwise one app can hog the NPU, overheat the phone, or keep running inference in standby all night.

The precedent exists. Android's [AICore](https://developer.android.com/ai/gemini-nano) system service manages a shared on-device model with per-app quotas, foreground-only inference by default, and battery-linked daily caps. Apple exposes its on-device model through the Foundation Models framework, with Private Cloud Compute as a verifiable cloud tier. We deliberately don't anchor on today's chip numbers: NPUs, model sizes, and efficiency techniques change quarter to quarter, and the bet is on more AI capability in the future, not on any specific chip or model.

Our version is a **System AI Service** that owns the model set (open-weight models distributed over the OS's signed update channel, verifiable, no vendor black box) and brokers access through the same capability broker as notifications. The scheduler owns NPU dispatch and batches across apps, so each app gets a fair slice of the shared model and no single app can hog it; your own AI usage is never capped. Thermal and battery guards throttle inference when the device is hot or the battery is low. Priority lanes run system and security first (scam-call detection, OTP parsing), then user-initiated foreground work, with background inference off unless you opt in. There are two API tiers: mediated task APIs (summarize, classify, extract) whose output passes a safety filter, and a rate-limited raw prompt API for verified publishers. And privacy is structural: inference runs isolated with no network access, no training on user data, an audit log of which app used AI and when, and cloud escalation only per task with explicit consent through a verifiable private-compute tier, default off.

One broker, three resources: attention, apps, intelligence. The same consent-and-limits philosophy covers your profile. Today services profile you in their data centers and the profile is theirs. Here the OS ships a **portable private profile**: an open, user-controlled store, a [Solid](https://solidproject.org/) pod or EUDI-wallet-style verifiable attributes, that lives wherever _you_ choose, encrypted, exportable, and movable between providers. Services can ask consented questions and read only the attributes you permit, per app and per purpose; every read is logged and revocable, so there is no shadow profile. Personalization runs on-device against your local profile. Spotify can ask "what mood are you in?" with your consent. It cannot quietly infer and store it.

## Risks

| Risk                                   | Mitigation                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| OEM dependence / capture               | Protocol-first licensing; multiple OEM candidates from day one                                                     |
| App chicken-and-egg                    | Finland wedge: convert banks, Kanta, Posti first                                                                   |
| Google licensing pressure on Variant B | Ship Variant A in the EU where DMA cracks exist; keep the protocol open                                            |
| Version/compat tail                    | Web-like atomic distribution; OS-owned capability interface with shims                                             |
| AI abuse (hogging, battery drain)      | Fair-share limits + thermal/battery guards in the broker; per-app kill switch; audit log                           |
| Privacy backlash                       | On-device by default, no training on user data, verifiable PCC for opt-in escalation                               |
| Execution: RN out-of-tree port cost    | Biggest engineering item; budget a small dedicated core team, Skia rendering keeps scope to the core component set |

## Where this goes

This is a concept, not a roadmap. But the pieces are all real in 2026: OS-owned notification channels with quotas, store-distributed apps that always update like the web, Skia-rendered React Native on a custom platform, and a fairly shared, OS-owned AI layer. The failure modes of the past (Windows Phone, Sailfish) were ecosystem and timing, not vision.

The next concrete step is always the same one: a very short list of wedge entities whose senders we convert first, and one mid-tier OEM willing to ship it as the default.

If you've read this far and work on (or near) any of these layers (attention protocols, out-of-tree platforms, on-device inference scheduling), I'd genuinely like to hear your take.
