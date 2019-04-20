---
title: "Indie Web Server 8.2.0: Cascading archives for an evergreen web"
date: 2019-04-20T16:52:58+01:00
draft: false
---

{{<figure src="evergreen-web.jpeg" alt="Terminal screenshot showing Indie Web Server serving an archive using the new cascading archives feature." caption="Cascading archives for an evergreen web.">}}

I just released version 8.2.0 of [Indie Web Server](https://ind.ie/web-server). This version brings with it the cascading archives features that will make it easier than ever for you to support an evergreen web and not break existing links as you evolve your sites.

Indie Web Server already had native support for [the 404 → 302 technique](https://4042302.org) where you convert 404s into 302 redirects to earlier versions of your site, thereby preserving those links. However, that does require that you keep the older version of your site online separately. If the older version of your site is a dynamic one, that makes sense. But what if it is a static site or what if you can take a static backup of it? It would be so much simpler if Indie Web Server could serve that static archive for you automatically as a fallback if a path cannot be found on the latest version of your site.

This is exactly what the new cascading archives feature does.

And, just like everything else with Indie Web Server, it requires zero configuration, relying instead on a naming convention.

## How it works

Let’s say you are serving your site from the `my-site` folder.

To use the cascading archives feature, just put the archive of your site into a folder named `my-site-archive-1` so that the directory tree looks like this:

{{<highlight shell>}}
|- my-site
|- my-site-archive-1
{{</highlight>}}

That’s it!

If a path cannot be found in `my-site`, it will be served from `my-site-archive-1`.

You’re not limited to a single archive either (and hence the “cascading” bit in the name of the feature). As you have multiple older versions of your site, just add them to new folders and increment the archive index in the name. e.g., `my-site-archive-2`, `my-site-archive-3`, etc.

Paths in `my-site` will override those in `my-site-archive-3` and those in `my-site-archive-3` will, similarly, override those in `my-site-archive-2` and so on.

Your old links will never die but if you do replace them with never content in never versions, those will take precedence.

I hope you enjoy the new cascading archives feature of Indie Web Server and I hope it makes it easier and more economical for you to contribute to an evergreen web where we try not to break links unless we absolutely have to.