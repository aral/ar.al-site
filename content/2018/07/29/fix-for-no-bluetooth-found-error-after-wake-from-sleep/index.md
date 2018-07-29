---
title: "Fix for: “No Bluetooth Found” error after wake from sleep"
date: 2018-07-29T16:05:55+01:00
draft: true
---

{{< figure src="no-bluetooth-found.png" alt="Bluetooth settings panel in Pop!_OS showing the Bluetooth logo and the message: “No Bluetooth Found. Plug in a dongle to use Bluetooth.” The switch normally used to turn Bluetooth on looks broken in the window’s top bar, with only the thumb showing." caption="Bluetooth: still asleep, apparently." >}}

After waking from sleep, my computer would stop detecting the built-in bluetooth interface. The exact error I was getting in the Settings panel was:

> No Bluetooth Found. Plug in a dongle to use Bluetooth.

[The fix](https://askubuntu.com/a/1037065) was to update [BlueZ](http://www.bluez.org/), the official Linux Bluetooth stack:

{{< highlight bash >}}
sudo add-apt-repository ppa:bluetooth/bluez
sudo apt install bluez
{{< /highlight >}}

I no longer appear to have the issue with BlueZ version 5.50.

To check the version of your bluetooth driver, you can [query the BlueZ daemon](https://askubuntu.com/a/446466):

{{< highlight bash >}}
bluetoothd -v
{{< /highlight >}}
