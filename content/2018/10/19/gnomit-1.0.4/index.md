---
title: "Gnomit 1.0.4"
date: 2018-10-19T21:43:08+01:00
draft: false
---

{{<figure src="gnomit.png" alt="Gnomit’s git message composition window showing the new look with a standard window that contains the Cancel and Commit buttons." caption="Gnomit’s new look">}}

There’s a new version of [Gnomit](https://flathub.org/apps/details/ind.ie.Gnomit), my little commit message editor for Linux, thanks to [the initiative](https://mastodon.technology/@bugaevc/100737595071420219) of [Sergey Bugaev](https://mastodon.technology/@bugaevc) who sent me [a patch](https://gitlab.gnome.org/snippets/341) a few weeks ago.[^1] Sergey’s patch updates Gnomit to use a standard window instead of the dialog window I was using[^2]  and moves the Cancel and Commit buttons to the new window’s header bar.

The new look actually makes it mirror its inspiration, [the Komet app on macOS](https://github.com/zorgiepoo/Komet), almost exactly.

Thank you for the patch, Sergey :)

You can install Gnomit via [Gnome Software](https://wiki.gnome.org/Apps/Software) and [Flathub](https://flathub.org/apps/details/ind.ie.Gnomit):

{{<highlight bash>}}
flatpak install flathub ind.ie.Gnomit
{{</highlight>}}

For detailed installation instructions, please see the [readme](https://source.ind.ie/gnome/gnomit/gjs/blob/master/README.md).

The source code is available from [source.ind.ie](ttps://source.ind.ie/gnome/gnomit) and there’s also [a GitHub mirror](https://github.com/indie-mirror/gnomit) where you can open issues and submit pull requests.

[^1]: Sergey actually sent me the patch quite a few weeks ago but first [the new release of Better](http://localhost:1313/2018/09/25/better-blocker-thank-you-for-our-best-week-yet/) and then my XPS 13’s battery dying meant I only got round to taking a look at it now.

[^2]: Using a regular window has the welcome side-effect of removing [the annoying GTK warning in the terminal](https://source.ind.ie/gnome/gnomit/gjs/issues/25) complaining about the use of a dialogue window as the main window of the application.