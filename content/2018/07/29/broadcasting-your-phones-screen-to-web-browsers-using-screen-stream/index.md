---
title: "Broadcasting your phone’s screen to web browsers using Screen Stream"
date: 2018-07-29T17:58:16+01:00
draft: false
---

{{< figure src="streaming.jpg" alt="Gnome Web browser window showing a stream of the screen of my LineageOS phone from http://192.168.2.183:8080. The current app is called ObscuraCam and it's showing a photo of Oskar, our huskamute, and me. My face is pixellated by the app." caption="My phone’s screen, streaming on my desktop in Gnome Web." >}}

[Screen Stream](https://github.com/dkrivoruchko/ScreenStream) by [Dmitriy Krivoruchko](https://github.com/dkrivoruchko) is an app for streaming your phone’s screen over HTTP so other people on the same network can view it using a web browser. It is free and open source, available from the [F-Droid catalogue](https://www.f-droid.org/en/packages/info.dvkr.screenstream/), and works beautifully on [LineageOS](https://lineageos.org).

In the screenshot above, you can see the screen of my phone streaming into my browser on my GNU/Linux desktop. The app being streamed is called [ObscuraCam](https://guardianproject.info/apps/obscuracam/), a free and open source tool for automatically anonymising faces in photos[^1]. 

{{< figure class="hairline-border" src="f-droid.jpg" alt="The Screen Stream page on F-Droid" caption="Screen Stream is free and open source and available via F-Droid." >}}

Using Screen Stream couldn’t be simpler:

1. Copy your phone’s IP address and port by pressing the _copy button_ next to your device’s address.

    {{< figure src="start-stream.jpg" alt="Screen Stream’s interface, with the following labels: “Device addresses: wlan0: http://192.168.2.183:8080. Pin is disabled. Resize factor: 50%: 1396 × 720.” Next, there is a Start Stream button, followed by two other labels: Traffic: 0.00 Mbit/s, and Connected clients: 0" caption="The Screen Stream interface is simple and informative." >}}

2. Press the _Start Stream_ button.

    {{< figure src="stream-started.jpg" alt="The home screen of my phone, showing the KISS launcher with the KISS search bar at the bottom. Along the left side are the icons for the DuckDuckGo, F-Droid, Settings, and Termux apps and down the bottom, those for the Camera, Twidere, Signal, and Wire, in my favourites list. At the top of the screen is a notification with the Screen Stream icon that reads: “Stream… Press stop to end stream.” On the right-hand-end of the notification there is a stop icon/button." caption="Screen Stream will notify you when it starts streaming your screen." >}}

3. Send the address you copied earlier to the people you want to share your screen with and ask them to enter it into their web browsers’ address bars.

    {{< figure src="traffic-graph.jpg" alt="The Screen Stream traffic graph screen as streamed on my Linux desktop in Gnome Web. It shows traffic currently at 12.15 Mbit/s, a red zigzagging line for bandwidth that alternatives between 0.0 and 40.0 on the graph, 2 connected clients, and the IP addresses of the connected clients as well as an icon indicating that one of them has a slow connection." caption="Anyone with a web browser can then see your screen. Here’s the Screen Stream traffic graph, streaming on my desktop via Screen Stream." >}}

### Fixing the empty black screen in browser error

If you see an empty black screen in the browser while attempting to view the stream, try this: 

1. Go back to the Start Stream application on your phone and swipe from the left edge of the screen to show the app menu and select _Settings_.

    {{< figure src="stream-settings.png" alt="The app menu, showing options titled Main, Traffic & clients, Settings (divider) Rate app, About (divider) Exit.">}}

2. Check the _Disable MJPEG check_ setting.

    {{< figure src="settings-disable-mjpeg-check.png" alt="The Settings screen, with a back button, showing the following options: Minimize on stream (minimize app on stream start) (checked), Stop on sleep (stop stream if screen turns off) (unchecked), Start on boot (start stream after device boot) (unchecked), Disable MJPEG check (disable check for browser MJPEG support) (checked)" caption="Check the “Disable MJPEG check” setting for greater browser compatibility." >}}

It seems that the code that checks for MJPEG support has a tendency to give false negatives and that stops the stream from working in browsers that otherwise do support the stream. Screen Stream might not work in every browser[^2] but disabling this check will increase the number of browsers it does work in.

### Fixing the “no address found” error

Sometimes after I stop a stream, the Screen Stream app will report “no address found” under _Device addreses_. In these situations, merely closing the app from the task launcher and relaunching it doesn’t appear to have an effect.

To fix this, select _Settings_ → _Apps & Notifications_ → (_See All Apps_, if you cannot see Screen Stream) → _Screen Stream_ → _Force Stop_ and then restart the app and you should have an address again.

### A lovely, useful, and ethical app

[Screen Stream](https://www.f-droid.org/en/packages/info.dvkr.screenstream/) is a beautiful ethical app for easily sharing your screen with others on the same network[^3]. It’s also a testament to the wonderful and inspiring free and open source app ecosystem on non-proprietary platforms today.

Thank you, [Dmitriy](https://github.com/dkrivoruchko), for making it and sharing it with the world.

[^1]: Did they miss a trick by not calling it Camera Obscura?

[^2]: In our brief tests, Laura was not able to access the stream from Safari on macOS but was able to using Chrome (by surveillance capitalist Google/Alphabet, Inc.) I was able to get the stream to work under Gnome Web, Firefox (by surveillance capitalist Mozilla), and Chromium (the open source project by surveillance capitalist Google/Alphabet, Inc.)

[^3]: Which, if you set up a proxy or expose your IP, could be the whole world.