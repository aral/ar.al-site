---
title: "Site.js: now with auto server reload on source code changes"
date: 2019-10-30T19:21:35Z
description: When you change the source code for a dynamic route, your Site.js server automatically reloads.
images:
  - "https://i.vimeocdn.com/video/826987850.jpg?mw=2500&mh=1406&q=70"
videos: ["https://player.vimeo.com/external/369910589.hd.mp4?s=dca6f26bc0bf514e9cb92c3536257f3b2e3e85b0&profile_id=175"]
tags:
  - site.js
  - auto reload
  - dynamic site
  - javascript
  - js
  - node.js
draft: false
---

<figure>
  <video controls poster='https://i.vimeocdn.com/video/826987850.jpg?mw=2500&mh=1406&q=70'>
    <source src='https://player.vimeo.com/external/369910589.hd.mp4?s=dca6f26bc0bf514e9cb92c3536257f3b2e3e85b0&profile_id=175' type='video/mp4'>
    <source src='https://player.vimeo.com/external/369910589.m3u8?s=625550d5d3def50ea3084d7444b8666836de02d1' type='video/mp4'>
    <p>Sorry, your browser doesn't support embedded videos. But that doesn’t mean you can’t watch it! You can <a href='https://player.vimeo.com/external/369910589.hd.mp4?s=dca6f26bc0bf514e9cb92c3536257f3b2e3e85b0&profile_id=175&download=1'>download this video directly</a>, and watch it with your favourite video player.</p>
  </video>
  <figcaption>A quick demonstration of the new auto-reload feature.</figcaption>
</figure>

## Auto reload

[Site.js](https://sitejs.org) version 12.9.7 brings the second developer experience improvement to Site.js in as many days with an integrated auto reload feature that responds to source code changes on dynamic sites.

### Live reload yesterday, auto reload today

Following yesterday’s addition of [live reload for static sites](/2019/10/29/site.js-now-with-live-reload/), today you get auto server reloads when the source code of your [dynamic site](https://source.ind.ie/site.js/app/blob/master/README.md#dynamic-sites) changes.

This is the sort of functionality you’d normally implement by using excellent third-party tools like Remy’s [nodemon](https://nodemon.io/). With Site.js, you now get it out of the box. No external process manager required.

So now, if you change the code in a [DotJS route](https://source.ind.ie/site.js/app/blob/master/README.md#dotjs) or even if you add or remove a new node module, the server will automatically restart.

Note that during development, it’s the server that restarts, not your whole process. That’s faster than a full reload of the whole Site.js process.

### Seamless restarts on deployment when necessary

While the auto reload feature is a great help during development, it also makes your life much easier during deployment.

If you [run Site.js in production](https://source.ind.ie/site.js/app/blob/master/README.md#production) using [the `enable` command](https://source.ind.ie/site.js/app/blob/master/README.md#production), your server will now automatically restart when you [sync your changes to it](https://source.ind.ie/site.js/app/blob/master/README.md#deployment-live-and-one-time-sync). (And do so only if it needs to.)

None of this changes the behaviour of static page and asset updates which have always been, and continue to be, immediately available on deployment without requiring a server restart.

### Have a play!

{{<figure src="../../18/site.js-and-pi/site-js-chat-on-raspberry-pi-1.jpeg" alt="Screenshot of the Site.js basic chat example running on a Raspberry Pi 4B." caption="Yes, I’m going to keep mentioning the tutorial until you try it!">}}

If you’re wondering what Site.js is, check out [the Site.js web site](https//sitejs.org) and have a glance at [the Site.js documentation](https://source.ind.ie/site.js/app/blob/master/README.md).

There’s also a tutorial I released a few weeks ago that takes you through building static and dynamic sites with Site.js as you [build a simple chat app using WebSockets](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/).

I hope these improvements make your experience of creating with Site.js more delightful.

{{< like_this_fund_us >}}
