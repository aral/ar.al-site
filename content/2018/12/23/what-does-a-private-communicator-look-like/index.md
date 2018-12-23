---
title: "What does a private communicator look like?"
date: 2018-12-23T19:22:13Z
draft: false
---

{{<figure src="snap-on-air-lora-communicator.jpg" alt="The SnapOnAir Lora communicator circuit board with buttons and a screen." caption="The SnapOnAir Lora CommunityCator lets you message without a SIM card.">}}

[Hypha](/tags/hypha/index.xml) is not about building a single product. It’s about exploring the possibilities and problem domain of private communication and what it means to have technology that enables privacy (and therefore personhood). At the same time, it isn’t about designing from the inside out. It’s not about building the protocols and waiting for the tools to happen. It’s about experimenting with both. And, in the process, hopefully sparking one or more everyday things that enable people to communicate with privacy.

So what could some of those everyday things be?

  * A purely ephemeral private P2P communicator.
  * A private communicator with stored/replicated history.
  * A personal web “site” that enables public publishing alongside acting as an always-on, always, available node to enable findability, signalling, and availability in an otherwise peer-to-peer system.
  * …

Given that we have to build a bridge, in every sense, from the centralised world we live in to the peerocratic world we want, the initiatives we embark on have the unenviable requirement of being successful in both worlds.

They must be economically viable, at least on a small scale, in the current world (so that, at the very least, we can feed ourselves and continue to work on them[^1]), and they have to be successful in enabling a new peerocratic infrastucture for society to safeguard personhood and usher in equitable, just, and sustainable peerocratic governance structures. In order to do either, the way people use and experience these platforms must be through convenient, usable, everyday things.

But what will these things look like?

Will they be purely virtual and accessed via apps or browsers on mainstream platforms? (Will mainstream platforms allow them to exist should they become successful?)

Will they be physical and self-contained? Possibly with control over the whole stack? Will they resemble the [SnapOnAir Lora communicator](http://www.snaponair.com/) by Philippe Cadic or the prototype communicator shown below by [arturo182](https://github.com/arturo182)?

<figure>
  <video controls poster='https://i.vimeocdn.com/video/748073806.jpg?mw=1900&mh=1900&q=70'>
    <source src='https://player.vimeo.com/external/307996441.m3u8?s=b03d35e3e292bd8f34dfc1469b1a4eb10207d758' type='video/mp4'>
    <source src='https://player.vimeo.com/external/307996441.hd.mp4?s=dddbfefffa2a54732cedfdd41d228b4fab082740&profile_id=174' type='video/mp4'>
  </video>
  <figcaption>arturo182’s communicator prototype in action</figcaption>
</figure>

Will we snap them together ourselves from readily available and/or free and open components, like the little touch-screen device below that I was snapped together this weekend that’s running a P2P replicated chat app in Node.js that uses kappa-core?[^2]

Will they be combinations of the above?

With Hypha, it’s clear what shape our core protocols will have[^3]. What I’m looking forward to exploring in the coming year is the shapes the tools will take as we explore the problem space to solve specific use cases.

The protocols, without the convenient everyday things that enable everyday people to utilise them, are simply the theoretical ejaculate of masturbatory academics.

The tools, without the protocols that ensure privacy are not fit for purpose.

Here’s what I do know:

Whatever we build must be…

  * Small
  * Focused
  * Verifiable
  * Usable
  * Convenient
  * Useful

Where the centralised mainstream’s advantage is scale, complexity, and secrecy, ours is lack of scale, simplicity, and openness.

We must think _small_.

I look forward to exploring the small things in 2019.

[^1]: And/or we must try to educate policymakers and nurture the political will fund the independent organisations that make these platforms from the commons for the common good and ensure that their products remain in the commons and cannot be enclosed. But I’m not holding my breath on this one. Not least because lobbying, revolving doors, public-private partnerships, and multistakeholderism – collectively, instutional corruption – makes it very difficult to get politicians and policymakers to embrace what is right instead of what is good for their wallets or what they’re exposed to day in, day out from corporate public relations departments.
[^2]: [Kappa architecture](/2018/12/15/kappa-architecture-workshop/) (append-only logs with streaming views) with end-to-end encrypted content for private messages, replicated via the [DAT](https://datproject.org) [protocol](https://datprotocol.github.io/book/). Depending on the use case, [a CRDT](https://indienet.info/other/spikes/crdt/) like [LSEQ](https://hal.archives-ouvertes.fr/hal-00921633/document) can be used at the content layer.