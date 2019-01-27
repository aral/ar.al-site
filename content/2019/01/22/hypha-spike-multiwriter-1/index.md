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

  * Signalhub is now integrated into the server. You do not have to run it separately for WebRTC.

### Issues

  * Only the last added item is being replicated over TCP and WebRTC. All items are being replicated correcly over WebSocket. Why?

### Iteration plan

1. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-1/tags/initial)) Implement multi-writer via [hyperdb](https://github.com/mafintosh/hyperdb)
2. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-1/tags/signalhub)) Integrate Signal Hub*
3. Integrate WebRTC client*
4. Mirror the spike to GitHub*
4. Solve the replication issue over TCP and WebRTC

\* These are all to make it simple for others to clone and run the spike with minimal effort.

__Pushed to later iteration:__

* Implement multi-writer via [multifeed](https://github.com/noffle/multifeed)

__General:__ document what’s necessary to implement proper multiwriter (i.e., with ability to both authorise and _de-authorise_ writer nodes). We need to get the ball rolling on this if it isn’t already.

## Limitations

  * It’s currently not possible to specify your own key material for the root hypercore in hyperdb. This means we cannot use hyperdb out of the box with the keys generated from our diceware passphrase. (TODO: Link to issue)

## Bugs

  * Only the last item added before and any items added after replication begins are replicated via WebRTC (the latter requires `{live: true}` in the `options`.) This does not manifest in replication over WebSocket.

## Further thoughts on device authorisation

{{<figure src="multiwriter-key-derivation-whiteboard.jpeg" alt="Whiteboard sketch showing two regular nodes and the always-on node. The keys for the regular nodes are derived from the master key." caption="Whiteboard sketch: thoughts on device keys and authentication in Hypha">}}

As initially posted in the [Datproject discussion room](https://gitter.im/datproject/discussions?at=5c484da98318994524359c04):

Been giving device authorisation in multiwriter some more thought and, contrary to my initial knee-jerk reaction, I think it can be done within the limitations of the current system. It should be possible to handle lost/stolen devices as long as the write key (secret key/private key) is never stored on any device. Since I’m using key derivation from a Diceware passphrase salted with the unique domain in Hypha, this should be easy to support in a usable manner (the passphrase has to be stored in a password manager – or a brain better than mine ­– anyway).

So I’m thinking that the master passphrase will not be tied to any hypercore and every device’s writeable hypercore will derive its keys from the master key with the name of the device used as the salt. This means that on any node where the person enters the passphrase and the name of the device to be authorised is known, its public (and private) key can be calculated and the device authorised in the local hypercore.

If a device is lost/stolen, lack of the passphrase will disallow further writing. Of course, this requires that the device is properly secured at other layers in the stack (i.e., auto lock, password on lock, full-disk encryption).

## Postmortem

  * Spike is in progress.

## Reference

  * [Hyperdb architecture](https://github.com/mafintosh/hyperdb/blob/master/ARCHITECTURE.md)
  * [Hyperdb authorisation guide](https://github.com/lachenmayer/hyperdb-authorization-guide)
  * [The definitive replication and authorization guide (github issue)](https://github.com/mafintosh/hyperdb/issues/153)
  * [How DAT works](https://datprotocol.github.io/how-dat-works)
  * [Hyperlog-style semantics with hypercore/hyperdb?](https://github.com/mafintosh/hyperdb/issues/58)
  * [Multiwriter hyperdb WIP pull request](https://github.com/mafintosh/hyperdrive/pull/204)

## Historic links (Heartbeat – 2014)

[Heartbeat](https://2017.ind.ie/heartbeat/) was the initial precursor to Hypha. We were limited by lack of control over the replication engine we had chosen ­(syncthing). Other limitations were: it was single writer/device, it had a privileged centralised signalling server. That said, it basically used [kappa architecture](http://localhost:1313/2018/12/15/kappa-architecture-workshop/) (although the term was independently being coined at about the same time) and did solve some of the same challenges we need to solve now using the Dat protocol/ecosystem. The design is very close to that of [Cabal](https://github.com/cabal-club/cabal) but with the addition of authentication and private messaging.

  * [Heartbeat pre-alpha release](https://forum.ind.ie/t/heartbeat-pre-alpha-release/740)
  * [Heartbeat conceptual design](https://forum.ind.ie/t/pre-alpha-conceptual-design/25)
  * [Heartbeat technical design](https://forum.ind.ie/t/pre-alpha-technical-design/42)
  * [Heartbeat sequence diagrams](https://forum.ind.ie/t/pre-alpha-core-sequence-diagrams/34)

## Interesting links

  * [DatFS](https://github.com/fsteff/DatFS)
  * [Hyperidentity](https://github.com/poga/hyperidentity)
  * [hypercore-encrypted](https://github.com/aral/hypercore-encrypted)
  * [hyperdb-encrypted](https://github.com/fsteff/hyperdb-encrypted)
