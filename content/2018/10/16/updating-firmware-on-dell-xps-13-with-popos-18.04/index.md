---
title: "Updating firmware on Dell XPS 13 With Pop!_OS 18.04"
date: 2018-10-16T22:59:30+01:00
draft: false
---

Firmware upgrades were failing for me on my Dell XPS 13. Running `sudo fwupdmgr update` would give me the following error:

{{<highlight bash>}}
UEFI firmware update failed: {error #0} libfwup.c:1501 get_fd_and_media_path(): failed to make /boot/efi/EFI/ubuntu/fw: No such file or directory
{{</highlight>}}

A little online research led to me to a page on [Debugging UEFI Capsule updates](https://github.com/rhboot/fwupdate/wiki/Debugging-UEFI-Capsule-updates), which in turn suggested that I try the latest _fwupdate_ from master. My inability to RTFM[^1] (coupled with being spoiled by package managers because it’s 2018), led me to open [an issue on the fwpdate issue tracker](https://github.com/rhboot/fwupdate/issues/123) when compilation failed.

Thankfully, I also wrote [a comment](https://github.com/rhboot/fwupdate/issues/123#issuecomment-430410732) explaining the core problem I was trying to solve and the author, [Mario Limonciello](https://github.com/superm1), responded immediately with a solution: [don’t use fwupdate, install fwupd via snap instead](https://github.com/rhboot/fwupdate/issues/123#issuecomment-430411563). (Thank you, Mario!)

That worked a charm and I am now running on the latest firmware.

I’m reproducing his instructions, below:

{{<highlight bash>}}
sudo apt purge fwupd
sudo snap install --candidate --classic fwupd
fwupdmgr refresh
fwupdmgr update
{{</highlight>}}

[^1]: [Read The Fucking Manual](https://en.wikipedia.org/wiki/RTFM)