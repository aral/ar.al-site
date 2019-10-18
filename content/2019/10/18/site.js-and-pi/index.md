---
title: "Site.js and Pi"
date: 2019-10-18T11:47:08+01:00
draft: false
---

{{<figure src="site-js-chat-on-raspberry-pi-1.jpeg" alt="Screenshot of the Site.js basic chat example running on a Raspberry Pi 4B." caption="Chatting about Pi, on a Pi, with a chat server running on Site.js on the same Pi.">}}

Yesterday, I released [Site.js](https://sitejs.org) 12.8.0 which brings initial ARM support for Linux.

What that means is that it’s now easier than ever to get a static or dynamic (Node.js) web server up and running on a Raspberry Pi.

{{<figure src="site-js-chat-on-raspberry-pi-2.jpeg" alt="Screenshot of Terminal on the same Raspberry Pi 4B as before, showing Site.js serving the basic chat app." caption="Site.js on my Raspberry Pi, serving the basic chat app in the first screenshot.">}}

## Have a play!

Do you have a Raspberry Pi 3B+ or 4B lying around?[^1] Well then, grab it, fire up a terminal window, and get your first static site up and running in the next 30 seconds:

{{<highlight shell>}}
# Install Site.js.
wget -qO- https://sitejs.org/install | bash

# Create the most basic web site ever.
echo 'Hello, world! > index.html

# Run Site.js
site
{{</highlight>}}

Now launch a browser[^2] on your Raspberry Pi and hit `https://localhost` in it.

{{<figure src="pi-4b.jpeg" alt="Photo of the Raspberry Pi 4B running the chat example in the first screenshot." caption="My Raspberry Pi 4B, caught red-handed running the chat app in the first screenshot.">}}

## Please sir, may I have some more?

But, of course!

If this has whet your appetite, so to speak, head over to the [Build a simple chat app with Site.js](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/) tutorial where you will learn lots more about making dynamic web sites with Site.js using [DotJS](https://source.ind.ie/site.js/app/blob/master/README.md#dotjs) (Node.js made simple, ala PHP) as you create the WebSocket-based chat example you see in the first screenshot.

Have fun and [do let me know](https://mastodon.ar.al/@aral) how you get on.

[^1]: Those are the only ones I tested with so far. It might work on other ones too. Do [let me know](https://mastodon.ar.al/@aral) if you try it out.

[^2]: For example, type `epiphany` in a terminal window to launch the Epiphany browser – aka GNOME Web – that comes with Raspbian but isn’t available from the raspberry menu under Internet for some inexplicable reason.

