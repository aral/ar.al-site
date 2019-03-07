---
title: "Nodecert"
date: 2019-03-07T14:01:37Z
draft: false
---

Nodecert ([source](https://source.ind.ie/hypha/tools/nodecert), [GitHub mirror](https://github.com/indie-mirror/nodecert), [npm](https://www.npmjs.com/package/@ind.ie/nodecert)) is a Node.js module and command-line tool that automatically provisions locally-trusted TLS certificates for your development environment using [mkcert](https://github.com/FiloSottile/mkcert/).

## Install

{{<highlight sh>}}npm i -g @ind.ie/nodecert{{</highlight>}}

## Use

### Command-line:

{{<highlight sh>}}nodecert{{</highlight>}}

### JavaScript (Node.js):

{{<highlight js>}}require('nodecert'){{</highlight>}}

(Synchronous.)

## Certificates

The generated certificates are placed in the _~/.nodecert_ directory.