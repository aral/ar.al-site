---
title: "Web development on a phone with Hugo and Termux"
date: 2018-07-30T20:44:12+01:00
draft: false
---

{{< figure src="s9.jpg" alt="My S9+ phone on a wooden table with part of my Microsoft foldable bluetooth keyboard showing at the bottom of the photo. The S9+ is running Emacs with this blog post on the left side of the screen and the DuckDuckGo browser with the rendered version of the page on the right." caption="Web development in 2018: all you need is a phone." >}}

[Hugo](https://gohugo.io) is an excellent static site generator and website framework.

You can build a static web site using your phone by running Hugo on [LineageOS](https://lineageos.org) under [Termux](https://termux.com/).

Here's how:

(The instructions below have been tested with LineageOS 15.1 and Termux 0.64.)

1. Install [Termux from the F-Droid catalogue](https://f-droid.org/packages/com.termux/)
2. Install Go (substitute _.bashrc_ with _.zshrc_ if you use zsh):

    {{< highlight bash >}}# Install go.
pkg install golang

# Update your shell configuration.
echo "export GOPATH=$HOME/go\nexport PATH=$PATH:$GOROOT/bin:$GOPATH/bin" >> ~/.bashrc

# Reload your shell configuration.
source ~/.bashrc{{< /highlight >}}

3. Compile Hugo from source:[^1]

    {{< highlight bash >}}# Install Mage (a build tool for go).
go get github.com/magefile/mage

# Retrieve, compile, and install Hugo.
go get -d github.com/gohugoio/hugo
cd ${GOPATH:-$HOME/go}/src/github.com/gohugoio/hugo
env DEPNOLOCK=1 mage vendor
mage install{{< /highlight >}}

That's it!

You should now have a working Hugo setup. Enjoy web development from your phone and, if you want an easy way to deploy from your phone and/or to join the peer web, check out my other posts on Web+[^2].

_Written on my LineageOS phone using Termux, Emacs and Hugo. Deployed via rsync and available on the peer web at [dat://ar.al/2018/07/30/compiling-hugo-for-mobile-phones-under-termux/](dat://ar.al/2018/07/30/compiling-hugo-for-mobile-phones-under-termux/|). To view peer web sites, use [Beaker Browser](https://beakerbrowser.com/)._

[^1]: The [official Hugo compilation instructions](https://gohugo.io/getting-started/installing#fetch-from-github) [hang under Termux](https://github.com/golang/dep/issues/947) at the `mage vendor` command. The instructions here differ from those by setting an environment variable that avoids the hang.

[^2]: [Web+](/2018/06/26/web+/) and [Web+ on a phone](/2018/07/05/web+-on-a-phone/)