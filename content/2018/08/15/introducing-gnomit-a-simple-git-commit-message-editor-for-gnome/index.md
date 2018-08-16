---
title: "Introducing Gnomit: a simple Git commit message editor for Gnome"
date: 2018-08-15T17:16:31+01:00
draft: false
---

{{<figure src="gnomit.png" alt="Screenshot of Gnomit showing the overflow highlighting on the subject line and the automatically inserted empty line between the subject line and the rest of the commit message." caption="Gnomit helps me write better commit messages.">}}

[Gnomit](https://source.ind.ie/gnome/gnomit/gjs) is a simple Git commit message editor for Gnome, inspired by the excellent [Komet](https://github.com/zorgiepoo/Komet) app by [Mayur Pawashe](https://zgcoder.net/) that I was using on macOS[^1].

I started working on Gnomit this weekend and I’m currently happily using it as my default Git editor. It’s a simple first project and a way for me to get acquainted with [GTK+](https://www.gtk.org/), [GJS](https://gitlab.gnome.org/GNOME/gjs/wikis/Home), and [Vala](https://wiki.gnome.org/Projects/Vala) – some of the core elements of [Gnome](https://wiki.gnome.org/).

I do need to properly package it up and complete the Vala version. If you [try it out](https://source.ind.ie/gnome/gnomit/gjs), please do [let me know](https://mastodon.ar.al) if you have any trouble with the [Gspell](https://wiki.gnome.org/Projects/gspell) spell checker dependency. I had all sorts of issues with the import and I have a suspicion that you might also.[^2]

I hope to have a proper package (via [Flatpak](https://www.flatpak.org/), perhaps) ready soon but, if you want to play with it in the meanwhile and don’t mind getting your hands dirty with a possible Gspell dependency, the GJS version is entirely usable and [available on source.ind.ie](https://source.ind.ie/gnome/gnomit).

[^1]: Before [I switched](/2018/07/16/changes/) to [Pop!_OS](/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/).

[^2]: I have a lot to learn on this new platform, especially concerning dependency management and packaging-related matters.
