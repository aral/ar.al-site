---
title: "HTTPS Server: now with seamless Let’s Encrypt support"
date: 2019-03-08T10:19:57Z
draft: false
---

{{<figure src="https-server-lets-encrypt.png" alt="Screenshot of my terminal showing ~/ar.al: https-server live --global aral@ind.ie 📜 [nodecert] Local development TLS certificate exists. 🌍 [https-server] Using globally-trusted certificates. 👉 [https-server] (Globally-trusted TLS) HTTP → HTTPS redirection active. 🎉 Serving live on https://aral.hypha.dev" caption="You can now also use globally-trusted Let’s Encrypt TLS certificates.">}}

[Yesterday](/2019/03/07/https-server/), I introduced [HTTPS Server](https://source.ind.ie/hypha/tools/https-server) as a development server. What a difference a day makes! Today, with seamless [Let’s Encrypt](https://letsencrypt.org/) support via the excellent [Greenlock.js](https://git.coolaj86.com/coolaj86/greenlock.js.git) module[^1], HTTPS Server is ready for use as a secure [Small Tech](https://ar.al/2019/03/04/small-technology/) personal web server for development and deployment. It is a human-scale tool for creating and hosting single-tenant/personal web applications using Node.js.

__With HTTPS Server you can:__

1. Develop using seamlessly-provisioned locally-trusted certificates.

2. Develop/stage using seamlessly-provisioned globally-trusted certificates via a secure tunnel (e.g., with a pro or business plan at [ngrok](https://ngrok.com/) with [custom domains](https://ngrok.com/docs#tls-cert-warnings)).

3. Deploy using seamlessly-provisioned and renewed globally-trusted certificates (e.g., via [pm2](http://pm2.keymetrics.io/)).

I plan to expand on each of the above use cases in future posts.

In the meanwhile, we have one more small piece of the puzzle in our fledgling effort to build a bridge from [surveillance capitalism](https://2018.ar.al/notes/the-nature-of-the-self-in-the-digital-age/) to [peerocracy](https://peertube.fr/videos/watch/3875e4f2-500d-4c21-94f6-0692a67b87f1).


[^1]: Although, what’s up with [telemetry and tracking](https://git.coolaj86.com/coolaj86/greenlock.js/src/branch/master/lib/community.js) in a Node module? These “features” are turned off in HTTPS Server.