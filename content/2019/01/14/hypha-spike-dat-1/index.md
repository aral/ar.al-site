---
title: "Hypha Spike: DAT 1"
date: 2019-01-14T22:42:02Z
draft: false
---

{{<figure src="replication.jpeg" alt="See caption (browser is on the right, the always-on node and native client are node apps running under Tilix)" caption="Screenshot of data replicated between the browser and the always-on node, and between the always-on node and a native client.">}}

[Source code](https://source.ind.ie/hypha/spikes/dat-1) (See [iteration plan](iteration-plan) for links to specific tags.)

## Design

Following on from [Hypha Spike: Diceware](../../15/hypha-spike-diceware), this spike aims to explore:

  * Creating an in-browser DAT data store using the keys generated in the previous spike
  * Replicating that datastore over a web socket connection with the always-on node and making it available over UTP

## Notes

### Iteration plan

  1. ✔ [Create hypercore in browser using the generated public and private signing keys.](https://source.ind.ie/hypha/spikes/dat-1/tags/create-hypercore)
  2. ✔ [Expose hypercore state and events on the page itself.](https://source.ind.ie/hypha/spikes/dat-1/tags/expose-hypercore-state-on-page)
  3. ✔ [Replicate hypercore to server using websocket connection.](https://source.ind.ie/hypha/spikes/dat-1/tags/replicating)
  4. ✔ [Join hyperswarm and replicate hypercore from server from a native client.](https://source.ind.ie/hypha/spikes/dat-1/tags/hyperswarm-native-replication)


### In-browser hypercore gotcha

When creating a hypercore in browser by manually specifying the read and write keys, you must convert the keys to Node.js’s Buffer type, you cannot use ArrayBuffer. Just submitted [a pull request](https://github.com/mafintosh/hypercore/pull/189) to the hypercore readme to make this explicit as this caught me out initially:

> The `[key]` and `secretKey` are _Node.js_ buffer instances, not browser-based ArrayBuffer instances. When creating hypercores in browser, if you pass an ArrayBuffer instance, you will get an error similar to `key must be at least 16, was given undefined`. Instead, create a Node.js Buffer instance using [Feross‘s](https://github.com/feross) [buffer](https://github.com/feross/buffer) module (`npm install buffer`). e.g.,
> {{<highlight javascript>}}
const storage = someRandomAccessStorage
const myPublicKey = someUint8Array

const Buffer = require('buffer').Buffer
const hypercorePublicKeyBuffer = Buffer.from(myPublicKeyAsUint8Array.buffer)

const hypercore = hypercore(storage, hypercorePublicKeyBuffer)
{{</highlight>}}

## Callback in onwrite hook gotcha

If you implement the `onwrite` hook in the options passed to the hypercore constructor, you must explicitly call the passed callback at the end of your handler (`cb()`) or your appends will not work. ([Pull request to update docs.](https://github.com/mafintosh/hypercore/pull/190))

## WebSocket/replication gotcha with budo and livereload

Initially, I was getting the following errors while trying to replicate over the web socket connection:

### Firefox:

{{<highlight bash>}}
The connection to wss://localhost/livereload was interrupted while the page was loading.
The connection to wss://localhost/hypha/f86a223b93b19929eee4e402480ac4d69ad4d8342b2f39b03f3dfd7d0fafbe93 was interrupted while the page was loading.
{{</highlight>}}

### GNOME web:

{{<highlight bash>}}
[Error] WebSocket connection to 'wss://localhost/livereload' failed: Compressed bit must be 0 if no negotiated deflate-frame extension
[Error] WebSocket connection to 'wss://localhost/hypha/78575ce623d7e7ef8e55c7d888e36f64c4fcea9404b1073ca517f94cc32b08b4' failed: Compressed bit must be 0 if no negotiated deflate-frame extension
{{</highlight>}}

The issue is that budo’s web socket server and mine are clashing. It looks like Jim’s had it turned off also in his Shopping List Example (it defaults to off).

## Postmortem

1. A strong passphrase is [generated via EFF’s Diceware Word List](https://github.com/emilbayes/eff-diceware-passphrase).
2. From the passphrase, Ed25519 (signing) and Curve25519 (encryption) key material is derived via [session25519](https://github.com/jo/session25519).
3. The signing keys are used to create a [hypercore](https://github.com/mafintosh/hypercore) in the browser.
4. The hypercore is replicated via web socket to the unprivileged always-on node (server)
5. The always-on node joins the [hyperswarm](https://github.com/hyperswarm) and announces the hypercore via its discovery key.
6. A native client is run with the _read key_ of the hypercore. It calculates the _discovery key_ from the _read key_ and uses hyperswarm to find and replicate the hypercore from the always-on node that originated in the browser.

## Limitations

This spike proves only _a subset the absolute basics_ of the Hyphanet design. See [areas for future study](#areas-for-future-study).

## Future improvements

  * ✔ [Specify read key as a command-line argument on the native node](https://source.ind.ie/hypha/spikes/dat-1/tags/read-key-as-commandline-argument)

## Areas for future study

  * Browser-to-browser discovery and replication via WebRTC.
  * Multi-write/multi-feed
  * CRDT

## Reference

  * [Jim Pick’s DAT Shopping List demo](https://github.com/jimpick/dat-shopping-list-tokyo) (Tokyo version)
