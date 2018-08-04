---
title: "Multiwriter Dat could power the next Web"
date: 2018-08-04T23:18:16+01:00
draft: false
---

<figure>
  <video controls poster='https://i.vimeocdn.com/video/717451773.jpg?mw=2880&mh=1620&q=70'>
    <source src='https://player.vimeo.com/external/283218705.hd.mp4?s=c93938a844ce574d8a27a7796bedb206a4f08f2a&profile_id=174' type='video/mp4'>
  </video>
  <figcaption>A demonstration of multiwriter Dat from the sample app by Jim Pick.</figcaption>
</figure>

Dat is an exciting new technology that enables you to synchronise data privately and in a peer-to-peer fashion. It uses the same underlying concepts as blockchain[^1], sans global consensus[^2]. It is run by the not-for-profit [Code for Science &amp; Society](https://codeforscience.org/) and the community has top-notch people like [Mathias Buus](https://github.com/mafintosh), [Tara Vancil](https://taravancil.com/), [Karissa McKelvey](https://okdistribute.xyz/), and [Jim Pick](https://jimpick.com/).

Dat is currently implemented in Node.js[^3] and made up for numerous smaller components including [HyperDB](https://github.com/mafintosh/hyperdb), a distributed scalable database, and [Hyperdrive](https://github.com/mafintosh/hyperdrive). The [Dat commandline app](https://github.com/datproject/dat) and [Dat desktop app](https://github.com/dat-land/dat-desktop) both rely on [Dat Node](https://github.com/datproject/dat-node), which in turn uses Hyperdrive.

There is also [Beaker Browser](https://beakerbrowser.com/), which is a peer Web browser you can use to both view and fork/edit peer Web sites like mine. (To view this site on the peer Web, open the following URL in Beaker Browser: [dat://ar.al](dat://ar.al).)

### Multi-writer Dat

Dat is currently single-writer, meaning that although anyone with the archive’s key[^4] can read from the archive, only the original author can write to it. However, work is already underway to implement _multi-write support_ in Dat. In fact, it’s already in HyperDB and in the [HyperDB back-end branch of Hyperdrive](https://github.com/mafintosh/hyperdrive/tree/hyperdb-backend). And that is what Jim Pick used to create the [Collaborative Dat Shopping List](https://dat-shopping-list.glitch.me/) application that I demonstrate in the video, above.

Multi-writer Dat is hugely exciting. It opens up a plethora of potential use cases – anything from a peer-to-peer iCloud to peer-to-peer secure messaging. We’re witnessing the birth of the foundations of the next Web; the peer Web. We will see this implemented at the operating system level of future free-and-open mobile and desktop devices. 

I cannot stress enough how groundbreaking Dat is or how important it is to creating a free and open, decentralised, and interoperable world. It’s rare to encounter a technology that you feel could have this potential and rarer still when the people behind it are doing it for entirely the right reasons. I say rare, but what I really mean is unprecedented.

You can find out more about Jim’s Dat Shopping list by reading [his blog post](https://blog.datproject.org/2018/05/14/dat-shopping-list/) and learn more about Dat (and try it out) on the [Dat homepage](https://datproject.org).

[^1]: [The protocol](https://www.datprotocol.com/) is based on Directed Acyclic Graphs/Merkle trees, public-key cryptography, and a mechanism for sparse replication. You can read up about it in depth in the [DAT whitepaper](https://github.com/datproject/docs/blob/master/papers/dat-paper.md).

[^2]: So there’s no proof of work and it’s not meant for creating cryptocurrencies because it is not a right-libertarian get rich quick scheme.

[^3]: Although there are efforts underway to implement it on other platforms, like [Rust](https://github.com/datrs).

[^4]: More precisely, the archive’s public key, which – confusingly – should _not_ be made public as it is used to encrypt the archive. While this makes perfect sense when you understand [how Dat’s cryptography works](https://blog.datproject.org/2017/09/21/dat-cryptography/), it can be confusing to explain and that’s why I’ve started referring to the public key as just “the key” as that feels safer even if it’s less accurate technically. Revealing the public key gives anyone who has it read-only access to the archive addressed by that key. For this reason, when Dat does discovery, it doesn’t broadcast the public key. It broadcasts a cryptographically-secure hash of the key instead. In a nutshell, anyone who has your private key can _write_ to your Dat archive and anyone who has your public key can _read_ it. To ensure the privacy of your archives, you should share neither.
