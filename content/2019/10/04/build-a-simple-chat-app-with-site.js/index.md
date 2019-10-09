---
title: "Build a simple chat app with Site.js"
date: 2019-10-04T14:50:49+01:00
draft: false
---

<!-- The final version of the chat app. -->

<style>
  #final-version .browser-content {
    overflow-y: scroll;
    height: 19em;
  }

  #final-version .chat-interface {
    height: 19em;
  }
</style>

<div id='final-version'>
{{< browser location="https://localhost" caption="The chat app we’ll be building together (it’s live, you can play with it!)">}}
<div class='chat-interface'>
  <h1>Chat room</h1>
  <p>Status: <span id='final-version-status' style="color: red;">Offline</span></p>
  <!-- Note: added code to prevent send button from reloading the tutorial -->
  <form id='final-version-message-form' onsubmit='return false'>
    <label for='final-version-message'>Nickname:</label>
    <input id='final-version-nickname' type='text' name='nickname' value='Anonymous'>
    <label for='final-version-message'>Message:</label>
    <input id='final-version-message' type='text' name='message' value=''>
    <button id='final-version-submit-button' type='submit'>Send</button>
  </form>
  <h2>Messages</h2>
  <ul id='final-version-messages'></ul>
</div>
<script>
  // Initialise web socket.
  const finalVersionWindowSocket = new WebSocket(
    `wss://${window.location.hostname}/chat`
  )

  // Display the state of the connection.
  finalVersionWindowSocket.onopen = _ => {
    element('#final-version-status').innerHTML = '<span style="color: green">Online</span>'
  }

  finalVersionWindowSocket.onclose = _ => {
    element('#final-version-status').innerHTML = 'Offline'
  }

  function finalVersionWindowDisplayMessage (message) {
    element('#final-version-messages').innerHTML += `<li><strong>${message.nickname}: </strong>${message.text}</li>`
  }

  // Handle message sending.
  element('#final-version-message-form').addEventListener('submit', event => {
    // Prevent the form from being submitted.
    event.preventDefault()

    // Get the nickname and text.
    const nickname = element('#final-version-nickname').value
    const text = element('#final-version-message').value

    // Clear the message
    element('#final-version-message').value = ''

    // Create a message object, serialise it as JSON, and send it.
    const message = { nickname, text }
    finalVersionWindowSocket.send(JSON.stringify(message))

    // Update the local display
    finalVersionWindowDisplayMessage(message)
  })

  // Handle incoming messages.
  finalVersionWindowSocket.onmessage = message => {
    // Deserialise the message string.
    message = JSON.parse(message.data)

    // Display the message in the messages list.
    finalVersionWindowDisplayMessage(message)
  }
</script>
{{< /browser >}}
</div>

## We need to talk about Site.js

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

    <style>
      #note-for-non-coders {
        display: block;
        background-color: #AFE1E8;
        color: #154652;
        width: 100%;
        font-size: 0.9em;
        margin-top: 2rem;
        margin-left: -2rem;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    </style>
    <div id='note-for-non-coders'>
    __A note for non-programmers:__ The code listings on my blog use a font that applies ligatures to certain operators to render them in a more typographically pleasing manner. However, this may confuse beginners who are not familiar with how to type these operators. To enter the strict equality operator (`===`), use three equals signs (===). Similarly, to enter the strict inequality operator (`!==`) – which, contrary to how it sounds, isn’t the logo for your local conservative party – type an exclamation mark followed by two equals signs (!==). Finally, to create an arrow function expression (`=>`), type an equals sign followed by a greater-than sign (=>).
    </div>

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

  5.  ## Can you hear me now?

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

  6. ## Some housekeeping

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

  7. ## Room with a view

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
    <form id='message-form'>
      <label for='message'>Nickname:</label>
      <input id='nickname' name='nickname' value='Anonymous'>
      <label for='message'>Message:</label>
      <input id='message' name='message' value=''>
      <button id='submit-button' type='submit'>Send</button>
    </form>
    <h2>Messages</h2>
    <ul id='messages'></ul>
    ```

    Let’s also add some very basic styling so that our form displays neatly. Just before the end of the `<head>` tag (right before `</head>`), enter the following style tag and CSS:

    ```css
    <style>
      form {
        background: #eee;
        display: grid;
        grid-template-columns: [labels] auto [controls] 1fr;
        grid-gap: 0.5em;
        min-width: 100px;
        max-width: 400px;
        padding: 0.75em;
      }

      form > label { grid-column: labels; }

      form > input, form > button {
        grid-column: controls;
        min-width: 6em;
        padding: 0.5em;
      }
    </style>
    ```

    This will display the form in a basic responsive, two-column layout that won’t hurt our eyes.

    Now, when you visit `https://localhost` in your browser, you should see our (currently non-functional) chat interface.

    {{< browser location="https://localhost" caption="The web interface (non-functional)." >}}
    <style>
    .chat-interface { padding-bottom: 1.5em; }
    .chat-interface form { margin-bottom: 1.5em; }
    .chat-interface label, .chat-interface p {font-size: 0.9em}
    </style>
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='message-form' onsubmit='return false'>
        <label for='message'>Nickname:</label>
        <input id='nickname' type='text' name='nickname' value='Anonymous'>
        <label for='message'>Message:</label>
        <input id='message' type='text' name='message' value=''>
        <button id='submit-button' type='submit'>Send</button>
      </form>
      <h2>Messages</h2>
      <ul id='messages'></ul>
    </div>
    {{< /browser >}}

    ### Make the connection

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

      // Code from the next step goes here.

    </script>
    ```

    Restart the Site.js server[^7] and you should now see the status indicator read <span style="color: green">Online</span> when you reload the page:

    <style>
    .chat-interface { padding-bottom: 1.5em; }
    .chat-interface form { margin-bottom: 1.5em; }
    .chat-interface label, .chat-interface p {font-size: 0.75em}
    .chat-interface h1 { font-size: 1.5em; line-height: 1 }
    .chat-interface h2 { font-size: 1em; }
    .chat-interface ul { margin-top: 0.5em; }
    .chat-interface li { font-size: 0.75em; line-height: 1.5 }
    </style>

    {{< browser location="https://localhost" caption="Live example, connected to wss://ar.al/chat.">}}
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='live-example-1-status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='messageForm' onsubmit='return false'>
        <label for='message'>Nickname:</label>
        <input id='nickname' type='text' name='nickname' value='Anonymous'>
        <label for='message'>Message:</label>
        <input id='message' type='text' name='message' value=''>
        <button id='submit-button' type='submit'>Send</button>
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

    ### Handle message sending

    Now that our app can connect to the chat server and display its connection status, let’s implement the ability to send messages.

    When we send a message, we won’t receive it back ourselves, so one of the things we must do is to add it to our local message list manually. Since we’ll also have to do this when we receive a message from someone else, let’s first create a function we can use for both these purposes:

    ```js
    // Helper: display a message object.
    function displayMessage (message) {
      element('#messages').innerHTML += `<li><strong>${message.nickname}: </strong>${message.text}</li>`
    }
    ```

    Next, let’s create the handler that will be called when your message form is submitted by pressing the Send button:

    ```js
    // Handle message sending.
    element('#message-form').addEventListener('submit', event => {
      // Prevent the form from being submitted.
      event.preventDefault()

      // Get the nickname and text.
      const nickname = element('#nickname').value
      const text = element('#message').value

      // Clear the message
      element('#message').value = ''

      // Create a message object, serialise it as JSON, and send it.
      const message = { nickname, text }
      socket.send(JSON.stringify(message))

      // Update the local display
      displayMessage(message)
    })

    // Code from the next step goes here.

    ```

    In our handler, we construct a message object that contains your nickname and the text of the message you want to send, serialise it into a JSON-formatted string, and then send it to our chat server.

    Additionally, we clear the message box to make it easier for you to type your next message and we use our new `displayMesssage()` function to display the message we’ve sent locally so you can have a full timeline of messages, including your own.

    Restart your Site.js server and reload the page and you should now we able to send messages. To test that it is working, take a look at the Site.js console output in your terminal window and you should see the following message:

    {{< terminal title="~/demo" caption="A message to no one." >}}/chat message broadcast to 0 recipients{{</ terminal >}}

    So our message is being sent but no one is receiving it. This makes sense since the `broadcast()` method in our chat server does not send a copy of the message to the client it received it from and we don’t have any other clients connected.

    Now open up a second browser window and load a copy of `https://localhost` in it and try sending another message.

    This time, you should see the following console output in your terminal:

    {{< terminal title="~/demo" caption="A message to someone." >}}/chat message broadcast to 1 recipient{{</ terminal >}}

    Well that’s progress. So our messages are being broadcast successfully but we’re not doing anything to process them on the web interface yet. Let’s implement that next.

    ### Handle incoming messages

    When a message is received on the socket, the `onmessage` event handler is invoked. Add the following code to the end of your `script` tag to define a message handler that parses the received JSON string (remember, we serialise message objects in JSON format before sending them) and add it to the unordered list in our interface:

    ```js
    // Handle incoming messages.
    socket.onmessage = message => {
      // Deserialise the message string and display it.
      message = JSON.parse(message.data)
      displayMessage(message)
    }
    ```

    Now when you test your app using two browser windows, you should be able to both send and receive messages.

    You can test out what we have so far using the two browser windows below. They’re both running the code above:

    <style>
      #first-chat-window, #second-chat-window {
        width: 47.5%;
      }

      #first-chat-window {
        float: left;
      }

      #second-chat-window {
        float: right;
      }

      #first-chat-window .browser-content, #second-chat-window .browser-content {
        overflow-y: scroll;
        height: 19em;
      }

      #first-chat-window .chat-interface, #second-chat-window .chat-interface {
        height: 19em;
      }

      /* On narrow viewports, stack the browser windows
         vertically instead of horizontally. */
      @media screen and (max-width: 353px) {
        #first-chat-window, #second-chat-window {
          float: none;
          width: 100%;
        }
      }

      form {
        display: grid;
        grid-template-columns: [labels] auto [controls] 1fr;
        grid-gap: 0.5em;
        background: #eee;
        padding: 0.75em;
        min-width: 100px;
        max-width: 400px;

      }

      form > label { grid-column: labels; }

      form > input, form > button {
        min-width: 6em;
        grid-column: controls;
        padding: 0.5em;
      }
    </style>

    <!-- First chat window -->

    <div id='first-chat-window'>
    {{< browser location="https://localhost" caption="First chat window.">}}
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='first-chat-window-status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='first-chat-window-message-form' onsubmit='return false'>
        <label for='first-chat-window-message'>Nickname:</label>
        <input id='first-chat-window-nickname' type='text' name='nickname' value='Anonymous'>
        <label for='first-chat-window-message'>Message:</label>
        <input id='first-chat-window-message' type='text' name='message' value=''>
        <button id='first-chat-window-submit-button' type='submit'>Send</button>
      </form>
      <h2>Messages</h2>
      <ul id='first-chat-window-messages'></ul>
    </div>
    <script>
      // Initialise web socket.
      const firstChatWindowSocket = new WebSocket(
        `wss://${window.location.hostname}/chat`
      )

      // Display the state of the connection.
      firstChatWindowSocket.onopen = _ => {
        element('#first-chat-window-status').innerHTML = '<span style="color: green">Online</span>'
      }

      firstChatWindowSocket.onclose = _ => {
        element('#first-chat-window-status').innerHTML = 'Offline'
      }

      function firstChatWindowDisplayMessage (message) {
        element('#first-chat-window-messages').innerHTML += `<li><strong>${message.nickname}: </strong>${message.text}</li>`
      }

      // Handle message sending.
      element('#first-chat-window-message-form').addEventListener('submit', event => {
        // Prevent the form from being submitted.
        event.preventDefault()

        // Get the nickname and text.
        const nickname = element('#first-chat-window-nickname').value
        const text = element('#first-chat-window-message').value

        // Clear the message
        element('#first-chat-window-message').value = ''

        // Create a message object, serialise it as JSON, and send it.
        const message = { nickname, text }
        firstChatWindowSocket.send(JSON.stringify(message))

        // Update the local display
        firstChatWindowDisplayMessage(message)
      })

      // Handle incoming messages.
      firstChatWindowSocket.onmessage = message => {
        // Deserialise the message string.
        message = JSON.parse(message.data)

        // Display the message in the messages list.
        firstChatWindowDisplayMessage(message)
      }
    </script>
    {{< /browser >}}
    </div>

    <!-- Second chat window -->

    <div id='second-chat-window'>
    {{< browser location="https://localhost" caption="Second chat window.">}}
    <div class='chat-interface'>
      <h1>Chat room</h1>
      <p>Status: <span id='second-chat-window-status' style="color: red;">Offline</span></p>
      <!-- Note: added code to prevent send button from reloading the tutorial -->
      <form id='second-chat-window-message-form' onsubmit='return false'>
        <label for='second-chat-window-message'>Nickname:</label>
        <input id='second-chat-window-nickname' type='text' name='nickname' value='Anonymous'>
        <label for='second-chat-window-message'>Message:</label>
        <input id='second-chat-window-message' type='text' name='message' value=''>
        <button id='second-chat-window-submit-button' type='submit'>Send</button>
      </form>
      <h2>Messages</h2>
      <ul id='second-chat-window-messages'></ul>
    </div>
    <script>
      // Initialise web socket.
      const secondChatWindowSocket = new WebSocket(
        `wss://${window.location.hostname}/chat`
      )

      // Display the state of the connection.
      secondChatWindowSocket.onopen = _ => {
        element('#second-chat-window-status').innerHTML = '<span style="color: green">Online</span>'
      }

      secondChatWindowSocket.onclose = _ => {
        element('#second-chat-window-status').innerHTML = 'Offline'
      }

      function secondChatWindowDisplayMessage (message) {
        element('#second-chat-window-messages').innerHTML += `<li><strong>${message.nickname}: </strong>${message.text}</li>`
      }

      // Handle message sending.
      element('#second-chat-window-message-form').addEventListener('submit', event => {
        // Prevent the form from being submitted.
        event.preventDefault()

        // Get the nickname and text.
        const nickname = element('#second-chat-window-nickname').value
        const text = element('#second-chat-window-message').value

        // Clear the message
        element('#second-chat-window-message').value = ''

        // Create a message object, serialise it as JSON, and send it.
        const message = { nickname, text }
        secondChatWindowSocket.send(JSON.stringify(message))

        // Update the local display
        secondChatWindowDisplayMessage(message)
      })

      // Handle incoming messages.
      secondChatWindowSocket.onmessage = message => {
        // Deserialise the message string.
        message = JSON.parse(message.data)

        // Display the message in the messages list.
        secondChatWindowDisplayMessage(message)
      }
    </script>
    {{< /browser >}}
    </div>

  8. ## Spit and shine

    So our chat room works but it’s not as elegant as it could be. Without going overboard (this is a basic tutorial, after all), there are a couple of little touches we can add that would improve its usability considerably.

    ### Set initial focus (“don’t make me click”)

    To start, when the app first loads, the first thing the person will most likely want to do is replace _Anonymous_ with their own nickname. So let’s make it easier for them by focusing that field and selecting the text in it so all they have to do to get started is to start typing their nickname.

    Right after the definition of the `displayMessage()` function, add the following code:

    ```js
      element('#nickname').focus()
      element('#nickname').select()
    ```

    ### Manage focus

    While on the topic of focus, if the person types a message and presses <keyb>Return</keyb> to send it, the message text field maintains its focus. This is good as it means that they can send another message without doing any more work. However, if they use the _Send_ button to send the message, the message text field loses focus. So it’s up to us to set its focus manually.

    Under the `element('#message').value = ''` line in the form `submit` event handler, let’s set the focus after we’ve cleared the field:

    ```js
    element('#message').focus()
    ```

    ### Validation (you’re beautiful)

    Things are feeling a bit nicer now but the elephant in the room (hi, George!) is that we’re not performing any validation whatsoever yet. Someone could easily submit a message with no nickname and no message text and we would dutifully fan it out to the other people in the room who would most likely be quite confused.

    Let’s fix that by adding a `validateForm()` function we can call to ensure that the form is valid. If it’s not valid, we will disable the _Send_ button:

    ```js
      // Disables the submit button if the form isn’t valid.
      function validateForm () {
        const nicknameIsValid = element('#nickname').value !== ''
        const messageIsValid = element('#message').value !== ''

        const formIsValid = nicknameIsValid && messageIsValid

        element('#submit-button').disabled = !formIsValid
      }
    ```

    Now, we need to call our `validateForm()` function at certain times. First, we must call it when the page first loads so that the form is initially validated. Since there is no text in the message field, our interface will thus start out with the _Send_ button disabled. This is what we want.

    Next, we should validate the form after a message is sent. Why? Because we clear the old message field and so we want the _Send_ button to be disabled again.

    Finally, we must validate the form every time the text in the `nickname` and `message` text fields changes so that we can enable the _Send_ button when there’s text in both of them:

    ```js
    element('#nickname').addEventListener('input', validateForm)
    element('#message').addEventListener('input', validateForm)
    ```

    This is the bare minimum of validation that we can get away with. Here’s the final listing of the front-end code with the above improvements highlighted:

    <style>
      .final-code-listing code {
        font-size: 0.85em;
      }

      div.highlight > pre {
        margin-bottom: 0;
        margin-top: 0;
      }

      div.emphasised > div.highlight > pre {
        border: 2px solid slategray;
        background-color: lightblue !important;
      }
    </style>

    <div class='final-code-listing'>
    {{< highlight html>}}<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic chat app with Site.js</title>
  <style>
    form {
      background: #eee;
      display: grid;
      grid-template-columns: [labels] auto [controls] 1fr;
      grid-gap: 0.5em;
      min-width: 100px;
      max-width: 400px;
      padding: 0.75em;
    }
    form > label { grid-column: labels; }
    form > input, form > button {
      grid-column: controls;
      min-width: 6em;
      padding: 0.5em;
    }
    </style>
  </head>
  <body>
    <h1>Chat room</h1>
    <p>Status: <span id='status' style="color: red;">Offline</span></p>
    <form id='message-form'>
      <label for='message'>Nickname:</label>
      <input id='nickname' name='nickname' value='Anonymous'>
      <label for='message'>Message:</label>
      <input id='message' name='message' value=''>
      <button id='submit-button' type='submit'>Send</button>
    </form>
    <h2>Messages</h2>
    <ul id='messages'></ul>
    <script>
{{</ highlight >}}{{< highlight js >}}
      // Shorthand for basic DOM lookup via CSS selectors.
      const element = document.querySelector.bind(document)

      // Helper: display a message object.
      function displayMessage (message) {
        element('#messages').innerHTML += `<li><strong>${message.nickname}: </strong>${message.text}</li>`
      }
{{</ highlight >}}<div class='emphasised'>{{< highlight js >}}
      // Disables the submit button if the form isn’t valid.
      function validateForm () {
        const nicknameIsValid = element('#nickname').value !== ''
        const messageIsValid = element('#message').value !== ''

        const formIsValid = nicknameIsValid && messageIsValid

        element('#submit-button').disabled = !formIsValid
      }
{{</ highlight >}}</div>{{< highlight js >}}
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
{{</ highlight >}}<div class='emphasised'>{{< highlight js >}}
      // Validate the form whenever the nickname or message changes.
      element('#nickname').addEventListener('input', validateForm)
      element('#message').addEventListener('input', validateForm)

      // Set initial focus and selection.
      element('#nickname').focus()
      element('#nickname').select()

      // Validate the form when the app first loads.
      validateForm()
{{</ highlight >}}</div>{{< highlight js >}}

      // Handle message sending.
      element('#message-form').addEventListener('submit', event => {
        // Prevent the form from being submitted.
        event.preventDefault()

        // Get the nickname and text.
        const nickname = element('#nickname').value
        const text = element('#message').value

        // Clear the message text field.
        element('#message').value = ''

{{</ highlight >}}<div class='emphasised'>{{< highlight js >}}
        // Focus the message text field.
        element('#message').focus()

        // Validate the form.
        validateForm()
{{</ highlight >}}</div>{{< highlight js >}}

        // Create a message object, serialise it as JSON & send it.
        const message = { nickname, text }
        socket.send(JSON.stringify(message))

        // Update the local display
        displayMessage(message)
      })

      // Handle incoming messages.
      socket.onmessage = message => {
        // Deserialise the message string and display it.
        message = JSON.parse(message.data)
        displayMessage(message)
      }
{{</ highlight >}}{{< highlight html >}}
    </script>
  </body>
</html>{{</ highlight >}}
</div>

    ### Back-end validation

    We just implemented front-end validation but that’s only half the story.

    In a perfect world, everyone will use our lovely web page front-end and our front-end validation will catch all the issues, and no one will ever hit our back-end directly.

    In the real world, behold aghast as I fire up a browser and send you an empty message from within the JavaScript console of my browser and your chat server dutifully delivers it to everyone in the room:

    ```js
    // All your front-end validation are belong to us.
    socket = new WebSocket('wss://ar.al/chat')
    socket.send(JSON.stringify({nickname: '', message: ''}))
    ```

    Front-end validation is a usability feature; back-end validation is a security feature.

    While there’s much we would have to implement in a real-world chat app (like rate limiting, blacklists, etc.), let’s at least add server-side validation to our basic example to prevent messages with missing nicknames and message text from being broadscast to everyone in the room.

    Here’s the final listing of the chat server, with this new feature highlighted:

    <div class='final-code-listing'>
    {{< highlight js >}}
module.exports = function (client, request) {
  // New client connection: persist client’s “room”
  // based on request path.
  client.room = this.setRoom(request)

  // Log the connection.
  console.log(`New client connected to ${client.room}`)

  client.on('message', message => {
{{</ highlight >}}<div class='emphasised'>{{< highlight js >}}
    // Perform some basic validation.
    if (message.nickname === '' || message.text === '') {
      console.log(`Missing nickname or message; not broadcasting.`)
      return
    }
{{</ highlight >}}</div>{{< highlight js >}}

    // New message received: broadcast it to all
    // other clients in the same room.
    const numberOfRecipients = this.broadcast(client, message)

    // Log the number of recipients message was sent to
    // and make sure we pluralise the log message properly.
    console.log(`${client.room} message broadcast to `
      + `${numberOfRecipients} recipient`
      + `${numberOfRecipients === 1 ? '' : 's'}`)
  })
}{{</ highlight >}}
    </div>

  9. ## Going further

    Well, you were promised a basic chat app in Site.js and that’s exactly what we’ve just built. Along the way, you also learned the basics of Site.js and how to use it to develop and serve not just [WebSocket routes](https://source.ind.ie/site.js/app/blob/master/README.md#websocket-wss-routes) but [regular HTTPS routes](https://source.ind.ie/site.js/app/blob/master/README.md#get-only-simplest-approach) also using [DotJS](https://source.ind.ie/site.js/app/blob/master/README.md#dotjs).

    But that’s just the tip of the iceberg when it comes to what you can do with Site.js. As I mentioned during the tutorial, anything you can do with Node.js, you can do with Site.js. What you get in addition is a zero-configuration secure static and dynamic web server.

    So exactly what else can you do? Here are some ideas to explore on your own:

    ### Test your app from any device

    So far, you’ve only run servers at `https://localhost` and, behind the scenes, Site.js ensured that you didn’t get certificate warnings when you did. But what if you want to test your chat app from your phone or to have others test it with you? You could, of course, deploy it to a public Virtual Private Server, which is the topic of [the next section](#deploy-to-production), but you can also run your server at your hostname using [the @hostname option](https://source.ind.ie/site.js/app/blob/master/README.md#testing-servers-hostname)[^9] and provide outside access to your development machine using a tool like [ngrok](https://ngrok.com/):

    ```shell
    # Start Site.js at your hostname instead of at localhost.
    site @hostname

    # (In a separate terminal tab/window, start ngrok)
    ngrok start --all
    ```

    Having done this, you can then hit `https://dev.my-domain.org` from any device anywhere and access your site from your development machine[^10]. And, again, Site.js will work to seamless provision Let’s Encrypt certificates for you so you will not get any certificate errors.

    ### Deploy to production

    All you need to deploy to production is a Virtual Private Server running a flavour of Linux that has systemd and has a domain name pointing to it.

    Once that’s set, if you ssh to your production server, you can install Site.js just like you did at the start of this tutorial and then, provided you’re in the directory that you want to serve, deploy a production server with the following command:

    ```shell
    site enable
    ```

    That will set up your server as a service that automatically restarts should it crash or should you reboot the server.

    And, just like before, Site.js will automatically provision your Let’s Encrypt certificates the first time you hit your site via your domain name. All you have to do ensure is that your `hostname` is set properly on your server.

    ### Sync

    So you have (A) your local copy of your site and you’ve deployed (b) a live production server. How do you get your site from A to B?

    Simple!

    On Linux and macOS[^11], you can use Site.js’s `sync-to` command to deploy your site like so:

    ```shell
    site --sync-to=my-domain.org
    ```

    The above command will work with no other information necessary if the account name on your development machine and on your production machine is the same and you’re in your site’s directory. Otherwise, check the docs for on how to specify any details you need to.

    On your production server, to ensure that it supports sync, it’s a good idea to launch your server with the `--ensure-can-sync` option, which will install rsync on your production machine for you in case it doesn’t already exist.

    ### And there’s more…

    Check out [the Site.js documentation](https://source.ind.ie/site.js/app/blob/master/README.md) for some of the other nifty things you can do with Site.js like not breaking links and contributing to an [evergreen web](https://source.ind.ie/site.js/app/blob/master/README.md#native-support-for-an-evergreen-web) by taking advantage of Site.js’s native support for [cascading archives](https://source.ind.ie/site.js/app/blob/master/README.md#native-cascading-archives-support) and the [404-to-302 method](https://source.ind.ie/site.js/app/blob/master/README.md#native-404-302-support) as well as little niceties like [custom error pages](https://source.ind.ie/site.js/app/blob/master/README.md#custom-error-pages).

I hope this tutorial has whet your appetite for Site.js and given you some ideas of what you can do with it.

## Site.js and the single-tenant web

Remember that Site.js is a web tool for human beings, not startups or enterprises.

Site.js is for building single-tenant web sites and web apps.

### What is a single-tenant web app (or site?)

A single-tenant web app is a personal web app. It’s an app (or site) that you own and control. It’s a step towards building [a peer web](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/).

That’s quite a radical concept for the web, which has so far been centralised.

We’re used to sites where you sign up for accounts with huge corporations. Turns out, when we do that, these corporations end up owning those accounts and they end up tracking and profiling us and attempting to influence our behaviour to make a quick buck (or billion).

When we consider the social impacts of this toxic business model, we find that they erode our personhood and threaten our democracies. (Wow, that escalated quickly!)

### Flipping the web upside down

If we want ownership and control of the digital aspects of our selves which, today, constitute part of who we are as modern human beings, we have to turn the web on its head. We have to flip it upside down.

Ultimately, we need to build a web where every one of us has their own place. That’s exactly [what we’re working towards](https://small-tech.org/research-and-development/) at [Small Technology Foundation](https://small-tech.org) and Site.js is the foundation of our efforts.

I hope you find Site.js useful – even if you don’t care about its philosophical or ethical underpinnings – simply on the merits of what you, as a developer, can do with it and how easy it is to use.

### Comments, questions? Yes, please!

If you have any questions about this tutorial or Site.js in general, please feel free to contact me [via my mastodon](https://mastodon.ar.al/@aral) or by [email](mailto:mail@ar.al).

{{< like_this_fund_us >}}

<!-- Footnotes -->

[^1]: If you don’t want to use the terminal, you can open up your graphical file browser and create the `demo` folder using that and then use your graphical code editor to create an `index.html` file in that folder. You will, however, need to run the `site` command from a terminal session with its current working directory set to the `demo` folder… there’s no getting away from that.

[^2]: Site.js can also function as a proxy server, so you can test _any_ server locally over a secure connection. For example, if you are running a [Hugo](https://hugo.io) server at its default port (1313), you can test it from `https://localhost` by running Site.js like this:

    ```shell
    # Proxy the server at port 1313 at
    # https://localhost (port 443).
    site :1313
    ```

    Note that if you want live reload to work, you should add the `--liveReloadPort=443` option to your Hugo server command.

[^3]: If you want full control over your routing, including the ability to use regular expressions in your route names and accessing global state, etc., you can do everything you can in Express using the [advanced routing](https://source.ind.ie/site.js/app/blob/master/README.md#advanced-routing-routesjs-file) feature by declaring a `routes.js` file in your `.dynamic` fodler.

[^4]: Note that the URL scheme is no longer `https` but `wss` since we’re talking about secure WebSocket routes now. If I had a penny for every time I wrote `https://` when I meant to write `wss://`…

[^5]: You might have noticed that we use an anonymous function expression in the `module.exports` line whereas we used an arrow function expression in the previous (HTTPS) examples and even though we use an arrow function expression to define the event handler. This is not by accident; it has to do with scope. If you want to have access to the `this` reference in your DotJS routes and access methods like `broadcast()`, you cannot use an arrow function expression to define your module, you must use the `function` keyword. Inside of your module, you are free to use arrow function expressions to your heart’s desire.

[^6]: You can easily [replace the default error pages with your own custom ones](https://source.ind.ie/site.js/app/blob/master/README.md#custom-error-pages). And as far as 404 errors go, you can reduce the number of them on the web in general and contribute towards [an evergreen web](https://source.ind.ie/site.js/app/blob/master/README.md#native-support-for-an-evergreen-web) by making use of the native [cascading archives](https://source.ind.ie/site.js/app/blob/master/README.md#native-cascading-archives-support) and [404-to-302](https://source.ind.ie/site.js/app/blob/master/README.md#native-404-302-support) support in Site.js.

[^7]: Site.js does not have LiveReload and does not automatically restart the server when dynamic routes change at the moment. When working with static content, this means that you have to manually refresh the browser and when working with dynamic content you have to manually restart the server whenever you make code changes. I realise this is less than ideal and both of these are high on [my list of issues](https://source.ind.ie/site.js/app/issues) to address.

[^8]: The examples on this page are live and connect to the instance of the finished app I have running at https://ar.al/chat. Needless to say, this site is served by Site.js.

[^9]: On Windows (because Windows), you have to add quotes around the `@hostname` option, so the command becomes `site "@hostname"`. Blame Bill Gates.

[^10]: To use ngrok with your own domain name, you will to subscribe for [a Pro account](https://ngrok.com/pricing) from ngrok (at least this is what Laura and I use at [Small Technology Foundation](https://small-tech.org)) and [set up a subdomain on your own domain name per their instructions](https://ngrok.com/docs#http-custom-domains).

[^11]: On Windows (because Windows), the sync function is not available as there’s currently no free and open rsync implementation that we can use like we can on Linux and macOS.

