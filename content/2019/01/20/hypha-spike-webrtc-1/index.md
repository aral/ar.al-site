---
title: "Hypha Spike: WebRTC 1"
date: 2019-01-20T14:08:58Z
draft: false
---

{{<figure src="webrtc-browser.jpeg" alt="Two browser windows, side-by-side. The left one is running the DAT 1 spike, the right one this one. Data has replicated between them." caption="A hypercore replicating over WebRTC between two browsers">}}

[Source code](https://source.ind.ie/hypha/spikes/webrtc-1)

## Design

Following on from (and in conjunction with) the [Hypha Spike: DAT 1](../../15/hypha-spike-dat-1), this spike aims to:

  * Replicate a [hypercore](https://github.com/mafintosh/hypercore) from browser-to-browser using WebRTC.

## Notes

### Iteration plan

1. Create a simple single-page web application that replicates a passed read key (equivalent to [the native replication script](https://source.ind.ie/hypha/spikes/dat-1/blob/master/native/index.js))

### Usage

{{<figure src="webrtc-terminal.jpeg" alt="The DAT 1 spike, this spike, and signalhub running in three terminal windows tiled in quarters in Tilix (the fourth terminal window is empty at my site’s directory)" caption="The servers">}}

1. Run the [Hypha DAT 1 Spike](https://source.ind.ie/hypha/spikes/dat-1) ([blog post](../../15/hypha-spike-dat-1)) in a separate browser and copy the hyphalink.

2. Run a local instance of [signalhub](https://github.com/mafintosh/signalhub)
{{<highlight sh>}}
npm install -g signalhub
cd <dat-1-spike-directory>/server
signalhub listen -p 445 --key localhost-key.pem --cert localhost.pem
{{</highlight>}}

3. Paste the hyphalink into the _hyphalink_ field and press the _Connect_ button.

## Postmortem

  * No special notes/gotchas. Worked out of the box.

## Reference

  * [Joe Hand’s Hyperdb web example](https://github.com/joehand/hyperdb-web-example/blob/master/index.js)
