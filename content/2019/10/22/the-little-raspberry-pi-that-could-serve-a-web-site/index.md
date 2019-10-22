---
title: "The little Raspberry Pi that could (serve a web site)"
date: 2019-10-22T18:08:06+01:00
draft: false
---

Yesterday, I asked folks following me [on my Mastodon](https://mastodon.ar.al/@aral)[^1], if they’d help me blow up my [Raspberry Pi Zero W](https://magpi.raspberrypi.org/articles/pi-zero-w):

<iframe src="https://mastodon.ar.al/@aral/103001447721807970/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

## A story in three toots…

Earlier this week, I got to test [Site.js](https://sitejs.org) on the Pi Zero and saw that it runs flawlessly. Using [ngrok](https://ngrok.com), I exposed the Pi to the harsh and cruel Interwebs and then – for the fun of it – decided to see what would happen if lots of folks hit it at the same time. And…

<iframe src="https://mastodon.ar.al/@aral/103001381563324542/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

## Oh, the suspense…

Turns out, the little thing is a trooper.

<iframe src="https://mastodon.ar.al/@aral/103001463882277099/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

## The little Pi that could

During our little experiement, Site.js on the Pi Zero served over 7,000 requests. And since I made the ephemeral statistics URL public, folks creatively started using it to send me messages via 404 errors.

<iframe src="https://mastodon.ar.al/@aral/103001652098940317/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>  

## Wait, what’s Site.js again?

Site.js is a free and open source web tool for developers. I would argue that is the easiest way to develop, test, and deploy secure static and dynamic web sites. Check out [this tutorial](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/) to get started and view the documentation if you want to learn every little detail.

It’s the first piece of [the bridge we’re building](https://small-tech.org/research-and-development) at [Small Technology Foundation](https://small-tech.org) between [the centralised surveillance-based exploitative web we have](https://ar.al/2019/05/02/slavery-2.0-and-how-to-avoid-it-a-practical-guide-for-cyborgs/) and [the peer-to-peer ethical web we want](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/).

Site.js runs on Linux, macOS, and Windows (and, of course, Raspberry Pis[^2]).

Why not [have a play?](https://sitejs.org)

{{< like_this_fund_us >}}

[^1]: I also asked on _(spit)_ [the @aral Twitter account](https://twitter.com/aral). The difference is that while I own and control my own Mastodon instance, Twitter, Inc., owns and controls my account on Twitter.com. On my Mastodon, I see everything that everyone sends me and I decide what I say and how (and I’m still bound my the laws of the jurisdiction that I live in and I don’t have the right to compel anyone to listen to me – a common misconception of free speech advocates). On Twitter.com, I see what their algorithms show me and I am able to say what Twitter, Inc. deems acceptable. For folks in Turkey, for example, that means [they don’t see what the Turkish government doesn’t want them to see](https://twitter.com/aral/status/1176767399825235968).

[^2]: Which run Linux on ARM. I’ve tested Site.js on the 3B+, 4B, and Zero W models.