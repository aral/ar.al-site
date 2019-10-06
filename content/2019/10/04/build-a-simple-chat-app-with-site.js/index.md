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

    {{< browser location="https://localhost/laura">}}
    <p>Hello, world!</p>
    {{< /browser >}}

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

    {{< browser location="https://localhost/date">}}
    <p><script>document.write(new Date().toString())</script></p>
    {{< /browser >}}

    You should see the current date.

    Refresh and you should see the date update. Congratulations, you just created your first dynamic web site using Site.js.

    (Seriously.)

    ### What magic is this?

    I call it [DotJS](https://source.ind.ie/site.js/app/blob/master/README.md#dotjs).

    DotJS maps JavaScript modules defined in `.js` files (see what I did there?) in a file system hierarchy to web routes on your web site in a manner that will be familiar to anyone who has ever used PHP.

    So, in the example above, `.dynamic/date.js` becomes the web route `https://localhost/date`.

    Using DotJS, all you have to do is write the logic for your web app. Everything else, including creating a secure HTTPS and WebSocket server for you and registering your routes, etc., is handled for you by Site.js.

    All that said, there is no magic here. Under the hood, these are simply plain old tried-and-tested [Express](https://expressjs.com/) routes.[^3]

    When you’re ready to move on, press <kbd>Ctrl</kbd> <kbd>C</kbd> to stop the Site.js server.

  4. ## Did someone mention a chat app?

    OK, OK, I know I’m taking the scenic route but I wanted to introduce you to the basic concepts of Site.js before getting to WebSockets and the chat app so you have a solid foundation to build on.

    Site.js, as you might have guessed, is not limited to HTTPS routes, you can also create secure WebSocket routes. And you can use DotJS to do it.

    So let’s start by creating and testing the back-end and then we can cobble together a basic interface for it.

    ### The chat server

    In your `demo/.dynamic` folder, create a new folder called `.wss`. This is the folder Site.js expects WebSocket routes to be placed in.

    Then, in your `.wss` folder, create a file called `chat.js`.

    Next, enter the following code in that file:

    <!--
          // A new client connection has been made.
          // Persist client’s “room” based on request path.
    -->

    ```js
    module.exports = function (client, request) {
      client.room = this.setRoom(request)
      console.log(`New client connected to ${client.room}`)
    }
    ```

    We just wrote a function that will be called any time a new client connects to our chat server at the `/chat` path (which will be available locally at `wss://localhost/chat`)[^4]. In chat app parlance, what we’ve created is a “room.” So let’s try and join it and see what happens.

    ### Room for improvement

    To test our new room, run `site` in your `demo` folder and, once the server is running, open up a JavaScript console in your browser of choice and enter the following code:

    ```js
    socket = new WebSocket('wss://localhost/chat')
    ```

    Now look in your terminal, you should see:

    <div class="terminal shadow" style="display: block; position: relative;" data-window-title="~/demo">
      <div class="terminal-content">
        <pre><code>New client connected to /chat</code></pre>
      </div>
    </div>


[^1]: If you don’t want to use the terminal, you can open up your graphical file browser and create the `demo` folder using that and then use your graphical code editor to create an `index.html` file in that folder. You will, however, need to run the `site` command from a terminal session with its current working directory set to the `demo` folder… there’s no getting away from that.

[^2]: Site.js can also function as a proxy server, so you can test _any_ server locally over a secure connection. For example, if you are running a [Hugo](https://hugo.io) server at its default port (1313), you can test it from `https://localhost` by running Site.js like this:

    ```shell
    # Proxy the server at port 1313 to https://localhost (port 443)
    site :1313
    ```

    Note that if you want live reload to work, you should add the `--liveReloadPort=443` option to your Hugo server command.

[^3]: If you want full control over your routing, including the ability to use regular expressions in your route names and accessing global state, etc., you can do everything you can in Express using the [advanced routing](https://source.ind.ie/site.js/app/blob/master/README.md#advanced-routing-routesjs-file) feature by declaring a `routes.js` file in your `.dynamic` fodler.

[^4]: Note that the URL scheme is no longer `https` but `wss` since we’re talking about secure WebSocket routes now. If I had a penny for every time I wrote `https://` when I meant to write `wss://`…