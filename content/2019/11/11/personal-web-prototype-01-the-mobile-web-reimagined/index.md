---
title: "Small Technology Foundation Personal Web Prototype 01: build your own portable personal web server"
date: 2019-11-11T15:36:32Z
description:
images:
  - prototype-01-front.jpeg
tags:
  - personal web
  - small technology foundation
  - site.js
  - raspberry pi
  - piz-uptime
  - 4g
  - lte
  - huawei mobile broadband
draft: false
---

{{<figure src="prototype-01-front.jpeg" alt="Photo of my hand on top of a wooden table, holding the prototype described in this article." caption="Small Technology Foundation Personal Web Prototype-01: an always-connected portable personal web server that fits in your pocket.">}}

Imagine holding your personal web site in the palm of your hand. Imagine carrying the digital aspects of your self in your pocket instead of having them on some abstract cloud under the watchful eye of some faceless multinational corporation[^1].

This first prototype from [Small Technology Foundation](https://small-tech.org) [R&D](https://small-tech.org/research-and-development) achives the former using widely available off-the-shelf parts and [Site.js](https://sitejs.org). Hopefully, it will also start you thinking in a similar vein about building things that enable the latter.

In this post, I will outline what Prototype-01 is and how you can build a similar personal web device yourself. The audience for this post is tinkerers and developers[^2].

## Get the hardware

{{<figure src="prototype-01-components.jpeg" alt="Photo of the components of prototype 01 in a small fabric case labelled with letters." caption="Prototype 01: the hardware.">}}

<style>
  :not(.footnotes) > ol:nth-of-type(1) {
    list-style-type: lower-alpha !important;
  }
  :not(.footnotes) > ol:nth-of-type(1) li::marker {
    color: #E11064;
  }

</style>

Here are the parts I used to build Prototype-01, as labelled in the first photo, above. The main ones are in boldface.

1. USB Micro Type-B (male) to USB Type-A (female) cable
2. 14500 Lithium-ion battery (3.7v; rechargeable)
3. __Piz-UpTime__ (the battery/UPS board)[^3]
4. __Raspberry Pi Zero W__ (with 32GB NOOBS SD-Card and solderless GPIO hammer header)[^4]
5. __Huawei E3372 LTE USB stick__ with mobile data SIM card[^5]
6. Velcro strap (for attaching the LTE USB stick to the rest of it)[^6]

In addition, you will need __a domain name__ and you will need to know how to update your DNS settings for it.

To point your domain name to your device’s ever-changing IP address you will also need to use __a service such as [Ngrok](https://ngrok.com/)__ (which is what I use here) or a dynamic DNS solution of some sort (which will likely need further setup)[^7].

Finally, to initially set up the Pi, you will also need a keyboard, mouse, and display to connect to it[^8].

## Build it

{{<figure src="prototype-01-power.jpeg" alt="Photo of Prototype-01 on a table showing the battery module and LTE USB stick connected to the Raspberry Pi." caption="Small Technology Foundation Personal Web Prototype-01: plug-and-play (at least on the hardware side).">}}

This is the simplest step. Simply snap the Piz-UpTime with the 14500 battery to the Raspberry Pi Zero using the GPIO header[^3] and connect the LTE USB stick to the USB port on the Raspberry Pi[^4]. Ensure that you use the power port on the PiZ-UpTime and not the one on the Pi itself to charge the battery and power the unit when connected.

{{<figure src="prototype-01-back.jpeg" alt="Photo of Prototype-01 bound with the velcro strap and in my hand showing the back of the Raspberry Pi with the raspberry logo." caption="Small Technology Foundation Personal Web Prototype-01: all together now.">}}

## Prepare the Pi Zero

To prepare your Pi to use as a headless web server, connect a keyboard, mouse, and screen to it. With the NOOBS SD-Card inserted, turn on your Pi. Once it boots, open up a terminal window and carry out the following steps.

1. ### Set up SSH access with public-key authentication

    xxx

2. ### Ensure the LTE modem is working

    xxx

3. ### Set up

3. ### Install [Site.js](https://sitejs.org) and set it up to run as a startup daemon.

    xxx




## The final piece

{{<figure src="prototype-01-front.jpeg" alt="Photo of my hand on top of a wooden table, holding the prototype described in this article." caption="Small Technology Foundation: Personal Web Prototype 01">}}

[^1]: Each one of us has the raw technology to achive this in our pockets in the form of a smartphone but the smartphone manufacturers do not let us do this because they do not want us to have ownership and control the digital and connected aspects of our lives – they want to be able to filter our experiences, gatekeep our access, and manipulate our behaviour for profit.

[^2]: If we want simple everyday technology for everyday people to use, we must first empower those who make such things with the tools they need to do so without being beholden to the tools of Big Tech. To paraphrase Audre Lorde: the master’s tools will never dismantle the master’s house but neither will the master’s tools ever empower you to build your own house.

[^3]: There are several UPS / battery solutions for the Raspberry Pi Zero. The one I’m using here is the PiZ-UpTime 1.0. The latest, currently available version is the [PiZ-UpTime 2.0](http://alchemy-power.com/piz-uptime-2-0/)).

    Other power options include the [PiSugar](https://hackaday.io/project/164733-pisugar-battery-for-raspberry-pi-zero) – [which I’d love to get my hands on](https://twitter.com/aral/status/1193478863956959233) and the [JuiceBox Zero](https://juiceboxzero.com/product/juicebox-zero-battery-management-board/).

[^4]: I’m using a Raspberry Pi W which doesn’t come with a GPIO header. You don’t need the GPIO header to connect the UPS (you can also use a USB Micro-B male-to-male cable/connector). If you do want to use the header, either get the Raspberry Pi WH model (which comes with it pre-soldered) or you can do what I did, which was to use a [solderless GPIO hammer header from Pimoroni](https://shop.pimoroni.com/products/gpio-hammer-header?variant=35643318026).

[^5]: If the LTE USB stick is not automatically recognised, [see this](https://www.raspberrypi.org/forums/viewtopic.php?p=1197625). Also, make sure you put the SIM card in to the SIM card slot and not the SD-Card slot on the LTE USB stick. They’re easy to confuse.

[^6]: A wad of blue/white tack or a strong rubber band works just as well; just use whatever you have lying around.

[^7]: In this post, I will only cover Ngrok, with an Ngrok Pro account which is necessary for using custom domain names.

[^8]: Since the Pi Zero only has one USB port, you will either need a bluetooth keyboard/mouse or a combination USB keyboard/mouse or a USB hub.

    If you don’t want to keep connecting a keyboard and mouse, look at [Synergy](https://symless.com/synergy). It enables you to share one keyboard and mouse across several devices. If you want a free and open source version, check out [Barrier](https://github.com/debauchee/barrier) (which I learned about only later and haven’t tried myself yet).

    <iframe src="https://mastodon.ar.al/@aral/102976943949623290/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

[^5]: If you have some spacers, it would be good to use them on the opposite end of the header so the board doesn’t flex.



