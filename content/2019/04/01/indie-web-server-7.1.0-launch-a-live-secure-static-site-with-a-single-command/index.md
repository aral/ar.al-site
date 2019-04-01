---
title: "Indie Web Server 7.1.0: Launch a live secure static site with a single command"
date: 2019-04-01T11:10:51+01:00
draft: false
---

{{<figure src="indie-web-server-live.png" alt="Screenshot of terminal: ~/ind.ie/hypha/web-server   master  web-server --live test/site 💖 Indie Web Server v7.1.0 😈 Launched as daemon on https://aral2.hypha.dev 😈 Installed for auto-launch at startup." caption="Deploying a secure static web server now takes just one command and a few seconds.">}}

__You have:__ a VPS with a domain name pointing to it and Node.js installed.

__You want:__ to deploy a secure, live static site.

__You do:__ `npm i -g @ind.ie/web-server && web-server --live`

Hit your domain name in a browser.

The first time you do it, it will take a few seconds to load as your [Let’s Encrypt](https://letsencrypt.org) certificates are being provisioned for you by [ACME TLS](https://source.ind.ie/hypha/tools/acme-tls). Then you’re up and running (with an A on the [SSL Labs SSL Server Test](https://www.ssllabs.com/ssltest)), serving a static site from the folder you were in when you issued the command.

Your web server is running as a daemon thanks to the seamlessly integrated [pm2](https://pm2.io/runtime/) process manager. If you restart the server, your web site will be launched automatically. Ditto if it should crash, etc.

{{<figure src="indie-web-server-process-monitor.png" alt="Screenshot of the pm2 process monitor showing the web-server running" caption="Monitor your live server via the seamlessly integrated pm2 process manager.">}}

To monitor it:

{{<highlight shell>}}
web-server --monitor
{{</highlight>}}


To view the logs:

{{<highlight shell>}}
web-server --logs
{{</highlight>}}

To take it offline and stop it from launching at startup:

{{<highlight shell>}}
web-server --offline
{{</highlight>}}

For full details, please see [the relevant section in the documentation](https://source.ind.ie/hypha/tools/web-server#live).

Where’s all this heading? [Read this.](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/)