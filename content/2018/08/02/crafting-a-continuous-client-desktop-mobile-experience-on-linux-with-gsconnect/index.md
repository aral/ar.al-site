---
title: "Crafting a continuous-client desktop/mobile experience on Linux with GSConnect"
date: 2018-08-02T23:57:29+01:00
draft: false
---

{{< figure src="gsconnect.jpg" alt="Screenshot of my desktop screen showing the GSConnect app’s settings on the left and the system menu open with details of my mobile phone showing under mobile devices." caption="A continuous free and open experience between desktop and mobile." >}}

A cornerstone of Apple’s approach to seamless design is reflected in a feature they call [Continuity](https://www.apple.com/macos/continuity/). Continuity aims to provide a “seamless experience” between your various devices. This is essentially what Joshua Topolsky called the [continuous client](https://www.engadget.com/2010/05/26/a-modest-proposal-the-continuous-client/) back in 2010 and a concept that I wrote at length about in my chapter titled [Mobile Considerations In User Experience Design: “Web or Native?”](https://www.smashingmagazine.com/2012/06/mobile-considerations-in-user-experience-design-web-or-native/#fn11) in Smashing Magazine’s Redesign The Web book back in 2012.

Well, tonight, I discovered that some amazing folks in the free and open source community have been busy implementing similar functionality that works on my desktop running [Pop!_OS](https://ar.al/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/) and my phone running [LineageOS](https://lineageos.org/). Those folks are the team behind [KDEConnect](https://community.kde.org/KDEConnect) and [Andy Holmes](https://github.com/andyholmes), who implemented it for Gnome Shell 3.24+ in [a Gnome Extension](https://extensions.gnome.org/extension/1319/gsconnect/) called [GSConnect](https://github.com/andyholmes/gnome-shell-extension-gsconnect).

With GSConnect installed, my desktop and phone become best buddies and can share all sorts of things, including notifications and files. You can also send SMS messages (although you should really be using end-to-end encrypted messaging via [Wire](https://wire.com) or [Signal](https://signal.org) instead) and locate your phone if you’ve misplaced it.

{{< figure src="kde-connect.jpg" alt="Screenshot of KDE Connect on my Samsung S9+ showing the name of my desktop Aral-XPS13 as well as a hamburger menu and a second hamburger menu with dots (let's not go there). There is a list underneath with the following options: Send files, multimedia control, remote input, run command. The menu bar is orange." caption="KDE Connect on mobile." >}}

On the phone, you will need the KDE Connect app which you can [get from the F-Droid catalogue](https://f-droid.org/packages/org.kde.kdeconnect_tp/).

It's quite amazing how well it works. And by that I mean that I’ve found sending files between my devices easier to use and more reliable than AirDrop. And that’s saying something given that AirDrop was created by a multibillion-dollar corporation that touts design as its unique selling point.
