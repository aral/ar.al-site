---
title: "Introducing Indie Web Server (video)"
date: 2019-03-14T18:29:11Z
draft: false
---

<figure>
    <video controls poster='https://i.vimeocdn.com/video/767083323.jpg?mw=2100&mh=1112&q=70'>
      <source src='https://player.vimeo.com/external/323840063.m3u8?s=28bf6d1780b9f0d4f8af15585b41b9020066b408' type='video/mp4'>
      <source src='https://player.vimeo.com/external/323840063.hd.mp4?s=0e03f3f4984322c0740ca461b837d30b0149e712&profile_id=169' type='video/mp4'>
    </video>
    <figcaption>Watch as I set up a secure development and production web server with a single command using Indie Web Server.</figcaption>
</figure>

I just recorded a short video demonstrating just how simple and seamless [Indie Web Server]() really is.

To install and run a secure local development web server and serve the current directory without certificate warnings:

{{<highlight sh>}}
npm i -g @ind.ie/web-server
web-server
{{</highlight>}}

To install and run a secure production web server and serve the current directory without certificate warnings, on the production machine (e.g., VPS server) that you have already pointed a domain name to, do:

{{<highlight sh>}}
npm i -g @ind.ie/web-server
web-server --global
{{</highlight>}}

Then hit your site at your domain name. The first time you hit the site, it will take a few seconds to load as Let’s Encrypt certificates are seamlessly provisioned for you and used. That’s it.

__Note:__ If you want to run your production server so that it restarts should it crash or should the computer restart,you should use a process manager like [pm2](http://pm2.keymetrics.io/). Using pm2, the number of commands you need to set up a fire and forget personal web server balloon to a whopping four:

{{<highlight sh>}}

# Install pm2.
npm i -g pm2

# Set pm2 to run itself and your servers at startup.
# (This will output a command and ask you to copy and paste it. Do that.)
pm2 startup

# Install Indie Web Server.
npm i -g @ind.ie/web-server

# Run Indie Web Server using pm2.
pm2 start web-server -- --global
{{</highlight>}}

That’s it! Now you have a production web server that will be restarted if it crashes and will be revived on server restarts.
