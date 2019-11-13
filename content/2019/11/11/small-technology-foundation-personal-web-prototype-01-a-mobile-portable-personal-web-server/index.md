---
title: "Small Technology Foundation Personal Web Prototype-01: a mobile personal web server"
date: 2019-11-13T15:06:00Z
description:
images:
  - prototype-01-front.jpeg
tags:
  - personal web
  - small technology foundation
  - site.js
  - mobile
  - sbc
  - single board computer
  - raspberry pi
  - piz-uptime
  - 4g
  - lte
draft: false
---

{{<figure src="prototype-01-front.jpeg" alt="Photo of my hand on top of a wooden table, holding the prototype described in this article." caption="Small Technology Foundation Personal Web Prototype-01: an always-connected portable personal web server that fits in your pocket.">}}

Imagine holding your personal web site in the palm of your hand. Imagine carrying the digital aspects of your self in your pocket instead of having them on some abstract cloud under the watchful eye of some faceless multinational corporation[^1].

Personal Web Prototype-01 from [Small Technology Foundation](https://small-tech.org) [R&D](https://small-tech.org/research-and-development) achieves the former using widely available off-the-shelf parts and [Site.js](https://sitejs.org). Hopefully, it will also start you thinking in a similar vein about building things that enable the latter.

In this post, I will outline what Prototype-01 is and how you can build a similar personal web device yourself. The audience for this post is tinkerers and developers[^2].

## The hardware

{{<figure src="prototype-01-components.jpeg" alt="Photo of the components of prototype 01 in a small fabric case labelled with letters." caption="Prototype 01: the hardware.">}}

<style>
  #lettered-list + ol {
    list-style-type: lower-alpha !important;
  }
  #lettered-list + ol li::marker {
    color: #E11064;
  }
</style>

Here are the parts I used to build Prototype-01, as labelled in the first photo, above. The main ones are in boldface.

<div id='lettered-list'></div>

1. USB Micro Type-B (male) to USB Type-A (female) cable
2. 14500 Lithium-ion battery (3.7v; rechargeable)
3. __Piz-UpTime__ (the battery/UPS board)[^3]
4. __Raspberry Pi Zero W__ (with 32GB [NOOBS](https://www.raspberrypi.org/documentation/installation/noobs.md) SD-Card and solderless GPIO hammer header)[^4]
5. __Huawei E3372 LTE USB stick__ with mobile data SIM card[^5]
6. Velcro strap (for attaching the LTE USB stick to the rest of it)[^6]

In addition, you will need __a domain name__ (I use and can recommend [IWantMyName.com](https://iwantmyname.com) for mine) and you will need to know how to update your DNS settings for it.

To point your domain name to your device’s ever-changing IP address you will also need to use __a service such as [Ngrok](https://ngrok.com/)__ (which is what I use here) or a dynamic DNS solution of some sort (which will likely need further setup)[^7].

Finally, to initially set up the Pi, you will also need a keyboard, mouse, and display to connect to it[^8].

## Building it

{{<figure src="prototype-01-power.jpeg" alt="Photo of Prototype-01 on a table showing the battery module and LTE USB stick connected to the Raspberry Pi." caption="Small Technology Foundation Personal Web Prototype-01: plug-and-play (at least on the hardware side).">}}

This is the simplest step. Simply snap the Piz-UpTime with the 14500 battery to the Raspberry Pi Zero using the GPIO header[^3] and connect the LTE USB stick to the USB port on the Raspberry Pi[^4]. Ensure that you use the power port on the PiZ-UpTime and not the one on the Pi itself to charge the battery and power the unit when connected.

## Preparing the Pi Zero

To prepare your Pi to use as a headless web server, connect a keyboard, mouse, and screen to it. With the NOOBS SD-Card inserted, turn on your Pi. Once it boots, open up a terminal window and carry out the following steps.

### Set up SSH access with public-key authentication

1. On the Raspberry Pi, select _Preferences → Raspberry Pi Configuration_ from the Raspberry menu.

2. In the settings box that appears, set the `subdomain.doma.in` name you will serve your site from in the _Hostname_ field.

3. In the Interfaces tab, select the _Enable_ radio button next for the _SSH_ field.

4. Click _OK_ to save your settings and exit settings.

5. `ssh` into your Pi using the IP address of the Pi (which you can find by running `ifconfig`) and your Pi account name and password.

6. Add your SSH public key from your main computer (e.g., from `~/.ssh/id_ed25519.pub`) to your Pi (e.g., into the `~/.ssh/authorized_keys` file).

    If you do not have SSH keys generated on your main computer yet, [follow the instructions here to create a pair](https://www.unixtutorial.org/how-to-generate-ed25519-ssh-key).

7. Log out of your `ssh` session and reconnect without using your password to test that the public-key authentication you just set up works.

{{<figure src="prototype-01-4g-modem.jpeg" alt="Close-up of the Huawei Mobile Broadband LTE USB Stick E3372 used in the prototype." caption="Small Technology Foundation Personal Web Prototype-01: close-up of the LTE USB Stick.">}}

### Set up ngrok

You need to configure ngrok to create three secure tunnels to the Raspberry Pi:

  - __HTTP tunnel for port 80__ so Site.js can handle Let’s Encrypt challenges using the [HTTP-01 challenge](https://letsencrypt.org/docs/challenge-types#http-01-challenge) method.

  - __TLS tunnel for port 443__ that Site.js will use to serve your web site on.

  - __TCP tunnel for port 22__ so you can access your Pi at your domain name over SSH.

To do this, create a file called `ngrok.yml` in the `~/.ngrok2` directory (create the directory if it doesn’t already exist):

```sh
mkdir -p ~/.ngrok2
touch ~/.ngrok2/ngrok.yml
```

Then add the following configuration, customising it for your needs:

```yaml
authtoken: <your-auth-token>
region: eu
tunnels:
  insecure-web:
    addr: 80
    proto: http
    hostname: <your-reserved-subdomain.doma.in>
    bind-tls: false
  secure-web:
    addr: 443
    proto: tls
    hostname: <your-reserved-subdomain.doma.in>
  ssh:
    addr: 22
    proto: tcp
    remote_addr: <your-reserved-tcp-address>
```

You can find your `authtoken` on your [ngrok Auth page](https://dashboard.ngrok.com/auth).

To learn how to reserve a custom domain, see [the ngrok documentation](https://ngrok.com/docs/2) for [tunnels on custom domains](https://ngrok.com/docs/2#http-custom-domains) and [TCP Tunnels: listening on a reserved remote address](https://ngrok.com/docs/2#tcp-remote-addr). Also, alter the `region` to match the one you reserved your ngrok domains on.

Once you’ve customised and saved your ngrok configuration file, you can create your tunnels at any time using:

```sh
ngrok start --all
```

However, while that’s good for testing, what we want is for ngrok to start automatically when the Raspberry Pi does. This will allow us to SSH into the Pi so we can use it headlessly from now on and it will mean that once it has power, our web site will be reachable from anywhere in the world.

To do this, edit the `/etc/xdg/lxsession/LXDE-pi/autostart` file, add the following line to it, and save it:

```sh
@ngrok start --all
```

This will automatically run your ngrok tunnels in the background whenever the Pi boots up.

### Install [Site.js](https://sitejs.org) and run it as a startup daemon

1. Install Site.js

```sh
wget -qO- https://sitejs.org/install | bash
```

2. Create a basic web site:

```sh
# Create a folder to hold the web site.
mkdir -p ~/public

# Switch to that folder.
cd public

# Create a simple “Hello, world!” page.
echo 'Hello, world!' > index.html
```

3. Create a startup daemon using Site.js to serve your site (this will survive restarts and crashes, etc.):

```sh
site enable
```

## Testing it

You should now be able to hit _https://subdomain.doma.in_ and see your “Hello, world!” page.

## Updating your site

Now that your site is live, how do you make it a bit more exciting?

1. On your main computer, create a more interesting web site than “Hello, world”.

    If you want to get an idea for the types of things you can build with Site.js, see the tutorial I wrote recently on how to [build a simple chat app with Site.js](/2019/10/11/build-a-simple-chat-app-with-site.js/).

2. Make sure Site.js is also installed on your main computer and then issue the following command:

    ```sh
    site --sync-to=subdomain.doma.in --exit-on-sync
    ```

3. Hit _https://subdomain.doma.in_ again and you should see your new site.

To learn more about Site.js, read the [Site.js documentation](https://source.ind.ie/site.js/app/blob/master/README.md).

{{<figure src="prototype-01-back.jpeg" alt="Photo of Prototype-01 bound with the velcro strap and in my hand showing the back of the Raspberry Pi with the raspberry logo." caption="Small Technology Foundation Personal Web Prototype-01: all together now.">}}

## What next?

This is just the first prototype to come out of our work on [Site.js](https://sitejs.org) as part of our [research and development](https://small-tech.org/research-and-development) work at [Small Technology Foundation](https://small-tech.org). It doesn’t represent a specific product we are thinking of building but rather more the direction in which we’re thinking (which might result in products later on).

I hope, though, that it does help demonstrate two important points:

1. __We all already carry much more powerful and refined versions of this prototype in our pockets (it’s your smart phone) and yet we cannot run our own web sites on them.__

    Why not?

    Because the Big Tech corporations that make these devices don’t want us to.

    I hope this gives folks like [Purism](https://puri.sm) and [e.foundation](https://e.foundation/) some ideas about what they could do in this area to differentiate themselves from the likes of Apple, etc.

2. __If we want the sort of freedom devices like this can offer people, we must ensure that they just work out of the box.__

    While I hope that you have found this post interesting if you’re a tinkerer or developer, I also hope that it highlights the mountain of work that must be done if we want all the various aspects outlined here to work seamlessly when our audience is everyday people who use technology as everyday things.

    I hope this post has inspired to you think about what you can make that everyday people can use to take ownership and control of the digital and connected aspects of their lives.

As always, please feel free to [let me know your thoughts](https://mastodon.ar.al/@aral).

{{< like_this_fund_us >}}

[^1]: Each one of us has the raw technology to achieve this in our pockets in the form of a smartphone but the smartphone manufacturers do not let us do this because they do not want us to have ownership and control the digital and connected aspects of our lives – they want to be able to filter our experiences, gatekeep our access, and manipulate our behaviour for profit.

[^2]: If we want simple everyday technology for everyday people to use, we must first empower those who make such things with the tools they need to do so without being beholden to the tools of Big Tech. To paraphrase Audre Lorde: the master’s tools will never dismantle the master’s house and neither will the master’s tools ever let you build your own house.

[^3]: There are several UPS / battery solutions for the Raspberry Pi Zero. The one I’m using here is the PiZ-UpTime 1.0. The latest, currently available version is the [PiZ-UpTime 2.0](http://alchemy-power.com/piz-uptime-2-0/)).

    Other power options include the [PiSugar](https://hackaday.io/project/164733-pisugar-battery-for-raspberry-pi-zero) – [which I’d love to get my hands on](https://twitter.com/aral/status/1193478863956959233) and the [JuiceBox Zero](https://juiceboxzero.com/product/juicebox-zero-battery-management-board/).

    If you do end up using the PiZ-Uptime, you will want to install [a cron job to ensure that the board is cleanly shut down if the battery runs low on power](http://alchemy-power.com/downloads/).

[^4]: I’m using a Raspberry Pi W which doesn’t come with a GPIO header. You don’t need the GPIO header to connect the UPS (you can also use a USB Micro-B male-to-male cable/connector). If you do want to use the header, either get the Raspberry Pi WH model (which comes with it pre-soldered) or you can do what I did, which was to use a [solderless GPIO hammer header from Pimoroni](https://shop.pimoroni.com/products/gpio-hammer-header?variant=35643318026).

[^5]: If the LTE USB stick is not automatically recognised, [see this](https://www.raspberrypi.org/forums/viewtopic.php?p=1197625). Also, make sure you put the SIM card in to the SIM card slot and not the SD-Card slot on the LTE USB stick. They’re easy to confuse.

[^6]: A wad of blue/white tack or a strong rubber band works just as well; just use whatever you have lying around.

[^7]: In this post, I will only cover Ngrok, with an Ngrok Pro account which is necessary for using custom domain names.

[^8]: Since the Pi Zero only has one USB port, you will either need a bluetooth keyboard/mouse or a combination USB keyboard/mouse or a USB hub.

    If you don’t want to keep connecting a keyboard and mouse, look at [Synergy](https://symless.com/synergy). It enables you to share one keyboard and mouse across several devices. If you want a free and open source version, check out [Barrier](https://github.com/debauchee/barrier) (which I learned about only later and haven’t tried myself yet).

    <iframe src="https://mastodon.ar.al/@aral/102976943949623290/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

[^5]: If you have some spacers, it would be good to use them on the opposite end of the header so the board doesn’t flex.



