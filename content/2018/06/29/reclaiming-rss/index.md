---
title: "Reclaiming RSS"
date: 2018-06-29T11:33:13+01:00
---

{{< figure src="rss-banner.svg" alt="RSS symbol" caption="RSS like it’s 1999." >}}

<center><strong>English</strong> | <a href='https://framablog.org/2018/07/16/les-flux-rss-maintenant/'>French</a></center>

Before Twitter, before [algorithmic timelines](https://motherboard.vice.com/en_us/article/bmvbaw/why-2016-was-the-year-of-the-algorithmic-timeline) filtered our reality for us, before [surveillance capitalism](https://2018.ar.al/notes/the-nature-of-the-self-in-the-digital-age/), there was [RSS](https://en.wikipedia.org/wiki/RSS): Really Simple Syndication.

### RS-what now?

For those of you born into the siloed world of the centralised web, RSS is an ancient technology from Web 1.0 (“the naïve Web?”). Like most things back then, it does what it says on the tin: it enables you to easily syndicate the content of your site. People interested in following your posts subscribe to your feed and receive updates using their RSS readers. There is no Twitter or Facebook in the middle to algorithmically <strike>censor</strike> … ahem … “curate” your posts.

RSS is stupidly simple to implement (it’s just an XML file). You could hand-roll it manually if you wanted to (although I wouldn’t recommend it).

Here’s an excerpt of [this site’s RSS feed](/index.xml), showing some of the fields of the current entry for this post:

{{< highlight xml >}}
<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aral Balkan</title>
    <link>https://ar.al/</link>
    <description>Recent content on Aral Balkan</description>
    <lastBuildDate>Fri, 29 Jun 2018 11:33:13 +0100</lastBuildDate>
    …
    <item>
      <title>Rediscovering RSS</title>
      <link>https://ar.al/2018/06/29/rediscovering-rss/</link>
      <pubDate>Fri, 29 Jun 2018 11:33:13 +0100</pubDate>
      <author>mail@ar.al (Aral Balkan)</author>
      <description>(The content of this post goes here.)</description>
    </item>
    …
  </channel>
</rss>
{{< /highlight >}}

It is also almost universally implemented.

Chances are, if you have a web site, you already have an RSS feed whether you know it or not. If you use [Hugo](https://gohugo.io) to generate your site, for example (like I do), your RSS feed is at [/index.xml](/index.xml).

Other generators might put it at _/rss_, _/feed_, _/feed.xml_, etc.

### Where’s the RSS?

{{< figure src="rss-icons.jpg" alt="A selection of RSS icons from The Noun Project displayed in a grid." caption="The Noun Project has a great selection of RSS icons you can use." class="window-with-shadow" >}}

Time was, you couldn’t browse the web without seeing RSS icons of all persuasions gracing the façades of Web 1.0’s finest. This was before they were mercilessly devoured by the <strike>tracking devices</strike> … ahem … “social sharing buttons” of people farmers like Google and Facebook.

There was also once a push for browsers to auto-detect and expose RSS feeds. Currently, none of the major browsers appears to do so.

It’s time to push back against this and demand first-class support for RSS as part of the move to re-decentralise the Web.

But you don’t have to wait for browser vendors (some of which – like Google – are surveillance capitalists themselves, and others, like Mozilla, get all their money from surveillance capitalists). You can start making RSS more visible again today by finding the URL for your own RSS feed and exposing it visibly on your site.

It’s not complicated: just a link in the head of your page[^1] and a link in the body with an RSS icon and Bob’s your decentralised Uncle. 

Here’s the link in the head:

{{< highlight html >}}
<link 
  rel="alternate"
  type="application/rss+xml"
  href="https://ar.al/index.xml"
/>
{{< /highlight >}}

And here’s the header in the body that links to the RSS feed visually using an icon.

{{< highlight html >}}
<a 
  rel='alternate'
  type='application/rss+xml'
  href='/index.xml'
>
  <img 
    class='rss' 
    src='/icons/rss.svg'
    alt='RSS feed icon'
    title='Subscribe to my RSS feed'
  >
</a>
{{< /highlight >}}

Check out [The Noun Project](https://thenounproject.com) for [a set of RSS icons](https://creativecommons.org) you can use under [Creative Commons](https://creativecommons.org) licenses.

### Full-fat vs skinny RSS

{{< figure src="leaf-rss-reader.jpg" alt="Screenshot of the Leaf RSS reader on macOS showing my subscriptions, the list of latest posts from my blog, and my post on Kyriarchy, being displayed perfectly." caption="The Leaf RSS reader displays full HTML content perfectly." class="window-with-shadow" >}}

When generating an RSS feed for your site, you have the option to include only summaries of your posts or the full content. I modified my Hugo configuration and the default RSS template [using these instructions by Brian Wisti](https://randomgeekery.org/2017/09/15/full-content-hugo-feeds/) to include the full content feed and I recommend that you do the same.

Six years ago, [I was arguing the opposite](http://www.breakingthin.gs/reinvent-the-wheel.html), stating that “full fat RSS is duplicate content by another name”. I was wrong. I was too obsessed with maintaining a formalistic stranglehold over my designs and thus failed to correctly weigh the decision using [ethical design criteria](https://ind.ie/ethical-design).

{{< figure src="newsbar-rss-reader.jpg" alt="Screenshot of the NewsBar RSS Reader on macOS showing my subscriptions, the list of latest posts from my blog, and a preview of my post on Kyriarchy, with the header image and styles missing." caption="The Newsbar RSS Reader doesn’t display images or styles correctly in content previews." >}}

The more ways people have of consuming your content, the more resilient that content becomes and the more freedom people have.

Duplicate content? Yes, please. The more the better! Heck, on [the peer-web version of this site](dat://ar.al), the goal is to ideally have the content duplicated as many times as there are people consuming it.

Yes, your content may not display the same in certain RSS readers that are not standards-compliant but that’s their problem, not yours. In my limited testing, the [Leaf RSS reader](https://itunes.apple.com/gb/app/leaf-rss-news-reader/id576338668?mt=12) for macOS displayed my full-fat RSS perfectly while the [NewsBar app](https://itunes.apple.com/gb/app/newsbar-rss-reader/id440472232?mt=12) didn’t. That’s OK. (And I hope NewsBar will take note and improve its rendering in its next update. No app is born perfect.)

As we move away from the centralised web to the peer web, it’s time to rediscover, re-embrace, and reclaim RSS.

Everything old is new again.

RSS was an essential part of Web 1.0 before surveillance capitalism (Web 2.0) took over.

It will be a cherished part of [Web+](/2018/06/26/web+/) and beyond.

[^1]: Thanks to [Ed Summers](https://inkdroid.org) for [pointing out via Mastodon](https://social.coop/@edsu/100288354478817313) that I’d forgotten to add the RSS feed URL to the heads of my pages. I also noticed while looking into it [on MDN](https://developer.mozilla.org/en-US/docs/Web/RSS/Getting_Started/Syndicating) that there are additional semantics you can add to the links you use in the body.