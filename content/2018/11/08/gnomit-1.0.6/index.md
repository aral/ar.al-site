---
title: "Gnomit 1.0.6"
date: 2018-11-08T16:23:54+01:00
draft: false
---

The pushed the 1.0.6 release of Gnomit, my little git commit message editor for Linux, to the Flathub GitHub repo about two weeks ago but I’m only writing about it now as [there was a delay with the update appearing on Flathub](https://github.com/flathub/flathub/issues/694).

## What’s new?

In addition to git commit messages and tag messages, Gnomit now also supports `git add -p` messages and `rebase -i` messages. A big thank-you to Philip Chimento for reporting those issues.

## Get Gnomit

You can install Gnomit via [Gnome Software](https://wiki.gnome.org/Apps/Software) and [Flathub](https://flathub.org/apps/details/ind.ie.Gnomit):

{{<highlight bash>}}
flatpak install flathub ind.ie.Gnomit
{{</highlight>}}

For detailed installation instructions, please see the [readme](https://source.ind.ie/gnome/gnomit/gjs/blob/master/README.md).

The source code is available from [source.ind.ie](ttps://source.ind.ie/gnome/gnomit) and there’s also [a GitHub mirror](https://github.com/indie-mirror/gnomit) where you can open issues and submit pull requests.
