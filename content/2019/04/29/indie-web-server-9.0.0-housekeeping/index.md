---
title: "Indie Web Server 9.0.0: Housekeeping"
date: 2019-04-29T19:59:24+02:00
draft: false
---

I just released [Indie Web Server](https://ind.ie/web-server) version 9.0.0.

This is mostly a housekeeping release and nearly all the changes are under the hood.

## Maintainability

I refactored the command-line application quite extensively to pull out all the commands into their own modules and remove any redundancy in the command-line argument parsing.

The whole thing is far more robust now and ready for the two new features I’ve been itching to add.

## Breaking changes

There is a major version bump, however, and that’s due to two reasons:

1. __The syntax of the local proxy option has changed.__

    You now have to specify the `proxy` command explicitly (providing a URL instead of a path is no longer automatically interpreted as a request to create a proxy server):

    {{<highlight shell>}}web-server proxy http://localhost:1313{{</highlight>}}

    This is to ensure that there is no ambiguity when I implement one the new features I’m planning that will also take a URL as its argument.

2. __I’ve dropped Windows support.__

    Indie Web Server should continue to work under Node.js in Windows but it will no longer be supported and could break in the future.

    If you want to use Indie Web Server on Windows, I highly recommend that you use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to do so (with, for example, [Ubuntu](https://www.microsoft.com/en-ie/p/ubuntu/9nblggh4msv6?rtc=1)).

Now that the codebase is much more maintainable, I look forward to implementing two new features in the coming days. I’ll announce them once they’re ready.
