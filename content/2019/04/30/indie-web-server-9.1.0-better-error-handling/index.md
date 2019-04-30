---
title: "Indie Web Server 9.1.0: Better error handling"
date: 2019-04-30T13:16:29+02:00
draft: false
---

[Indie Web Server](https://ind.ie/web-server) version 9.1.0 is a minor release that handles the following two, related (and common), errors more gracefully:

  1. __Trying to enable a web server daemon when one is already enabled__

      Previously, this would succeed even though the earlier server would continue to be served. Now, it gives an error and instructs you to disable the existing server.

  2. __Trying to enable a web server daemon when some other service was using port 443__

      Previously, this would succeed but your server would only start running once (and if) the service blocking port 443 exited. Now, it gives an error and exits.

  3. __Trying to start a regular web server process when some other service is using port 443__

      Previously, this would fail but show a stack trace. Now, it shows a friendly error and no longer shows the stack trace.