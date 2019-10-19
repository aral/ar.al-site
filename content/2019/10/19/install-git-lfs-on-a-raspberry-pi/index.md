---
title: "Install git-lfs on a Raspberry Pi"
date: 2019-10-19T16:31:38+01:00
draft: false
---

## What is git-lfs?

[Git Large File Storage](https://git-lfs.github.com/) is “an open source Git extension for versioning large files.” I use it on a number of [our git repositories](https://source.ind.ie) at [Small Technology Foundation](https://small-tech.org), including for the [Site.js web site](https://sitejs.org).

## Why Pi?

As I announced yesterday, since [version 12.8.0 of Site.js](/2019/10/18/site.js-and-pi/) with Raspberry Pi support, I’ve started building Site.js on my Raspberry Pi 3B+. And it works perfectly, except for one thing: I can’t check the release binaries in without LFS and installing git-lfs on a Raspberry Pi wasn’t entirely straightforward.

## How-to

Here’s how you can install git-lfs on your Raspberry Pi:

```sh
# Download the latest armv6l version of go (as of this writing, 1.13.3)
# You can check for the latest version here: https://golang.org/dl/
wget https://dl.google.com/go/go1.13.3.linux-armv6l.tar.gz

# Unarchive it.
sudo tar -C /usr/local -xzf go1.13.3.linux-armv6l.tar.gz

# Add the binary path to your system path.
# (Add this to your .bashrc or .zshrc if you want to persist it across reboots.)
export PATH=$PATH:/usr/local/go/bin

# Create and export your go path.
# (Again, add it to your shell configuration file if you want to persist it.)
mkdir ~/go
export GOPATH=~/go

# Download and compile git-lfs.
go get github.com/github/git-lfs

# Add the compiled binary to your path.
sudo cp ~/go/bin/git-lfs /usr/local/bin/
```

## Test it out!

You should now be able to use git-lfs as usual. To test it out, `cd` into the working copy of the project you want to use git-lfs on and enter the following command:

```sh
git lfs install
```

If all goes well, you should see output resembling the following:

```sh
Updated git hooks.
Git LFS initialized.
```

## Acknowledgements

Gist: [Install Golang 1.8 on Raspberry Pi](https://gist.github.com/marcelitocs/19bdfd22befecbe0d3eef3271260e528).
