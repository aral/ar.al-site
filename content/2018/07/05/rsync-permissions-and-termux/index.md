---
title: "Rsync Permissions and Termux"
date: 2018-07-05T18:08:48Z
---

The way my blogging setup works in live mode is that I have a [watcher](https://source.ind.ie/ar.al/sync) that uses rsync to deploy changes to my server.


The first time I started live mode while blogging on my phone, I ended up with a 403 Forbidden error on my site.

Connecting to the server via `ssh`, a quick `ls -la` on the web root[^1] showed me that the permissions were more restrictive than they should have been. The immediate fix was easy:

{{< highlight bash >}}
chmod -R 755 <web root>
{{< /highlight >}}

However, the problem would resurface the next time rsync ran from my phone. So I looked at the permissions for the local folder on my phone and saw that they matched the restrictive ones on the server. Thinking that the permissions were simply getting copied over, I tried setting the local folder’s permissions to 755 and trying rsync again. No go. The permissions reset again to the restrictive ones.

What did end up working was to add the `--chmod=755` flag to the rsync command (I was already passing the `--archive` flag, which includes the `--perm` flag, without which this might not have worked.

Since this isn’t an issue when running rsync from my Mac, I’m assuming it’s an oddity related to how Termux manages directory permissions.

[^1]: If you forget where you set your web root to under nginx, as I sometimes do, look for it in your server definition in the relevant server configuration file that’s symlinked from _/etc/nginx/sites-available_.