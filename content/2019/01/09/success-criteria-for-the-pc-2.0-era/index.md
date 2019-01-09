---
title: "Success criteria for the PC 2.0 era"
date: 2019-01-09T12:23:52Z
tags:
  - hypha
  - philosophy
  - peerocracy
draft: false
---

The major success criteria for the _Peer Computing_ (PC 2.0[^1]) era, as I see them:

1. __Own and control your own identifiers.__ You and you alone should decide on your identifiers and your identifiers should be accessible as long as at least one of your devices is accessible on the network. For a concrete example of how this would work, see how data is addressed under the [DAT protocol](https://datproject.org).

2. __No privileged nodes__. The network must not have any privileged nodes, especially ones hosted by third-parties. This does not mean it cannot have third-party hosted nodes. In fact, it is a prerequisite for bootstrapping such a system in an accessible manner that we have always-on nodes hosted by third parties (see _always-on node_, below). It does mean, however, that such nodes must be less-privileged than nodes that are under the physical control of people. Basically, this means that such nodes must never have the person’s private key.

2. __Effortlessly own and control your own always-on node[^2] on the Internet.__ For PC 2.0 to be adopted as _an everyday thing by everyday people_, it must provide the same (if not better) levels of _findability_ and _availability_ as centralised systems. This is simply not possible in a purely peer-to-peer network, at least in its early stages. The always-on node is training wheels for the peer-to-peer network we are building. It is the supports we print when doing 3D printing. We might be able to remove them one day (and we should design it so that it can be removed) but without it, the whole thing would collapse from the start.

  You can either physically host your always-on node yourself[^3] or have it hosted by a third-party[^4]. The always-on node is part of a personal peer-to-peer network of other more precariously-connected nodes that you have physical ownership of (e.g., your phone, laptop, home assistant, car, etc.)

3. Have the always-on node, unless it is hosted physically by you, be _less_ privileged than the other nodes. (You must be _the sole holder of the keys_ to the system so only devices you physically control will ever have your password/private key).

4. Have this system be as accessible, usable, and pleasurable as possible in totality. That includes criteria such as affordability[^5], ease of getting started (‘onboarding’), usefulness (functionality and usability), etc.

[^1]: The four eras of digital computing: ① Mainframe (centralised) → ② Personal Computing (PC 1.0; decentralised) → ③ Web/Cloud (Mainframe 2.0; centralised) → ④ Peer Computing (PC 2.0; decentralised)

[^2]: In colloqual usage, we could call it an “own node” or a _peer_ and/or _person cloud_ (both of which also fit the PC 2.0 acronym). I was originally thinking that we could call it AoN (pronounced, “own”) but thanks to [Lily](https://lily.network/@millenomi) for reminding me that we don’t need [yet another weird acronym](https://lily.network/@millenomi/101383290368446261), I’ve reconsidered that.

[^3]: This might be, for example, using a single-board computer like a Raspberry Pi or, perhaps even with the computer that comes pre-installed in your new home. (I know that certain new developments in Sweden, for example, are being wired with networked computers at construction-time. The nature of the software on these systems will determine whether your next house is a home or a panopticon.)

[^4]: The cost of VPS accounts is now a couple of euros a month and new instances can be spun up almost instantly either using automated scripts or pre-baked server images.

[^5]: Ideally, the core elements will eventually be [provided for from our taxes as a public good](https://2018.ar.al/notes/encouraging-individual-sovereignty-and-a-healthy-commons/).
