---
title: "Nginx: Remember to remove the default site"
date: 2018-07-05T08:10:11+01:00
---

{{< figure src="s9.jpg" alt="Photo of a Samsung S9+ phone hanging on a display in PC World. On screen is the browser showing the default nginx page for an http request to my site." caption="What a minute, where did my site go?" >}}

I realised yesterday that people accessing my new site for the first time via HTTP (not HTTPS), were seeing the default page for my [nginx](https://nginx.org/) web server. I only realised it because I was trying the site out on a Samsung S9+ that I was playing with at PC World. (It's always a good idea to test out your sites on the range of devices they have at such places. They don't mind - in fact, you might find yourself having pleasant conversations about the state of surveillance capitalism and ethical technology with the folks who work there, like I did with Paul yesterday - and you might discover things you missed on your own setup. PC World is basically a large, free device lab.)

Anyway, a quick search on DuckDuckGo [revealed the issue](https://discourse.roots.io/t/http-does-not-redirect-to-https-only-at-the-first-access/8669): I hadn't removed the _default_ site configuration from _/etc/nginx/sites-enabled/_ and it was competing with the HTTP → HTTPS redirect that I'd instructed [Let's Encrypt](https://letsencrypt.org/) to set up for me.

Deleting that symbolic link fixes the problem.
