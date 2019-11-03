---
title: "Site.js: now with auto updates in production"
date: 2019-11-03T11:12:31Z
description:
images:
  - https://i.vimeocdn.com/video/827927043.jpg?mw=2500&mh=1406&q=70
videos: ['https://player.vimeo.com/external/370643404.hd.mp4?s=4072ee1788c981d32956733956ebb9fd24c4495a&profile_id=169']
tags:
  - site.js
  - auto update
  - production
  - personal web
  - web server
  - static site
  - javascript
  - js
  - node.js
draft: false
---

<figure>
  <video controls poster='https://i.vimeocdn.com/video/827927043.jpg?mw=2500&mh=1406&q=70'>
    <source src='https://player.vimeo.com/external/370643404.hd.mp4?s=4072ee1788c981d32956733956ebb9fd24c4495a&profile_id=169' type='video/mp4'>
    <source src='https://player.vimeo.com/external/370643404.m3u8?s=0e94c74434cf5930a8c95ad9c41c92d9f9b47b3f'>
    <p>Sorry, your browser doesn't support embedded videos. But that doesn’t mean you can’t watch it! You can <a href='https://player.vimeo.com/external/370643404.hd.mp4?s=4072ee1788c981d32956733956ebb9fd24c4495a&profile_id=169&download=1'>download this video directly</a>, and watch it with your favourite video player.</p>
  </video>
  <figcaption>A quick demonstration of the new auto-reload feature.</figcaption>
</figure>

[Site.js](https://sitejs.org) version 12.10.2 introduces [automatic updates in production](https://source.ind.ie/site.js/app/blob/master/README.md#automatic-updates-in-production-as-of-version-12100).

## Why auto update?

Site.js is a personal web tool for individual developers – not startups or enterprises. It’s a tool for building everyday things for everyday people that do exactly what they say on the tin and nothing more.

In other words, Site.js is a tool for building [small technology](https://small-tech.org/about#small-technology).

With that in mind, it goes without saying that the sites and apps you build and serve with Site.js will not have dedicated operations teams to keep them up to date and secure. And while you may be a dev-ops unicorn who also plays smashing electric guitar, not everyone is. And the people who will run their own instances of the things you build with Site.js definitely won’t be. So Site.js has to be your operations team and come with secure defaults out of the box.

## Because security

One of the biggest security issues in tech is running outdated software. While I was running my servers on nginx, I couldn’t tell you when they were last upgraded as the process was so convoluted. With Site.js, deploying a server has to be deploy and forget. We cannot assume that folks are going to update their servers.

So auto updates of production servers is a crucial security feature.

## Manual updates during development and testing

Automatic updates are a feature [for production servers](https://source.ind.ie/site.js/app/blob/master/README.md#production) only (in other words, whenever you launch Site.js as a service/daemon using [the `enable` command](https://source.ind.ie/site.js/app/blob/master/README.md#production)).

When running Site.js during development and testing, you can check for updates manually using [the `update` command](https://source.ind.ie/site.js/app/blob/master/README.md#update-as-of-version-1295-properly-functioning-as-of-version-1296).

{{< like_this_fund_us >}}