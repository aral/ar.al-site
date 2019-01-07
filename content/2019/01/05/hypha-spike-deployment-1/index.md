---
title: "WIP: Hypha Spike: Deployment 1"
date: 2019-01-05T23:40:29Z
tags:
  - hypha
draft: false
---

---
__2019/01/05: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/05/hypha-spike-deployment-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

Wait, what, we’re deploying [Hypha](https://ar.al/2018/12/07/baby-steps/) ([subscribe via RSS](/tags/hypha/index.xml)) – but we haven’t even built it yet?!

Exactly.

## Deployment-first development

Independent technology – [ethical technology](https://ind.ie/ethical-design) – must be as accessible as possible for its intended audience at every step of the process. That doesn’t mean it must be accessible as possible to _everyone_ at every stage in its development but rather it should be accessible as possible for the people that are working on it or with it at any given point.

Hypha is currently at the start of its development stage and thus must be as accessible as possible to developers who want to follow along with its development, run it themselves, and possibly fork it off and try new things with it.

One of the greatest barriers to trying out new free and open source web-related projects is the difficulty in deploying them. This is because nearly all web-related projects are designed as multi-tenant services. They are designed to scale to being used by thousands if not millions or billions of people. And that brings with it a whole slew of complexity.

Case in point: I spent hours and failed the first time I tried to deploy [Mastodon](https://joinmastodon.org)[^1]. One of my developers on the Ghent project last year gave up after struggling with it for most of a day. While I eventually managed to deploy Mastodon for myself initially via a “serverless” Heroku-ish service and, eventually, from source, today I do not maintain my own Mastodon instances. Instead, I offload that complicated and involved task to the wonderful Hugo who runs [masto.host](https://masto.host).

Which brings us to why I’m looking into deployment-first development with Hypha.

## Experience-driven development

Here are the major success criteria for the _Peer Computing_ (PC 2.0[^2]) era, as I see them:

1. Effortlessly own and control your own Always On Node (AON[^3]) on the Internet – either by physically hosting it yourself or having it hosted by a third-party – as part of a peer network of other more precariously-connected nodes that you have physical ownership of.

2. Have the AON, unless it is hosted physically by you, be _less_ privileged than the other nodes. (You should be the sole holder of the keys to the system so only devices you physically control will ever have your password/private key).

3. Have this system be as accessible as possible in totality. That includes criteria such as affordability[^4], ease of getting started (‘onboarding’), usefulness (functionality and usability), etc.

In this spike, I am exploring the first point.

Hypha has to be as easy to deploy as possible. And that means that we must think about deployment from Day 1.

## The post-web is single tenant

Hypha is an exploration of what personal technology means in the digital/networked age. The goal is to create a bridge from the Mainframe 2.0 era to the Peer Computing era. When we talk about scale in peer computing, our focus is on creating systems that are human-scale.

To ensure that the systems we design are human-scale, we must favour:

  * Small over big
  * Simple over complex
  * Clarity over cleverness
  * Inexpensive over expensive

This is not an exhaustive list. But you get the idea.

When designing peer technology, we must nurture a profound respect for the limitations of individuals: whether that is time, knowledge, ability, or psychology. Not because of an elitist preconception about ‘the human condition’ that presupposes that some ill-defined ‘majority’ are lacking in any of those areas but because they constitute scarce resources _for all of us_.

It is no longer permissible to perpetuate silly rights of passage based on the myth that people must work hard to obtain, understand, and therefore _deserve_ the tools that we create. We must put to rest the toxic myth that those who do not use the overly-complicated contraptions we create do so because of a lack of intelligence, ability, or desire. I do not use your crappy confusing dog’s arse of an application not because I do not care about my privacy or because I lack the necessary technical knowledge but because my name is Amanda and I’m a brain surgeon who works over 60 hours a week and has three kids at home. I simply do not have enough hours in the day to devote to deciphering the diarrhoeic mess you just dumped on my lap to save yourself the effort of thinking about anyone else but yourself while developing it. I think it’s time we laid to rest the stereotype of ‘even your grandmother’ and started designing for Amanda instead.

## A system is only as simple as its most complicated part.

Simplicity is our greatest competitive advantage. And a system is only as simple as its most complicated part. This is why we must, at all times, think holistically about the overall simplicity of the system we are designing. Which necessitates that we think about the whole experience from the outset.

Now, I know from first-hand experience that this can be debilitating and result in developer’s block. So we must also proceed with the caveat of “for what is feasible given the current stage of development.” My goal at this point is to make it as simple as possible for other _developers_ to get up and running with Hypha on their own domain and on their own VPS.

We will then iterate on making this a seamless process for everyday people who want to use Hypha as an everyday thing.

My goal is to keep development as modular as possible so that we will, hopefully, get lots of small modules and tools as Hypha progresses.

## Design and scope limitation for the spike

There are two interrelated processes to deploying your own instance of Hypha:

1. Domain registration and/or DNS setup
2. VPS server setup
3. TLS setup

There is a somewhat cyclic relationship between these three steps as they each depend on the other for certain information.

The DNS setup requires the IP address of the server and the server needs to know the domain that it will be responding for. To complicate things a little more, the domain name has to propagate before we can obtain a free TLS certificate from [Let’s Encrypt](https://beakerbrowser.com/).

Also, steps 1 and 2 have a commercial aspect.

For the purposes of this spike, I want to concentrate only on Step 2: automating the VPS server setup.

## Cloud-init

VPS accounts are available for a couple of euros per month these days and many support [the cloud-init standard](https://cloud-init.io/) by Canonical as part of the new instance provisioning process via a ‘user data’ field on their online forms or via their APIs.

In this spike, I’m going to explore using cloud-init to set up a server so that we can automatically:

  * Install the latest Long-Term Support (LTS) version of [Node.js](https://nodejs.org/en/) in a manner that would make it easy to perform updates on it.

  * Clone and run an empty (‘hello world’) version of Hypha.

Thankfully, Canonical has a tool called [multipass](https://github.com/CanonicalLtd/multipass) that lets you easily spin up Ubuntu instances locally [and pass them a cloud-init file](https://blog.ubuntu.com/2018/04/02/using-cloud-init-with-multipass). I’ll be using that to iterate on the cloud-init script.

## Thoughts/to-dos/questions

  * Since TLS setup with Let’s Encrypt depends on domain name propagation, it is the last thing we must do (and is thus outside the scope of this spike).

  * Node.js is perfectly capable as its own server and does not need to be proxied (e.g., by nginx) for single-tenant use.

  * Add link to spike source code repository ⌷

  * How long does server setup take?

  * Test the cloud-init script with a number of different hosts.

## To explore in future spikes

  * Domain registration and DNS setup via third-party service and API.

  * Native app that handles onboarding (domain registration, DNS setup, VPS setup, TLS setup, and app setup) in a seamless experience.

  * As above but with the integration of a payment step for the domain registration and hosting.


[^1]: I love Mastodon. [Here’s mine.](https://mastodon.ar.al/@ind.ie) [Here’s Ind.ie’s.](https://mastodon.ind.ie/@indie) But it’s not personal technology. It is not single tenant. It has the complexity of a system that can host hundreds of thousands of people on a single instance. We are not building that. We are building for instances of one.

[^2]: The four eras of digital computing: ① Mainframe (centralised) → ② Personal Computing (PC 1.0; decentralised) → ③ Web/Cloud (Mainframe 2.0; centralised) → ④ Peer Computing (PC 2.0; decentralised)

[^3]: Pronounced ‘own’. Usage: ‘Do you have an Aon?’

[^4]: Ideally, the core elements will eventually be provided for from our taxes as a public good.