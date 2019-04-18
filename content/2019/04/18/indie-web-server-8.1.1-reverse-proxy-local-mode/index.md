---
title: "Indie Web Server 8.1.1: Reverse proxy (local mode)"
date: 2019-04-18T15:25:42+01:00
draft: false
---

{{<figure src="reverse-proxy.jpeg" alt="Screenshot of Indie Web Server running as a reverse proxy. Messages include: Proxy created -> ws://localhost:1313, Proxy created -> http://localhost:1313, Upgrading to WebSocket, rewriting hugo livereload URL to use WebSocket proxy." caption="">}}

I just released [Indie Web Server](https://ind.ie/web-server) version 8.1.1 which introduces a reverse proxy feature.

__What’s Indie Web Server? [Watch this quick 2-minute demo video](/2019/04/16/set-up-a-live-static-personal-web-site-in-seconds-with-indie-web-server-8.0.0/) to find out.__

### Reverse proxy

In local mode (for development use), if you run the server with an HTTP URL instead of a path to serve, Indie Web Server will start as a reverse proxy.

It proxies:

  * HTTP ↔ HTTPS
  * WS ↔ WSS

I added this feature as we use Hugo quite a bit at Ind.ie for generating our static sites (e.g., this blog and the Ind.ie web site) and, by default, Hugo runs its server over HTTP on 1313. This is fine for development but if you run anything on `localhost` over HTTPS, most browsers have trouble letting you run anything else over HTTP again.

So if you’re going to test anything over HTTPS on localhost, it’s worth testing everything over HTTPS. Heck, with how easy Indie Web Server makes it, you really have no reason not to. Especially now with its reverse proxy feature.

### Hugo cooking on https://localhost

So, for example, if you want to test Hugo over HTTPS on localhost, just run Hugo’s built-in web server as usual. e.g.,

{{<highlight shell>}}
hugo server --buildDrafts --renderToDisk --baseURL=https://ar.al --appendPort=false
{{</highlight>}}

And then install Indie Web Server 8.1.1 and start it as a reverse proxy using:

{{<highlight shell>}}
# Install it
wget -qO- https://ind.ie/web-server/install.sh | bash

# Run it
web-server http://localhost:1313
{{</highlight>}}

Note that the reverse proxy feature currently only works in local mode (not with the `global` or `enable` commands).

Enjoy! :)
