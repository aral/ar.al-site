---
title: "Refining the RSS"
date: 2018-07-01T01:37:19+01:00
---

{{< figure src="my-feed-in-leaf.jpg" alt="A screenshot of my feed displaying properly in the Leaf RSS reader with an icon for the site and images for posts that have them." caption="I can’t optimise my feed for every reader out there but I can for the one I’m using." class="window-with-shadow" >}}

I realised today[^1] that my site’s feed wasn’t displaying well on the [RSS](/2018/06/29/reclaiming-rss/) reader I’m using ([Leaf](https://itunes.apple.com/us/app/leaf-rss-news-reader/id576338668) on macOS). Some other feeds had image previews for items as well as an icon for the site itself while mine didn’t.

How utterly unacceptable!

### Sweat the small stuff (it’s all small stuff)

Given I’m writing this at almost 2AM on a Saturday night, you can probably deduce that there was a level of – ahem – _trial and error_ involved in getting things to work.

Initially, I thought the icon for my site wasn’t showing up because I hadn’t added an `<image>` tag to my RSS feed. So I added that to my RSS template in Hugo:

{{< highlight xml >}}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    …
    <image>
      <url>{{ "/apple-touch-icon-144x144.png" | absURL }}</url>
      <title>{{ if eq  .Title  .Site.Title }}{{ .Site.Title }}{{ else }}{{ with .Title }}{{.}} on {{ end }}{{ .Site.Title }}{{ end }}</title>
      <link>{{ .Permalink }}</link>
      <width>144</width>
      <height>144</height>
    </image>
    …
  </channel>
</rss>
{{< /highlight >}}

Sadly, Leaf didn’t bite.

Images were working for [Laura’s site](https://laurakalbag.com) so I took a look at [her feed](https://laurakalbag.com/index.xml) and found a clue: her images had absolute URLs while mine were relative.

Hmm… 🤔

### Relatively speaking

I can’t use absolute URLs on this site as it’s [a Web+ site](https://ar.al/2018/06/26/web+/). Since its accessible over both old school HTTPS and on the peer web, I can’t hardcode a protocol like `https://` as that would break links for the `dat://` protocol.

That limitation doesn’t really apply to the site’s RSS feed, however.

The [W3C Feed Validation Service](https://validator.w3.org/feed) actually warns you _not_ to use relative URLs in your feeds. (This is a limitation I feel we should remove, going forward. Not least of all because peer replication of RSS feeds over DAT might have some interesting use cases for push/streaming syndication.)

So to cut to the chase, I decided to use a regular expression to massage the URLs in my RSS feed template in Hugo to convert relative URLs to absolute ones:

{{< highlight xml >}}
<item>
  …
  <description>{{ replaceRE "img src=\"(.*?)\"" (printf "%s%s%s" "img src=\"" .Permalink "$1\"") .Content | html }}</description>
</item>
{{< /highlight >}}

Initially, I also had a negative lookahead in there to ensure I wouldn’t rewrite any URLs that might have been absolute URLs to begin:

{{< highlight js >}}
img src="(((?!http?).)*?)"
{{< /highlight >}}

But, sadly, [Go’s regular expression engine does not support negative lookaheads](https://stackoverflow.com/questions/26771592/negative-look-ahead-go-regular-expressions#26792316). This isn’t a big deal, really, since it’s not good form to link to external images directly anyway.

With that change, image previews started working in Leaf.

### Favicon blues

But my site’s icon still wasn’t showing up.

It was one-something-AM and instead of going to bed like a sensible person, I decided that this needed fixing right now (the sadder part is that I’m writing this sentence while editing this post at 2:30AM).

Anyway, looking at an icon for site that was displaying properly, I noticed that the image was rather high resolution. So it wasn’t just grabbing a _favicon.ico_. I already had the ridiculous number of icons one needs for a respectable web site in 2018 generated using [Favic-O-Matic](http://www.favicomatic.com). In the end, after more trial and error, I found that Leaf was looking for an _apple-touch-icon.png_ file in the root of the site.

Adding that fixed the icon issue also.

### My kingdom for standards-compliant RSS readers

It would be ridiculous, of course, to try and support the idiosyncrasies of every RSS reader out there but I can at least make my feed look good on the one(s) I use. 

That said, it would also be great if more RSS readers supported standard elements when available.

Leaf, for example, should make use of the image tag if one exists in a feed. Similarly, RSS readers should present items in `enclosure` elements (images, audio, and video) when possible. While not part of the standard, it also wouldn’t take much work to resolve relative URLs properly in feeds either.

[^1]: i.e., “Became unable to ignore any longer…” 😁
