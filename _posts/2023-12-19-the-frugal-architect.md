---
layout: page
title: "💷 The Frugal Architect"
subtitle: <br> Reflections on Werner Vogels keynote session at AWS re:Invent
date: 2023-12-19 14:00:00 +0000
---
<p align="center"> 
  <img width="600" height="300" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/DALL%C2%B7E%202023-12-19%2013.31.05%20-%20A%20digital%20illustration%20for%20a%20blog%20article%20about%20frugal%20architecture%20in%20cloud%20computing.%20The%20scene%20is%20a%20modern,%20sleek%20office%20environment%20with%20large%20pan.png?raw=true">
</p>

I was lucky enough to head over to Vegas earlier this month for AWS re:Invent. We had a couple of speaking slots to talk about the work we’ve done at Monzo over the last year, and it was my first taste of a conference of this size. I’d say _surreal_ is the word.

While there, I had the opportunity to go to [Werner Vogels' keynote](https://www.youtube.com/watch?v=UTRBVPvzt9w) (it's worth a watch if you have the time - even just for the production value!). He spent a big chunk of it introducing ["The Frugal Architect"](https://thefrugalarchitect.com/). 

This resonated with me personally as a few years back I had one of those moments of realisation that the AWS bill was getting too big. Ever since, a day hasn’t passed without me contemplating cloud cost optimisation.

This post is a roundup of the key themes Vogels introduced, with a sprinkling of how I think this applies to engineering teams (with an obvious bias towards Platform given my current responsibilities 😄).

(On a lighter note, I found it amusing yet insightful to hear the CTO of a leading cloud provider emphasise the importance of controlling spend – but better spent with them than a competitor, I guess...)

## 3️⃣ Three pillars of frugality
I like the way he grouped the key laws into three pillars of *Design, Measure*, and *Optimise*.

I’m intending to use these deliberately with my teams next year as I think it provides a nice condensed way of thinking about cost optimisation. I also think the law themselves do a good job of framing cloud frugality as something that every engineer needs to care about, not just the team who operate the platform. Let’s briefly dig in to each of these pillars.

### 🎨 Design

- *Cost is a non-functional requirement*
- *Systems that last align cost to business*
- *Architecting is a series of trade-offs*

But how do you do this? For me this means treating cost as a first class citizen regardless of what area of the business you’re working in. My experience running platform teams that abstract away complexity for engineers (so they can focus on building great products for customers and not solving infra-related problems) is that we can often abstract away the cost from them too. If you operate a central platform, there's a risk cost becomes *your* problem to solve rather than something that’s considered upfront by the teams building.

Aligning cost to business makes sense to me - do you understand the true cost of offering your product/feature?  Establishing how much you’re willing to spend on operating a product or feature is a key first step - and you can make the right trade offs from then on.

*A genuine question that I’d love to hear from you about – how do you integrate cost considerations into your design processes?*


### 📊 Measure

- *Unobserved systems lead to unknown costs*
- *Cost aware architectures implement cost controls*

I think this pillar is obvious (especially if you’ve had to solve any kind of cost problem in the past). If you don’t know what you’re spending, you can’t track it. And if you can’t track it, how will you know what to optimise?

If you’re watching Vogels’ talk back, I really liked the example used about the identical houses in Amsterdam who had wildly varying energy consumption. Turns out that the houses who had their energy meters visible in the hallway for residents consumed significantly less energy than the ones who had theirs in the basement…


### 📉 Optimise

- *Cost optimisation is incremental*
- *Unchallenged success leads to assumptions*

‘Cost optimisation is incremental’ is probably my favourite law of them all. Reaffirming that cost optimisation is never ‘done’ is an important message for teams internally. Set up your observability, put sensible thresholds and alerts in place, and keep deliberately chipping away at it - just as you would your technical debt. Sounds super obvious, right...but are you doing it?!


## 🤾 Frugal architecture in practice
Embracing the role of a frugal architect isn’t just about cutting costs. It’s more than that - it’s about every engineer taking responsibility for making sustainable, well considered decisions about how and when to build. 

Broadly I felt validated that I'm approaching the problem of cost control and optimisation in the ‘right’ way so far. It provides a useful framework that we can apply in our environments to make the point that spending money sensibly is the responsibility of _all_ engineers.

I’d love to hear from you about the various tools and approaches you’ve found effective — feel free to get in touch!

<center>All images in this post were generated using DALL-E</center>
