---
title: "Formatting an ISO 8601 date stamp in Hugo"
date: 2018-06-17T09:14:55+01:00
---

[Hugo](https://gohugo.io) has a plethora of functions that you can use in your [templates](https://gohugo.io/templates/introduction/), including one for formatting dates called [dateFormat](https://gohugo.io/functions/dateformat/).

The [index](/) of this blog has a list of the posts in chronological order and uses a [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) tag. I wanted to include the machine-readable `datetime` attribute but the standard serialisation of Hugo’s [`.Date`](https://gohugo.io/variables/page/#page-variables) property doesn’t return an ISO 8601 timestamp. This led me to look up [the esoteric syntax of Hugo’s dateFormat function](https://gohugohq.com/howto/hugo-dateformat/) and use the following format string to create an ISO 8601 string:

{{< highlight go >}}
{{ $post.Date.Format "2006-01-02T15:04:05Z0700" }}
{{< /highlight >}}

And here it is in use in the block that renders the posts for a given day ([full source](https://source.ind.ie/ar.al/site/blob/master/layouts/index.html)):

{{< highlight html >}}
<ul> 
  {{ range $index, $post := .Pages }}
    <li>
      <time datetime="{{ $post.Date.Format "2006-01-02T15:04:05Z0700" }}">
        <span class='postdate day item-{{ $index }}'>{{ $post.Date.Format "Mon" }}</span>
      </time>
      <span class='postdate'>{{ $post.Date.Format "15:04" }}</span>
      <a href="{{ .RelPermalink }}">{{ $post.Title }}</a>
    </li>
  {{ end }}
</ul>
{{< /highlight >}}
