---
title: "Enabling Better Blocker in Gnome Web"
date: 2018-07-17T17:40:50+01:00
draft: false
---

{{< figure src="my-site-in-gnome-web.png" alt="Screenshot of the index of my site in Gnome Web" caption="Gnome Web: what ethical design looks like." >}}

[Gnome Web](https://wiki.gnome.org/Apps/Web) is an [ethical](https://ind.ie/ethical-design), simple, elegant, and beautiful web browser. And, since [I switched my main development machine to one running Gnome Shell](/2018/07/16/changes/), it is now my default browser.

Unlike products like Chrome and Firefox from surveillance capitalists like Google and Mozilla, Gnome Web has safe, private defaults that respect your human rights. As their privacy policy states:

> GNOME Web receives no funding from advertisers, and as such is able to offer privacy features like built-in adblocking and tracking query removal that are relegated to extensions by other browsers. We aim to offer the best out-of-the-box privacy settings of any general purpose web browser.

How refreshing. How just as it should be.

{{< figure src="gnome-web-defaults.png" alt="Screenshot of the Gnome Web Preferences panel, showing that the 'try to block advertisements' and 'try to block web trackers' settings are on by default." caption="Gnome Web is private by default. That's the only definition of privacy that matters. Constrast that to 'tracked and profiled by default but with the choice of turning the surveillance off' in Mozilla Firefox." >}}

### Tracker and adtech blocking

By default, Gnome Web comes with ad and tracker blocking based on EasyList. To see the default lists, you can use the following command in a terminal window:

{{< highlight bash >}}gsettings get org.gnome.Epiphany adblock-filters{{< /highlight >}}

The result should be an array of URLs to blocking lists in EasyList format:

{{< highlight javascript >}}[
  'https://easylist.to/easylist/easylist.txt',
  'https://easylist.to/easylist/easyprivacy.txt',
  'https://easylist.to/easylist/fanboy-annoyance.txt'
]{{< /highlight >}}

This is good but I feel we can make it… uhum… Better! 🤓

### Why's Better any better?

{{< figure src="better-blocker.png" alt="Screenshot of the Better Blocker web site showing better running on a Mac, iPad, and iPhone" caption="Better Blocker: it's not just for Apple's platforms anymore." >}}

[Laura](https://laurakalbag.com) and I built [Better Blocker](https://better.fyi) for three reasons:

1. We were hugely frustrated with the bullshit of so-called 'ad blockers' like AdBlock Plus by Eyeo who actually [get paid millions of dollars by surveillance capitalists like Google __not to block__ adtech and trackers](https://betanews.com/2015/02/02/whats-the-point-in-adblock-plus-if-google-microsoft-and-amazon-can-pay-to-bypass-it/).

2. We wanted to have a curated list of blocking rules that we understood. Looking at [an EasyList block list](https://easylist.to/easylist/easylist.txt), I have no idea why any of the rules were included. Reading through the entries of [our hand-curated database of trackers](https://better.fyi/trackers), on the other hand, I know exactly why.

3. We wanted a tracker blocker that didn't require any technical knowledge to install and use on the platforms that were the primary platforms for both of us at the time (iOS and macOS).

So we built Better as a [free and open](https://source.ind.ie/better) tracker blocker that is also available for sale on the [iOS](https://itunes.apple.com/us/app/better-by-ind.ie/id1080964978?ls=1&mt=8) and [macOS](https://itunes.apple.com/us/app/better/id1121192229?ls=1&mt=12) app stores.

Better is entirely independent of the adtech industry and surveillance capitalism and uses our [ethical design manifesto](https://ind.ie/ethical-design) as its guiding principle in deciding what to block and what not to block. Sales of Better don't pay our bills entirely but they do contribute towards our ability to do so when combined with [our professional speaking](https://ind.ie/videos/) fees and the proceeds from [our patrons](https://ind.ie/fund/).

### How Better works

With Better, we have a straightforward and transparent process for deciding which trackers to block:

1. We [crawl](https://source.ind.ie/better/inspector) the most popular domains in the world to find the third-party trackers on them.
2. We organise the trackers by popularity.
3. We manually go through these top trackers, document what they do, and block them.

This works very well because the Achilles' heel of centralisation can be summed up by old adage "the bigger they are, the harder they fall." Centralised topologies are, by their very nature, both very powerful and extremely fragile.[^1]

### Cleaning up the Web

You do not need to block every tracker ever made to choke the income stream of surveillance capitalism, you just need to block the centres; the Goliaths – the biggest players, who among themselves account for 99% of all tracking on the Web today.

Google, for example, has eyes on 70-80%[^2] of the web. While that's horrible, it also means that once we block their trackers, we've cleared a huge swath of surveillance from the Web in one go. Rinse and repeat for the top-however-many-thousand trackers and you've done a pretty good job of rinsing the web of surveillance devices.

A happy side-effect of blocking trackers and adtech is that you also greatly improve the experience of the Web. Adtech and tracking scripts amount for a huge portion of the phyiscal size and visual complexity of web sites. So much so that a few years ago, the worst site we could find was costing people in the US [over $4 million every month in mobile bandwidth costs](http://observer.com/2016/10/aral-balkan-dokutech/) just to load their trackers.

So blocking adtech and trackers makes sites load faster, stops them from interrupting your experience with interstatial modals, reduces visual complexity and cognitive load, and generally gets the Web looking more like it would if it hadn't been poisoned by the surveillance-based business model of Silicon Valley. 

The hand-curated nature of what we do also means that we can try and respond to those cases where things break as we control over and a good understanding of what the totality of the block rules actually do.

However, because Better was originally created as a [native WebKit content blocker](https://webkit.org/blog/3476/content-blockers-first-look/) for iOS and macOS, the only people who could take advantage of it were people on Apple's platforms. I was never happy with this but it was what we needed to do in order to keep the lights on.

So, when I got the opportunity [last year](https://twitter.com/aral/status/892123479453167616), I updated the [build process](https://source.ind.ie/better/builder) to also output [the Better blocking rules in EasyList format](https://better.fyi/blockerList.txt).

### A Better Gnome

As Better's blocking rules are now available in EasyList format, it means that you can use them on other platforms. For example, you can use them in Chromium and Firefox across all platforms supported by those browsers via [uBlock Origin](https://github.com/gorhill/uBlock/) – another no-bullshit tracker and adtech blocker.

It also means that you can use Better in Gnome Web. Which brings me, finally, to the great reveal: _how?_

It's rather anti-climactic how easy it is. 

To get Gnome Web to use Better's blocking rules, all you need to do is to enter the following command in terminal:

{{< highlight bash >}}gsettings set org.gnome.Epiphany adblock-filters "['https://better.fyi/blockerList.txt']"{{< /highlight >}}

__That's it!__ 🎉

That will replace the default filters with Better's list.

As long as you install it using the exact method above and our list is the only one you include, we will also be happy to offer you support[^3]. You can use our [issue tracker](https://source.ind.ie/better/content/issues) and [forums](https://forum.ind.ie/c/better) to report issues and keep in touch.

Gnome Web is a beautiful example of [ethical design](https://ind.ie/ethical-design) that makes me smile every time I use it. Now that I have [Better](https://better.fyi) on it, I have another reason to smile. Here's hoping it puts a smile on some of your faces too.

### References

  * [Blocking advertisements in Gnome Web](https://wiki.archlinux.org/index.php/GNOME/Web#Blocking_advertisements) (Gnome Web Wiki)

[^1]: This is a lesson that autocratic governments know all too well. It is also why they fear their own people more than anyone or anything else and try to control them through fear, mass surveillance, and violence.

[^2]: The 70% statistic is from [a Princeton study](https://www.technologyreview.com/s/601488/largest-study-of-online-tracking-proves-google-really-is-watching-us-all/). The 80% statistic is from our own web crawls using [Better Inspector](https://source.ind.ie/better/inspector).

[^3]: Laura and I can't offer support when more than one blocking list is active as we simply do not have the capacity to debug what could be going wrong with third-party lists. It's hard enough trying to fix the Web when you have full control over the blocking rules. It's next to impossible when you have multiple lists that might be interacting with each other in wild and wonderful ways.
