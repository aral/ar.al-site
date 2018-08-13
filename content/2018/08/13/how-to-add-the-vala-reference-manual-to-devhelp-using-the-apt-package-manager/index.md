---
title: "How to install the Vala Reference Manual into Devhelp using the apt package manager"
date: 2018-08-13T10:59:49+01:00
draft: false
---

{{< figure src="devhelp.jpg" alt="Screenshot of the Devhelp documentation app showing the Vala Reference Manual’s Getting Started section. The description begins: “Vala is a programming language that aims to bring modern language features to GNOME developers without imposing any additional runtime requirements and without using a different ABI than applications and libraries written in C.”" caption="The Vala Refence Manual in Devhelp.">}}

The [Vala Documentation](https://wiki.gnome.org/Projects/Vala/Documentation) states that the [Vala Reference Manual](http://www.vala-project.org/doc/vala/) is available in [HTML](https://www.vala-project.org/doc/vala/) and [PDF](https://www.vala-project.org/doc/manual.pdf) versions and “is also available for your installed version of Vala as [DevHelp](https://wiki.gnome.org/Apps/Devhelp) from your distribution, such as Fedora or Ubuntu.”

Sadly, though, it doesn’t tell you the package names or link to the packages.

For Debian’s apt-based systems like [Pop!_OS](/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/) and Ubuntu, the package you’re looking for is called _vala-0.40-doc_.

To install the Vala Reference Manual into DevHelp, run the following command:

{{<highlight bash>}}
sudo apt install vala-0.40-doc
{{</highlight>}}

In case you’re reading this far into the future and there is a different version of Vala and a different version of the package, you can search for the latest version with the following command:

{{<highlight bash>}}
apt search 'vala-[0-9]+\.[0-9]+-doc'
{{</highlight>}}
