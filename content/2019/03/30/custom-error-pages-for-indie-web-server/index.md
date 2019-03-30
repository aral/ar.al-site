---
title: "Custom error pages for Indie Web Server"
date: 2019-03-30T20:12:45Z
draft: false
---

{{<figure src="custom-404.png" alt="A green monster, deep in thought. The text reads: “Hmm… Sorry, I can’t find /that-which-cannot-be-found" caption="A custom 404 message.">}}

I just released [Indie Web Server](/2019/03/14/introducing-indie-web-server-video/) version 6.3.0 with nicer default 404 and 500 error pages and support for custom ones.

{{<figure src="custom-500.png" alt="A pink monster with tears welling up in its eyes. The text reads: “Sniff… There was a server error: Bad things have happened." caption="A custom 500 message. Poor little baby monster is really taking it badly.">}}

To create a custom error page for your static site, just create a folder at `/404` or `/500` in your web content and add, at a minimum, an `index.html` file in it.

Any assets you put in those folders can be addressed using standard relative links from the `index.html` file.

Your error pages will be served at the URL of the error itself and using the correct error codes (not, for example, using redirects).

{{<figure src="default-404.png" alt="The default 404 page. Reads: 4🤭4 Could not find /that-which-cannot-be-found" caption="The default 404 page.">}}

I also added a tiny bit of life to the default error pages.

{{<figure src="default-500.png" alt="The default 500 page. Reads: 5🔥😱 Internal Server Error: Bad things have happened." caption="The default 500 page showing the test page at /test-500-error">}}

Enjoy! :)
