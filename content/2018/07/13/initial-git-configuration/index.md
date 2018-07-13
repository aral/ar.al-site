---
title: "Initial Git Configuration"
date: 2018-07-13T20:00:22+01:00
draft: true
---

I'm setting up my new XPS 13 running [Pop!_OS](https://system76.com/pop) and one of the things I keep having to do on any new Linux installation is to do the initial git configuration.

So both for my own reference and in case it helps anyone else, a list of things I do when setting up git:

### Set up my identity (used in commits)

{{< highlight bash >}}
git config --global user.name "Aral Balkan"
git config --global user.email mail@ar.al
{{< /highlight >}}

### Disable paging

Set `cat` as the pager so that git commands do not use paging (I'd much rather scroll than switch modes.)

{{< highlight bash>}}
git config --global core.pager cat
{{< /highlight >}}
In addition, if you want to sign your work ([you should sign your work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) - it's about security, not vanity), you can either [generate GPG keys](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) or, if you already have a set, [import it](https://www.debuntu.org/how-to-importexport-gpg-key-pair/).

### References

  * [To get rid of pager for all commands for all repositories](https://stackoverflow.com/a/6986231)
