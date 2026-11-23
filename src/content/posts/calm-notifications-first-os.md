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

I worked at [Microsoft](https://www.microsoft.com) while [Windows Phone](https://en.wikipedia.org/wiki/Windows_Phone) was being pushed, and its Start screen still haunts me. The live tiles were notification-first, arguably ahead of their time: unread counts and previews sitting on the home screen itself, no app-opening required. Look at the photo below and find the 24 on the calendar tile and the 16 on the store tile. Those are unread counts, updating live. That was the right idea.

But the bright tiles on a dark background kept me alert and stressed rather than calm. And design aside, the real killer was the app gap: there simply weren't the apps people needed. That's the lesson I keep coming back to: an OS doesn't win on vision. It wins on having the few apps that matter in the market you enter.

<figure>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Nokia_Lumia_720_Home_screen.jpg/960px-Nokia_Lumia_720_Home_screen.jpg"
    alt="Windows Phone 8.1 Start screen on a Nokia Lumia 720, with live tiles showing notification counts: 24 on the calendar tile and 16 on the store tile"
    width="960"
    height="1214"
  />
  <figcaption class="text-center">
    Windows Phone's Start screen was notification-first: the 24 on the calendar tile and the 16 on
    the store tile are live unread counts. Photo:
    <a href="https://commons.wikimedia.org/wiki/File:Nokia_Lumia_720_Home_screen.jpg">Kskhh via Wikimedia Commons</a>
    (CC BY-SA 4.0).
  </figcaption>
</figure>

**TL;DR:** this post sketches a phone OS where the **OS owns the attention layer**. Apps request attention through a structured protocol instead of owning their own channels. Apps install from a store like today but always update like web apps, sideloading stays open, and AI runs as a shared OS service, private by default. One capability broker sits underneath all of it, granting permissions and enforcing per-app fair shares and verified trust tiers. It enters through Finland's must-have institutions with a mid-tier OEM shipping it as the default surface, because an OS wins on the few apps that matter, not on vision.

## The core idea: the OS owns notifications

Right now every app owns its own channel into your attention: badges, banners, push, vibration. The OS just transports them. The result is a thousand little slot machines, each pulling its own lever.

The concept flips that. The OS owns the notification channel, and apps _request_ attention through a structured protocol: a fixed format that says who sent the item, how urgent it is, and when it expires. The home screen _is_ the notifications, organized into four screens.

**Now** is the AI-prioritized surface. Picture a Tuesday morning. The top card reads: your electricity invoice (€84.20) is due Friday, two packages arrive today between 12 and 15, and Mimmi asked about badminton on Thursday. Underneath, items sort by deadline. The invoice from Helen Electricity carries a verified badge. The Posti delivery window is live and updates its own slot. Mimmi's question has no deadline, so it's marked optional. And at the bottom, a "filed for you" tray shows the system quietly working: Zalando blocked after twelve pushes in one day, a Vero tax reminder filed to 30 Nov, an expired HSL alert and a one-line Yle digest archived. Nothing there interrupts you.

**Inbox** is the full mailbox: verified-sender badges, a security-critical lane where a bank login alert from OP cannot be deferred, due dates on every item, and urgency ratings that decay as they age. **Schedule** places items on your timeline by deadline, with live items moving their own slots and quiet days shown as quiet. **Media** is an OS-owned now-playing screen: any app, native or web, that registers a [W3C Media Session](https://www.w3.org/TR/mediasession/) gets transport controls, artwork, and its branding on the media screen and the lock screen.

<figure>
  <svg
    viewBox="0 0 1280 640"
    role="img"
    aria-label="Mockup of the home-screen screens: Now, Inbox, Schedule, Media"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>text { font-family: system-ui, sans-serif; }</style>
    <defs>
      <clipPath id="cc-now1"><rect x="46" y="294" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-now2"><rect x="46" y="346" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-now3"><rect x="46" y="398" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-inbox1"><rect x="366" y="170" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-inbox2"><rect x="366" y="226" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-inbox3"><rect x="366" y="282" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-inbox4"><rect x="366" y="338" width="228" height="48" rx="18" /></clipPath>
      <clipPath id="cc-cal1"><rect x="720" y="170" width="208" height="40" rx="14" /></clipPath>
      <clipPath id="cc-cal2"><rect x="720" y="218" width="208" height="40" rx="14" /></clipPath>
      <clipPath id="cc-cal3"><rect x="720" y="266" width="208" height="40" rx="14" /></clipPath>
      <clipPath id="cc-cal4"><rect x="720" y="362" width="208" height="40" rx="14" /></clipPath>
    </defs>
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
      <rect x="46" y="294" width="3" height="48" fill="#d19a3f" clip-path="url(#cc-now1)" />
      <rect x="56" y="303" width="30" height="30" rx="9" fill="#efc9c0" />
      <text x="71" y="323" text-anchor="middle" font-size="14">&#9889;</text>
      <text x="94" y="312" font-size="10" font-weight="600" fill="#2b2b28">Helen Electricity</text>
      <rect x="216" y="302" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="241.0" y="312" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="94" y="326" font-size="11" fill="#2b2b28">Invoice for October, €84.20</text>
      <text x="94" y="337" font-size="9" fill="#6b6a64">Due Fri 20 Nov 17:00 · auto-scheduled</text>
      <rect x="46" y="346" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="46" y="346" width="3" height="48" fill="#d19a3f" clip-path="url(#cc-now2)" />
      <rect x="56" y="355" width="30" height="30" rx="9" fill="#dfe6d4" />
      <text x="71" y="375" text-anchor="middle" font-size="14">&#128230;</text>
      <text x="94" y="364" font-size="10" font-weight="600" fill="#2b2b28">Posti</text>
      <rect x="216" y="354" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="241.0" y="364" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="94" y="378" font-size="11" fill="#2b2b28">2 packages arriving today 12–15</text>
      <text x="94" y="389" font-size="9" fill="#6b6a64">Live · updates its own slot</text>
      <rect x="46" y="398" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="46" y="398" width="3" height="48" fill="#7a8b6f" clip-path="url(#cc-now3)" />
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
      <rect x="366" y="170" width="3" height="48" fill="#c05b4d" clip-path="url(#cc-inbox1)" />
      <rect x="376" y="179" width="30" height="30" rx="9" fill="#efc9c0" />
      <text x="391" y="199" text-anchor="middle" font-size="14">&#127974;</text>
      <text x="414" y="188" font-size="10" font-weight="600" fill="#2b2b28">OP Bank</text>
      <rect x="522" y="178" width="64" height="14" rx="7" fill="#eee9dd" />
      <text x="554.0" y="188" text-anchor="middle" font-size="8" fill="#6b6a64">security lane</text>
      <text x="414" y="202" font-size="11" fill="#2b2b28">New login from new device. You?</text>
      <text x="414" y="213" font-size="9" fill="#6b6a64">Due now · cannot be deferred</text>
      <rect x="366" y="226" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="226" width="3" height="48" fill="#d19a3f" clip-path="url(#cc-inbox2)" />
      <rect x="376" y="235" width="30" height="30" rx="9" fill="#e3d9c0" />
      <text x="391" y="255" text-anchor="middle" font-size="14">&#127973;</text>
      <text x="414" y="244" font-size="10" font-weight="600" fill="#2b2b28">Kanta</text>
      <rect x="536" y="234" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="561.0" y="244" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="414" y="258" font-size="11" fill="#2b2b28">Appointment reminder</text>
      <text x="414" y="269" font-size="9" fill="#6b6a64">Due tomorrow · urgency high</text>
      <rect x="366" y="282" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="282" width="3" height="48" fill="#d19a3f" clip-path="url(#cc-inbox3)" />
      <rect x="376" y="291" width="30" height="30" rx="9" fill="#dfe6d4" />
      <text x="391" y="311" text-anchor="middle" font-size="14">&#128179;</text>
      <text x="414" y="300" font-size="10" font-weight="600" fill="#2b2b28">Nordea</text>
      <rect x="536" y="290" width="50" height="14" rx="7" fill="#eee9dd" />
      <text x="561.0" y="300" text-anchor="middle" font-size="8" fill="#6b6a64">verified</text>
      <text x="414" y="314" font-size="11" fill="#2b2b28">Card notice</text>
      <text x="414" y="325" font-size="9" fill="#6b6a64">Due in 4 days · urgency decaying</text>
      <rect x="366" y="338" width="228" height="48" rx="18" fill="#fffdf8" />
      <rect x="366" y="338" width="3" height="48" fill="#6f7f8b" clip-path="url(#cc-inbox4)" />
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
      <rect x="720" y="170" width="3" height="40" fill="#7a8b6f" clip-path="url(#cc-cal1)" />
      <text x="734" y="185" font-size="8.5" fill="#8a887f">Posti · live</text>
      <text x="734" y="199" font-size="11" fill="#2b2b28">2 packages arriving</text>
      <text x="712" y="242" text-anchor="end" font-size="10" fill="#8a887f">17:00</text>
      <rect x="720" y="218" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="218" width="3" height="40" fill="#c05b4d" clip-path="url(#cc-cal2)" />
      <text x="734" y="233" font-size="8.5" fill="#8a887f">Helen Electricity · due</text>
      <text x="734" y="247" font-size="11" fill="#2b2b28">Pay invoice, €84.20</text>
      <text x="712" y="290" text-anchor="end" font-size="10" fill="#8a887f">Thu 19</text>
      <rect x="720" y="266" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="266" width="3" height="40" fill="#6f7f8b" clip-path="url(#cc-cal3)" />
      <text x="734" y="281" font-size="8.5" fill="#8a887f">Mimmi · suggested</text>
      <text x="734" y="295" font-size="11" fill="#2b2b28">Badminton, if you confirm</text>
      <text x="712" y="338" text-anchor="end" font-size="10" fill="#8a887f">Sat</text>
      <rect x="720" y="314" width="208" height="40" rx="14" fill="#edeadf" stroke="#c5c1b2" stroke-dasharray="3 3" />
      <text x="734" y="338" font-size="11" fill="#6b6a64">Quiet day — nothing scheduled</text>
      <text x="712" y="386" text-anchor="end" font-size="10" fill="#8a887f">Mon 23</text>
      <rect x="720" y="362" width="208" height="40" rx="14" fill="#fffdf8" />
      <rect x="720" y="362" width="3" height="40" fill="#d19a3f" clip-path="url(#cc-cal4)" />
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
  </svg> <figcaption class="text-center"> The four home screens side by side: Now, Inbox, Schedule, and Media, with the quota mechanics wired in (the OP Bank security lane, a live Posti delivery window, an over-quota Zalando card) and a Spotify media session. </figcaption> </figure>

Media gets a second mention because of what it buys us elsewhere. Google is unlikely to ever ship native Maps or YouTube for a rival OS, and that absence is a large part of how Windows Phone died. So instead of waiting for native apps, the concept makes the _web_ tier first-class: YouTube in the browser gets OS media controls, background playback, and picture-in-picture, and the EU's DMA already makes web distribution a legitimate channel rather than a hack.

## Calm by default: quotas, not vibes

The mechanics underneath are quotas, not vibes. Each sender gets a budget. Verified senders (banks, government, health services) get a higher tier and a badge. Security-critical items are never deferrable. Everything else decays. Information density is not the goal; calm control is.

Windows Phone proved that notification-first can be right and still feel wrong. What was missing was not the idea of tiles. It was the quota layer underneath them.

## Why now, and how it would enter

Europe has no OS of its own, and the reason isn't engineering. Sanctions worked for China because they created a forced shortage that local industry could fill, backed by state coordination and a billion-user market. The EU has none of that. US software isn't just available; it's free and excellent, so the demand never arises. Manufacturing died with Nokia and Ericsson. Capital and procurement are fragmented across 27 regimes. And the EU's instinct is to regulate the foreign platform, the [DMA](https://digital-markets-act.ec.europa.eu/developer-portal/app-distribution_en) and [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), rather than build its own. Regulation has never once produced a European product. The security umbrella removes the last shred of urgency: Europe only thinks about being cut off when Washington hints at it.

So this concept can't wait for demand to arise. It has to create its own small, artificial shortage. That's the wedge market: a small market where our layer is the default and the alternatives are demonstrably worse.

Finland is the natural wedge. Its must-have apps are concentrated and institutionally motivated: the bank apps (OP, Nordea), Kanta for health, Suomi.fi for government services, Posti and Matkahuolto for shipping, payments, and then messaging, where WhatsApp is the genuinely hard one. That same list is the sender-conversion list for the notification protocol. Then partner with a real OEM, big enough to ship volume and small enough to need a story. [HMD](https://www.hmd.com)/Nokia is the natural cultural fit; Vivo and Honor have the hardware but are structurally committed to their own skins. Skip Sailfish-style software-only plays (a decade proves they don't move the market) and skip pure Android overlays: if attention management is optional, why bother? It has to be OEM-default.

The Google question is binary. Shipping the Play Store requires full GMS certification, and you can't have "Play Store but our notification channel" on the same device. So there are two variants. **Variant A** is a de-Googled device plus a curated app wedge: without GMS, parts of the Play Store break (anything needing Google's FCM push, the Maps SDK, or Google payments), and viability comes from the wedge apps running as PWAs or as "email plus a secure action link." Without the wedge it's just a worse phone; with it, it's the sovereign version. **Variant B** is a Google-certified device with our layer as the OEM-default home surface, where verified senders get richer rendering and quota priority while everything else gets an AI-parsed fallback. The recommendation: Variant B first on a mid-tier OEM, Variant A as a second product line in Finland and the Nordics once the wedge apps are ported. On gaming no decision is needed now: a real game wants a real engine, not React Native, and since Variant B ships certified, the Play Store's gaming catalog is present from day one.

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
