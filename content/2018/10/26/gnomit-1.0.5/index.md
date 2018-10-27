---
title: "Gnomit 1.0.5"
date: 2018-10-26T19:29:00+02:00
draft: false
---

{{<figure src="gnomit-dark-theme-support.png" alt="Screenshot of Gnomit version 1.0.5 in a dark theme." caption="Gnomit 1.0.5, wearing Adwaita-dark">}}

I just released a minor update to Gnomit, my little commit message editor for Linux, that adds dark theme support. Previously, Gnomit did not update the background colour that it uses to highlight the commit message overflow area for dark themes, rendering the overflow area difficult to read.

Now, it uses a darker shade of the light theme colour when it detects a change to the theme.

You can install Gnomit via [Gnome Software](https://wiki.gnome.org/Apps/Software) and [Flathub](https://flathub.org/apps/details/ind.ie.Gnomit):

{{<highlight bash>}}
flatpak install flathub ind.ie.Gnomit
{{</highlight>}}

For detailed installation instructions, please see the [readme](https://source.ind.ie/gnome/gnomit/gjs/blob/master/README.md).

The source code is available from [source.ind.ie](ttps://source.ind.ie/gnome/gnomit) and there’s also [a GitHub mirror](https://github.com/indie-mirror/gnomit) where you can open issues and submit pull requests.
