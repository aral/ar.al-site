---
title: "Hypha Spike: Dat 1"
date: 2019-01-14T22:42:02Z
draft: false
---

---
__2019/01/14: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/15/hypha-spike-dat-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

[Source code](https://source.ind.ie/hypha/spikes/dat-1)

## Design

Following on from [Hypha Spike Aspect Setup 1](../../10/hypha-spike-aspect-setup-1), this spike aims to explore:

  * Creating an in-browser DAT data store using the keys generated in the previous spike
  * Replicating that datastore over a web socket connection with the always-on node and making it available over UTP

## Notes

  * Refactored to use budo so I can use requires, etc., however getting an error due to Chokidar (`Error: Cannot find module 'fsevents' from '/home/aral/ind.ie/hypha/spikes/dat-1/node_modules/chokidar/lib'`) on Linux.

## Postmortem

  * Spike in progress

## Reference

  * [Jim Pick’s DAT Shopping List demo](https://github.com/jimpick/dat-shopping-list-tokyo) (Tokyo version)
