---
title: "Indie Web Server"
date: 2019-03-10T13:15:20Z
draft: false
---

{{<figure src="indie-web-server.jpeg" alt="Screenshot of a web browser and two terminal windows. The URL of the web browser is set to https://aral2.hypha.dev and it shows a copy of my blog. The first terminal window is running Indie Web Server and the second one is running ngrok with HTTP and HTTPS tunnels to my machine. Excerpt of first terminal window: ~/ar.al/live: web-server --global 💖 Indie Web Server v6.0.1 🌍 [Indie Web Server] Using globally-trusted certificates. 👉 [Indie Web Server] HTTP → HTTPS redirection active. 🎉 Serving . on https://aral2.hypha.dev GET / 200 51166 - 4.602 ms (followed by more server log output)." caption="Indie Web Server serving my blog over a TLS tunnel via ngrok.">}}

Indie Web Server[^1] is a secure and seamless [Small Tech](https://ar.al/2019/03/04/small-technology/) personal web server.

Use it to seamlessly serve your personal static web site in development and production or build your own dynamic web app on top of it using JavaScript and Node.js.

Indie Web Server is as easy as it gets.

## Features

  - Zero-configuration – It Just Works 🤞™.

  - Develop and test with seamlessly-provisioned locally-trusted [mkcert](https://github.com/FiloSottile/mkcert) TLS certificates via [Nodecert](https://source.ind.ie/hypha/tools/nodecert).

  - Stage and deploy with automatically-provisioned globally-trusted [Let’s Encrypt](https://letsencrypt.org/) TLS certificates via [ACME TLS](https://source.ind.ie/hypha/tools/acme-tls)[^2]


## Install

{{<highlight shell>}}
$ npm i -g @ind.ie/web-server
{{</highlight>}}

## Use

### Command-line

Start serving the current directory at https://localhost:

{{<highlight shell>}}
$ web-server
{{</highlight>}}

Start serving the _site_ directory at your hostname:

{{<highlight shell>}}
$ web-server site --global
{{</highlight>}}

For example, if you run the command on a connected server that has the ar.al domain pointing to it and `ar.al` set in _/etc/hostname_ (on Unix/Linux/macOS), you will be able to access the site at https://ar.al. The first time you hit it, it will take a little longer to load as your Let’s Encrypt certificates are being automatically provisioned by ACME TLS.

### API

You can also use Indie Web Server programatically as the basis of you own web applications.

#### Examples

Serve the current directory at https://localhost using locally-trusted TLS certificates:

{{<highlight js>}}
const webServer = require('@ind.ie/web-server')
const server = webServer.serve()
{{</highlight>}}

Serve the current directory at your hostname using globally-trusted Let’s Encrypt TLS certificates:

{{<highlight js>}}
const webServer = require('@ind.ie/web-server')
const server = webServer.serve({global: true})
{{</highlight>}}

Create a custom server:

{{<highlight js>}}
const webServer = require('@ind.ie/web-server')
const express = require('express')

const app = express()
app.use(express.static('.'))

const options = {} // to use globally-trusted certificates instead, set this to {global: true}
const server = webServer.createServer(options, app).listen(443, () => {
  console.log(` 🎉 Serving on https://localhost\n`)
})
{{</highlight>}}

For full details of the command-line syntax and API, please [see the documentation](https://source.ind.ie/hypha/tools/web-server/blob/master/README.md).

[^1]: Previously known as [HTTPS Server](https://ar.al/2019/03/07/https-server/).
[^2]: Receives an A on the [SSL Labs SSL Server Test](https://www.ssllabs.com/ssltest).