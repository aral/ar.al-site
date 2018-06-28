---
title: "Web+"
date: 2018-06-26T16:59:55+01:00
---

{{< figure src="web-plus-training-wheels-for-the-peer-web.jpg" alt="A bicycle with training wheels. One of the training wheels is highlighted with a red circle." caption="Web+ is like training wheels for the Peer Web. It creates a bridge between the centralised Web and the Peer Web to introduce the former to the latter." >}}

My personal blog is now a Web+ site.

A what?

Well, it’s a web site but also a little more than a regular web site. It’s available on the regular web at https://ar.al, but it is also available on the peer-to-peer Web (henceforth “Peer Web”) via the [DAT](https://datproject.org) protocol at [dat://ar.al](dat://ar.al).

To load the second link, you will need a DAT-capable browser. Currently, the only browser with native support for the DAT protocol is [Beaker Browser](https://beakerbrowser.com).

### Web + ?

So this site is a Web+ DAT site. It is accessible to the mainstream via the centralised Web and it progressively enhances and helps decentralise the centralised Web by layering on peer-to-peer functionality via a peer-to-peer channel.

A Web+ site doesn’t have to use DAT to be a Web+ site. There are other federation and decentralisation protocols and systems that can and should be explored. These include:

  * [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub) (see [Mastodon](https://joinmastodon.org))
  * [Secure ScuttleButt](https://www.scuttlebutt.nz)
  * [Matrix](http://matrix.org)
  * [OpenNIC](http://opennic.org) [^1]

If I’ve forgotten any (that aren’t blockchain-based – _spit!_ – or venture-capital-funded – _spit!_), please [let me know](https://mastodon.ar.al).

### How do I Web+?

Well, right now, the honest answer is: not easily. Not if you’re not a developer.

If you _are_ a developer, it’s not difficult but the experience can (and will) still be made easier.

I was able to set up [the first version of this site](/2018/06/15/hello-peer-to-peer-web/) in an hour, including provisioning, configuring, and deploying the server (all while [live tooting it](https://mastodon.ar.al/@aral/100207852262520843)). I wrote [a little more about my setup](/2018/06/16/refining-the-blog/) earlier and I plan to streamline the setup further in the future.

You can also [look through the source code](https://source.ind.ie/ar.al) to see how things work.

TL; DR: I use [Hugo](https://gohugo.io) on my local machine to write my posts (in [VSCode](https://code.visualstudio.com)). If I’m in [live mode](https://source.ind.ie/ar.al/site/blob/master/live), there’s [a file system watcher that rsyncs updates to my server](https://github.com/Splurov/rsync-watch) on every save. There, I have [DAT share running as a service](https://forum.ind.ie/t/running-a-dat-share-as-a-service-with-systemctl-ubuntu-etc/2181/1) and it automatically shares the updated DAT site on its peer-to-peer swarm.

Of course, the ultimate goal isn’t just to create yet another fun toy for the technically-privileged. This is one step towards implementing a Web+ experience for everyone. That’s [the project](https://indienet.info/site/) I’m working on and I will be evolving it to use DAT.

### Advantages

So why go to the trouble of creating a Web+ experience?

Here are three advantages, off the top of my head:

  1. Censorship-circumvention
  2. Streaming web site updates
  3. Scalability without additional resources

While #2 might be the coolest feature for everyday use, #1 has the most potential to change the world for the better so we’ll start there.

### Censorship-circumvention

While you can access this site via a friendly DAT URL (using [DAT DNS](https://www.datprotocol.com/deps/0005-dns/)), the actual long-form DAT address that it maps to is a cryptographic public key that is unique to the [mutable torrent-like archive](https://garbados.github.io/my-blog/distributed-datastructures.html)[^2] of this site:

{{< highlight bash >}}dat://bfb2eeb077826ecee6c1105d419755d5d8e0893d653d3ce39e50aee2c00b7701/
{{< /highlight >}}

So, let’s say I’m in a country with an autocratic government and that I post something that the government wants to block. They can easily block my domain. But what if three or four people have already accessed my site over DAT? Well, now the site exists in three or four other places. And they can serve it to maybe another thirty or forty. And as long as they share the long-form DAT address, the government will have to block everyone that has a copy to block the content.

Right now, the long-form address is a bit hidden on this site but I will be exploring ways of exposing it more explicitly. One way to share the addresses might be with QR-Codes. (Might there actually finally be a good use case for QR-Codes after all?)

### Streaming web site updates

We can already do server push on the centralised Web using either long-polling (like a caveman) or WebSockets. The problem is that it’s not trivial. And the more popular your content gets, the more resources you will need in order to meet the demand.

What if streaming updates to all clients just came for free? And you had to do nothing to support it? And what if the load on your server didn’t increase as your site got more popular.

Well, that’s how it is with DAT.

If you view this site in [Beaker Browser](https://beakerbrowser.com) and you turn on the Live Reload feature, you will get streaming updates on changes. I’ve already live blogged two events: the [Public Stack Summit](/2018/06/19/public-stack-summit/) and the [Next Generation Cities session at We Make the City](/2018/06/21/we-make-the-city-next-generation-cities/) in Amsterdam.

### Scalability without additional resources

I touched upon this in the previous point also: one of the big advantages of peer-to-peer systems is that the network absorbs the load. As your site becomes more popular, you do not need to expand additional resources as your load is distributed on the network. Also, the more popular your site becomes, the more resilient it becomes as a growing number of other nodes begin to mirror your content.

So basically, it’s win-win.

And since we’re progressively enhancing the centralised Web, we are not leaving anyone behind. If people want to view the site over HTTPS, they can go right ahead. And if they want to download [Beaker Browser](https://beakerbrowser.com) out of curiosity (or because they’re staging a democratic revolution, I guess) then it could possibly be their introduction to the freedom of the Peer Web.

[^1]: [OpenNIC](http://opennic.org) might seem like the odd one out in the list but it isn’t.

    The centralised and capitalist nature of the domain name system is a huge design problem for those of us working to build bridges between the centralised Web and the Peer Webs as the current system makes it very difficult to match the onboarding experience of centralised platforms. (You can sign up to a centralised social network in 30 seconds… can you register your own domain name, have your server and app set up, and be up and running with your decentralised one in that time? [You could.](https://indienet.info/hallo.gent/) But not with our current system.) Web+ must also move beyond the greed-led shortsightedness of ICAAN to embrace a world of zero time-to-live domain propagations and a domain name commons.)

[^2]: My original description said that the address was “unique to the _content_” which was ambiguous as it could easily be interpreted to mean to an immutable hash of the content.

    An advantage of DAT is that while the hash of the public key is used to discover content on the swarm, the content itself is mutable and can be updated by the owner of the private key. Multi-writer DAT – which [is being developed as we speak](https://blog.datproject.org/2018/05/14/dat-shopping-list/) and is what I’m most excited about – extends this to allow multiple authorised writers. I’m grateful to [Diana](https://garbados.github.io/my-blog/) for [pointing this out](https://toot.cat/@garbados/100273034019785882) via Mastodon.
