---
title: "Override BaseURL in Hugo Server"
date: 2018-06-20T15:33:28+02:00
---

[Hugo](https://gohugo.io) has a `baseURL` setting in its configuration file (_config.toml_) that is used when creating absolute URLs. Sadly, [this setting is ignored](https://github.com/gohugoio/hugo/issues/1046) if you’re running Hugo with:

{{< highlight bash >}}
hugo server
{{< /highlight >}}

I use relative URLs in all of my posts and templates but I got bitten by this with the generated [RSS feed](index.xml). All the URLs were being written with _localhost:1313_ prefixes.

To work around this issue, start Hugo using the `--baseURL` and `--appendPort` flags to override the default settings. e.g. I start a live session on this blog with:

{{< highlight bash >}}
hugo server -D --renderToDisk --baseURL=https://ar.al --appendPort=false
{{< /highlight >}}
