---
title: "Surveillance Capitalism at the BBC"
date: 2018-12-10T18:41:49Z
draft: false
---

<iframe src="https://www.bbc.com/ideas/videos/surveillance-capitalism-has-led-us-into-a-dystopia/p06p0tdy/player" width="640" height="500" scrolling="no" style="overflow: hidden" allowfullscreen frameborder="0"></iframe>

Recently, I recorded a video on surveillance capitalism with [BBC Ideas](https://www.bbc.com/ideas).

You can [watch the video on the BBC Ideas web site]((https://www.bbc.com/ideas/videos/surveillance-capitalism-has-led-us-into-a-dystopia/p06p0tdy)) and you can also embed it on your own site, as shown above. All you need is a tiny bit of code that looks something like this:

{{<highlight html>}}<iframe
  src="https://www.bbc.com/ideas/videos/surveillance-capitalism-has-led-us-into-a-dystopia/p06p0tdy/player"
  width="640" height="500"
  scrolling="no" style="overflow: hidden"
  allowfullscreen frameborder="0"></iframe>{{</highlight>}}

But what happens when you add that code to your site?

Do you just get the video, as you would expect, or do you also get something you didn’t bargain for?

To find out, I ran our [inspector](https://source.ind.ie/better/inspector) tool from [Better](https://better.fyi) on this very page to see if any third-party trackers get included with a BBC Ideas video when you include one on your own site.

{{<figure src="better-inspector.png" alt="Screenshot of the Better Inspector command-line app inspecting this page." caption="Better Inspector inspecting this page.">}}

Turns out there is a third-party tracker included with the embed: [Chartbeat](https://better.fyi/trackers/chartbeat.net/)[^1].

And if you visit the BBC Ideas page to watch the video there, you will also be tracked by [AT Internet](https://www.atinternet.com/en/)[^2], in addition to Chartbeat.

{{<figure src="blocked-third-party-hostnames.png" alt="The two third-party tracking domains that Better Inspector found: chartbeat.com and chartbeat.net" caption="How’s that for irony?">}}

This is not just ironic. It’s unethical.

When someone embeds a video on their page, they do not expect to expose their visitors to third-party tracking and profiling by some random corporation like Chartbeat that they’ve never heard of.

So, what is [surveillance capitalism](https://2018.ar.al/notes/the-nature-of-the-self-in-the-digital-age/)?

It’s this.

It’s the mainstream.

It’s the Web.

It’s the BBC exposing you to third-party tracking by two companies – Chartbeat and AT Internet – when you watch a video about surveillance capitalism on their site. It’s people becoming unwitting accomplices to perpetuating the reach of surveillance capitalism on the Web by sharing a video on their own sites to raise awareness about the dangers of surveillance capitalism.

Here’s hoping that when the folks at the BBC see this, they will do some soul searching and revise their policies. At the very least, please do not include a third-party tracker in video embeds. Innocent people who just want to share videos should not find themselves unknowingly complicit in web tracking and profiling.

As for all of you looking for ethical alternatives to surveillance-based video services for your own content, check out [Peertube](https://joinpeertube.org/en/).

[^1]: [Better](https://better.fyi) already blocks Chartbeat.
[^2]: We weren’t aware of AT Internet, [but we are now](https://source.ind.ie/better/content/issues/860) and they will be blocked in this week’s Better update.
