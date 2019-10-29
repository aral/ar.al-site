---
title: "Site.js: now with live reload"
date: 2019-10-29T18:28:29Z
draft: false
---

<figure>
<iframe src="https://mastodon.ar.al/@aral/103042273071351377/embed" class="mastodon-embed" style="max-width: 100%; border: 0" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
<figcaption>Laura demonstrating the new live reload feature last night.</figcaption>
</figure>

I just released version 12.9.6 of [Site.js](https://sitejs.org) with live reload support for static pages.

There’s also a fix for [the `update` command](https://source.ind.ie/site.js/app/blob/master/README.md#update-as-of-v1295-properly-functioning-as-of-v1296), so please update to this version so that you can keep updating using the update command when we move to 12.10.x and beyond.

## Get Site.js version 12.9.6

### Update to it

To update to Site.js version 12.9.6 from Site.js version 12.9.5, you can use the `update` command:

```sh
site update
```

### Install it from scratch

If you’re running an earlier version of Site.js or if you are going to install it for the first time:

{{< install_site_js >}}

## Live reload

Site.js is the easiest way to develop, test, and deploy a static web site but, until today, it wasn’t necessarily a delightful development experience as you needed to refresh your static pages manually to see the changes you made… like it was 2009 or something!

Well, take your hand off that refresh button because the latest version of Site.js comes with live reload out of the box.

## Server-side events to the rescue

<figure>
  <iframe src="https://mastodon.ar.al/@aral/103022202114228926/embed" class="mastodon-embed" style="max-width: 100%; border: 0" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
<figcaption>Me, in my naïve younger days, earlier this week.</figcaption>
</figure>

I implemented the live reload functionality using [my fork of](https://github.com/aral/instant) the excellent [`instant` module](https://github.com/fgnass/instant), which in turn uses [my fork of](https://github.com/aral/sendevent) the also excellent [`sendevent` module](https://github.com/fgnass/sendevnet), both of which are by [Felix Gnass](https://github.com/fgnass) and use server-side events (SSE; also known as `EventSource`).

## Rescuing server-side events from a fox

<figure>
  <iframe src="https://mastodon.ar.al/@aral/103023932351097430/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
  <figcaption>Theory, meet practice.</figcaption>
</figure>

While I initially thought that I’d be done implementing the feature in mere minutes thanks to the `instant` module, , it actually took me two days. And we have Mr. Firefox Browser to thank for that.

Turns out, Firefox has a peculiar quirk[^1] with `EventSource` when you’re testing a page and your `host` is `localhost`.[^2] Basically, if you refresh the page from Firefox’s memory cache without doing a force refresh, your `EventSource` connection disconnects after 30 seconds.

<figure>
  <iframe src="https://mastodon.ar.al/@aral/103025061028864594/embed" class="mastodon-embed" style="max-width: 100%; border: 0" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
  <figcaption>Ooh, we’re half way there…</figcaption>
</figure>

It took me about 20 minutes to integrate the `instant` module into Site.js and two days to narrow down and fix the issues with Firefox and contribute my fixes upstream. And that, ladies and gentlemen, is the wacky world of development that we all know and love.

It was worth it, though, because now Firefox behaves exactly like Chrom(ium) with `EventSource` connections over `localhost` when using the `instant` module[^3].

<figure>
  <iframe src="https://mastodon.ar.al/@aral/103029600133835839/embed" class="mastodon-embed" style="max-width: 100%; border: 0" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
  <figcaption>Development would be harder if you couldn’t bitch on Mastodon.</figcaption>
</figure>

## And a fix for the update command

Some days when you’re making things you have these “doh!” moments where you realise you did something really silly.

I had one of those today while attempting to use [the Site.js `update` command](https://source.ind.ie/site.js/app/blob/master/README.md#update-as-of-v1295-properly-functioning-as-of-v1296) to update from version 12.9.5 to this release, which was originally meant to be version 12.10.0.

Long story short, Site.js told me I was running a newer version than the latest released version because I, in all my glory, thought I was doing integer comparison while actually doing string comparison and, lexographically, `10` comes before `9`.

Yay, me.

So that’s fixed now too[^4].

## Getting started

{{<figure src="../../18/site.js-and-pi/site-js-chat-on-raspberry-pi-1.jpeg" alt="Screenshot of the Site.js basic chat example running on a Raspberry Pi 4B." caption="I followed a tutorial and all I got was this lousy chat app…">}}

If you’re wondering what Site.js is, check out [the Site.js web site](https//sitejs.org) and have a glance at [the Site.js documentation](https://source.ind.ie/site.js/app/blob/master/README.md).

There’s also a tutorial I released a few weeks ago that takes you through building static and dynamic sites with Site.js as you [build a simple chat app using WebSockets](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/).

I hope the new live reload feature makes your life easier and, as always, if you have any thoughts or suggestions – or if you run into any issues – [please let me know](https://mastodon.ar.al/@aral).

{{< like_this_fund_us >}}

[^1]: See my merge requests for the `instant` ([#17](https://github.com/fgnass/instant/pull/17)) and `sendevent` ([#4](https://github.com/fgnass/sendevent/pull/4)) modules for further details.
[^2]: And I literally mean `host`, not even `hostname` – the quirk does not manifest, for example, if you’re testing over `localhost:999`, only `localhost:443` (I did not test over port 80 because, well, it’s late 2019.)
[^3]: For now you can use [my fork of `instant`](https://github.com/aral/instant) but keep an eye on [my pull request](https://github.com/fgnass/instant/pull/17) in [Felix’s original repository](https://github.com/fgnass/instant) and switch to using the original module once my changes have been merged.
[^4]: I’ll write up a short post with code snippets when I get a moment so we can all share a laugh.
