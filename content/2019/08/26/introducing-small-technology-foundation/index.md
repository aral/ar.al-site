---
title: "Introducing Small Technology Foundation, Site.js, and Tincan"
date: 2019-08-27T12:05:00+10:00
draft: false
---

<style>
h2#what-s-next + figure > img, #tincan-logo, #site-js-logo {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

#site-js-logo {
  width: 15%;
}
</style>

{{<figure src="small-technology-foundation-header.jpeg" alt="Laura and me with tin-can telephones in the Small Technology Foundation web site header." caption="Say “hello” to Small Technology Foundation." >}}

Today, [Laura](https://laurakalbag.com) and I want to introduce you to [Small Technology Foundation](https://small-tech.org), where we will be continuing the work we started at [Ind.ie](https://ind.ie) five years ago.

[In those five years](https://small-tech.org/about/#history), we’ve developed a strong understanding of the problem ([surveillance capitalism](https://ar.al/2019/05/02/slavery-2.0-and-how-to-avoid-it-a-practical-guide-for-cyborgs/)) and we’ve been [iterating on solutions](https://small-tech.org/research-and-development) to it.

Our work led us to [leave the UK](https://ar.al/notes/so-long-and-thanks-for-all-the-fish/), move to Sweden, and finally, last year, [to settle in Ireland](https://laurakalbag.com/move-to-ireland/).

As part of our relocating to Ireland, we are in the process of shutting down our not-for-profit in the UK, Ind.ie (Article 12), and we’ve set up a new not-for-profit in Ireland.

We’ve also refined how we articulate both the problem and the solution we are exploring. The result is Small Technology Foundation and the concept of [Small Tech](https://small-tech.org/about/#small-tech) as the polar opposite of – and [the antidote to](/2019/03/04/small-technology/) – Big Tech and Silicon Valley’s church of startups and exponential growth.

## What is Small Technology?

{{<figure src="small-technology-tenets.jpeg" alt="The tenets of Small Technology: easy to use, personal, private by default, share alike, peer to peer, interoperable, zero knowledge, non-commercial, non-colonial, inclusive" caption="The tenets of Small Technology." >}}

[Small Technology](https://small-tech.org/about#small-technology) are everyday tools for everyday people designed to increase human welfare, not corporate profits.

## What are you working on?

{{< figure src="site-js-screenshot.jpeg" alt="Screenshot of SiteJS.org" caption="Site.js: what would a web development tool look like if it was designed for individuals, not startups or enterprises?" >}}

I’ve personally spent the last six months creating [Site.js](https://site.js) – which I’m excited to announce here alongside the setup of our foundation. Site.js is the first step in [our plan](https://small-tech.org/research-and-development#the-plan) to evolve a [peer web](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/) based on the [DAT ecosystem](https://datproject.org).

Site.js makes it simple to set up your own single-tenant, secure personal web site (static and dynamic). How simple? Here’s how you’d deploy a “Hello, world!” site on your production server:

{{< highlight bash >}}
# Install Site.js
wget -qO- https://sitejs.org/install | bash

# Create the site
echo 'Hello, world' > index.html

# Enable a secure production server
site enable
{{< /highlight >}}

And what if you wanted a dynamic site?

OK, create a file called `counter` in `.dynamic/counter.js`:

{{< highlight js >}}
let counter = 0

module.exports = (request, response) => {
  response.type('html').end(`You’ve visited this page ${++counter} time${counter === 1 ? '' : 's'}`)
}
{{< /highlight >}}

Then run:

{{< highlight bash>}}
site
{{< /highlight>}}

And hit `https://localhost/counter`.

Refresh to see the counter update.

I call this [DotJS](https://source.ind.ie/site.js/app#file-system-routing) (think PHP for JavaScript) and it enables you to create secure, dynamic JavaScript servers with the full power of [Node.js](https://nodejs.org) and [Express](https://expressjs.com/) without having to build any of the plumbing.

And it’s as easy to use [WebSockets](https://source.ind.ie/site.js/app/tree/master/examples/wss-basic-chat) with it too.

Oh, and Site.js already powers this site, [the Small Technology Foundation site](https://small-tech.org) and [Laura’s site](https://laurakalbag.com). So we’re eating our own hamster food.

The Small Technology Foundation web site is also an example of how to extend a static site (in this case, one that uses Hugo), with dynamic functionality. Check out the [Fund Us](https://small-tech.org/fund-us) page for [an example of the WebSocket functionality](https://source.ind.ie/small-tech.org/site/tree/master/themes/small-tech/static/.dynamic) powering the patronage pages (hint, hint) ;)

To see more, [run the demo on SiteJS.org](https://sitejs.org), [try some other examples](https://source.ind.ie/site.js/app/tree/master/examples), and [read through the documentation](https://source.ind.ie/site.js/app/blob/master/README.md).

<img id='site-js-logo' src='site-js-logo.svg' alt='Site.js logo'>

## What’s next?

{{<figure src="tincan-architecture-single-person.svg" alt="The architecture of Tincan, showing the always on web node as an untrusted node in a peer-to-peer network" caption="Tincan: bridges a peer-to-peer network with the centralised web." >}}

The next step is to continue developing Site.js and to build on top of it a peer-to-peer network that bridges to the centralised web. We call this [Tincan](https://small-tech.org/research-and-development) (the latest evolution of [Hypha](/2019/02/01/hypha-spike-multiwriter-2/), [Indienet](/2019/02/01/hypha-spike-multiwriter-2/), and [Heartbeat](https://2017.ind.ie/heartbeat/)).

{{<figure src="tincan-architecture-two-people.svg" alt="The architecture of Tincan, showing the devices and untrusted web node of two people interacting" caption="Tincan: two people communicating." >}}

There are no big reveals here, we are not Silicon Valley (we’re the opposite of Silicon Valley). We’re in this for the long haul. We’re not a startup, we’re a _stayup_. As such, we will continue to iterate and build on our work from the past five years.

<img id='tincan-logo' src='tincan-logo.svg' alt='Tincan logo'>

## Happy we exist? Enable us to continue to exist.

In the past five years, [my family has invested three homes to enable our work](#revenue-to-date). We don’t have any more homes to invest.

If you’re happy we exist, [please become a patron and support us](https://small-tech.org/fund-us) to ensure that you can still be happy we exist in the next five years.

We are going to be moving more things  over from Ind.ie to Small Technology Foundation in the coming days (like our source code repository, etc.) and we’ll let you know when we do. And we’re going to continue to polish things up on the web site and improve Site.js. Just like everything else we do, this is yet another iteration.

We will also be cancelling all patronages on Ind.ie so if you want to continue supporting us, please [become a patron of Small Technology Foundation](https://small-tech.org/fund-us).

## Partner with us

We are also looking for [VPS hosts and domain name registrars to partner with](https://small-tech.org/partners). If you share our social mission of a kinder Internet built for people, not corporations and governments, please [contact us](https://small-tech.org/contact-us).

## There’s a Turkish saying that goes “from drops, are lakes formed…”

After five years of working on this problem, I am more excited that ever with where we are and the progress we are making. I hope you will join us, as allies, on this journey and enable us to realise our dream of creating technology that works for people, not startups or enterprises; technology that protects human rights and democracy instead of eroding them.

Visit [Small Technology Foundation](https://small-tech.org) today and [let us know](https://small-tech.org/contact-us) how you can help.
