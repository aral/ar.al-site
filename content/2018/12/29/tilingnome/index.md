---
title: "Tilingnome"
date: 2018-12-29T10:10:58Z
draft: false
---

{{< figure src="tilingnome.jpeg" alt="My desktop with three windows tiled using Tilingnome. One takes up half the screen on the left and the other two share the other half, tiled vertically. The apps are, clockwise, GNOME Web, Visual Studio Code, and Tilix. The terminal prompt reads ~/ar.al/site/(master) ./new tilingnome" caption="Tilingnome in action" >}}

I like the idea of a tiling window manager like [i3](https://i3wm.org/) (or [i3-gaps](https://github.com/Airblader/i3), or [sway](https://swaywm.org/)) not necessarily because of their lightweight nature when compared to a fully-fledged desktop environment like GNOME but because of their potential organisational and navigational value[^1].

### Tiling up is hard to do

The problem with the current crop of tiling window managers, however, is that they are difficult to set up and configure and they suffer from a host of issues such as no out-of-the-box HiDPI support, screen tearing, etc.[^2] You are also bereft of some of the everyday things you take for granted with desktop environments, such as having a built-in way to change your desktop image or manage locking on suspend, etc.[^3]

So, yesterday, after getting i3-gaps to work as best as I could on my machine, I went looking to see if anyone had made an extension that gives you the operational aspects of a tiling windowing manager within my desktop environment of choice, GNOME. And lo and behold, I found [Tilingnome](https://github.com/rliang/gnome-shell-extension-tilingnome).

### GNOME 3.30 updates

Sadly, it didn’t work on GNOME Shell 3.30, so I first had to update it. [Now it does](https://github.com/rliang/gnome-shell-extension-tilingnome/pull/7)[^4]. The joys of free software.

It was also not clear immediately how it should be used because the keyboard shortcuts were not documented or exposed anywhere. Unless I’m missing something, this seems to be the norm for keybindings in GNOME extensions. The only way I could find of changing the bindings was to alter the source, recompile the schema, and reload the extension. The least I could do was to [document the keyboard shortcuts in the _readme_](https://github.com/aral/gnome-shell-extension-tilingnome/tree/gnome-shell-3.30).

In addition to the documented keyboard shortcuts, you will probably want to use the full-screen shortcut (on my distribution, F11) to focus on your current task from time to time.

### To tile or not to tile…

Tilingnome has its own idiosyncrasies and gremlins. It fails to resize and position certain apps and can flake out when you leave full-screen mode in an app. I’m not sure if I will keep using as it seems to get in the way more than it improves my workflow at the moment. That said, it remains an option for managing workflow with multiple windows. And if you want to improve it, you can.

I’d love to hear your thoughts on tiling window managers and Tilingnome so feel free hit me up [on my Mastodon](https://mastodon.ar.al).

[^1]: This is a very personal and subjective measure and not a blanket statement. Depending on how comfortable you are with remembering and using keyboard shortcuts for navigating between windows, you will either love or hate a tiling window manager. Also, GNOME, out of the box, gives you the ability to use your pointing device to snap a window to the left, right, top, or bottom of your screen (or to maximize it). It also has keyboard shortcuts for doing all of the above. For many people, that will probably be enough. In fact, I’m not entirely sold on the benefits of a tiling window manager myself but I’m exploring the experience and their effect on my workflow out of academic interest.

[^2]: Most of which have workarounds. But again, you have to be willing to invest time in seeking them out and implementing them. As with most such things, we cannot expect everyday people to do this (because they might have two jobs and five kids, not because they are not smart enough) but it is a great learning experience if you want to understand how your computer and operating system works better. If nothing else, it leaves you with a profound respect for the amount of work a desktop environment like GNOME does.

[^3]: Again, you can add all of these things and more yourself.

[^4]: Or, more precisely, will do when my pull request is merged. Until then, you can [use my branch](https://github.com/aral/gnome-shell-extension-tilingnome/tree/gnome-shell-3.30).
