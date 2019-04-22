---
title: "Fixing the icon regression in Pop!_OS 19.04"
date: 2019-04-20T14:05:12+01:00
draft: false
---

{{<figure src="consistent-icons.jpeg" alt="Screenshot of some consistent Pop!_OS icons from Pop!_OS 18.10 and earlier." caption="Ah, consistent icons.">}}

After installing Pop!_OS 19.04 yesterday, my desktop experience became an eyesore as the previously consistent icon set was replaced with what I can only describe as [icon vomit soup](https://mastodon.ar.al/@aral/101958586404597562).

If you want to get your pre-19.04 consistent icon set back, do this:

### Method 1

{{<highlight shell>}}
# Backup the current icons and get them out of the way.
sudo mv /usr/share/icons/Pop /usr/share/icons/Pop-19.04

# Clone the older branch and install it.
git clone --single-branch --branch=master_cosmic --depth=1 https://github.com/pop-os/icon-theme.git
cd icon-theme
sudo make install
sudo make post-install
{{</highlight>}}

__Note:__ the post-install step failed for me but the consistent icons are back and my eyes are happier.

### Method 2 (update)

[Pop!_Planet has released a “Pop Classic” icon theme](https://pop-planet.info/forums/projects/pop-classic.3/) that you can download and install.

### Consistency is the #1 problem with desktop Linux

Here’s hoping that Linux distributions understand that the biggest problem with desktop Linux today isn’t lack of apps, functionality, or performance… it’s consistency.

Distributions must enforce consistency. System76 had the right idea originally. It’s sad to see this regression in their approach.

Remember that the right of millions of people who use your operating system to a pleasing functional and aesthetic experience far outweighs the vanities of developers to subject people to their proud app icon concoctions in Gimp. We’re developers. We make things that we and other people to use. It’s not about us. It’s about them.
