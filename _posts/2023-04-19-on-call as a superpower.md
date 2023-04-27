---
layout: page
title: "🦸 On-call as your superpower"
subtitle: <br> Lessons & advice from scaling on-call
date: 2023-04-27 22:00:00 +0100
---

_In March 2023 I gave a talk about scaling on-call at the Bristol Tekcurious meetup, and this post outlines the talk’s content. I had a great time sharing some of my lessons from over the years and also getting to know so many people afterwards - thanks again to everyone who came along!_

## 📟 On-call in context

First up, when I'm talking about on-call, I'm talking about having a software engineer (or multiple) available 24x7 to respond to important alerts. Those alerts could suggest something has gone wrong, or something needs human intervention _before_ it goes wrong - but regardless, it needs a rapid response.

## ♻️ Monzo's on-call journey

I spent most of the time in the talk sharing what I've learnt from scaling on-call at Monzo over the last few years. We've blogged about this on a few occasions on the Monzo blog (see [this post](https://monzo.com/blog/2018/09/20/on-call), [this post](https://monzo.com/blog/how-weve-evolved-on-call-at-monzo) and [this post](https://monzo.com/blog/2022-02-24/scaling-our-on-call-process) for the originals!). Much of my talk was about bringing the key messages from those three blogs to life, and sharing some of the lessons I've learnt personally along the way.

We start things off with the early days at Monzo - 'the rocketship' phase.

## 🚀 The Rocketship

The early days of on-call used a super simple model. We defined our critical alerts that needed an immediate response, hooked them into PagerDuty to notify someone about it, and then had a group of engineers carry the pager so we could respond. We started out with a single rota with a small group of engineers on-call, and over time as we scaled we grew the number of engineers on-call in total.

A single engineer would be on-call for a week at a time, and they'd be on-call for everything engineering-related at the company. These engineers formed what we called our 'primary' on-call rota, and they were the first point of contact for any alerts. Their job was to either fix the problem, or find someone who could.

The high-level workflow looked something like this:

<p align="center"> 

<img width="500" height="230" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/model1.png?raw=true">

</p>

This served us well for a couple of years - as more engineers joined, we grew the size of our primary rota and cycled more engineers in. Then we added our shadow on-call schedule into the mix too.

The shadow rota meant that we’d have two people on-call at once for all of our systems. The primary on-caller would take the lead on a page, and the shadow on-caller would observe and support. Their main focus was to get comfortable with being on-call, learn how our systems work, and improve our documentation.

It also provided a nice on-ramp to the primary on-call schedule, and opened up some good mentoring opportunities for engineers. When I joined the company in early 2019, this was still the model we were using.  It shows how well a simple on-call model can scale. Maybe something this simple is all you’ll ever need at your company!

### 💭 Pros and cons

🟢 We'd get a human onto a problem very quickly<br>

🟢 On-callers got broad exposure to our platform, and by extension, it provided good learning opportunities for them<br>

🟢 It created strong incentives for engineers to document their code well, write high quality runbooks, and build resilience into their designs. Engineers knew that someone else might be responding to a problem with their services, so built with that in mind<br>

🟠 As we scaled we found it more difficult to onboard new engineers to the rota. As we started to grow as an org and split into different teams, on-callers had to know a lot about our technology<br>

🟠 On-call was a centrally owned process and set up to work in one way. Teams couldn't easily optimise for their own services<br>

🟠 Our resolution times could have been even faster. Our response times were super fast, but sometimes an engineer would be paged and they'd have to spend time building context of the system that was broken<br>

Considering all of this, it was time to evolve things further..

## ⬆️ The Scale Up

The next significant evolution of on-call came around about the time we'd hit our first 1 million customers. We introduced a new layer of 'specialists' who sat under our existing primary/shadow on-call rota. It looked a little something like this:

<p align="center"> 

<img width="650" height="250" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/model2.png?raw=true">

</p>

By now we’d scaled the engineering org to have more dedicated specialist teams. Those teams were working on things like our platform and in specialist payments teams. We found that often it was expertise in these areas that we needed during incidents, and now that we had specialist teams available, it made sense to page them in when they were needed.

We'd staff the specialist rotas with 4-6 engineers from some of these teams, and they were available as a formal escalation path for the primary/shadow on-callers. The process largely worked the same way as before, but the primary/shadow pair of on-call engineers now had quick access to specialist knowledge when they needed it.

### 💭 Pros and cons

🟢 We had quicker access to teams with the right context and knowledge to be able to get them involved <br>

🟢 Our response times remained super fast, and our resolution times sped up too<br>

🟠 We were growing rapidly and hiring lots of new engineers. At times our specialist teams were still building knowledge themselves<br> 

🟠 Where problems clearly needed a specialist, the role of the primary on-caller basically became 1st line triage<br>

🟠 And as a result, there was still some friction in the process to get the right responders<br>

So here comes the next evolution..!

## 🧓 The Mature Org

This was the point where we were a much larger company, serving maybe ~3 million customers, and many of our teams and processes were more mature. We decided to push the alerts closer to what we call ‘collectives’ (aka departments) across Monzo.

We reorganised our on-call schedules to be domain specific. We’d pool together 6-8 engineers from across many teams within a collective, and they’d act as the primary on-callers for critical alerts in their area of expertise. It looked something like this:

<p align="center"> 

<img width="600" height="300" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/model3.png?raw=true">

</p>

An interesting problem to solve here was one of 'how do we route the right alerts to the right teams now we have multiple?!'. We solved this by defining codeowners for each of our microservices and platform components in code, and then mapping that owner to a corresponding PagerDuty schedule. 

For example, If a critical alert fired relating to our Faster Payments processor, it’d be routed to the schedule staffed by Payments engineers as that collective was defined as the service codeowner. 

This model worked very well for us for another 18-24 months:

### 💭 Pros and cons

🟢 The main benefit was that we were skipping the 1st line / primary on-caller step, and going direct to the teams who had engineers working on problems specific to their domain <br>

🟢 We’d greatly increased our chances that the page would land with someone who knows something about that system. Increasingly we wouldn't need to page another team for support - leading to faster resolution times <br>

🟠 But, it still wasn’t perfect and we felt we could do even better - so we evolved things again...

## 🤙 Today

And so here we are with how things are set up today serving our ~7 million customers. We introduced this way of managing on-call around the ~4.5m customer mark.

This process works incredibly well for us right now, and we know it will scale as we grow as a business. We've now completely decentralised on-call - so pages/alerts are routed directly to the individual team that owns them. We respond rapidly, and have the right engineers immediately available to solve any problems - which has seen our resolution times improve again. It looks like this: 

<p align="center"> 

<img width="600" height="300" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/model4.png?raw=true">

</p>

And this is pretty obvious, right? _Of course we'd just route the alert directly to the team that can fix it?_

We were able to do this mainly because our engineering teams were all well established and well staffed by this time to manage their _own_ healthy on-call rotation.  

One of the key benefits with this devolved model of on-call is that teams have been able to optimise their processes to best suit the level of service they need to offer. Engineering Managers in each team are responsible for organising their on-call schedules. It's also down to the teams to set things up appropriately tailored to the systems that they own, and to iterate on and optimise it as necessary.

In previous models on-call was managed centrally by me and a few others, and we were trying to apply a one-size-fits-all approach across all teams. THat worked well for a while, but the model we're iterated towards today means we can optimise to operate our services in the very best way possible. The best outcome for our teams and our customers!

## 🦸 'On-call as your superpower...'

Once I'd covered the history of on-call, I wrapped things up in the talk by sharing three key bits of advice from my personal experience. I shared that when done well, on-call has the potential to become a superpower _and_ an enabler for your business.<br>
<br>

### 👪 1. Put humans at the centre of your on-call process

Design your processes around treating humans well. We’re not machines! As some practical advice, you can consider:

- Giving teams time in hours to investigate deviant system behaviour that they have been paged for

- Giving them time off in lieu if they’ve been paged overnight - and encourage this to be the norm

- Paying engineers for being on-call!

- Empowering teams to to set on-call up in the most optimal way to serve their customers/users

- Encouraging managers to join on-call and get involved by (at least) supporting on-callers as an escalation point. Get them leading by example!

By doing this I've actually seen waiting lists in some teams for engineers to go on-call, which is unheard of! <br>
<br>

### 👺 2. Don't accept deviant system behaviour

This is one of [Monzo's engineering principles](https://monzo.com/blog/2018/06/29/engineering-principles) and it’s served us incredibly well over the years.

If someone is paged, don’t brush it off and think it’s ok. Run an analysis of what happened and stop it from re-occurring. Or if you can’t stop it, define how you can fix it faster next time or respond better.

If you're a leader, give your teams time in-hours to do this, and be especially hard on false alarms. Don’t risk your teams becoming desensitised to alerts that are paging them. <br>
<br>

### ♻️ 3. Set up an effective way to iterate on your on-call process

Make sure you're sharing your on-call lessons across all teams. We have an internal Slack channel where on-callers can share lessons and ask each other for help which has been great for us to help level each other up. We've also ran regular on-call retros to help learning and sharing. We were very good at this in the early days, especially when we were a centralised group of on-callers, and it’s helped get us to where we are today. In a nutshell, listen to what your on-callers are saying you can do to improve, and act on it!

We also run a regular session at Monzo called ’Learning from Incidents’. This is a forum where engineers present an overview of an incident they’ve handled recently to a forum that's open to anyone in the company to join. They nearly always start their stories with being paged for something, and it's a great way to learn from the experiences of other teams. 

And that was that for the talk. I'm incredibly proud of how we've scaled things over the years, and where we're at today - but I expect we'll keep evolving as the needs of our customers and scale of our business change over time. 

Here's hoping that some of my lessons and advice can help you improve on-call wherever you work! 🤞 📟 

<br>

<p align="center"> 
<img width="500" height="300" src="https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/IMG_5164.JPG?raw=true">
</p>

<br>

[Twitter](https://twitter.com/lukebriscoe) -- [LinkedIn](https://www.linkedin.com/in/lbriscoe/) -- [email](mailto:luke@lukebriscoe.com) 
