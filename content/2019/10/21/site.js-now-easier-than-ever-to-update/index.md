---
title: "Site.js: now easier than ever to update"
date: 2019-10-21T11:48:41+01:00
draft: false
---

{{<figure src="site.js-updating-sitejs.org.jpeg" alt="Screenshot of Tilix (terminal app) running on my Linux box. I’ve ssh’ed into the server that runs sitejs.org and run the new update command. The output shows that the server was seamlessly updated and restarted." caption="Earlier today: the new update command seamlessly updating and restarting Site.js on SiteJS.org.">}}

I just released [Site.js](https://sitejs.org) version 12.9.5. This version brings with it some new commands, the most important of which is the `update` command[^1].

```sh
# Update Site.js to the latest version.
site update
```

The `update` command does what it says on the tin and updates your copy of Site.js to the latest version.

If [Site.js is running as a daemon](https://source.ind.ie/site.js/app/blob/master/README.md#production), it is seamlessly restarted for you.

If you’re running instances of Site.js as regular processes, they will continue to run the older version until the next time you run the `site` command.

## Better daemon control

{{<figure src="site.js-help.jpeg" alt="Screenshot of the Site.js help command output in terminal (Tilix)." caption="The help command is a good way to discover what Site.js is capable of.">}}

Until version 12.9.5, you were limited in your control over a Site.js daemon to the `enable` and `disable` commands.

The `enable` command both installs the [systemd](https://freedesktop.org/wiki/Software/systemd/) unit and starts the service and the `disable` command both stops the service and uninstalls it.

Today, you get three new commands – `start`, `stop`, and `restart` – that enable you to control the status of the service without affecting whether it is installed or not.

## Learn Site.js the fun way

{{<figure src="../../18/site.js-and-pi/site-js-chat-on-raspberry-pi-1.jpeg" alt="Screenshot of the Site.js basic chat example running on a Raspberry Pi 4B." caption="Learn about Site.js while building a chat app… you can even do it on a Raspberry Pi if you like!">}}

If you’re wondering what Site.js is and what you can do with it, the easiest way to get started is [a tutorial I wrote this month](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/) that takes you step-by-step through building a simple WebSocket-based chat app. And [since Site.js version 12.8.0](https://ar.al/2019/10/18/site.js-and-pi/), you can even follow along on your Raspberry Pi if you have one.

Here are links to both resources:

  - [Build a simple chat app with Site.js](https://ar.al/2019/10/11/build-a-simple-chat-app-with-site.js/)
  - [Site.js and Pi](https://ar.al/2019/10/18/site.js-and-pi/)

## Site.js is cross-platform

Site.js runs on Linux (x64 and ARM[^2]), macOS, and Windows 10 so grab your computer, fire up Terminal and your favourite editor and discover the easiest way to create, test, and host your own static and dynamic web sites.

As always, please do [let me know how you get on](https://mastodon.ar.al/@aral).

{{< like_this_fund_us >}}

[^1]: Given that the update command is released for the first time in version 12.9.5, you will have to wait for the next release before you can use it to actually update your version of Site.js. To update to version 12.9.5, please use the install command from [SiteJS.org](https://sitejs.org) as before.

[^2]: Tested on my Raspberry Pi 3B+ and 4B.