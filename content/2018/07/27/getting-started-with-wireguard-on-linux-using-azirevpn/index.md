---
title: "Getting started with WireGuard on Linux using AzireVPN"
date: 2018-07-27T11:05:32+01:00
draft: true
---

A [Virtual Private Network](https://en.wikipedia.org/wiki/Virtual_private_network) (VPN) can be a practical tool that reinforces your security and privacy when using an Internet-connected device. It is not a panacea, however. You should be aware of both your own [threat model](https://en.wikipedia.org/wiki/Threat_model) and the security and privacy traits of VPNs so you can use one responsibly and ensure that you don’t succumb to a false sense of security or privacy.

### What is a VPN?

A VPN is basically an encrypted (private) connection to some other network through which all your traffic – web browsing, email, chats, etc. – is routed. Since the connection is encrypted, the network you're currently connected to cannot eavesdrop on you. All your Internet Service Provider (ISP) or the open WiFi network you just connected to at your local cafe can see is that you’ve made an encrypted connection to your VPN provider but they cannot see any of the traffic that flows through that connection.

Similarly, far as any sites you connect to are concerned, your traffic originates from the servers of your VPN provider and not your own machine. This is why VPNs are commonly used to thwart region-locking schemes by the likes of Netflix and their cohorts in the copyright lobby[^1].

In a nutshell, if you live in a somewhat free society and have an everyday threat model, a VPN limits the number of parties that can trivially eavesdrop on your Internet activity to just your VPN provider.

### On trust

> Never trust anything that can think for itself if you can't see where it keeps its brain. – J.K. Rowling

Given that you have to trust your VPN provider, the choice of VPN provider is what determines the level of security and privacy you get by using a VPN.

Nothing about the design of VPN implies that you should in any way trust VPN providers.

<iframe src="https://octodon.social/@cwebber/100442926544174062/embed" class="mastodon-embed"></iframe><script src="https://octodon.social/embed.js" async="async"></script>

It is trivial for your VPN provider (or your web host, if you're hosting your VPN server yourself) to violate your privacy. Your connection is encrypted between you and the private network you're connecting to but it is not end-to-end encrypted between your computer and the parties you're communicating with.

This is why you should never trust free (as in cost) VPN providers. How are they making their money if not by you paying them? What are you paying them with? (Remember, they can see all of your Internet activity.)

Even with a VPN provider that you’ve chosen to trust, you should connect to web sites only using [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (HTTPS) and use end-to-end-encrypted communication apps like [Wire](https://wire.com/en/unsupported/) and [Signal](https://signal.org/). If you need greater levels of anonymity (e.g., if you are sharing information that might result in your assasination by an autocratic regime), consider using [Tor](https://www.torproject.org/).

It might seem like I am rambling and not getting to the point of the post but I cannot stress how important it is that you understand the security and threat models of the tools that you use. If nothing else, remember that a VPN is only as trustworthy as the people who run it.

### So which VPN do you use and recommend?

I get this question a lot. So before I get to the point of the post (oh, ffs!), I want to cover this too.

On iOS and macOS, I use [EncryptMe](https://www.encrypt.me/) (née Cloak). Why? Because my friend [Dave Peck](https://davepeck.org/) set it up and I trust Dave. Dave’s since sold the company but it still seems to be run by good folks.

When [I recently switched my main phone from an iPhone to one running LineageOS](https://ar.al/2018/07/16/changes/) and [asked them](https://twitter.com/aral/status/1014430133837582338) for an [Android application package](https://en.wikipedia.org/wiki/Android_application_package) (APK) – as I didn’t want to use the Google Play store – they responded immediately[^2] and sent it to me.[^3] In addition to iOS, macOS, and Android, EncryptMe is also available on Windows.

The main reason I've been using EncryptMe is its ease of use. You install and launch it and it just works. Also, it automatically blocks network traffic before the VPN connection has been established. This should be – but sadly isn’t – standard functionality in VPN clients to prevent [data leaks between Wi-Fi connect and VPN launch](https://arstechnica.com/information-technology/2015/06/even-with-a-vpn-open-wi-fi-exposes-users/).

If you were to ask me which third-party VPN I would unconditionally trust, however, it would be [iPredator](https://www.ipredator.se/).

Why?

Because it’s run by my friend [Peter](https://en.wikipedia.org/wiki/Peter_Sunde) and I trust Peter unconditionally. The reason I don’t use it myself is because EncryptMe is easier to setup and use. So convenience wins yet again. (I almost feel like there’s a lesson to learned here for those of us that make everyday technologies but I can’t seem to put my finger on it… 🤔)

And that also brings us, finally, to the subject of this post: WireGuard and how to set it up on Linux.

### WireGuard

[WireGuard](https://www.wireguard.com/) describes itself as a “fast, modern, secure VPN tunnel.” Part of the reason VPNs can be hassle to host, install, and use is because they are – relatively speaking – based on ancient, bloated technology. The two main protocols in use today, [IPsec](https://en.wikipedia.org/wiki/IPsec) and [OpenVPN](https://en.wikipedia.org/wiki/OpenVPN) date from the 90s and 00s and are behemoths weighing in at roughly 400,000 and 100,000 lines of code, respectively.

[^1]: These are the bastards that [want to destroy how the Internet works](https://edri.org/the-eu-gets-another-opportunity-to-improve-copyright-rules/).

[^2]: Thank you, folks! I haven't had a chance to try it yet as I've been busy, but I will.

[^3]: [1password](https://1password.com/), on the other hand, [told me I could pound sand](https://twitter.com/1Password/status/1014993975407730688) when I asked them the same thing. The cost of being 1password’s customer, if you are running an Android Open Source Project (AOSP)-based mobile operating system like [LineageOS](https://lineageos.org/), is to be tracked and profiled by Google ([Alphabet, Inc.](https://en.wikipedia.org/wiki/Alphabet_Inc.)) Needless to say, I am actively considering alternatives to 1password as we speak.
