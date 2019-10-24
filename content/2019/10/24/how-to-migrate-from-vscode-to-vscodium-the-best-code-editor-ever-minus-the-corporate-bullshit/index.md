---
title: "How to migrate from VSCode to VSCodium (the best code editor ever minus the corporate bullshit)"
date: 2019-10-24T09:45:00+01:00
draft: false
---

{{< figure src="writing-this-post-in-vscodium.jpeg" alt="Screenshot of this post as I write it in VSCodium." caption="Blogception: a post on VSCodium as it’s being written in VSCodium.">}}

I am writing this blog post in [VSCodium](https://github.com/VSCodium/). What? Is that like VSCode?

Yes, it’s basically VSCode minus the corporate bullshit like surveillance and proprietary-licensed binaries.

## An ode to VSCode

VSCode is the best code editor I’ve ever used.

It’s actually rather delightful.

There, I’ve said it – and I’ve used a lot of editors across 30+ years of programming.

## VS-what?

{{<figure src="vscode-logo.jpeg" alt="Screenshot of the VSCode logo" caption="VSCode: it’s not just for code (ok, it is).">}}

For those of you who are not programmers (yet!) or have been living under a rock, VSCode is an open source code editor from Microsoft.

I know, I was shocked too.

## Enter, the bullshit

Even though it’s awesome, Microsoft is still Microsoft so – of course – it comes with telemetry (read: surveillance) by default. So while I love using it, I had to qualify every recommendation to others with “and remember to turn telemetry off.”

Well, no longer!

## Beyond the bullshit

[When I mentioned VSCode recently](https://mastodon.ar.al/@aral/102999641354210259) on [my Mastodon](https://mastodon.ar.al/@aral), janči responded with the following toot:

<iframe src="https://mstdn.io/@janci/103001544884674786/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe>

It sounded great so I decided to check it out and I’m very glad I did (thanks, janči).

## Enter VSCodium

<!-- Bye, bye validation. Oh, well… -->
<style>img[src~="vscodium.jpeg"] { border: 2px solid #333; }</style>

{{<figure src="vscodium.jpeg" alt="Screenshot of the VSCodium page on GitHub showing the VSCodium logo – looks like a blue coral or mycelium of some sort – and reads “VSCodium: Free/Libre Open Source Software Binaries of VSCode”" caption="The VSCodium project page on Microsoft GitHub.">}}

So it turns out that some enterprising freedom-lovers created a project called VSCodium that takes the MIT-licensed source code, removes the telemetry (read: surveillance) from the codebase (along with the branding[^1]) and licenses the resulting binaries under the MIT license, just like the code itself[^2]. How yummy!

## Bonus: auto updates!

Also, given that my main development machine is a laptop running Linux ([Pop!_OS](https://system76.com/pop)[^3]), I had to keep installing VSCode updates by hand as Microsoft does not make automatic updates available for my platform. VSCodium fixes that for me as [they have an apt repository](https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo#how-to-install-for-debianubuntulinux-mint).

## Shut up and don’t take my money!

So how does one install VSCodium? Also, given there’s a high chance you’re already running VSCode (because, like, who isn’t, amirite?), how do you migrate your extensions and other settings to it?

Easy peasy!

If you’re on a Debian-derived operating system, you can just copy/paste the following commands and be up and running in the next few seconds.

For other platforms, it’s just as easy if not easier ([read the download/install instructions](https://github.com/VSCodium/vscodium#downloadinstall) and the [migrating from Visual Studio Code to VSCodium](https://github.com/VSCodium/vscodium/blob/master/DOCS.md#migrating-from-visual-studio-code-to-vscodium) section of the documentation for details).

1. ## Install VSCodium with auto updates

    On Debian-derived operating systems that have the `apt` package manager:

    {{<highlight shell>}}
# Authorise Paul Carroty’s repository.
# (https://twitter.com/paulcarroty)
wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg | sudo apt-key add -

# Add Paul’s custom apt repository to your apt sources list.
echo 'deb https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/repos/debs/ vscodium main' | sudo tee --append /etc/apt/sources.list

# Update your apt package list and install VSCodium.
sudo apt update
sudo apt install codium{{</highlight>}}

2. ## Copy your extensions and settings over from VSCode to VSCodium.

    On Linux:

    {{<highlight shell>}}
# Create the folder to host your extensions.
mkdir -p ~/.vscode-oss/

# Copy your extensions over from VSCode.
cp -R ~/.vscode/extensions ~/.vscode-oss/

# Create the folder to hold your settings.
mkdir -p $HOME/.config/VSCodium/

# Copy your settings over from VSCode.
cp -R $HOME/.config/Code/User $HOME/.config/VSCodium/User/{{</highlight>}}

After you’ve followed the above instructions – or those for your own platform – you should be able to launch VSCodium by just typing `codium` in Terminal[^4]

## Need something to code?

{{<figure src="../../18/site.js-and-pi/site-js-chat-on-raspberry-pi-1.jpeg" alt="Screenshot of the Site.js basic chat example running on a Raspberry Pi 4B." caption="According to sources within Number 10, a chat app with Site.js is the perfect thing to code using VSCodium.">}}

I hope you enjoy using VSCodium as much as I do. And hey, if you’re looking for something fun to code with it, [check out my recent tutorial](/2019/10/11/build-a-simple-chat-app-with-site.js/) on building a WebSocket-based chat app with [Site.js](https://sitejs.org).

Using [the remote development feature in VSCode](https://code.visualstudio.com/docs/remote/ssh), you can even [do it on a Raspberry Pi](https://ar.al/2019/10/18/site.js-and-pi/) (yes, [even on a Raspberry Pi Zero!](https://ar.al/2019/10/22/the-little-raspberry-pi-that-could-serve-a-web-site/)).

{{< like_this_fund_us >}}

[^1]: VSCodium couldn’t keep the branding even if it wanted to as they would be violating Microsoft’s trademarks.
[^2]: The VSCode binaries carry a proprietary license.
[^3]: Pop!_OS is built on Ubuntu.
[^4]: To launch VSCodium using the same shortcut for VSCode, just alias it in your shell configuration file (e.g., `~/.zshrc` for zsh[^5]).
[^5]: You haven’t lived until you’ve tried [zsh](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH) with [oh-my-zsh](https://ohmyz.sh/) and the [agnoster theme](https://github.com/agnoster/agnoster-zsh-theme) with [powerline fonts](https://github.com/powerline/fonts) in [tilix](https://gnunn1.github.io/tilix-web/)… _just sayin’_. PS. To install the powerline fonts on a Debian-derived Linux distribution, just use `apt install fonts-powerline`, and to activate the agnoster theme, set `ZSH_THEME="agnoster"` in your `~/.zshrc`.
