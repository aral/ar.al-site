---
title: "Hypha Spike WebRTC 1"
date: 2019-01-19T15:15:58Z
draft: true
---

---
__2019/01/19: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/19/hypha-spike-webrtc-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

## Design

Following on from [Hypha Spike: DAT 1](../../15/hypha-spike-dat-1), this spike aims to:

  * Replicate a hypercore from browser-to-browser using WebRTC.

## Notes

### Iteration plan

1. Create a simple single-page web application that replicates a passed read key (equivalent to the native replication script)

### Usage

1. Run the Hypha DAT-1 Spike in a separate browser and note the hyphalink.

2. Run a local instance of signalhub
    {{<highlight sh>}}
    npm install -g signalhub
    cd <dat-1-spike-directory>/server
    signalhub listen -p 445 --key localhost-key.pem --cert localhost.pem
{{</highlight>}}

3. Enter the hyphalink from the DAT-1 Spike and press the _Connect_ button.

## Postmortem

  * Spike is in progress.

## Reference

  * [Joe Hand’s Hyperdb web example](https://github.com/joehand/hyperdb-web-example/blob/master/index.js)

