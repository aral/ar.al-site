---
title: "Introducing @small-tech/https, a batteries-included drop-in replacement for the Node.js https module"
date: 2019-11-08T18:54:12Z
description: "@small-tech/https is a drop-in replacement for the Node.js https module with automatic provisioning of both locally-trusted and globally-trusted TLS certificates."
images:
  - global.jpeg
videos: []
tags:
  - node.js
  - https
  - mkcert
  - let's encrypt
  - javascript
  - js
draft: false
---

{{<figure src="global.jpeg" alt="Screenshot of @small-tech/https example app running in terminal with globally-trusted Let’s Encrypt certificates" caption="@small-tech/https with globally-trusted Let’s Encrypt certificates">}}

Today’s my birthday so I thought I’d give you a little present: [`@small-tech/https`](https://source.ind.ie/site.js/lib/https/).

## Plug-and-play https

This is essentially a drop-in, batteries-included version of [the Node.js `https` module](https://nodejs.org/api/all.html#https_https) that:

  - Automatically provisions locally-trusted TLS for development (courtesy of [mkcert](https://github.com/FiloSottile/mkcert) seamlessly integrated via [Nodecert](https://source.ind.ie/hypha/tools/nodecert)).

  - Automatically provisions globally-trusted TLS for courtesy of [Let’s Encrypt](https://letsencrypt.org/).

## Install

```sh
npm i @small-tech/https
```

## Example

Here’s a basic Express “hello, world” app that shows you how this module can be used. Note that you don’t need express to use it.

1. ### Set up

    ```sh
    # Create the project folder and switch to it.
    mkdir example && cd example

    # Create a new npm module for the example.
    npm init --yes

    # Install dependencies.
    npm i @small-tech/https express

    # Open up the main file in your default editor.
    $EDITOR index.js
    ```

2. ### Code (index.js)

    ```javascript
    const https = require('..')

    // Helpers
    function html(message) {
      return `<!doctype html><html lang='en'><head><meta charset='utf-8'/><title>Hello, world!</title><style>body{background-color: white; font-family: sans-serif;}</style></head><body><h1>${message}</h1></body></html>`
    }
    const contentTypeHTML = {'Content-Type': 'text/html'}

    let options = {}

    // For globally-trusted Let’s Encrypt certificates uncomment options.
    // To provision certificates, also remove “staging: true” property.

    // options = {
    //   domain: 'hostname',
    //   staging: true
    // }

    // Create HTTPS server at https://localhost
    // with locally-trusted certificates.
    const server = https.createServer(options, (request, response) => {
      if (request.method !== 'GET') {
        response.writeHead(404, contentTypeHTML)
        response.end(html('Not found.'))
        return
      }
      // Respond to all routes with the same page.
      response.writeHead(200, contentTypeHTML)
      response.end(html('Hello, world!'))
    })

    server.listen(443, () => {
      console.log(' 🎉 Server running on port 443.')
    })
    ```

3. ### Run

    ```sh
    node index
    ```

Hit `https://localhost` and you should see your site with locally-trusted TLS certificates.

{{<figure src="global.jpeg" alt="Screenshot of @small-tech/https example app running in terminal with locally-trusted TLS certificates" caption="@small-tech/https with locally-trusted certificates courtesy of mkcert">}}

## Let’s encrypt!

To provision globally-trusted Let’s Encrypt certificates instead, just uncomment the `options` object. Test it out with the `staging` flag set to true first and, once you verify that certificates are being properly generated, remove the flag to actually provision the certificates the first time your server is hit.

## TL; DT

Too long, didn’t type?

You can find a version of this example in the `/example` folder. To download and run it:

```sh
# Clone this repository.
git clone https://source.ind.ie/site.js/lib/https.git

# Switch to the directory.
cd https

# Install dependencies.
npm i

# Run the example.
npm run example
```

## Happy birthday to you!

I hope you enjoy my little birthday present and I hope that it makes your life easier.

Please [let me know](https://mastodon.ar.al/@aral) how you get on it with.

<figure>
<iframe src="https://mastodon.ar.al/@aral/103102778422291371/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>
<figcaption>PS. I also got some lovely presents today ;)</figcaption>
</figure>

{{< like_this_fund_us >}}