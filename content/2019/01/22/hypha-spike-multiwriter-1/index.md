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

  * The current state of multiwriter in the DAT world.

## Notes

### Iteration plan

1. Implement multi-writer via hyperdb
2. Implement multi-writer via multifeed

__General:__ document what’s necessary to implement proper multiwriter (i.e., with ability to both authorise and _de-authorise_ writer nodes). We need to get the ball rolling on this if it isn’t already.

## Postmortem

  * Spike is in progress.

## Reference

  * [Hyperdb authorisation guide](https://github.com/lachenmayer/hyperdb-authorization-guide)
  * [The definitive replication and authorization guide (github issue)](https://github.com/mafintosh/hyperdb/issues/153)
  * [How DAT works](https://datprotocol.github.io/how-dat-works)
