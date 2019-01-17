---
title: "(WIP) Hypha Spike: DAT 1"
date: 2019-01-14T22:42:02Z
draft: false
---

---
__2019/01/14: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/15/hypha-spike-dat-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

[Source code](https://source.ind.ie/hypha/spikes/dat-1)

## Design

Following on from [Hypha Spike: Diceware](../../15/hypha-spike-diceware), this spike aims to explore:

  * Creating an in-browser DAT data store using the keys generated in the previous spike
  * Replicating that datastore over a web socket connection with the always-on node and making it available over UTP

## Notes

### Iteration plan

  1. Create hypercore in browser using the generated public and
  2. Replicate hypercore to server using websocket connection
  3. Replicate hypercore from server via native client

### In-browser hypercore

Gotcha: When creating a hypercore in browser by manually specifying the read and write keys, you must convert the keys to Node.js’s Buffer type, you cannot use ArrayBuffer. Just submitted [a pull request](https://github.com/mafintosh/hypercore/pull/189) to the hypercore readme to make this explicit as this caught me out initially:

> The `[key]` and `secretKey` are _Node.js_ buffer instances, not browser-based ArrayBuffer instances. When creating hypercores in browser, if you pass an ArrayBuffer instance, you will get an error similar to `key must be at least 16, was given undefined`. Instead, create a Node.js Buffer instance using [Feross‘s](https://github.com/feross) [buffer](https://github.com/feross/buffer) module (`npm install buffer`). e.g.,
> {{<highlight javascript>}}
const storage = someRandomAccessStorage
const myPublicKey = someUint8Array

const Buffer = require('buffer').Buffer
const hypercorePublicKeyBuffer = Buffer.from(myPublicKeyAsUint8Array.buffer)

const hypercore = hypercore(storage, hypercorePublicKeyBuffer)
{{</highlight>}}

## Postmortem

  * Spike in progress

## Reference

  * [Jim Pick’s DAT Shopping List demo](https://github.com/jimpick/dat-shopping-list-tokyo) (Tokyo version)
