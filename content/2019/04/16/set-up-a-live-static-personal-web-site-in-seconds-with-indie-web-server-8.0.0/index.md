---
title: "Set up a live static personal web site in seconds with Indie Web Server 8.0.0"
date: 2019-04-16T20:20:20+01:00
draft: false
---

<figure>
    <video controls poster='https://i.vimeocdn.com/video/776052529.jpg?mw=1920&mh=1080&q=70'>
      <source src='https://player.vimeo.com/external/330849017.m3u8?s=984a660057188b8536a949e6665ffa1794bec54c' type='video/mp4'>
      <source src='https://player.vimeo.com/external/330849017.hd.mp4?s=e553455c7bedb6be3c714a826ff8d3070a953294&profile_id=175' type='video/mp4'>
    </video>
    <figcaption>Watch as I set up a secure static personal web site in seconds from installation to live.</figcaption>
</figure>

On April 1st (no joke), [Indie Web Server 7.1.0](/2019/04/01/indie-web-server-7.1.0-launch-a-live-secure-static-site-with-a-single-command/) introduced the ability to set up a live static web site in seconds on any server that had Node.js installed.

Two weeks of hitting my head on a wall and multiple rewrites later, [Indie Web Server](https://ind.ie/web-server) 8.0.0 now lets you do that _without Node.js_ thanks to native binaries for Linux.

You can now literally go from installing the server to serving a fire and forget secure personal web site in seconds:

{{<highlight shell>}}
# Make a web page
echo 'Hello, world.' > index.html

# Install Indie Web Server
wget -qO- https://ind.ie/web-server/install.sh | bash

# Start your secure web site
web-server enable
{{</highlight>}}

Version 8.0.0 also introduces native binaries for macOS although you can only run regular processes, not daemons on that platform. (Linux systems with systemd are currently the only ones supported for production use.) And those of you on Windows can still install Indie Web Server via npm and use it as a development server with locally-trusted certificates:

{{<highlight shell>}}
npm i -g @ind.ie/web-server
{{</highlight>}}

I hope Indie Web Server makes your life easier. It is just one of the earliest modules to come out of [the Hyhpa research and development project](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/). It’s what I’ll be using to power the untrusted web node in Hypha.

See the [Indie Web Server homepage](https://ind.ie/web-server) and [the source code repository and documentation](https://source.ind.ie/hypha/tools/web-server) for more details, including how you can use it as the basis of your own dynamic servers with Node.js.

As always, if you like and want to support the ongoing work of our tiny two-person not-for-profit, please [fund us](https://ind.ie/fund).