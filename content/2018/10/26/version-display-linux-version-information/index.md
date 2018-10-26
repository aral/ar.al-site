---
title: "version: display Linux version information"
date: 2018-10-26T12:55:59+01:00
draft: false
---

{{<figure src="version.png" alt="Screenshot of my simple version script running in Terminal. The information displayed is recreated at the end of this post." caption="The dark art of displaying Linux version information.">}}

One thing I find myself always having to look up is how to display version information in Linux. That’s because the commands for displaying version information are in no way intuitive or memorable.

Specifically, if you want to display information about your distribution, including its version, you have to use the `lsb_release` command[^1]. And to see the Linux kernel version, you have to remember to enter `uname -r`.

Why? Because fuck you, that’s why.

I guess it was just too damn hard to create a version command or script. Thankfully, using my uber niche koding skillz, I was able to come up with one after literally seconds of hard work:

1. Create the following script in your text editor of choice and save it in a file called _version_ somewhere that’s on your system’s execution path (I put it in `/usr/local/bin`):

    {{<highlight bash>}}#!/bin/sh

echo "\nOperating system:\n"
lsb_release -i
lsb_release -d
lsb_release -r
lsb_release -c

echo "\nLinux kernel:\n"
uname -r

echo ""{{</highlight>}}

2. Make the script executable:

    {{<highlight bash>}}
sudo chmod +x /usr/local/bin/version{{</highlight>}}

3. In Terminal, run `version`.

You should see output similar to the following that displays information about your distribution and kernel versions:

{{<highlight bash>}}
Operating system:

Distributor ID:	Ubuntu
Description:	Pop!_OS 18.10
Release:	18.10
Codename:	cosmic

Linux kernel:

4.18.0-10-generic
{{</highlight>}}

[^1]: LSB stands for ‘Linux Standard Base’. Don’t you feel smarter now?