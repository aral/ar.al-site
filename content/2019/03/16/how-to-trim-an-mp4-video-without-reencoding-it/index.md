---
title: "How to trim an MP4 video without re-encoding it"
date: 2019-03-16T14:36:02Z
draft: false
---

You have an MP4 file and all you need to do is trim a few seconds off from either the start or the end (or both). And you don’t want to spend time cutting it in a non-linear editor and re-exporting it and waiting for it to encode again.

If you do not need frame-level precision[^1], there is a near-instant way you can do it using ffmpeg[^2].

For example, I trimmed the last few seconds off [my previous video](/2019/03/16/open-broadcaster-software-studio-is-amazing/) – which I’d saved as _obs-demo.mp4_ ­– using the following command to take everything from the very beginning until the 2 minute 13 second mark and to create a new file called _obs-demo-trimmed.mp4_ with it:

{{<highlight sh>}}
ffmpeg -ss 00:00:00 -i obs-demo.mp4 -to 00:02:13 -c copy obs-demo-trimmed.mp4
{{</highlight>}}

Hope this saves you some time.

## Source

  * [George Chalhoub](https://blog.georgechalhoub.com/2017/03/trimming-videos-via-ffmpeg.html) via [StackOverflow](https://stackoverflow.com/a/42827058).

[^1]: This technique has keyframe-level precision.

[^2]: If you don’t have it, you can install it on Debian-esque systems with:

    {{<highlight sh>}}sudo apt install ffmpeg{{</highlight>}}
