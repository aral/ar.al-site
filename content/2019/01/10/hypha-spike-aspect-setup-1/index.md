---
title: "Hypha Spike: Aspect Setup 1"
date: 2019-01-10T12:27:36Z
tags:
  - hypha
draft: false
---

---
__2019/01/10: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/05/hypha-spike-aspect-setup-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

## Philosophy

Your identity – your _self_ – is a _sharded_ aggregate of information[^1]. For an organism to have integrity it must have ownership and control over the aggregate of these various elemental shards that, combined, constitute its being.

In Hypha ([subscribe via RSS](/tags/hypha/index.xml)), I will call these shards _aspects_[^2].

For the purposes of Hypha, an aspect is defined by a secret known only to the person who owns it.

From this secret, we derive two keys[^3]:

  1. A key to obtain and read this aspect (“read key”)
  2. A key to write to this aspect (“write key”)

Anyone with the _read key_ can replicate your aspect and read any unencrypted information in it. The root of an aspect is public information. It is how other people find you.[^4]

Your _write key_ is used both to add to your aspect and, for private information, to encrypt it.

The owner of an aspect can write to it from any device that they own.

The aspect acts as a root index that links to both public and private _collections_ of data. These collections may be _interactions_ and include contributions by multiple people on multiple devices.[^5]

## Scope

This spike will focus on the basics of aspect setup:

1. Enter strong password on web interface
2. Generate ED25519 signing keys (read key and write key[^6]) from password (via Argon2)
3. Generate Curve25519 encryption keys from signing keys
4. Generate root aspect DAT archive using the keys generated in Step 2.
5. Replicate the aspect from a separate node to test that it works as intended (e.g., command-line DAT running on a native client)

All key generation happens on the client. The untrusted server (unprivileged always-on node) must never have the secret key.[^7]

This spike is related to [the Indienet publickey auth spike from last year](https://source.ind.ie/indienet/spikes/security/publickey-auth-feathers-nuxt-sockets). However, I no longer feel that publickey authentication is necessary for the client. The DAT archives are our source of truth, they’re what we replicate, and they already handle authentication. Visibility of sensitive data does not have to be controlled at the web interface level but handled through end-to-end encryption. I am therefore also leaning towards the web interface being a single-page application.[^8]

## Spike notes

  * None yet

## Post-mortem

  * Spike is ongoing.

## Also see

  * [Indienet general cryptography policy](https://indienet.info/other/spikes/security/#general-cryptography-policy)

  * Indienet security spikes ([docs](https://indienet.info/other/spikes/security/), [source](https://source.ind.ie/indienet/spikes/security))

  * [Indienet configuration information docs](https://indienet.info/site/configuration/)

  * [Hypha Spike: Deployment 1](/2019/01/05/hypha-spike-deployment-1/)

[^1]: I include biological aspects in the definition of information because our biology is also, at its fundaments, information like all else.

[^2]: In [DAT](https://datproject.org) terms, an _aspect_ corresponds roughly to a [multiwriter](https://www.datprotocol.com/deps/0008-multiwriter/)/[multifeed](https://github.com/noffle/multifeed) hypercore collection. Neither are entirely fit for purpose in their current state although the former is a better fit for implementing a root aspect while the latter is better suited for implementing individual/group interactions (see [kappa architecture](https://ar.al/2018/12/15/kappa-architecture-workshop/)).

[^3]: This is an [ED25519](https://en.wikipedia.org/wiki/EdDSA) keypair. The public key is the DAT [read key](https://github.com/datprotocol/DEPs/pull/5#issuecomment-447495769). From the signing keys, [we also generate Curve25519 encryption keys](https://indienet.info/site/configuration/#life-cycle-and-uses).

[^4]: On your [always-on node](https://ar.al/2019/01/09/success-criteria-for-the-pc-2.0-era/), it is analogous with your domain name. That said, and crucially, it also exists separately from your domain name (which is still a centralised and commercially-governed identifier). Your read key (more precisely, its _hash_, which we call the _discovery key_) is the canonical address for your aspect. Even if your domain name changes/goes away, your aspect will remain as long as at least one host is available on the network for it to be found and replicated from.

[^5]: Each collection/interaction is also a multifeed kappa architecture data store.

[^6]: While both the read and write keys are considered secrets for collections/interactions, for the root aspect, the read key considered public. It is possible to create a fully private aspect by not linking it to a domain name and not advertising the read key but that is not an initial use case for Hypha. It would be interested to see how it could be implemented with a native DAT browser (currently, [Beaker Browser](https://beakerbrowser.com)).

[^7]: It’s outside the scope of this spike but for future reference: We must protect the system from Evil Host/Evil App Store (or Evil Maid at Good Host, etc.) attacks. Since the setup of the private key happens on the client and must stay on the client unless we are to compromise all security and privacy of the system, we must ensure that the client is not compromised. For native clients, this can be achieved via combination of open source and reproducible builds. For web clients, we can use [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) along with third-party validators/a web of trust.

[^8]: This is because the always-on node/web interface [must be an unprivileged node](https://ar.al/2019/01/09/success-criteria-for-the-pc-2.0-era/). While the core of that requirement concerns the node not having the person’s secret, it also applies to not privileging it through additional functionality. I often say that we are building a bridge between the centralised web ([the Mainframe 2.0 era](http://localhost:1313/2019/01/09/success-criteria-for-the-pc-2.0-era/#fn:1)) but what I’ve so far failed to state is that this is a one-way bridge. The goal isn’t to encourage travel in both direction but travel from Mainframe 2.0 to PC 2.0. So it makes sense to invest as much effort as possible in the forward-looking (native) clients physically owned and controlled by everyday people that we are trying to move them towards instead of the bridge itself. The bridge is essential but it is a means to an end.