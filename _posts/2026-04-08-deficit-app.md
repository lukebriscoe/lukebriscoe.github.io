---
layout: page
title: "🏋️‍♂️ Building the Deficit app"
subtitle: "mydeficit.app"
date: 2026-04-08 09:00:00 +0100
tags: [side-projects, engineering]
---
<img src="/assets/img/deficit/landing.png" alt="Deficit app" style="display:block;width:50%;max-width:280px;margin:0 auto 2rem;border-radius:0.75rem;box-shadow:0 8px 24px rgba(0,0,0,0.15);">

I try to keep myself in relatively good shape. Alongside my usual workout/football routines, I’ve also been half-heartedly tracking my calorie intake for the last 18 months. But when the new year hit, I started to take things a little more seriously.<br>
<br>

<b>To help me, I’ve built the <a href="https://mydeficit.app">Deficit app</a></b>. This blog introduces the app and the story behind it.

### 💭 Why I built it
<br>Pre the Deficit app, my daily routine looked something like this:
- Log my workouts and progress with <a href="https://www.hevyapp.com/">Hevy</a>
- Track my workout calories burned using the <a href="https://apps.apple.com/us/app/apple-fitness/id1208224953">Apple Fitness app</a> on my Apple Watch 
- Track my calories consumed using <a href="https://www.myfitnesspal.com/">myfitnesspal</a>
- Use <a href="https://www.eufy.com/uk/collections/smart-scale">eufy smart scales</a> to track my weight, body fat %, and muscle mass
<br>

These apps are good in isolation for the thing I need them to do, but I didn’t have one place where I could pull all of this data together and visualise it easily. So I began logging all of this manually into a Google Sheet each day — looking at things like daily/weekly/monthly total calories consumed/burned, averages, and body composition changes over time.

But after three months, it was starting to become a bit of a pain to manage that spreadsheet from my phone quickly and easily each day.

<br>
So, of course I did what any reasonable engineer in my position would do. I picked up my laptop and burnt through a load of Claude tokens.<br>
<br>

I worked on this over the course of the April 2026 bank holiday weekend in relatively short bursts, and the outcome from that is <a href="https://mydeficit.app">Deficit app</a>. It’s available for you to use for free if a) you struggle with these problems too, and b) you’re happy to send me feedback on how I could make it better.

## 💪 Deficit
<br>
Deficit is a mobile-first web app that tracks calories, macros and body composition. It replicates what my spreadsheet was doing for me, but takes away all of the pain involved with managing weird formulas and an ever-growing data set. 

It takes my daily calorie budget (TDEE — total daily energy expenditure) then combines this with some manual inputs; calories I’ve consumed, calories burned from exercise, my macro split — and then tells me whether I’m in a calorie deficit or surplus (not just today, but across any period I care about).

It also tracks weight and body fat over time, and if I set a target (say, reach 15% body fat by a certain date), it tracks whether my current pace is going to get me there on time, allowing me to change my targets / goals to boost my chances of success.

Here's what it looks like:

<style>
  .deficit-showcase {
    margin: 2rem -1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .deficit-showcase::-webkit-scrollbar { display: none; }
  .deficit-showcase-inner {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem 1rem 1rem;
  }
  .deficit-screenshot {
    flex: 0 0 auto;
    width: 55vw;
    max-width: 180px;
    border-radius: 0.75rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    display: block;
  }
  @media (min-width: 769px) {
    .deficit-showcase { overflow-x: visible; margin: 2rem 0; }
    .deficit-showcase-inner {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      padding: 0;
    }
    .deficit-screenshot { width: 100%; max-width: none; }
  }
</style>

<div class="deficit-showcase">
  <div class="deficit-showcase-inner">
    <img class="deficit-screenshot" src="/assets/img/deficit/today.png" alt="Deficit — Today" />
    <img class="deficit-screenshot" src="/assets/img/deficit/history.png" alt="Deficit — History" />
    <img class="deficit-screenshot" src="/assets/img/deficit/body.png" alt="Deficit — Body" />
    <img class="deficit-screenshot" src="/assets/img/deficit/config.png" alt="Deficit — Config" />
  </div>
</div>

### 👉 Try it!
<br>
It's free, works on any device, and you can install it to your home screen so it basically looks like an app anyway (if you're an iPhone user). <a href="https://mydeficit.app">Sign in with Google to get started</a>.


### 👷‍♂️How I built it
<br>
The product decisions were more interesting than writing the code and working with Claude, in all honesty, but I loved the process of building and iterating on it. For example, removing the manual “save” button when entering inputs at first and replacing it with an auto-save feature had a way bigger impact on the usability of the app than I was expecting. 

The app itself is a React single-page app, built with Vite and styled with Tailwind CSS. Data is stored in Firebase Firestore (a NoSQL document database that syncs in real time), with Firebase Auth handling Google sign-in. Charts are rendered with Recharts, date logic handled by date-fns. I made the call to not bother publishing via an app store and just keep it relatively cheap and hassle free running as a web app.

I’ve not done a lot of frontend work in my career but this was fun to build, and I even had a play around with running my test suite with Vitest which was another technology I’d not worked with before (Claude helped!).

### 🔜 What's next
<br>
I think I could (will) over-engineer this so I’m desperately trying to avoid that — but the long-term vision for me is to be able to also integrate the other apps I’m using that feed in to this (Hevy, Fitness, Myfitnesspal) and package it up as an all-in-one offering. I think that’s at risk of being a pretty bloated product, but I’ll figure that out over time. 

For now I’m just happy I don’t have to manage the spreadsheet.
<br>
<br>

<b><center><a href="https://mydeficit.app">Try out Deficit </a> and let me know your feedback via <a href="mailto:hello@mydeficit.app">hello@mydeficit.app</a>.</center></b>

