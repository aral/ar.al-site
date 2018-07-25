---
title: "Camera fix for Samsung S9 (LineageOS 15.1)"
date: 2018-07-22T13:30:37+01:00
draft: false
---

{{< figure src="s9+-first-photo.jpg" alt="A photo of my XPS 13 on our dining room table. On screen is the Gnome Web browser showing the LineageOS bug thread for the S9 camera issue, focussed on the comment by Jesse Chan with the link to the vendor.img file that works to fix it." caption="The first photo from my Samsung S9+ is of the solution that got the camera working." >}}

The camera app on LineageOS 15.1 [is broken](https://jira.lineageos.org/browse/BUGBASH-1784) for Samsung S9 and S9+ phones. The app launches successfully but hangs shortly thereafter with a “camera not responding” error while attempting to activate the camera. This seems to be [a common problem](https://www.reddit.com/r/LineageOS/search?q=s9%20camera&restrict_sr=1), and the common advice given is to [flash the latest stock Samsung firmware](https://ar.al/2018/07/15/flashing-stock-firmware-onto-a-samsung-galaxy-s9+-sm-g965f-on-ubuntu-18.04-using-heimdall/).

Sadly, that didn't work for me.

What did work, after flashing the latest stock ROM and reinstalling LineageOS 15.1, was flashing [the vendor.img file provided by Jesse Chan](https://jira.lineageos.org/browse/BUGBASH-1784?focusedCommentId=25316&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-25316).

<p class='important-warning'><svg class='warning-icon' viewBox='0 0 1792 1896.0833' alt='Warning!'><use class='warning-path' xlink:href='/icons/font-awesome.svg#warning'></use></svg><span>These instructions are specific to my unique setup. You might have to adapt them to yours. Flashing firmware carries the risk of potentially bricking your device. Needless to say, <strong>proceed at your own risk.</strong></span></p>

To flash the vendor image, [follow the instructions in my previous post to set up Heimdall, etc.](https://ar.al/2018/07/15/flashing-stock-firmware-onto-a-samsung-galaxy-s9+-sm-g965f-on-ubuntu-18.04-using-heimdall/), and, once you've got LineageOS 15.1 running successfully on the phone:

1. Reboot into Download Mode[^1]
2. Download and flash the _vendor.img_ file provided by Jesse:
  {{< highlight bash >}}heimfall flash --VENDOR vendor.img{{< /highlight >}}

The phone should reboot and your camera app should now work.

How this is different from the _vendor.img_ file in the latest stock ROM I flashed, I do not know. I do hope that the LineageOS folks will document this issue at the very least and hopefully incorporate a seamless fix for it in the future.

[^1]: Hold down the power, volume down, and Bixby buttons - that’s the button on the top-right, along with the second and third buttons from the top on the left. When you see the Download Mode splash screen, press the Volume Up button as instructed to enter Download Mode.