---
title: "Giddy about CSS grid"
date: 2018-06-17T10:26:17+01:00
---

The list of posts in [the index](/) of this blog are grouped by year, month, and day. Within the days, multiple posts are grouped by hour.

The initial index page during [the one-hour hack on Friday that resulted in this site](/2018/06/15/hello-peer-to-peer-web/) simply listed the post titles ([do the Simplest Thing That Could Possibly Work (STTCPW)](http://c2.com/xp/DoTheSimplestThingThatCouldPossiblyWork.html)).

{{< figure src="2018-06-17-10-41-24.png" alt="The site as it was on Friday at the end of its first hour of life" caption="Version 1: two day’s ago." >}}

Yesterday, [I refined the site](/2018/06/16/refining-the-blog/) and implemented the chronological grouping. However, again going with STTCPW, I used a monospace script font to fake three-column layout of the list items:

{{< figure src="2018-06-17-10-31-28.png" alt="Yesterday’s implementation of the index faked columns in the list." caption="Yesterday’s site: fake it till you make it!">}}

As you can see, the date and day name are being repeated for every entry in a day. Less than ideal. Removing the redundancy in the red date stamp was easy. I simply tweaked the template code to improve the grouping so it was only displayed once and then floated it left. Hiding the redundant day names was a bit more convoluted: I added class names using a counter to the day name spans and used the following CSS rule to hide all but the first:

{{< highlight css >}}
  .day:not(.item-0) { color: white; }
{{< /highlight >}}

The remaining problem was that since I was faking columns, if the title of a post was too wide (or if you were viewing the site on a narrow viewport), the title would wrap to the start of the list instead of staying within its “column”.

### CSS grids to the rescue!

[Laura](https://laurakalbag.com) waxes lyrical about CSS grids every chance she gets so I thought I’d give them a shot. How difficult could they be? (A question one learns early on never to ask when the topic is CSS.)

Needless to say, judging my the title of this post, I was pleasantly surprised.

A quick glance at the [Defining a Grid](https://gridbyexample.com/examples/example1/) example on [Rachel Andrew](https://rachelandrew.co.uk)’s excellent [Grid by Example](https://gridbyexample.com) site gave me all I needed to go on.

I quickly [spiked](https://en.wikipedia.org/wiki/Spike_(software_development)) it with a simple three column, two row grid using an unordered list, saw that it worked as intended, and implemented it on the actual site. Here’s the source of the spike:

{{< highlight html >}}
  <style>
  ul { list-style-type: none; }
  li {
    display: grid;
    grid-template-columns: 100px 100px 1fr;
    grid-gap: 10px;
    margin-top: 10px;
  }
  .first { background-color: lightblue; }
  .second { background-color: lightcoral; }
  .third { background-color: khaki; }
  </style>

  <ul>
    <li>
      <span class='first'>Hello</span>
      <span class='second'>there</span>
      <span class='third'>how are you doing?</span>
    </li>
    <li>
      <span class='first'>And</span>
      <span class='second'>another</span>
      <span class='third'>row.</span>
    </li>
  </ul>
{{< /highlight >}}

Pop that into a file, run [HTTP server](https://www.npmjs.com/package/http-server) (`http-server -c-1`) and you’ll see:

{{< figure src="2018-06-17-10-58-57.png" alt="CSS Grid spike showing a three-column, two-row layout with fixed width columns for the first two columsn and a flexible width for the third that takes up the rest of the space. The background colours of the columns are light blue, light coral, and khaki." caption="A quick and dirty grid" >}}

(Notice the HTML isn’t even valid. That’s OK. It’s a spike. Think of it as a back-of-the-napkin sketch. It’s meant to be pragmatic.)

So, with that, two days after its birth, the site is beginning to shape up with an index that has a proper four-column layout with a neat and logical chronological grouping.
