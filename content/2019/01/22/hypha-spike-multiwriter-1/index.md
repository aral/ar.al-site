---
title: "Hypha Spike: Multiwriter 1"
date: 2019-01-22T13:00:03Z
draft: false
---

---
__2019/01/22: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/22/hypha-spike-multiwriter-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

## Design

Following on from [Hypha Spike: WebRTC 1](../../15/hypha-spike-webrtc-1) and [Hypha Spike: DAT 1](/../../14/hypha-spike-dat-1/), this spike aims to explore:

  * Explore the current state of multiwriter in the DAT world.

## Notes

### Iteration plan

1. Implement multi-writer via [hyperdb](https://github.com/mafintosh/hyperdb)
2. Implement multi-writer via [multifeed](https://github.com/noffle/multifeed)

__General:__ document what’s necessary to implement proper multiwriter (i.e., with ability to both authorise and _de-authorise_ writer nodes). We need to get the ball rolling on this if it isn’t already.

## Further thoughts on device authorisation

{{<figure src="multiwriter-key-derivation-whiteboard.jpeg" alt="Whiteboard sketch showing two regular nodes and the always-on node. The keys for the regular nodes are derived from the master key." caption="Whiteboard sketch: thoughts on device keys and authentication in Hypha">}}

As initially posted in the [Datproject discussion room](https://gitter.im/datproject/discussions?at=5c484da98318994524359c04).

Been giving device authorisation in multiwriter some more thought and, contrary to my initial knee-jerk reaction, I think it can be done within the limitations of the current system. It should be possible to handle lost/stolen devices as long as the write key (secret key/private key) is never stored on any device. Since I’m using key derivation from a Diceware passphrase salted with the unique domain in Hypha, this should be easy to support in a usable manner (the passphrase has to be stored in a password manager – or a brain better than mine ­– anyway). So I’m thinking that the master passphrase will not be tied to any hypercore and every device’s writeable hypercore will derive its keys from the master key with the name of the device used as the salt. This means that on any node where the person enters the passphrase and the name of the device to be authorised is known, its public (and private) key can be calculated and the device authorised in the local hypercore. If a device is lost/stolen, lack of the passphrase will disallow further writing. Of course, this requires that the device is properly secured at other layers in the stack (i.e., auto lock, password on lock, full-disk encryption).

## Postmortem

  * Spike is in progress.

## Reference

  * [Hyperdb architecture](https://github.com/mafintosh/hyperdb/blob/master/ARCHITECTURE.md)
  * [Hyperdb authorisation guide](https://github.com/lachenmayer/hyperdb-authorization-guide)
  * [The definitive replication and authorization guide (github issue)](https://github.com/mafintosh/hyperdb/issues/153)
  * [How DAT works](https://datprotocol.github.io/how-dat-works)
