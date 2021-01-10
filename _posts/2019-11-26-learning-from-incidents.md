---
layout: page
title: 👨‍🏫 Learning from Incidents
date: 2019-11-26T08:00:00+01:00
---

I've given this talk twice now at meetups in the South West, so thought a blog summarising some of the key messages I hoped to get across might be useful 🤓

I first gave the talk at the DevOps&Dine meetup in Cardiff in September, and more recently, at the TekCurious meetup hosted by OVO Energy in Bristol in November. Thanks to both meetups for inviting me to speak!

### **🎯 Objective**

The main objective of this talk is to spark some initial thought and to encourage people to consider a few different ways that they can immediately improve their post-incident learning. The talk covers a couple of different topics, and refers to work from the likes of John Allspaw and Sidney Dekker, which I've complemented with some of my own experiences and what we're doing at Monzo.

I’ve summarised some of the key messages very briefly below, and also included the slides I used in the talk at the end of the blog 📚

### **🗂 Summary**

#### **🔍 Incident debriefs**

Incident debriefs (postmortems, incident wash ups, post incident reviews et al) are probably the most common, and the most crucial part of the process for many organisations when learning from incidents. I talk about how they shouldn’t be all about getting to a root cause; instead focusing on _contributing factors_. In the complex environments we now often operate in, problems are rarely caused by a single, identifiable cause; so why are we often so obsessed with finding one? I also give a quick overview of how Monzo approach their incident debriefs, and how I feel that as a technology industry we’re missing a big opportunity to share our experiences and lessons with each other; critically missing the opportunity to make things better for all of our customers.

#### **🤔 Ask ‘how’ not ‘why’**

I introduce John Allspaw’s article [‘The Infinite How’s](https://www.kitchensoap.com/2014/11/14/the-infinite-hows-or-the-dangers-of-the-five-whys/), and encourage people to consider how the language we use can have a big impact on how much we’re able to learn.

Asking questions that begin with ‘how’ rather than ‘why’ is an incredibly simple, yet effective way to increase learning opportunities, and helps get closer to understanding the contributing factors of an incident than asking ‘why’ does. For example; you’ve had an incident that caused an outage on your platform, and after some investigation you find out that you could have caught the issue if you’d had some more thorough tests in place. Instead of asking ‘Why didn’t you test this’, which immediately puts people on the defensive and can close down potential opportunities to learn, you could phrase the question as ‘How did we decide what tests to run here?’. Asking ‘How’ opens up the narrative, and encourages people to tell their stories and talk more widely about their experiences surrounding an incident.

#### **⚠️ Common challenges with incident debriefs**

I then talk about three of the most common challenges that I’ve seen that really hinder incident debriefs from being an effective environment for learning, and some of the steps organisations can take to combat them:

1. _‘I don’t feel comfortable speaking up if I’ve made a mistake;what if I get fired?!’_
2. _‘I’m going to end up with a load of actions that I’ll never get around to..’_
3. _‘But they take ages to prepare for; I don’t have the time!'_

I also very briefly introduce [Response](https://github.com/monzo/response) 👩‍🚒; an incident management tool built and open sourced sourced by Monzo that can help to address challenge 3 (it has a feature that allows you to capture actions and build a timeline during the incident that takes a lot of the heavy lifting out of the incident debrief preparation stage).

### **🥡 Key takeaways**

I close everything off by encouraging people to take three key messages away:

**🗣 Use language carefully**; ask how, not why

**🎓 Focus on learning**; make your debriefs all about learning rather than being obsessed with finding a root cause, or generating long lists of non-critical actions

**🧰 Invest in your people and tools**; train people to be good debrief attendees as well as facilitators, and use technology to take the pain of preparing for them away

[The slides I used in this talk are available here on Github](https://github.com/lukebriscoe/lukebriscoe.github.io/blob/main/assets/img/Learning-from-Incidents-External-version-1.pdf)
