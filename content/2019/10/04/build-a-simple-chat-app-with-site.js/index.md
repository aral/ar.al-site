---
title: "Build a simple chat app with Site.js"
date: 2019-10-04T14:50:49+01:00
draft: false
---

Yesterday, I released [Site.js](https://sitejs.org) version 12.7.0 with improvements to its WebSocket interface and [documentation](https://source.ind.ie/site.js/app/blob/master/README.md#websocket-wss-routes). Today, I want to take you step-by-step into building and running a basic chat app using Site.js.

It’s much easier than you think, so fire up a terminal window, grab your code editor, and let’s get started!

  1. ## Install Site.js

      If you don’t already have Site.js, you first need to install it.

      {{< install_site_js >}}

      The download and installation should take about 10-15 seconds depending on the speed of your Internet connection.

      Unless otherwise stated, the remaining instructions should work verbatim across Linux, macOS, and Windows 10.

  2. ## Test it

    In your terminal[^1], create a simple static “Hello, world!” web page and serve it:

    ```shell
    # Create a folder to work in and switch to it.
    mkdir demo
    cd demo

    # Create the simplest possible “web page”.
    echo 'Hello, world' > index.html

    # Run Site.js to serve the site.
    site
    ```

    To test that it’s working, fire up your browser of choice and visit `https://localhost`

    <link href='/css/facade.css' rel='stylesheet'>
    <style>
      .browser {
        background-color: white;
        box-shadow: 0 20px 70px gray;
        margin-top: 2.5em;
        margin-bottom: 2.5em;
      }

      .lock {
        background: url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="1 0 14 16" width="14" height="16"><path d=" M 8 0 C 5.067 0 2.667 2.304 2.667 5.12 L 2.667 6.827 L 1 6.827 L 1 16 L 14.809 16 C 14.914 16 15 15.914 15 15.809 L 15 6.827 L 13.333 6.827 L 13.333 5.12 C 13.333 2.304 10.933 0 8 0 Z  M 8 1.707 C 9.972 1.707 11.556 3.226 11.556 5.12 L 11.556 6.827 L 4.444 6.827 L 4.444 5.12 C 4.444 3.226 6.028 1.707 8 1.707 Z " fill="%23B3B3B3"/></svg>') 1px 0px no-repeat;
      }

      .browser-content {
        height: 3em;
        display: flex;
        flex-direction: column;
        align-content:center;
        justify-content: center;
      }
    </style>

    <div class="browser facade-minimal" aria-hidden="true" data-url="https://localhost">
      <div class="refresh-button"></div>
      <div class="lock"></div>
      <div class="browser-content">
        <p>Hello, world!</p>
      </div>
    </div>

    A couple of things to note:

    ### You didn’t have to configure anything, it just worked.

    Site.js is zero-configuration. It favours intelligent defaults over silly ones that leave you to do all the work.

    ### You didn’t get a certificate warning in the browser.

    Site.js uses the excellent [mkcert](https://github.com/FiloSottile/mkcert) tool to seamlessly create a certificate authority on your local machine and issue you a valid TLS certificate the first time you run a server at localhost.[^2]

    Once you’re done testing your shiny new site, press <kbd>Ctrl</kbd> <kbd>C</kbd> to stop the Site.js server.

  3. ## Going dynamic

    Now, static sites are all good and well but you were promised a chat app and you can’t build that with a fully static site. So let’s take a quick look at how we can create dynamic apps with Site.js.

    I mentioned earlier that Site.js is zero-configuration. This means that it has certain conventions that it expects you to adhere to. For example, if you want to create dynamic routes in your web app, you must place them in a folder called `.dynamic`.

    Before we move onto creating the chat functionality, let’s create an equivalent of our static “hello, world!” example but with some very basic dynamic functionality.

    ### A timely example

    From the same terminal window and folder you were in before, enter the following commands:

    ```shell
    mkdir .dynamic
    ```

    Now, open your code editor of choice at the current directory and, using it, create a file called `date.js` in the `.dynamic` folder. Once you’re done, your project folder hierarchy should look like this:

    ```shell
    demo/
      ├ .index.html
      └ .dynamic
            └ date.js
    ```

    In the `date.js` file, enter the following code:

    ```javascript
    module.exports = (request, response) => {
      const now = new Date().toString()
      response
        .type('html')
        .end(now)
    }
    ```

    Finally, run the `site` command in the `demo` folder and visit `https://localhost/date`

    You should see the current date.

    Refresh and you should see the date update. Congratulations, you just created your first dynamic web site using Site.js.

    (Seriously.)

    ### What magic is this?

    In

[^1]: If you don’t want to use the terminal, you can open up your graphical file browser and create the `demo` folder using that and then use your graphical code editor to create an `index.html` file in that folder. You will, however, need to run the `site` command from a terminal session with its current working directory set to the `demo` folder… there’s no getting away from that.

[^2]: Site.js can also function as a proxy server, so you can test _any_ server locally over a secure connection. For example, if you are running a [Hugo](https://hugo.io) server at its default port (1313), you can test it from `https://localhost` by running Site.js like this:

    ```shell
    # Proxy the server at port 1313 to https://localhost (port 443)
    site :1313
    ```

    Note that if you want live reload to work, you should add the `--liveReloadPort=443` option to your Hugo server command.