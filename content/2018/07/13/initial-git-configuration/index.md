---
title: "Initial Git Configuration"
date: 2018-07-13T20:00:22+01:00
draft: true
---

I'm setting up my new XPS 13 running [Pop!_OS](https://system76.com/pop) and one of the things I always have to do on any new machine is to configure [git](https://git-scm.com/).

So, both for my own reference and in case it helps anyone else, here's a list of things I do to set up git:

### Set up my identity (used in commits, tags, etc.)

{{< highlight bash >}}
git config --global user.name "Aral Balkan"
git config --global user.email mail@ar.al
{{< /highlight >}}

### Set up automatic signing of my commits

I [sign my work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) and so should you (it's about security, not vanity).

1. Either [generate GPG keys](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) if you don't already have a pair or [export/import your existing GPG keys](https://www.debuntu.org/how-to-importexport-gpg-key-pair/).

2. Configure git to sign all your work:

  {{< highlight bash >}}
  git config --global commit.gpgsign true{{< /highlight >}}

You can check that it's working by making a commit and then viewing at it in the log with the `--show-signature` flag:

{{< highlight bash >}}
git log -1 --show-signature
{{< /highlight >}}

If you get a warning along the lines of _WARNING: This key is not certified with a trusted signature! There is no indication that the signature belongs to the owner_ after importing your GPG key to a new machine, do the following (substituting your email address for mine):

{{< highlight bash >}}
gpg --edit-key aral@ind.ie
{{< /highlight >}}

Then, in the gpg shell, use the `trust` command and select _5 = I trust ultimately_.

{{< figure src="gpg-edit-key-trust-5.png" alt="Screenshot of terminal showing the result of the commands issued in the instructions above." caption="If you don't trust yourself, who are you going to trust?" >}}

### Create ssh keys for the machine and import them into hosted git remotes like GitLab

In order to clone and push to git remotes using ssh, you have to create an ssh keypair and then upload it to your git remote (in my case, we use our own [GitLab](https://about.gitlab.com/) instance running on [source.ind.ie](https://source.ind.ie)).

1. Generate your ssh keys (substitute your email address for mine):

  {{< highlight bash>}}
  ssh-keygen -t rsa -C "aral@ind.ie" -b 4096{{< /highlight >}}

2. Copy it onto the system clipboard.

  {{< highlight bash>}}
  cat ~/.ssh/id_rsa.pub | pbcopy{{< /highlight >}}

  Note: On Linux, you can simulate the hugely useful pbcopy and pbpaste commands on macOS by adding the following to your _.zshrc_ or _.bashrc_ files:

  {{< highlight bash >}}
  alias pbcopy='xsel --clipboard --input'
  alias pbpaste='xsel --clipboard --output'{{< /highlight >}}

### Disable paging

Set `cat` as the pager so that git commands do not use paging (I'd much rather scroll than switch modes.)

{{< highlight bash>}}
git config --global core.pager cat
{{< /highlight >}}

That's all I can think off at the moment. If I notice that I've left anything off, I'll update the post accordingly.

If you have any initial configuration steps that you cannot live without, please [let me know on Mastodon](https://mastodon.ar.al).

### References

  * [Validating other keys on your public keyring](https://www.gnupg.org/gph/en/manual/x334.html)
  * [GitLab and SSH keys](https://docs.gitlab.com/ee/ssh/README.html#generating-a-new-ssh-key-pair)
  * [pbcopy and pbpaste for Linux](https://superuser.com/a/288333)
  * [To get rid of pager for all commands for all repositories](https://stackoverflow.com/a/6986231)
