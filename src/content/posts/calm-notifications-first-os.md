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

**If you're deciding whether this matters:** the short version is above; the commercial shape is this. It enters through Finland's must-have institutions — banks, health, government, Posti — with a mid-tier OEM shipping it as the default surface. The economics: one store-owned checkout, 0% commission, and an annual fee only for the verified-publisher badge. The moat is the verified-sender network and the protocol, not the hardware; the main risks are OEM dependence and port cost (see the risks table below).

- **Wedge first**: convert OP/Nordea, Kanta, Suomi.fi, Posti first — a handful of Finnish institutions covers daily necessity; WhatsApp is the genuinely hard one.
- **Variant B first**: Google-certified device with our layer as the default surface; the de-Googled Variant A follows in the EU.
- **The ask**: one mid-tier OEM as the first licensee — the protocol stays our asset, so switching OEMs doesn't restart from zero.

## The core idea: the OS owns notifications

Today every app owns its own channel into your attention: badges, banners, push, vibration. The OS just transports them. The result is a thousand little slot machines.

The concept flips it: the OS owns the notification channel, and apps _request_ attention through a structured protocol — a fixed format that says who sent the item, how urgent it is, and when it expires. The home screen is notifications-first, with four screens:

- **Now** — the AI-prioritized surface: a "what matters now" summary with suggested actions, items sorted by deadline, and a "filed for you" section showing the quota layer in action (a sender that exceeded its quota is blocked, items with no deadline are archived, expired alerts are quietly removed).
- **Inbox** — the full mailbox: verified-sender badges, a security-critical lane (a bank login alert that cannot be deferred), due dates on every item, decaying urgency ratings.
- **Schedule** — notifications placed on your timeline by deadline, with live items (a delivery window) updating their own slots and quiet days shown as quiet.
- **Media** — the OS-level now-playing screen: transport controls, artwork, and the app's own branding (icon, accent color), for any app — native or web — that registers a media session through the SDK — the standard way an app tells the OS what is playing.

<figure>
  <svg
    viewBox="0 0 1280 640"
    role="img"
    aria-label="Mockup of the home-screen screens: Now, Inbox, Schedule, Media"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>text { font-family: system-ui, sans-serif; }</style>
    <g>
      <rect x="20" y="20" width="280" height="600" rx="36" fill="#1a1a18" />
      <rect x="32" y="32" width="256" height="576" rx="28" fill="#f6f4ef" />
      <text x="50" y="52" font-size="10" fill="#8a887f">9:41</text>
      <text x="270" y="52" text-anchor="end" font-size="10" fill="#8a887f">&#9646;&#9646; &#9646; 84%</text>
      <text x="50" y="86" font-size="23" font-weight="600" fill="#2b2b28" letter-spacing="-0.5">Tuesday 17 Nov</text>
      <text x="50" y="104" font-size="11" fill="#8a887f">Calm mode · 3 things need you today</text>
      <rect x="32" y="112" width="256" height="28" rx="14" fill="#e9e6dd" />
      <rect x="38" y="115" width="58" height="22" rx="11" fill="#2b2b28" />
      <text x="67" y="129" text-anchor="middle" font-size="11" fill="#f6f4ef">Now</text>
      <text x="129" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Inbox</text>
      <text x="191" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Schedule</text>
      <text x="253" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Media</text>
      <text x="160" y="532" text-anchor="middle" font-size="10" fill="#8a857a">&#8593;</text>
      <rect x="32" y="540" width="256" height="56" rx="20" fill="#f6f4ef" stroke="#e5e1d6" />
      <text x="64" y="575" text-anchor="middle" font-size="18">&#9742;&#65039;</text>
      <text x="128" y="575" text-anchor="middle" font-size="18">&#128247;</text>
      <text x="192" y="575" text-anchor="middle" font-size="18">&#128506;&#65039;</text>
      <text x="256" y="575" text-anchor="middle" font-size="18">&#9881;&#65039;</text>
      <rect x="120" y="599" width="80" height="5" rx="2.5" fill="#dcd8cc" />
      <rect x="46" y="152" width="228" height="112" rx="22" fill="#2b2b28" />
      <text x="62" y="170" font-size="8.5" fill="#a8a69b" letter-spacing="1.2">WHAT MATTERS NOW</text>
      <text x="62" y="186" font-size="11" fill="#f6f4ef">Your electricity invoice (€84.20)</text>
      <text x="62" y="200" font-size="11" fill="#f6f4ef">is due Friday. Two packages arrive</text>
      <text x="62" y="214" font-size="11" fill="#f6f4ef">today. Mimmi asked about badminton.</text>
      <rect x="62" y="228" width="46" height="20" rx="10" fill="#3f3e39" />
      <text x="85" y="241" text-anchor="middle" font-size="9" fill="#f6f4ef">Pay now</text>
      <rect x="116" y="228" width="70" height="20" rx="10" fill="#3f3e39" />
      <text x="151" y="241" text-anchor="middle" font-size="9" fill="#f6f4ef">Remind me Thu</text>
      <rect x="194" y="228" width="72" height="20" rx="10" fill="#3f3e39" />
      <text x="230" y="241" text-anchor="middle" font-size="9" fill="#f6f4ef">Quiet the rest</text>
      <text x="52" y="284" font-size="8.5" fill="#8a887f" letter-spacing="1.2">NEEDS YOU SOON<tspan letter-spacing="0" fill="#b0aea2"> · sorted by deadline</tspan></text>
      <rect x="46" y="294" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="46" y="294" width="3" height="48" fill="#d19a3f" />
      <rect x="56" y="303" width="30" height="30" rx="9" fill="#efc9c0" />
      <text x="71" y="323" text-anchor="middle" font-size="14">&#9889;</text>
      <text x="94" y="312" font-size="10" font-weight="600" fill="#2b2b28">Helen Electricity</text>
      <rect x="216" y="302" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="241.0" y="312" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="94" y="326" font-size="11" fill="#2b2b28">Invoice for October, €84.20</text>
      <text x="94" y="337" font-size="9" fill="#6b6a64">Due Fri 20 Nov 17:00 · auto-scheduled</text>
      <rect x="46" y="346" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="46" y="346" width="3" height="48" fill="#d19a3f" />
      <rect x="56" y="355" width="30" height="30" rx="9" fill="#dfe6d4" />
      <text x="71" y="375" text-anchor="middle" font-size="14">&#128230;</text>
      <text x="94" y="364" font-size="10" font-weight="600" fill="#2b2b28">Posti</text>
      <rect x="216" y="354" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="241.0" y="364" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="94" y="378" font-size="11" fill="#2b2b28">2 packages arriving today 12–15</text>
      <text x="94" y="389" font-size="9" fill="#6b6a64">Live · updates its own slot</text>
      <rect x="46" y="398" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="46" y="398" width="3" height="48" fill="#7a8b6f" />
      <rect x="56" y="407" width="30" height="30" rx="9" fill="#e3d9c0" />
      <text x="71" y="427" text-anchor="middle" font-size="14">&#127938;</text>
      <text x="94" y="416" font-size="10" font-weight="600" fill="#2b2b28">Mimmi</text>
      <rect x="218" y="406" width="48" height="14" rx="7" fill="#eee9dd" />
      <text x="242.0" y="416" text-anchor="middle" font-size="8" fill="#6b6a64">contact</text>
      <text x="94" y="430" font-size="11" fill="#2b2b28">Badminton Thu 19:00 — still on?</text>
      <text x="94" y="441" font-size="9" fill="#6b6a64">No deadline · optional, suggest answer</text>
      <text x="52" y="466" font-size="8.5" fill="#8a887f" letter-spacing="1.2">FILED FOR YOU<tspan letter-spacing="0" fill="#b0aea2"> · never interrupts</tspan></text>
      <rect x="46" y="474" width="228" height="46" rx="16" fill="#edeadf" />
      <text x="58" y="488" font-size="9.5" fill="#6b6a64">Archived quietly: Zalando blocked (12</text>
      <text x="58" y="500" font-size="9.5" fill="#6b6a64">pushes, over quota), Vero filed to 30 Nov,</text>
      <text x="58" y="512" font-size="9.5" fill="#6b6a64">HSL alert expired, Yle digest in 1 line.</text>
    </g>
    <g>
      <rect x="340" y="20" width="280" height="600" rx="36" fill="#1a1a18" />
      <rect x="352" y="32" width="256" height="576" rx="28" fill="#f6f4ef" />
      <text x="370" y="52" font-size="10" fill="#8a887f">9:41</text>
      <text x="590" y="52" text-anchor="end" font-size="10" fill="#8a887f">&#9646;&#9646; &#9646; 84%</text>
      <text x="370" y="86" font-size="23" font-weight="600" fill="#2b2b28" letter-spacing="-0.5">Tuesday 17 Nov</text>
      <text x="370" y="104" font-size="11" fill="#8a887f">Calm mode · 4 items, 1 needs you now</text>
      <rect x="352" y="112" width="256" height="28" rx="14" fill="#e9e6dd" />
      <text x="387" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Now</text>
      <rect x="420" y="115" width="58" height="22" rx="11" fill="#2b2b28" />
      <text x="449" y="129" text-anchor="middle" font-size="11" fill="#f6f4ef">Inbox</text>
      <text x="511" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Schedule</text>
      <text x="573" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Media</text>
      <text x="480" y="532" text-anchor="middle" font-size="10" fill="#8a857a">&#8593;</text>
      <rect x="352" y="540" width="256" height="56" rx="20" fill="#f6f4ef" stroke="#e5e1d6" />
      <text x="384" y="575" text-anchor="middle" font-size="18">&#9742;&#65039;</text>
      <text x="448" y="575" text-anchor="middle" font-size="18">&#128247;</text>
      <text x="512" y="575" text-anchor="middle" font-size="18">&#128506;&#65039;</text>
      <text x="576" y="575" text-anchor="middle" font-size="18">&#9881;&#65039;</text>
      <rect x="440" y="599" width="80" height="5" rx="2.5" fill="#dcd8cc" />
      <text x="372" y="160" font-size="8.5" fill="#8a887f" letter-spacing="1.2">TODAY<tspan letter-spacing="0" fill="#b0aea2"> · 1 security-critical</tspan></text>
      <rect x="366" y="170" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="170" width="3" height="48" fill="#c05b4d" />
      <rect x="376" y="179" width="30" height="30" rx="9" fill="#efc9c0" />
      <text x="391" y="199" text-anchor="middle" font-size="14">&#127974;</text>
      <text x="414" y="188" font-size="10" font-weight="600" fill="#2b2b28">OP Bank</text>
      <rect x="522" y="178" width="64" height="14" rx="7" fill="#eee9dd" />
      <text x="554.0" y="188" text-anchor="middle" font-size="8" fill="#6b6a64">security lane</text>
      <text x="414" y="202" font-size="11" fill="#2b2b28">New login from new device. You?</text>
      <text x="414" y="213" font-size="9" fill="#6b6a64">Due now · cannot be deferred</text>
      <rect x="366" y="226" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="226" width="3" height="48" fill="#d19a3f" />
      <rect x="376" y="235" width="30" height="30" rx="9" fill="#e3d9c0" />
      <text x="391" y="255" text-anchor="middle" font-size="14">&#127973;</text>
      <text x="414" y="244" font-size="10" font-weight="600" fill="#2b2b28">Kanta</text>
      <rect x="536" y="234" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="561.0" y="244" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="414" y="258" font-size="11" fill="#2b2b28">Appointment reminder</text>
      <text x="414" y="269" font-size="9" fill="#6b6a64">Due tomorrow · urgency high</text>
      <rect x="366" y="282" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="282" width="3" height="48" fill="#d19a3f" />
      <rect x="376" y="291" width="30" height="30" rx="9" fill="#dfe6d4" />
      <text x="391" y="311" text-anchor="middle" font-size="14">&#128179;</text>
      <text x="414" y="300" font-size="10" font-weight="600" fill="#2b2b28">Nordea</text>
      <rect x="536" y="290" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="561.0" y="300" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="414" y="314" font-size="11" fill="#2b2b28">Card notice</text>
      <text x="414" y="325" font-size="9" fill="#6b6a64">Due in 4 days · urgency decaying</text>
      <rect x="366" y="338" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="338" width="3" height="48" fill="#6f7f8b" />
      <rect x="376" y="347" width="30" height="30" rx="9" fill="#e0e0e0" />
      <text x="391" y="367" text-anchor="middle" font-size="14">&#127963;&#65039;</text>
      <text x="414" y="356" font-size="10" font-weight="600" fill="#2b2b28">Suomi.fi</text>
      <rect x="524" y="346" width="62" height="14" rx="7" fill="#eee9dd" />
      <text x="555.0" y="356" text-anchor="middle" font-size="8" fill="#6b6a64">government</text>
      <text x="414" y="370" font-size="11" fill="#2b2b28">Tax decision ready</text>
      <text x="414" y="381" font-size="9" fill="#6b6a64">Due Fri · government sender</text>
      <rect x="366" y="394" width="228" height="48" rx="18" fill="#fffdf8" opacity="0.68" />
      <rect x="376" y="403" width="30" height="30" rx="9" fill="#e0e0e0" />
      <text x="391" y="423" text-anchor="middle" font-size="14">&#128717;&#65039;</text>
      <text x="414" y="412" font-size="10" font-weight="600" fill="#2b2b28">Zalando</text>
      <rect x="522" y="402" width="64" height="14" rx="7" fill="#eee9dd" />
      <text x="554.0" y="412" text-anchor="middle" font-size="8" fill="#6b6a64">over quota</text>
      <text x="414" y="426" font-size="11" fill="#2b2b28">Black Friday: up to −70%…</text>
      <text x="414" y="437" font-size="9" fill="#6b6a64">Optional · digest only · decaying</text>
      <text x="366" y="458" font-size="9" fill="#8a887f">Every item shows its due date and a decaying</text>
      <text x="366" y="471" font-size="9" fill="#8a887f">urgency rating; verified senders get a badge.</text>
    </g>
    <g>
      <rect x="660" y="20" width="280" height="600" rx="36" fill="#1a1a18" />
      <rect x="672" y="32" width="256" height="576" rx="28" fill="#f6f4ef" />
      <text x="690" y="52" font-size="10" fill="#8a887f">9:41</text>
      <text x="910" y="52" text-anchor="end" font-size="10" fill="#8a887f">&#9646;&#9646; &#9646; 84%</text>
      <text x="690" y="86" font-size="23" font-weight="600" fill="#2b2b28" letter-spacing="-0.5">Tuesday 17 Nov</text>
      <text x="690" y="104" font-size="11" fill="#8a887f">Calm mode · attention schedule</text>
      <rect x="672" y="112" width="256" height="28" rx="14" fill="#e9e6dd" />
      <text x="707" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Now</text>
      <text x="769" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Inbox</text>
      <rect x="802" y="115" width="58" height="22" rx="11" fill="#2b2b28" />
      <text x="831" y="129" text-anchor="middle" font-size="11" fill="#f6f4ef">Schedule</text>
      <text x="893" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Media</text>
      <text x="800" y="532" text-anchor="middle" font-size="10" fill="#8a857a">&#8593;</text>
      <rect x="672" y="540" width="256" height="56" rx="20" fill="#f6f4ef" stroke="#e5e1d6" />
      <text x="704" y="575" text-anchor="middle" font-size="18">&#9742;&#65039;</text>
      <text x="768" y="575" text-anchor="middle" font-size="18">&#128247;</text>
      <text x="832" y="575" text-anchor="middle" font-size="18">&#128506;&#65039;</text>
      <text x="896" y="575" text-anchor="middle" font-size="18">&#9881;&#65039;</text>
      <rect x="760" y="599" width="80" height="5" rx="2.5" fill="#dcd8cc" />
      <text x="712" y="194" text-anchor="end" font-size="10" fill="#8a887f">12–15</text>
      <rect x="720" y="170" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="170" width="3" height="40" fill="#7a8b6f" />
      <text x="734" y="185" font-size="8.5" fill="#8a887f">Posti · live</text>
      <text x="734" y="199" font-size="11" fill="#2b2b28">2 packages arriving</text>
      <text x="712" y="242" text-anchor="end" font-size="10" fill="#8a887f">17:00</text>
      <rect x="720" y="218" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="218" width="3" height="40" fill="#c05b4d" />
      <text x="734" y="233" font-size="8.5" fill="#8a887f">Helen Electricity · due</text>
      <text x="734" y="247" font-size="11" fill="#2b2b28">Pay invoice, €84.20</text>
      <text x="712" y="290" text-anchor="end" font-size="10" fill="#8a887f">Thu 19</text>
      <rect x="720" y="266" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="266" width="3" height="40" fill="#6f7f8b" />
      <text x="734" y="281" font-size="8.5" fill="#8a887f">Mimmi · suggested</text>
      <text x="734" y="295" font-size="11" fill="#2b2b28">Badminton, if you confirm</text>
      <text x="712" y="338" text-anchor="end" font-size="10" fill="#8a887f">Sat</text>
      <rect x="720" y="314" width="208" height="40" rx="14" fill="#edeadf" stroke="#c5c1b2" stroke-dasharray="3 3" />
      <text x="734" y="338" font-size="11" fill="#6b6a64">Quiet day — nothing scheduled</text>
      <text x="712" y="386" text-anchor="end" font-size="10" fill="#8a887f">Mon 23</text>
      <rect x="720" y="362" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="362" width="3" height="40" fill="#d19a3f" />
      <text x="734" y="377" font-size="8.5" fill="#8a887f">Kanta · reminder</text>
      <text x="734" y="391" font-size="11" fill="#2b2b28">Prescription renewal opens</text>
      <text x="712" y="434" text-anchor="end" font-size="10" fill="#8a887f">Nov 30</text>
      <rect x="720" y="410" width="208" height="40" rx="14" fill="#edeadf" stroke="#c5c1b2" stroke-dasharray="3 3" />
      <text x="734" y="425" font-size="8.5" fill="#8a887f">Vero · auto-filed</text>
      <text x="734" y="439" font-size="11" fill="#6b6a64">Tax reminder (archived)</text>
      <text x="686" y="470" font-size="9" fill="#8a887f">Notifications are placed on your timeline by</text>
      <text x="686" y="483" font-size="9" fill="#8a887f">deadline; quiet days are shown as quiet.</text>
    </g>
    <g>
      <rect x="980" y="20" width="280" height="600" rx="36" fill="#1a1a18" />
      <rect x="992" y="32" width="256" height="576" rx="28" fill="#f6f4ef" />
      <text x="1010" y="52" font-size="10" fill="#8a887f">9:41</text>
      <text x="1230" y="52" text-anchor="end" font-size="10" fill="#8a887f">&#9646;&#9646; &#9646; 84%</text>
      <text x="1010" y="86" font-size="23" font-weight="600" fill="#2b2b28" letter-spacing="-0.5">Tuesday 17 Nov</text>
      <text x="1010" y="104" font-size="11" fill="#8a887f">Calm mode · now playing</text>
      <rect x="992" y="112" width="256" height="28" rx="14" fill="#e9e6dd" />
      <text x="1027" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Now</text>
      <text x="1089" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Inbox</text>
      <text x="1151" y="129" text-anchor="middle" font-size="11" fill="#8a887f">Schedule</text>
      <rect x="1184" y="115" width="58" height="22" rx="11" fill="#2b2b28" />
      <text x="1213" y="129" text-anchor="middle" font-size="11" fill="#f6f4ef">Media</text>
      <text x="1120" y="532" text-anchor="middle" font-size="10" fill="#8a857a">&#8593;</text>
      <rect x="992" y="540" width="256" height="56" rx="20" fill="#f6f4ef" stroke="#e5e1d6" />
      <text x="1024" y="575" text-anchor="middle" font-size="18">&#9742;&#65039;</text>
      <text x="1088" y="575" text-anchor="middle" font-size="18">&#128247;</text>
      <text x="1152" y="575" text-anchor="middle" font-size="18">&#128506;&#65039;</text>
      <text x="1216" y="575" text-anchor="middle" font-size="18">&#9881;&#65039;</text>
      <rect x="1080" y="599" width="80" height="5" rx="2.5" fill="#dcd8cc" />
      <rect x="1006" y="152" width="228" height="170" rx="18" fill="#e8e2d2" />
      <text x="1120" y="252" text-anchor="middle" font-size="56" fill="#b0a88f">&#9834;</text>
      <rect x="1006" y="332" width="76" height="22" rx="11" fill="#e8f0ea" />
      <text x="1044" y="347" text-anchor="middle" font-size="9" fill="#2f6f4f">via Spotify</text>
      <text x="1006" y="376" font-size="13" font-weight="600" fill="#2b2b28">Song title</text>
      <text x="1006" y="393" font-size="10.5" fill="#6b6a64">Artist — Album</text>
      <rect x="1006" y="408" width="228" height="5" rx="2.5" fill="#e5dfd0" />
      <rect x="1006" y="408" width="114" height="5" rx="2.5" fill="#2b2b28" />
      <text x="1006" y="424" font-size="8.5" fill="#8a857a">1:12</text>
      <text x="1234" y="424" text-anchor="end" font-size="8.5" fill="#8a857a">3:45</text>
      <circle cx="1076" cy="458" r="17" fill="#fffdf8" stroke="#e2dcc9" />
      <text x="1076" y="463" text-anchor="middle" font-size="12" fill="#2b2b28">&#9198;</text>
      <circle cx="1120" cy="458" r="19" fill="#2b2b28" />
      <text x="1120" y="463" text-anchor="middle" font-size="13" fill="#f6f4ef">&#9654;</text>
      <circle cx="1164" cy="458" r="17" fill="#fffdf8" stroke="#e2dcc9" />
      <text x="1164" y="463" text-anchor="middle" font-size="12" fill="#2b2b28">&#9197;</text>
    </g>
  </svg> <figcaption class="text-center"> The four home-screen screens — Now, Inbox, Schedule, Media — four static screens side by side, with the quota mechanics, example senders (the OP Bank security lane, a live Posti delivery window, an over-quota Zalando card), and a media session (Spotify) wired in. </figcaption> </figure>

The mechanics that make it work are quotas, not vibes: each sender gets a budget, verified senders (banks, government, health services) get a higher tier and a badge, security-critical items are never deferrable, and everything else decays. The design principle is **calm by default** — information density is not the goal; calm control is. Windows Phone proved that notification-first can be right and still feel wrong; the missing piece was the quota layer.

Media gets the same treatment, because a portable device is personal and music usually is. The fourth screen is a **now-playing surface owned by the OS**: any app — native or web — that registers a [W3C Media Session](https://www.w3.org/TR/mediasession/) through the SDK gets transport controls, artwork, and its branding rendered in the media tab and lock screen, while the app keeps its own UI; media focus and background playback go through the same capability broker. The web tier implements Media Session too, and that is also the YouTube story: Google is unlikely to ever ship a native app for a rival OS — no Google Maps and no official YouTube app is a large part of how Windows Phone died — so instead we make the _web_ experience first-class: YouTube in our web tier gets OS media controls, background-playback policy, and picture-in-picture, with the EU DMA rule on web distribution — the law explained below that forces Apple and Google to allow sideloading and alternative stores — making that a legitimate channel.

## Why the EU has no OS, and why this can't wait for demand

Sanctions worked for China because they created a forced shortage that local industry could fill, with state coordination and a billion-user market. The EU has none of that: US software is not just available but free and excellent, so the demand never arises; manufacturing died with Nokia/Ericsson; capital and procurement are fragmented into 27 regimes; and the EU's instinct is to regulate the foreign platform (DMA, GDPR) rather than build its own — regulation has never once produced a European product. The security umbrella removes the last shred of urgency: Europe only thinks about being cut off when Washington hints at it.

The strategic consequence: **you cannot wait for the demand to arise — the concept has to create its own small, artificial shortage.** That's what the wedge market is: a small market where our layer is the default and the alternatives are demonstrably worse. And the EU's regulatory reflex is the ally to exploit: DMA sideloading and default-choice screens are real cracks in the Google ecosystem, and "digital sovereignty you can hold" is fundable from EU sovereignty budgets.

## Go-to-market

Enter through a small market's must-have apps first — in Finland that's concentrated and institutionally motivated: bank apps (OP/Nordea), Kanta health, Suomi.fi government services, Posti/Matkahuolto shipping, payments, then messaging (WhatsApp is the genuinely hard one). That same list is the sender-conversion list for the notification protocol in both variants below. Then partner with a real OEM — **big enough to ship volume, small enough to need a story**. HMD/Nokia is the natural cultural fit; Vivo/Honor have the hardware but are structurally committed to their own skins. Skip Sailfish/Jolla-style software-only plays (a decade proves they don't move the market) and skip pure Android overlays ("if it's optional, why bother" — opt-in attention management has a ceiling of enthusiasts; it has to be OEM-default).

On the Google question it's binary: shipping the Play Store requires full GMS certification (Google's licensed bundle: Play Services, push messaging, Maps), and you can't have "Play Store but our notification channel" on the same device. So there are exactly two variants:

- **Variant A — de-Googled device + curated app wedge.** No GMS, so parts of the Play Store break (anything needing FCM push — Google's push-notification plumbing —, the Maps SDK, or Google in-app payments); viability comes from the wedge — Finland's institutional apps run as PWAs (installable web apps) or "email plus a secure action link". Without the wedge it's just a worse phone; with the wedge, it's the sovereign version.
- **Variant B — Google-certified device, our layer as the default surface.** The Play Store stays intact and apps work; our notification layer is the OEM-default home surface, and a structured sender protocol enters from the side — verified senders get richer rendering and quota priority, everything else gets an AI-parsed fallback.

Recommendation: **Variant B first** on a mid-tier OEM, **Variant A as a second product line** in Finland/Nordics once the wedge apps are ported. On gaming, no decision is needed now: mobile gaming is big, but we won't build games in React Native — a real game wants a real engine, and if demand appears it can be served later (e.g. through the Wasm tier). Since Variant B ships Google-certified, the Play Store's gaming catalog is present from day one, so deferring costs nothing.

The honest risk in the OEM route: the OEM owns the customer, not you. If the device sells poorly you're dropped in one cycle; if it sells well, the OEM (or Google, via licensing pressure) captures the value.

## Why we could win

Three moats, none of which require being bigger than Apple or Google. **OEM-default exclusivity**: attention features only matter as the default surface, and a mid-tier OEM needs a story — we are that story, contractually the first licensee. **The protocol and the verified-sender network**: once banks, Kanta, and Posti adopt the structured sender protocol, switching costs rise for every later app and every later OEM — the network is the asset, not the hardware. **Regulation**: the DMA (above) already forces sideloading, alternative stores, and web distribution, so the "store optional" model rides the law instead of fighting it, and EU sovereignty budgets can fund the wedge. The honest gap: Apple or Google could copy the notification layer — but shipping it as an OEM-default surface conflicts with their own store economics, which is exactly the space we occupy.

## Apps: store-published native apps, updated like the web

The web's update model is the part mobile got wrong: deploys are atomic (all-or-nothing, no half-updated states), and every user is on the latest version after a refresh. App stores give you review, discovery, and trust badges — but also review delays, 15–30% fees, and a client base fragmented across many installed versions, which makes backward compatibility and API versioning a permanent chore.

So the store keeps what users actually expect — **an app is a packaged build you find by name in the store and install with one tap** — while delivery borrows the web's one good idea: apps are also addressable by a **custom scheme, not an HTTP URL** (think `calm://apps/<id>`). The package is a signed bundle of **Hermes bytecode + manifest + assets** — pre-compiled code (fast to run, and scannable for malware), a manifest declaring what the app wants to do, and its files — executed by our own runtime with tight OS integration: capabilities through the broker, Skia/Graphite rendering (a high-performance graphics engine), **truly native, never a webview app** (a webview is just an embedded browser page). The store hosts the catalog and serves packages over that scheme; every launch does stale-while-revalidate — serve the installed copy, fetch the new one in the background — and atomically swaps in the latest version, so users converge within hours. "Installing" pins the app and grants its declared capabilities. The version-fragmentation problem mostly goes away by design; what remains is the OS↔app capability interface, which the OS keeps versioned and shims — it keeps the previous two interface versions (N−1, N−2) working. Direct-`calm://` links and sideloading stay possible (the DMA forces that anyway) — that's the open part — but the store is the primary catalog, because that's where users look for a new app.

### Deep dive: the technical choices, and why not the alternatives

This is feasible today, and there are existing projects that prove each piece — we just shouldn't copy them wholesale:

- **Why not QuickApps/MiniApps**: install-free and always-latest, yes — but they're web-tech hybrids (JS logic + webview UI) with per-vendor dialects, standardized by a W3C working group that closed in 2026 ([MiniApp white paper](https://www.w3.org/TR/mini-app-white-paper/)), and in Europe only Huawei devices ship the framework. Adopting it would tie a European-sovereignty OS to a Chinese-OEM-controlled format with PWA's richness ceiling. We borrow the packaging/lifecycle _concept_, not the runtime.
- **Why not just PWA** (installable web app): since we're building our own OS, platform quirks like iOS's missing Web Bluetooth/NFC aren't the point — the point is depth of integration. HTML in a webview can't do tight hardware and system integration (Bluetooth, NFC, background execution, OS-level notification rendering) without a growing pile of permission prompts. PWA stays as the fallback/web tier, not the main one.
- **What to build on**: **React Native as an out-of-tree platform** (React Native running on our own OS, not iOS/Android) on a Linux-based OS — developers already know JS/React, and asking them to learn Rust, QML, or Dart would kill adoption.
  - RN's New Architecture (Fabric + JSI + TurboModules, default since 0.76) was explicitly designed to make [out-of-tree platforms](https://reactnative.dev/docs/out-of-tree-platforms) maintainable — react-native-windows, -macos, -web and [react-native-skia](https://github.com/Shopify/react-native-skia) (Linux/macOS) prove the seams.
  - Apps ship **Hermes bytecode bundles** served over the `calm://` scheme from the store (or a developer's own host for sideloads) — what's web-like is the update path: stale-while-revalidate, atomic swap. Rendering goes through **Skia/Graphite** (react-native-skia, now on the WebGPU-based Graphite backend), so there's one GPU path instead of per-widget native views — and no webview anywhere.
  - OS capabilities (camera, NFC, push, background) are exposed once as TurboModules (a fixed menu of OS capabilities) through the capability broker; **Wasm/WASI ([WASI-NN](https://github.com/WebAssembly/wasi-nn))** covers sandboxed logic (Wasm is a safe, sandboxed way to run code inside an app).
  - The EU's [DMA](https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en) (explained above) is the regulatory tailwind that makes "store optional" legally established in our target market.

## App quality in an open store: a badge, not a gate

Gates leak, so we design for openness. The DMA (above) already forces sideloading, alternative marketplaces, and web distribution in the EU — and Apple's own notarization-only alternative stores let prohibited apps through (the "Hot Tub" case), while Apple rejected 22,000 submissions in 2025 for hidden or undocumented features that only appear after approval. Open distribution is the regulatory and technical future; the design question is how to make harm hard and visible, not how to pretend exclusion works.

**Badge, not a gate.** A gate excludes: only reviewed apps can install, and a lapsed fee removes them (Apple's model). Our store is the primary catalog — apps are packaged and published there, found by name, installed with one tap — while direct-`calm://` links and sideloading stay open for anyone. Review adds a badge on top of that; the one rule that keeps it a badge rather than a gate: **unverified apps stay fully visible and installable — labeled "unverified", never hidden or demoted to invisibility.** The only hard block is a failed malware scan, which is appealable.

**1. A universal security floor, free for every app.** Every package is signed and passes an automated notarization-style scan (Apple's term for an automated security review — here checking malware signatures, private APIs, entitlements, and declared-capability vs. actual-behavior) — and because apps are bytecode bundles, the OS auto-diffs and re-scans **every update**, catching bait-and-switch mechanically. On top of that, the sandbox and capability broker mean a malicious app can't do much even if it slips through: dangerous capabilities (SMS, contacts, accessibility services, device admin, installing other apps) are off by default and granted per app, and notifications, AI, and background execution all pass through the capability broker.

**2. Trust is earned through the badge — and auditable by anyone.** The verified-publisher badge requires published source and a reproducible build — anyone can rebuild the app from source and get the identical file, proving shipped code matches audited code (the [F-Droid](https://f-droid.org/docs/Reproducible_Builds/) model): the shipped Hermes bytecode must rebuild bit-for-bit from source, so the community can audit any app without trusting the reviewer. AI agents review 100% of submissions — practical here because apps are inspectable bytecode with a declared capability manifest: static checks, update diffs, and sandboxed dynamic runs where an agent clicks through the app while its network calls are watched. A small maintainer group then reviews a risk-stratified sample — new publishers, flagged apps, high-download apps, sensitive categories (finance, health, kids), and every appeal — plus random audits; volunteers handle triage and build verification, a paid core makes final calls. Review logs and rejection reasons are public, so the community can audit the reviewers too. Identity comes from eIDAS 2.0 / national eID — the EU's digital ID wallet standard (EUDI), free for citizens — rather than a paid D-U-N-S-style check — stronger accountability at zero cost. Volume is on our side: our wedge-market submission count is orders of magnitude below Apple's 9.1M a year.

**3. Vulnerable users get a per-account gate, not a global one.** Safeguarded and child accounts default to **verified-only installs**, with age-appropriate content ratings enforced plus screen time and capability restrictions. Age assurance uses the EUDI wallet's attribute attestations — selective disclosure can prove someone is over 13/18 without revealing identity or birthdate, which is exactly what eIDAS 2.0 was built for. Kids-category and user-generated-content moderation rules are enforced in badge review.

**Fees.** Publishing, signing, the automated scan, and listing are free. The **annual fee (per developer account, not per app)** exists only for the **verified-publisher badge** — it pays the maintainers and the AI review infrastructure; it buys a service, not the right to exist on the platform. **Payments are unified through the store, not fragmented per developer**: one checkout for paid apps and in-app purchases — a single, familiar UX — with the payment directed straight to the seller's account. The store takes **0% commission**; it only passes through payment-processing and VAT costs (a few percent, PSP-level, never 15–30%). Paid apps work with or without the badge — the badge adds faster review, discovery priority, and higher capability quotas, not payment ability. Two tiers: free/community-reviewed (no badge) and paid/verified.

**The honest tradeoff.** An open store will contain more scams and low-effort apps than Apple's — that is the price of no gate. The harm is kept low not by prevention but by the floor, labels, ranking, safeguarded accounts, and fast takedown (kill switch, public takedown log, one-tap reporting). Shipping openness without those safeguards would be irresponsible; shipping them is the design.

## AI: an OS service, shared fairly, private by default

AI is becoming a necessity, and if it's shared by all apps, the OS must be the one enforcing safety, privacy, and efficiency — otherwise one app can hog the NPU (the AI chip), overheat or drain the battery, or keep running AI in standby all night.

The precedent exists: Android's [**AICore**](https://developer.android.com/ai/gemini-nano) system service manages the shared on-device model (Gemini Nano) with per-app quotas, foreground-only inference by default, and battery-linked daily caps; Apple exposes its on-device model via the Foundation Models framework with Private Cloud Compute (Apple's verifiable cloud AI) as an auditable cloud tier. And we deliberately don't anchor on today's hardware numbers: NPUs, model sizes, and efficiency techniques all change quarter to quarter, and compute only gets more powerful and cheaper. The bet is on more AI capability in the future, not on any specific chip, model, or format.

Our version would be a **System AI Service** that owns the model set (open-weight models distributed over the OS's signed update channel — verifiable, and no vendor black box), and brokers access through the same capability broker as notifications:

- **fair-share scheduling, not rationing**: the OS scheduler owns NPU dispatch and batches across apps, so each app gets a fair slice of the shared model and no single app can hog it — your own AI usage is never capped. On top of that: thermal and battery guards that throttle inference when the device is hot or the battery is low, no background/standby inference unless the user opts in, and a per-app "AI usage" dashboard showing where the capacity went;
- **priority lanes**: system/security (scam-call detection, OTP parsing) > user-initiated foreground > background (off unless opted in), with busy errors and a graceful fallback to a smaller model;
- **two API tiers**: mediated task APIs (summarize, classify, extract — output passes a safety filter, no raw model access) and a rate-limited raw prompt API for verified publishers;
- **privacy by construction**: inference runs isolated with no network access, no training on user data, an audit log of which app used AI when (not the content); cloud escalation only per-task with explicit consent, through a verifiable private-compute tier (attestation, published images — the PCC model), default off.

One broker, three resources — attention, apps, intelligence — each with per-app limits, verified trust tiers, and calm-by-default behavior; and the same consent-and-limits philosophy for your profile (next section).

## Personalization that stays personal

Spotify-style recommendations are where on-device AI and an open profile standard combine. Today services profile you in their data centers and the profile is theirs; here the profile is yours. The OS ships a **portable private profile**: an open, user-controlled store — a [Solid](https://solidproject.org/) pod (an open standard for personal data stores) or EUDI-wallet-style verifiable attributes — that lives wherever _you_ choose (self-hosted, or a provider you pick, like a password manager), encrypted, exportable, and movable between providers. Services can ask consented questions and read only the attributes you permit, per app and per purpose; they cannot build a shadow profile, because the profile never leaves your control and every read is logged and revocable. Personalization itself then runs on-device: the System AI Service computes recommendations against your local profile, so "personalized" means personal — not a model of you sitting in someone else's data center. Spotify can ask "what mood are you in?" with your consent; it cannot quietly infer and store it.

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

This is a concept, not a roadmap — but the pieces are all real in 2026: OS-owned notification channels with quotas, store-distributed native apps that always update like the web, Skia-rendered RN on a custom platform, and a fairly shared, OS-owned AI layer. The failure modes of the past (Windows Phone, Sailfish) were ecosystem and timing, not vision. The next concrete step would be the same one as always: a very short list of wedge entities whose senders we convert first, and one mid-tier OEM who ships it as default.

If you've read this far and work on (or near) any of these layers — attention protocols, RN out-of-tree platforms, on-device inference scheduling — I'd genuinely like to hear your take.
