---
title: "Sometimes you have to stick a screwdriver in it (or how to liberate a Chromebook in ten easy steps)"
date: 2018-12-31T12:38:26Z
draft: false
---

{{<figure src="screwdriver.jpeg" alt="A chromebook with a red screwdriver sticking out of it." caption="Google is about as open as a clam.">}}

Over the holidays, I found a Chromebook that Samsung had given me to evaluate about six years ago and which had been gathering dust ever since. Coincidentally, Laura’s sister Annie had just told me that she needed a laptop. Hmm… Well, there was no way I was going to give her a Google spy device, so I decided to liberate the Chromebook from Google’s surveillance-based operating system (ChromeOS) and gift it to her.

Now, you would think, given how people harp on about how _open_ Google is, that this would be easy to do. Just install a lightweight Linux distribution and be done with it, right?

Oh, you poor, naive, dear. No, not even close.

Instead, what you have to do[^2] is to physically open up the computer, short a pair of jumpers to disable the write protection and flash the firmware with something that isn’t designed to stop you from protecting yourself from Google’s surveillance machine.

## Google is closed

Google is anything but open[^1] and Chromebooks are not computers; they are corporate surveillance devices. A Chromebook is an inexpensive data milking device and you are the cow.

It’s no coincidence, for example, that they have tiny hard drives. Why do you need local storage when you can just put all your data on Google’s machines and to use Google’s services for everything? And what if you decide to foil Google’s cunning plan and install a larger hard drive? Computer says no! You can’t. Why? Because “security”, of course. _Wink, wink!_

Similarly, you cannot install a different operating system. And if you have the gall to try and dual boot, you are greeted with a nag screen on every boot. Why? Because “security”, of course. _Nudge, nudge!_

Giving the owner of a computer control over who can and cannot update the hardware or operating system is a valid security concern. Giving _the manufacturer_ such control and making it as difficult as possible for the owner isn’t.

If Google really cared about people’s security, they’d have designed Chromebooks to ship with hardware keys which, when inserted, would enable the hardware or software to be updated. Boom! Problem solved. And they wouldn’t have designed a malicious firmware feature that tries to get you to revert to factory defaults on every boot once you’ve modifed your own system. This is one of the most owner-hostile features I’ve seen yet in a piece of consumer technology. But then again, you never really own a Google Chromebook… it owns you.

## How to liberate a Chromebook

Here are the instructions for liberating a Samsung Series 5 550 Chromebook (lumpy) and installing [GalliumOS](https://galliumos.org/) on it:

1. Push [the developer switch](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-sandy-bridge#TOC-Entering) to the right. This is a small switch at the back of the laptop on the right-hand side.

2. Place the laptop on its lid and disconnect the battery by sticking a paperclip into [the battery disconnect hole](https://a77db9aa-a-7b23c8ea-s-sites.googlegroups.com/a/chromium.org/dev/chromium-os/developer-information-for-chrome-os-devices/samsung-sandy-bridge/lumpy-internals.jpg?attachauth=ANoY7cpUTpaw1vK5ripJL6ue_UMhPvUkaUlYk5hT9276TNXRQ5gWB9JJhihTAIfhpg8SIZ0fBYgUkx66NQcMuEn4akR5mUPfzWAY9esDBelYghbh3mKbvDuAoUZ7ENeYfyZ7UCP4eyLvdZ80C6nUGh-LiSj2hsUNGgZmucYT6K1NPeGcos7sSS66_yd5rCla2qQb4CKQPkvgo4zFvtCMGWl_QZRCqjftNxfkIlCd2qynj7lEkWdeLCGtAveD5jWFXey51mEQ-ScHRhImPDMpOguqNpV6hQowTpZFtbdic9jli7itsklzv8UXp1tmPEjsvMlglrxoOC_E&attredirects=0).

3. Remove all _eight_ screws using a Phillips screwdriver. Four of the screws are hidden under the pads for the feet, so you will have to remove those first by gently prying them loose using a small flat-head screwdriver.

4. Pry open the lid by sticking a small flat-head screwdriver in and gently moving it all around the edges. You will hear clicks as the plastic clamps come loose.

5. Locate the [write protect jumper](https://a77db9aa-a-7b23c8ea-s-sites.googlegroups.com/a/chromium.org/dev/chromium-os/developer-information-for-chrome-os-devices/samsung-sandy-bridge/lumpy-internals.jpg?attachauth=ANoY7cpUTpaw1vK5ripJL6ue_UMhPvUkaUlYk5hT9276TNXRQ5gWB9JJhihTAIfhpg8SIZ0fBYgUkx66NQcMuEn4akR5mUPfzWAY9esDBelYghbh3mKbvDuAoUZ7ENeYfyZ7UCP4eyLvdZ80C6nUGh-LiSj2hsUNGgZmucYT6K1NPeGcos7sSS66_yd5rCla2qQb4CKQPkvgo4zFvtCMGWl_QZRCqjftNxfkIlCd2qynj7lEkWdeLCGtAveD5jWFXey51mEQ-ScHRhImPDMpOguqNpV6hQowTpZFtbdic9jli7itsklzv8UXp1tmPEjsvMlglrxoOC_E&attredirects=0) and short it. The way I did this was to find a small flat-head screwdriver and stick it into the plastic head of the jumper. I put non-conductive tape under and above the screwdriver to make sure it didn’t short anything else.

    {{<figure src="screwdriver-2.jpeg" alt="A red screwdriver shorting a jumper on the motherboard" caption="Screwdrivers for freedom.">}}

6. Put the cover back on (but don’t clamp it shut) and start up the machine. You will see a scary warning screen. Press _CTRL+D_. Once ChromeOS boots, press _CTRL+ALT+T_ to get to Crosh and type `shell` to drop into a terminal running Bash.

7. Enter `sudo -s`, followed by `flashrom --wp-disable`. You should see a success message. If you don’t check that you’ve disconnected the battery and that your screwdriver is properly shorting the right jumper.

    {{<figure src="disable-write-protect.jpeg" alt="Terminal: successful result of disabling write protect by entering the commands mentioned in this step." caption="One step closer to freedom.">}}

8. Install [SeaBIOS](https://johnlewis.ie/custom-chromebook-firmware/rom-download/) (Full ROM):

    {{<highlight bash>}}cd;bash <(curl https://johnlewis.ie/flash_cb_fw.sh){{</highlight>}}

    {{<figure src="flash-firmware.jpeg" alt="Terminal: flashing firmware" caption="Flashing firmware for freedom.">}}

9. Reboot. If you see the SeaBIOS screen, then you can turn the computer off, remove the screwdriver, and close the computer up.

    {{<figure src="seabios.jpeg" alt="The SeaBIOS screen" caption="Freedom is a BIOS, best served cold. Or something.">}}

10. Prepare a USB key with [GalliumOS](https://galliumos.org/) on it. Insert it into your USB slot and reboot. You will need to [download](https://galliumos.org/download) the Sandy / Ivy Bridge version of Gallium OS. You can burn it to a USB key using a tool like [Etcher](https://www.balena.io/etcher/).

{{<figure src="i3.jpeg" alt="i3 window manager running on GalliumOS" caption="Playing with i3-gaps on GalliumOS. (Gallium comes with xfce and xfwm.)">}}

Your computer should boot into the GalliumOS installer. Follow the instructions to set up your free and open operating system and you should find yourself the proud owner of a fully-liberated _Unchromedbook_.

Enjoy having the freedom to do what you want with your own machine without being tracked and profiled by Google.

On the machine I prepared for Annie, I ended up covering up the corporate branding with some colourful unicorn and cloud stickers I found at the local stationary store[^3].

{{<figure src="lid.jpeg" alt="Unicorns, clouds, and shooting starts on the lid of Annie’s new UnchromedBook" caption="Because fuck you, Silicon Valley, you don’t get to own unicorns and clouds.">}}

<!--


{{<figure src="" alt="" caption="">}}
{{<figure src="" alt="" caption="">}}
{{<figure src="" alt="" caption="">}}
{{<figure src="" alt="" caption="">}}
{{<figure src="" alt="" caption="">}}
-->

## Sources

  * [Samsung Series 5 550 Chromebook and Series 3 Chromebox](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-sandy-bridge#TOC-Entering)
  * [Replace Your Chromebook BIOS with SeaBIOS](https://www.maketecheasier.com/replace-chromebook-bios/)


[^1]: To prove me wrong, please just email me a link to the source code for Google Search, Google Mail, Google Docs, Google Play Services, and all of their proprietary, surveillance-based services as well as the free/open source licenses for all of the above. Thanks!

[^2]: This is true for the Samsung Chromebook 550 model, at least. On other models, apparently you can open up the machine and remove a screw from the motherboard, etc. On all models, you have to flash the firmware to stop Google from nagging you on every boot.

[^3]: I was originally going to write something like “unchromedbook” or “liberated” on the case using some scrabble letters but ended ruining the tiles when the superglue exploded out of the tube, ruining the tiles and almost sticking my fingers together. That was fun (wasn’t fun).
