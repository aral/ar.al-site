---
title: "Upgrade Little Snitch Before Upgrading to Mojave Beta"
date: 2018-07-21T08:40:56+01:00
draft: false
---

{{< figure src="little-snitch-nightly.jpg" alt="Header from the Little Snitch Nightly download web page showing the Little Snitch propeller hat logo, the following text: 'Nightly BuildLittle Snitch 4.1.3 (5180). Runs on macOS 10.11+. Nightly builds are pre-release versions of Little Snitch that include the latest bug fixes and feature enhancements.', and a green Download button." caption="Little Snitch: use the nightly build on the macOS Mojave beta." >}}

If you have the current release version of [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) (4.1.2) installed under High Sierra, upgrade it to [the latest nightly build](https://obdev.at/products/littlesnitch/download-nightly.html) before upgrading to the [macOS](https://developer.apple.com/macos/) [Mojave](https://www.apple.com/macos/mojave-preview/) beta or your system will lose network access.

If, like me, you did upgrade and lose network access, the workaround is simple: uninstall the release version of Little Snitch (make sure you keep your rules and settings) reinstall the nightly build.

To uninstall Little Snitch, run the uninstaller app and follow the on-screen instructions.

You can run the uninstaller from Terminal with the following command:

{{< highlight bash >}}/Library/Little\ Snitch/Little\ Snitch\ Uninstaller.app{{< /highlight >}}

### References

  * [Internet access not working after install of Mojave](https://forums.developer.apple.com/thread/103802)
  * [How to uninstall Little Snitch completely](https://forums.macrumors.com/threads/how-to-uninstall-little-snitch-completely.876772/)
