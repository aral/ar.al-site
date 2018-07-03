---
title: "Phones LineageOS 15.1 is officially supported on"
date: 2018-07-03T11:18:13+01:00
---

{{< figure src="lineageos-on-a-nexus-5.jpg" alt="Photo of my Nexus 5 running LineageOS 14.1. On screen is a tmux terminal session in Termux showing a split screen between my blogs Hugo and rsync watchers running in one panel and a terminal prompt showing the result of a ./new web+-on-a-phone command that created a Markdown file for a blog post." caption="It’s GNU Linux. On a phone." >}}

[LineageOS](https://lineageos.org) is the successor to Cyanogenmod – a Google-free, freedom technology alternative to stock Android that isn’t infected with Google Play Services (Google’s surveillance services).

{{< figure src="lineageos-logo.png" alt="LineageOS logo: an downwards sloping arc with three hollow circles (nodes) overlayed. The two at the ends are smaller and the one in the middle is larger and has a filled in circle inside of it." caption="The LineageOS logo." class="half-width-flush-right" >}}

I have a Nexus 5 (hammerhead) from several years ago that I installed LineageOS 14.1 on and it works flawlessly. In fact, thanks to its freedom and the mind-blowingly awesome [Termux](https://termux.com), I now have a basic Linux setup on it running Node.js, Go, and my [Web+](/2018/06/26/web+/) [blogging setup](https://source.ind.ie/ar.al/) that uses [Hugo](https://gohugo.io), [rsync](https://source.ind.ie/ar.al/sync/blob/master/config.json#L9), and [DAT](https://datproject.org). It’s awesome that LineageOS enables people to keep using their older handsets beyond the couple of years that some manufacturers deem an acceptable period for supporting their products with updates (hey, landfills are cheap and the Earth is boundless, right?… Right?!)

Anyway… I do want to try LineageOS on a modern 64-bit device not least because [I have a feeling](https://gitter.im/datproject/discussions?at=5b3b27a73572e970c17135f5) [the segmentation faults I’m getting](https://github.com/datproject/dat/issues/1007) while trying to run [DAT](https://datproject.org) on it might be due to it being 32-bit. So I found myself sifting through the list of [downloads and installation instructions for all officially-supported handsets](https://download.lineageos.org) as it’s not grouped by version. I had to go through the whole thing, but there’s no reason anyone else should have to as I compiled the list of handsets that LineageOS 15.1 is currently supported on and you can find it, below.

If you already have an older handset that no longer receives operating system updates, you should seriously consider extending its life, ditching Google’s spyware, and improving your security using LineageOS (and the [F-Droid freedom software catalogue](https://f-droid.org)). Version 14.1 is stable and runs flawlessly on older hardware. If you’re on the market for a new handset to run LineageOS on, however, I hope the following list helps you identify potential candidates easily.

The list should be considered current as of the time of this post but I will not be maintaining it. ([Pull requests](https://github.com/aral/ar.al-site) are welcome.)

Discounting the Google devices (because even though the bar on ethics is set pretty darn low in the industry, I’ll be damned if I give _that_ particular [surveillance capitalist](https://2018.ar.al/notes/the-nature-of-the-self-in-the-digital-age/) any more money), the newest/best-equipped models appear to be the [Samsung Galaxy S9 and S9 plus](https://en.wikipedia.org/wiki/Samsung_Galaxy_S9), the [OnePlus 5T](https://en.wikipedia.org/wiki/OnePlus_5T), and the [LeEco LePro 3](https://techcrunch.com/2016/11/24/leeco-lepro3-review/).

Manufacturer  | Supported Models
--------------|-----------------
Asus          | ✗
BQ            | ✗
Fairphone     | ✗
Google        | [Nexus 6P (angler)](https://download.lineageos.org/angler), [Nexus 6 (shamu)](https://download.lineageos.org/shamu), [Nexus 5X (bullhead)](https://download.lineageos.org/bullhead), (note: _not_ Nexus 5), [Nexus 4 (mako)](https://download.lineageos.org/mako), [Pixel C (dragon)](https://download.lineageos.org/dragon), [Nexus Player (fugu)](https://download.lineageos.org/fugu)
HTC           | [One A9 (hiae)](https://download.lineageos.org/hiae)
Huawei        | ✗
LeEco         | [Le Max 2 (x2)](https://download.lineageos.org/x2), [LePro 3](https://download.lineageos.org/zl1)
LG            | ✗
Motorola      | [Moto Z (griffin)](https://download.lineageos.org/griffin), [Moto Z2 Force (nash)](https://download.lineageos.org/nash)[^1]
Nextbit       | ✗
Nubia         | ✗
Nvidia        | [Shield Android TV (foster)](https://download.lineageos.org/foster)
OnePlus       | [One (bacon)](https://download.lineageos.org/bacon), [5 (cheeseburger)](https://download.lineageos.org/cheeseburger), [5T (dumpling)](https://download.lineageos.org/dumpling), [2 (oneplus2)](https://download.lineageos.org/oneplus2), [3 / 3T (oneplus3)](https://download.lineageos.org/oneplus3)
OPPO          | [Find 7a (find7)](https://download.lineageos.org/find7)
Samsung       | [Galaxy Tab S2 9.7 2016 Wi-Fi (gts210vewifi)](https://download.lineageos.org/gts210vewifi), [Galaxy Tab S2 8.0 2016 Wi-Fi (gts28vewifi)](https://download.lineageos.org/gts28vewifi), [Galaxy S5 Plus (kccat6)](https://download.lineageos.org/kccat6), [Galaxy S5 LTE-A (lentislte)](https://download.lineageos.org/lentislte), [Galaxy S9+ (star2lte)](https://download.lineageos.org/star2lte), [Galaxy S9 (starlte)](https://download.lineageos.org/starlte)
Sony          | [Xperia XA2 (pioneer)](https://download.lineageos.org/pioneer)[^1]
Wileyfox      | ✗
Xiaomi        | [Mi 5s (capricorn)](https://download.lineageos.org/capricorn), [Mi MIX 2 (chiron)](https://download.lineageos.org/chiron), [Mi 5 (gemini)](https://download.lineageos.org/gemini), [Mi MIX (lithium)](https://download.lineageos.org/lithium), [Redmi Note 4 (mido)](https://download.lineageos.org/mido), [Mi 5s Plus (natrium)](https://download.lineageos.org/natrium), [Mi 6 (sagit)](https://download.lineageos.org/sagit), [Mi Note 2 (scorpio)](https://download.lineageos.org/scorpio)
YU            | ✗
ZTE           | ✗
Zuk           | ✗

[^1]: Experimental.

<!-- Progressive enhancement: just for this page, refine the display of the table used to center the ✗’s in the cells (but to leave text left aligned. -->
<script>
let tableCells = document.getElementsByTagName('td')
for (tableCell of tableCells) {
  if (tableCell.innerHTML === '✗') { tableCell.style.textAlign = 'center' }
}
</script>
