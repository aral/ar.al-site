---
title: "Are You Logging IPs Without Even Knowing?"
date: 2018-06-28T18:04:39+01:00
---

{{< figure src="no-logs.jpg" alt="A screenshot of a terminal session to my server for this blog in the /var/log/nginx folder showing an ls command with no output." caption="Log off." >}}

My blog is served both over the centralised web via HTTPS by [nginx](https://nginx.org) and over the peer web via [DAT](https://datproject.org).

nginx has an access log that is enabled by default that logs IP addresses. Needless to say, I don’t want this information.

Thankfully, turning it off is easy:

{{< highlight nginx >}}
server {
  access_log off;
}
{{< /highlight >}}

That’s it!

(You might still be logging IP addresses in the error log so it’s a good idea to clear those out also on a regular basis.)

Remember that clearing out existing logs in nginx is as easy as:

{{< highlight bash >}}
rm /var/log/nginx/*
{{< /highlight >}}

If you want to keep logs (e.g., to calculate unique views, etc.), you can still do that in a privacy-respecting manner by storing a hash of the IP address in your logs instead of the IP address itself. There’s an nginx module called [ipscrub](https://github.com/masonicboom/ipscrub) you can use for that purpose.

I do wish that servers like nginx came with privacy-respecting (and secure) settings by default.
