---
title: "HTTPS Server"
date: 2019-03-07T14:16:15Z
draft: false
---

HTTPS Server ([source](https://source.ind.ie/hypha/tools/https-server), [GitHub mirror](https://github.com/indie-mirror/https-server), [npm](https://www.npmjs.com/package/@ind.ie/https-server)) is a development server that uses nodecert to automatically provision and use locally-trusted TLS certificates.

## Install

{{<highlight sh>}}npm i -g @ind.ie/https-server{{</highlight>}}

## Use

### Command-line:

{{<highlight sh>}}https-server [folder-to-serve] [--port N]{{</highlight>}}

All arguments are optional. By default, a secure HTTPS server will be created to serve the current folder over port 443.

If you do not already have TLS certificates, they will be created for you automatically using nodecert.

All dependencies will be installed automatically for you if they do not exist if you have apt, pacman, or yum (untested) on Linux or if you have Homebrew or MacPorts (untested) on macOS.

### API

HTTP Server can also be used programmatically (e.g., with [Express](http://expressjs.com/)).

### Example

{{<highlight js>}}
const httpsServer = require('https-server')
const express = require('express')

const app = express()
app.use(express.static('.'))

const options = {} // (optional) customise your server
const server = httpsServer.createServer(options, app).listen(443, () => {
  console.log(` 🎉 Serving on https://localhost\n`)
})
{{</highlight>}}

For more details on the API, [please see the readme](https://github.com/indie-mirror/https-server/blob/master/README.md).

## Help wanted

If you get a chance to test HTTPS Server with the following setups, [please let me know by opening an issue on the GitHub mirror](https://github.com/indie-mirror/https-server/issues):

  * Linux with yum
  * macOS with MacPorts
