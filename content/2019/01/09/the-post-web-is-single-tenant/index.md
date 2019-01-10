---
title: "The post-Web is single tenant"
date: 2019-01-09T12:38:52Z
tags:
  - hypha
  - philosophy
  - peerocracy
draft: false
---

Hypha ([subcribe to updates via RSS](/tags/hypha/index.xml)) is an exploration of what personal technology means in the digital/networked age. The goal is to create a bridge from the Mainframe 2.0 era to the Peer Computing (PC 2.0) era[^1]. When we talk about scale in peer computing, our focus is on creating systems that are human-scale.

To ensure that the systems we design are human-scale, we must favour:

  * Small over big
  * Simple over complex
  * Clarity over cleverness
  * Inexpensive over expensive

This is not an exhaustive list. But you get the idea.

For Hypha, it means that the always-on node is a single-tenant application/server.

This focus means that we can remove a host of complexity from the design and keep things small, manageable, and inexpensive.

When designing peer technology, we must nurture a profound respect for the limitations of individuals: whether that is time, knowledge, ability, or psychology. Not because of an elitist preconception about ‘the human condition’ that presupposes that some ill-defined ‘majority’ are lacking in any of those areas but because they constitute scarce resources _for all of us_.

It is no longer permissible to perpetuate silly rights of passage based on the myth that people must work hard to obtain, understand, and therefore _deserve_ the tools that we create. We must put to rest the toxic myth that those who do not use the overly-complicated contraptions we create do so because of a lack of intelligence, ability, or desire. I do not use your crappy confusing dog’s arse of an application not because I do not care about my privacy or because I lack the necessary technical knowledge but because my name is Amanda and I’m a brain surgeon who works over 60 hours a week and has three kids at home. I simply do not have enough hours in the day to devote to deciphering the diarrhoeic mess you just dumped on my lap to save yourself the effort of thinking about anyone else but yourself while developing it. I think it’s time we laid to rest the stereotype of ‘even your grandmother’ and started designing for Amanda instead.

## A system is only as simple as its most complicated part.

Simplicity is our greatest competitive advantage. And a system is only as simple as its most complicated part. This is why we must, at all times, think holistically about the overall simplicity of the system we are designing. Which necessitates that we think about the whole experience from the outset.

Now, I know from first-hand experience that this can be debilitating and result in developer’s block. So we must also proceed with the caveat of “for what is feasible given the current stage of development.” My goal [at this point](/2019/01/05/hypha-spike-deployment-1/) is to make it as simple as possible for other _developers_ to get up and running with Hypha on their own domain and on their own VPS.

We will then iterate on making this a seamless process for everyday people who want to use Hypha as an everyday thing.

My goal is to keep development as modular as possible so that we will, hopefully, get lots of small modules and tools as Hypha progresses.

## See also

  * [Success criteria for the PC 2.0 era](/2019/01/09/success-criteria-for-the-pc-2.0-era/)
  * [Deployment-first development](/2019/01/09/deployment-first-development/)
  * [Hypha deployment 1 spike](/2019/01/05/hypha-spike-deployment-1/)

[^1]: The four eras of digital computing: ① Mainframe (centralised) → ② Personal Computing (PC 1.0; decentralised) → ③ Web/Cloud (Mainframe 2.0; centralised) → ④ Peer Computing (PC 2.0; decentralised)
