---
title: "Refining the blog"
date: 2018-06-16T17:04:54+01:00
---

{{< figure src="2018-06-16-20-23-44.png" alt="The Markdown text for this blog post shown in my VSCode window" caption="Yes, I blog in VSCode. What was the question again?" class="window-with-shadow" >}}

Yesterday, in a one-hour session [that I live-tooted](https://mastodon.ar.al/@aral/100207852262520843), I set up and deployed [this blog](https://source.ind.ie/ar.al/site) by hacking together plain HTML/CSS, [Rsync Watch](https://github.com/Splurov/rsync-watch), and [DAT](https://datproject.org).

Maintaining a blog entirely by hand isn’t fun though.

### Automate <strike>all</strike> some of the things

There are two things you must automate to make a usable web site authoring system. These are:

  1. __Indices:__ Index pages listing posts, articles, etc.

  2. __Partials:__ content like headers, footer, etc. that are included on multiple pages.

  Then, there are nice-to-haves (especially for blogging) that are hard to live without in this day and age:

  1. __Markdown authoring__: Markdown lets you keep your focus on the content rather than having it bogged down with formatting.

  2. __Live reload__: Live reload shows you your local changes immediately. It’s like having a WYSIWYG preview.[^1] 
  
In [the previous version of my blog](https://ar.al), I had hand-rolled a static site generator in Node.js to do these things for me. Today, there’s no reason to do that. We’re spoiled for choice when it comes to static site generators and one of the best around is called [Hugo](https://gohugo.io).

Hugo checks all the boxes above, does a million other things that I will probably never use, and is _fast_.

So I spent a few hours today setting up the blog to use Hugo. As I want the site to be as minimal as possible, I didn’t use an existing template. I’m hand-rolling the layouts and styles by hand.

Right now, I have indices being generated, and partials for the head, header, and footer.

I also set up a convention where content is stored chronologically (e.g., 2018/06/16/refining-the-blog) and I wrote [a small script](https://source.ind.ie/ar.al/site/blob/master/new) to make it easy for me to create new posts fitting that path structure:

So my workflow right now for updating this blog is:

1. Start up the system (Hugo server and rsync watcher):

    {{< highlight bash >}}
./connect
{{< /highlight >}}

2. Create a post:

    {{< highlight bash >}}
./new my-latest-amazing-post
{{< /highlight >}}

3. Edit the post using VSCode.

Every time I save, my changes are automatically synchronised with my server using rsync and, on the server, automatically shared on the peer-to-peer web via DAT.

I’ve been wanting to get back into blogging more frequently and I hope this new system will enable me to do just that.

[^1]: Of course, on this blog, with DAT, the site itself becomes a streaming site and updates automatically with every change for people viewing it in Beaker Browser with Live Reload turned on.
