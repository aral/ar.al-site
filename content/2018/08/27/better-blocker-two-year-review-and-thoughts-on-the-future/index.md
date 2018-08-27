---
title: "Better Blocker: two year review and thoughts on the future"
date: 2018-08-27T11:33:37+01:00
draft: true
---

{{<figure src="better-blocker.jpg" alt="Screenshot of the Better Blocker Website with a header showing a blue sky with sunbeam and white clouds, in front of which Better is shown running on Mac, iPad, and iPhone. The headline reads: “The web, tracker free.”" caption="The Better Blocker web site.">}}

[Better Blocker](https://better.fyi) is a no-bullshit tracker blocker [Laura](https://laurakalbag.com) and I built because we wanted [an easy-to-use tracker blocker that wasn’t funded by or working for the adtech industry]((https://ar.al/2018/07/17/enabling-better-blocker-in-gnome-web/#why-s-better-any-better)).

We released the iOS version of Better Blocker [on June 3rd, 2016](https://2017.ind.ie/blog/better/).

Since then, we’ve:

* Released a macOS version alongside the iOS version.

* Maintained a [4.7-star rating the iOS App Store](https://itunes.apple.com/us/app/better-blocker/id1080964978) and a [4.2-star rating on the macOS App Store](https://itunes.apple.com/us/app/better-blocker/id1121192229?mt=12).

* Issued lots of [content updates](https://better.fyi/news/).

* Re-written the [Inspector](https://source.ind.ie/better/inspector) to use Headless Chrome instead of Electron-HAR (yes, it’s pretty sweet that we‘re using the tools of surveillance capitalism against its interests).

* Released an [EasyList version](https://better.fyi/blockerList.txt) of [our block rules](https://better.fyi/trackers) for use in other blockers on other platforms via tracker blockers like the excellent [uBlock Origin](https://github.com/gorhill/uBlock/).

* Been featured in a number of [best](http://www.wbrc.com/story/38159211/the-best-iphone-apps-available-right-now-august-2018) [of](https://appadvice.com/collection/ad-blocker-apps) [lists](https://www.liquidvpn.com/top-10-adblockers-apple-ios-devices/) and [mainstream](http://observer.com/2016/10/aral-balkan-dokutech/) [articles](https://motherboard.vice.com/en_us/article/d7yynj/this-iphone-app-blocks-behavior-tracking-ads-and-evades-blocker-blockers) to raise awareness about surveillance capitalism in general.

By all accounts, Better does what it says on the tin and is loved by those who use it. But, sadly, given its niche audience, it’s not as effective as it could be against the scurge of Web surveillance.

## Limited reach

{{<figure src="stats.jpg" alt="Screenshot of Better’s stats on App Store Connect from April 1, 2016 to August 31,. 2018 showing approximately 17,200 units sold across iOS and macOS. On the Units per Month graph, you see that there was a large spike when it app was first released and two other smaller spikes that correspond to media coverage of Ind.ie." caption="The challenge: increasing our reach from thousands of people to millions.">}}

I just checked our stats on Apple’s App Store Connect and it looks like in the two years that we’ve been going, Better has:

  * Sold ~17,200 copies (~12.5K on iOS, 4.76K on macOS).
  * Made us roughly $60,700 (€52,200) in proceeds (~€26,100/year).

While those proceeds have helped us to pay the rent, they are not enough to hire a full-time developer to work on the project.

Also, due to its limited platform support and the relatively high price (tier five; the equivalent of ~£4.99 in various currencies), our reach in two years has been under 20,000 people.

{{<figure src="stats2.jpg" alt="Screenshot of Better’s stats on App Store Connect from April 1, 2016 to August 31,. 2018 showing approximately $60,700 in proceeds across iOS and macOS." caption="Our proceeds from Better over its lifetime to date.">}}

While selling close to 20,000 copies of anything is nothing to scoff at for a tiny self-funded two-person not-for-profit with no marketing budget, it is a far cry from the sort of reach we could have if we weren’t worried about being able to sustain ourselves.

If two hundred thousand or two million people were using our blocking rules instead of under twenty thousand, we would be making a much greater dent in the tracking capabilities and bottom lines of surveillance capitalists. Especially considering that we cannot be bought no matter how many millions of dollars they might throw our way to be unblocked.

## Getting from here to there

So, to re-cap, I’m proud of what we’ve achieved with Better so far. However, I’m unhappy with the reach Better Blocker has and we must figure out a way of increasing that reach while not cutting off a source of revenue without which we could not afford to pay the rent.

Here are some of my thoughts about the future, on how we can optimise for the right things to address these concerns:

### Native apps on iOS and macOS

What matters is to effectively block trackers and to keep those blocking rules up to date. What is nice to have but not essential is having the full database of trackers, etc., on every copy of the app. So let’s optimise for the former.

[The current architecture](https://source.ind.ie/better) of Better is a reflection of our philosophy towards decentralised design (every app has a full copy of the tracker database, uses Git to download data, etc.). It’s pretty neat, my inner geek loves it, and I’m rather proud of how well it has worked for us so far but I’ve come to think that this design is overkill for the purposes of the apps.

To that end, I am going to radically simplify the iOS and macOS apps to remove all but the most essential functionality. This should also make it much easier for us to maintain those apps on Apple’s rapidly-changing platforms as well as port them to other platforms.

### Simplify the back-end and reduce costs

The back-end architecture reflects the decoupled and decentralised design philosophy and thus relies on several servers, including two Git servers running GitLab. We host them with an excellent European host called [CloudScale.ch](https://cloudscale.ch) but it costs us about ~$220/month to do so. I am going to look into consolidating the [Inspector](https://source.ind.ie/better/inspector), [Builder](https://source.ind.ie/better/builder), and [Drafts](https://source.ind.ie/better/drafts-server-setup) servers and also the [web](https://source.ind.ie/better/web-server-setup), [data](https://source.ind.ie/better/data-server-setup), and [archive](https://source.ind.ie/better/archive-server-setup) servers[^1].

### Continuous inspections and blocking rule updates

Currently, the [Better Inspector](https://source.ind.ie/better/inspector) is designed to run inquiries (over the top however many most popular web sites) and individual inspections on demand. I want it to become an engine that runs continuously and feeds into a simple, online mechanism for updating the blocking rules that members of the community can contribute to also.

### Multi-platform support

Since we already have an [EasyList version](https://better.fyi/blockerList.txt) of our rules being automatically generated, I would love to see us create a version of Better that runs on other platforms via a fork of uBlock Origin.

That should go a long way in helping to increase our reach and effectiveness.

You can already use the Better blocking rules via uBlock Origin by including the EasyList version. You can also [enable Better in Gnome Web](https://ar.al/2018/07/17/enabling-better-blocker-in-gnome-web/). In fact, there is an open issue debating whether to [make Better the default blocker in Gnome Web](https://gitlab.gnome.org/GNOME/epiphany/issues/77).

### Possibly moving to a patronage or subscription-based model on iOS and macOS

This is the hardest one to decide on. If we made Better Blocker free on iOS and macOS, I have no doubt that usage would skyrocket. But that would also mean greater strain on our servers, greater costs, and more support requests while simultaneously cutting off our revenue stream from sales.

We could compensate by encouraging [patronage](https://ind.ie/fund/) from within the app using subscriptions. The gamble is whether or not this would replace the revenue we lose from sales and cover the increase in costs.

## Here’s to a better future

Regardless of what we end up doing, Laura and I are committed to developing and maintaining Better Blocker[^2] alongside our ongoing work in helping create [a decentralised platform for the next web](https://indienet.info/).

We’d love to hear your thoughts and feedback [via the fediverse](https://joinmastodon.org). You can reach [Better](https://mastodon.ind.ie/@better), [Ind.ie](https://mastodon.ind.ie/@indie), [Laura](https://mastodon.laurakalbag.com/@laura), and [yours truly](https://mastodon.ar.al/@aral) via our Mastodon instances.

[^1]: We can also do a much better job of exposing some of the functionality that exists and might be useful for others, like researchers. For example, we have [our HTTP Archive]() [available over DAT](https://forum.ind.ie/t/running-a-dat-share-as-a-service-with-systemctl-ubuntu-etc/2181) but almost no-one knows about it and we don’t even have it listed on the site anywhere yet.

[^2]: For as long as there is a need for it, that is. Better is just technological regulation. Its goal is to protect you from being abused by surveillance capitalists. There is nothing we would like more than to be able to retire Better Blocker because it is no longer needed as that would mean that we’ve been successful in transitioning the web from the sewer of surveillance capitalism that it is today to become the decentralised, free and open, and interoperable infrastructure we need to protect the personhood, rights, and freedoms of humankind and foster the sort of commons and public sphere that is a prerequisite for democracy in the digital/networked age.