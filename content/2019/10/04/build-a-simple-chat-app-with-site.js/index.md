---
title: "Build a simple chat app with Site.js"
date: 2019-10-04T14:50:49+01:00
draft: false
---

This weekend, I released [Site.js](https://sitejs.org) version 12.7.0 with improvements to its WebSocket interface and [documentation](https://source.ind.ie/site.js/app/blob/master/README.md#websocket-wss-routes). Today, I want to take you step-by-step into building and running a basic chat app using Site.js.

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

    {{< browser location="https://localhost/" caption="A very simple static page.">}}
    <p>Hello, world!</p>
    {{< /browser >}}

    A couple of things to note:

    ### You didn’t have to configure anything, it just worked.

    Site.js is zero-configuration. It favours intelligent defaults over silly ones that leave you to do all the work.

    ### You didn’t get a certificate warning in the browser.

    Site.js uses the excellent [mkcert](https://github.com/FiloSottile/mkcert) tool to seamlessly create a certificate authority on your local machine and issue you a valid TLS certificate the first time you run a server at localhost.[^2]

    Once you’re done testing your shiny new site, press <kbd>Ctrl</kbd> <kbd>C</kbd> to stop the Site.js server.

  3. ## Cha-cha-cha changes!

    Static sites are all well and good but you were promised a chat app and you can’t build that with a fully static site. So let’s take a quick look at how we can create dynamic apps with Site.js.

    I mentioned earlier that Site.js is zero-configuration. This means that it has certain conventions that it expects you to adhere to. For example, if you want to create dynamic routes in your web app, you must place them in a folder called `.dynamic`.

    Before we move onto creating the chat functionality, let’s create the equivalent of our static “hello, world!” example but with some very basic dynamic functionality that displays the current date and time.

    ### A timely example

    First, create a folder called `.dynamic` within your `demo` folder:

    ```shell
    mkdir .dynamic
    ```

    Next, open your code editor of choice and create a file called `date.js` in the `.dynamic` folder. Once you’re done, your project folder hierarchy should look like this:

    ```shell
    demo/
      ├ .index.html    # static route
      └ .dynamic
            └ date.js  # dynamic route
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

    {{< browser location="https://localhost/date" caption="A dynamic DotJS route. Refresh the page to see it update." >}}
    <p><script>document.write(new Date().toString())</script></p>
    {{< /browser >}}

    You should see the current date.

    Refresh and you should see the date update. Congratulations, you just created your first dynamic web site using Site.js.

    (Seriously.)

    ### What magic is this?

    I call it [DotJS](https://source.ind.ie/site.js/app/blob/master/README.md#dotjs).

    DotJS maps JavaScript modules defined in `.js` files (see what I did there?) to web routes on your web site in a manner that will be familiar to anyone who has ever used PHP.

    So, in the example above, `.dynamic/date.js` becomes the web route `https://localhost/date`.

    Using DotJS, all you have to do is write the logic for your web app. Everything else, including creating a secure HTTPS and WebSocket server for you and registering your routes, etc., is handled for you by Site.js.

    Furthermore, there is no magic here. Under the hood, these are simply plain old tried-and-tested [Express](https://expressjs.com/) routes.[^3] Site.js contains [Node.js](https://nodejs.org) so you can do anything in your dynamic routes that you can do with Node.js – including [using node modules](https://source.ind.ie/site.js/app/blob/master/README.md#using-node-modules) – without installing Node.js.

    When you’re ready to move on, press <kbd>Ctrl</kbd> <kbd>C</kbd> to stop the Site.js server.

  4. ## Did someone mention a chat app?

    OK, OK, I know I’m taking the scenic route but I wanted to introduce you to the basic concepts of Site.js before getting to the chat app so you have a solid foundation to build on.

    Site.js, as you might have guessed, is not limited to HTTPS routes. You can also create secure WebSocket routes. And you can use DotJS with WebSockets also.

    Let’s start by creating and testing the back-end of the chat app and when we’re happy with it, we can cobble together a basic web interface for it.

    ### The chat server

    In your `demo/.dynamic` folder, create a new folder called `.wss`. This is the folder Site.js expects you to place WebSocket routes in.

    Then, in your `.wss` folder, create a file called `chat.js`.

    Now type the following code into that file:

    ```js
    module.exports = function (client, request) {
      client.room = this.setRoom(request)
      console.log(`New client connected to ${client.room}`)
    }
    ```

    The function you just wrote will be called any time a new client connects to our chat server at the `/chat` path (which will be available locally at `wss://localhost/chat`)[^4]. In chat app parlance, what we’ve created is known as a “room.” So let’s try and join it and see what happens.

    ### Room for improvement

    To test our new room, run `site` in your `demo` folder and, once the server is running, open up a JavaScript console in your browser of choice and enter the following code:

    ```js
    socket = new WebSocket('wss://localhost/chat')
    ```

    Now look in your terminal, you should see:

    {{< terminal title="~/demo" caption="We’ve connected… now what?">}}New client connected to /chat{{</ terminal >}}

    So we’ve just made a successful connection to the `/chat` room. Now we need the server to listen for messages sent from connected clients and broadcast them to every other client in the same room.

    ### Broadly speaking

    Modify the code in `chat.js` so that it matches the listing below:

    ```js
    module.exports = function (client, request) {
      client.room = this.setRoom(request)
      console.log(`New client connected to ${client.room}`)

      client.on('message', message => {
        this.broadcast(client, message)
      })
    }
    ```

    What we’re doing here is creating an event handler that listens for `message` events and then uses the `broadcast` method that all DotJS WebSocket routes have to fan the message out to the other clients connected to the same room.

    An important thing to note is that you should always use an `function` expression instead of an arrow function expression when creating your WebSocket routes to ensure that you can access methods like `broadcast()` using the `this` reference[^5].

    ## Can you hear me now?

    Our chat server is complete but does it work? Let’s return to our JavaScript console and test it. This time, open two browser windows and let’s try and hold a conversation.

    In the JavaScript console of the first browser window, enter:

    ```js
    socket = new WebSocket('wss://localhost/chat')
    socket.onmessage = message => console.log(message.data)
    ```

    In the JavaScript console of the second browser window, enter:

    ```js
    socket = new WebSocket('wss://localhost/chat')
    socket.onmessage = message => console.log(message.data)
    socket.send('Can you hear me now?')
    ```

    Glance at the JavaScript console of the first browser window and you should see the message you just sent appear. You can reply from the first window using the same `socket.send()` method as before.

    Functionally, our chat server is complete but let’s modify the code one last time just to add some logging and to document our work to make it easier to remember what we’re doing.

    Before we move on, replace the code in `chat.js` with the following listing:

    ```js
    module.exports = function (client, request) {
      // New client connection: persist client’s “room”
      // based on request path.
      client.room = this.setRoom(request)

      // Log the connection.
      console.log(`New client connected to ${client.room}`)

      client.on('message', message => {
        // New message received: broadcast it to all
        // other clients in the same room.
        const numberOfRecipients = this.broadcast(client, message)

        // Log the number of recipients message was sent to
        // and make sure we pluralise the log message properly.
        console.log(`${client.room} message broadcast to `
          + `${numberOfRecipients} recipient`
          + `${numberOfRecipients === 1 ? '' : 's'}`)
      })
    }
    ```

    ## Some housekeeping

    If you remember, towards the start of this tutorial we created a dynamic HTTPS route that shows the current date and time. With Site.js serving the `demo` folder, try to access the `/date` route now.

    {{< browser location="https://localhost/date" caption="We don’t talk about my emoji problem…" >}}
    <div style="display: grid; align-items: center; justify-content: center; vertical-align: top; margin-top: 0;"><div><h1 style="font-size: 500%; color: black; text-align:center; line-height: 0">4🤭4</h1><p style="font-size: 100%; text-align: center; padding-left: 2vw; padding-right: 2vw; margin-bottom: 5%;"><span>Could not find</span> <span style="color: grey;">/date</span></p></div></div>
    {{</ browser >}}

    Oops, you get the default Site.js 404 page[^6].

    Site.js can’t file the file. Why?

    Turns out ever since we created the `.wss` folder, Site.js has been ignoring our `.dynamic/date.js` route due to [routing precedence](https://source.ind.ie/site.js/app/blob/master/README.md#routing-precedence) rules.

    That’s a fancy way of saying that if we want to use HTTPS and WebSocket DotJS routes together in the same web app, we must put our HTTPS routes in a folder called `.https` just like we put the WebSocket routes in a folder called `.wss`.

    So create a folder called `.https` inside the `.dynamic` folder and move the `date.js` file into it. Then, restart your Site.js server and hit `https://localhost/date`. The route should now load correctly.

    If you look at your terminal output, you will see that Site.js tells you exactly which routes it loads when it launches:

    {{< terminal title="~/demo" caption="The console output from Site.js contains important details." >}}🐁 Found .https/.wss folders. Will load dynamic routes from there.
🐁 Adding HTTPS GET route: /date
🐁 Adding WebSocket (WSS) route: /chat{{</ terminal >}}

    ## Room with a view

    So our chat server works but it doesn’t have a web interface yet.

    Let’s fix that!

    Open up the static `index.html` we created in the very first exercise with the “Hello, world!” message in it and replace the contents of that file with the following:

    ```html
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Basic chat app with Site.js</title>
    </head>
    <body>
      <h1>Chat room</h1>
      <!-- Code from the next step goes here. -->
    </body>
    </html>
    ```

    With Site.js serving the `demo` folder, hit `https://localhost` in your browser and confirm that you see it say “Chat room”.

    ### Create the interface

    Our simple web interface is going to contain three main components: a connection status widget to show you whether you are connected to the server or not, a message form where you can identify yourself, compose messages, and send them, and, finally, a message display area where we can display both your sent messages and any incoming messages received from others.

    Add the interface components to your web page by pasting the code below under the heading in the body of your page.

    ```html
  <p>Status: <span id='status' style="color: red;">Offline</span></p>
  <form id='messageForm'>
    <label for='message'>Nickname:</label>
    <input id='nickname' type='text' name='nickname' value='Anonymous'>
    <label for='message'>Message:</label>
    <input id='message' type='text' name='message' value=''>
    <button id='submitButton' type='submit'>Send</button>
  </form>
  <h2>Messages</h2>
  <ul id='messages'></ul>
  <!-- Code from the next step goes here. -->

    ```

    Now, when you visit `https://localhost` in your browser, you should see our (currently non-functional) chat interface:

    {{< browser location="https://localhost" caption="The web interface (non-functional)." >}}
    <style>
    .chat-interface { padding-bottom: 1.5em; }
    .chat-interface form { margin-bottom: 1.5em; }
    .chat-interface label, .chat-interface p {font-size: 0.9em}
    .chat-interface input {width:6em; height:}
    </style>
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='messageForm' onsubmit='return false'>
        <label for='message'>Nickname:</label>
        <input id='nickname' type='text' name='nickname' value='Anonymous'>
        <label for='message'>Message:</label>
        <input id='message' type='text' name='message' value=''>
        <button id='submitButton' type='submit'>Send</button>
      </form>
      <h2>Messages</h2>
      <ul id='messages'></ul>
    </div>
    {{< /browser >}}

    ### Add front-end logic

    OK, so let’s add some life to our room, shall we?

    Under your interface code, add a `script` tag and let’s get our status indicator working by making a WebSocket connection to our server, listening for the relevant events, and updating the interface accordingly:

    ```js
    <script>
      // Shorthand for basic DOM lookup via CSS selectors.
      const element = document.querySelector.bind(document)

      // Initialise web socket.
      const socket = new WebSocket(
        `wss://${window.location.hostname}/chat`
      )

      // Display the state of the connection.
      socket.onopen = _ => {
        element('#status').innerHTML = '<span style="color: green">Online</span>'
      }

      socket.onclose = _ => {
        element('#status').innerHTML = 'Offline'
      }
    </script>
    ```

    Restart the Site.js server[^7] and you should now see the status indicator read <span style="color: green">Online</span> when you reload the page:

    {{< browser location="https://localhost" caption="Live example, connected to wss://ar.al/chat.">}}
    <style>
    .chat-interface { padding-bottom: 1.5em; }
    .chat-interface form { margin-bottom: 1.5em; }
    .chat-interface label, .chat-interface p {font-size: 0.9em}
    .chat-interface input {width:6em; height:}
    </style>
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='live-example-1-status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='messageForm' onsubmit='return false'>
        <label for='message'>Nickname:</label>
        <input id='nickname' type='text' name='nickname' value='Anonymous'>
        <label for='message'>Message:</label>
        <input id='message' type='text' name='message' value=''>
        <button id='submitButton' type='submit'>Send</button>
      </form>
      <h2>Messages</h2>
      <ul id='messages'></ul>
    </div>
    <script>
      // Shorthand for basic DOM lookup via CSS selectors.
      const element = document.querySelector.bind(document)

      // Initialise web socket.
      const socket = new WebSocket(
        `wss://${window.location.hostname}/chat`
      )

      // Display the state of the connection.
      socket.onopen = _ => {
        element('#live-example-1-status').innerHTML = '<span style="color: green">Online</span>'
      }

      socket.onclose = _ => {
        element('#live-example-1-status').innerHTML = 'Offline'
      }
    </script>
    {{< /browser >}}

    Note that when making the WebSocket connection, we didn’t hardcode the URL like before. Instead, we used:

    ```js
    new WebSocket(`wss://${window.location.hostname}/chat`)
    ```

    This ensures that the app will work regardless of which domain it is served from.

    During development, `windows.location.hostname` will resolve to `localhost`, as before. When running in production – as it is here on my blog – it will resolve to the domain name of the site[^8].

[^1]: If you don’t want to use the terminal, you can open up your graphical file browser and create the `demo` folder using that and then use your graphical code editor to create an `index.html` file in that folder. You will, however, need to run the `site` command from a terminal session with its current working directory set to the `demo` folder… there’s no getting away from that.

[^2]: Site.js can also function as a proxy server, so you can test _any_ server locally over a secure connection. For example, if you are running a [Hugo](https://hugo.io) server at its default port (1313), you can test it from `https://localhost` by running Site.js like this:

    ```shell
    # Proxy the server at port 1313 to https://localhost (port 443)
    site :1313
    ```

    Note that if you want live reload to work, you should add the `--liveReloadPort=443` option to your Hugo server command.

[^3]: If you want full control over your routing, including the ability to use regular expressions in your route names and accessing global state, etc., you can do everything you can in Express using the [advanced routing](https://source.ind.ie/site.js/app/blob/master/README.md#advanced-routing-routesjs-file) feature by declaring a `routes.js` file in your `.dynamic` fodler.

[^4]: Note that the URL scheme is no longer `https` but `wss` since we’re talking about secure WebSocket routes now. If I had a penny for every time I wrote `https://` when I meant to write `wss://`…

[^5]: You might have noticed that we use an anonymous function expression in the `module.exports` line whereas we used an arrow function expression in the previous (HTTPS) examples and even though we use an arrow function expression to define the event handler. This is not by accident; it has to do with scope. If you want to have access to the `this` reference in your DotJS routes and access methods like `broadcast()`, you cannot use an arrow function expression to define your module, you must use the `function` keyword. Inside of your module, you are free to use arrow function expressions to your heart’s desire.

[^6]: You can easily [replace the default error pages with your own custom ones](https://source.ind.ie/site.js/app/blob/master/README.md#custom-error-pages). And as far as 404 errors go, you can reduce the number of them on the web in general and contribute towards [an evergreen web](https://source.ind.ie/site.js/app/blob/master/README.md#native-support-for-an-evergreen-web) by making use of the native [cascading archives](https://source.ind.ie/site.js/app/blob/master/README.md#native-cascading-archives-support) and [404-to-302](https://source.ind.ie/site.js/app/blob/master/README.md#native-404-302-support) support in Site.js.

[^7]: Site.js does not have LiveReload and does not automatically restart the server when dynamic routes change at the moment. When working with static content, this means that you have to manually refresh the browser and when working with dynamic content you have to manually restart the server whenever you make code changes. I realise this is less than ideal and both of these are high on [my list of issues](https://source.ind.ie/site.js/app/issues) to address.

[^8]: The examples on this page are live and connect to the instance of the finished app I have running at https://ar.al/chat. Needless to say, this site is served by Site.js.
