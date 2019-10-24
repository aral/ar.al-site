---
title: "Fixing read-only file system errors after do-release-upgrade from Ubuntu 14.04 LTS to 16.04 LTS"
date: 2019-10-24T12:04:36+01:00
draft: false
---

I upgraded an old server from Ubuntu 14.04 LTS to 16.04 LTS today and, when it restarted, I started getting “Read-only file system” errors on the root partition.

_Ouch!_

Here’s how I investigated and fixed the issue, including a list of the sites I found that helped me along the way.

## Am I out of disk space?

I wasn’t sure if perhaps the installation had failed and corrupted something because I was out of disk space. So first I checked for that and saw that it wasn’t the case:

```shell
► df

Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/vda1       61796348 44194416  14439820  76% /
```

## Is the disk OK?

Next, I used `fsck` to see if the partition was all right. It was (_phew_):

```shell
► sudo fsck /dev/vda1

fsck from util-linux 2.27.1
e2fsck 1.42.13 (17-May-2015)
DOROOT: clean, 289048/3932160 files, 11328157/15728640 blocks
```

## Is the mount properly configured?

Since the partition looked OK, I wanted to see if the configuration instructions for the disk were correct so I asked to see a listing of the relevant file:

```shell
► cat /etc/fstab
```

And _eureka_, it looks like the upgrade changed the configuration to use a UUID:

```shell
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/vda1 during installation
UUID=815063a9-c956-44a6-ab11-05e1d0bb3a58 /               ext4    errors=remount-ro 0       1
```

So the question was, of course, is the `UUID` correct? So I checked what the `UUID` of `/dev/vda1` was:

```shell
► ls -l /dev/disk/by-uuid/ | grep vda1
```

Which resulted in:

```shell
lrwxrwxrwx 1 root root 10 Oct 24 04:26 88f2ec31-89b7-4164-8fb8-c7736b549505 -> ../../vda1
```

So, there was our culprit. The `UUID`s did not match.

## Let’s fix it!

Since things were working previously with the disk specified as `/dev/vda1` instead of via `UUID`, I thought I’d just edit the `fstab` file and be done with it:

```shell
► sudo nano /etc/fstab
```

But not so fast:

```shell
Unable to create directory /root/.nano: Read-only file system
It is required for saving/loading search history or cursor positions.
```

__Doh!__ Of course, the whole issue is that the file system is read-only so how am I going to update the configuration file.

## Remount the drive

Again, since things were working properly and there didn’t seem to be a file system corruption, I thought I’d just try remounting the drive using a correct identifier:

```shell
mount -o remount,rw /dev/vda1 /
```

And that worked!

So I then updated the mounting configuration in `/etc/fstab` to:

```shell
/dev/vda1 /               ext4    errors=remount-ro 0       1
```

## Turn it off and back on again

Finally, I rebooted.

And now I once again have a properly mounted, read-write root partition.

{{< like_this_fund_us >}}

## References

  - [Upgrading to 16.04 LTS results in read only file system and can not start desktop](https://askubuntu.com/questions/807847/upgrading-to-16-04-lts-results-in-read-only-file-system-and-can-not-start-deskto)
  - [How to edit /etc/fstab when system boots to read only file system?](https://unix.stackexchange.com/questions/185026/how-to-edit-etc-fstab-when-system-boots-to-read-only-file-system)
  - [What is correct fstab line for root file system in Ubuntu 16.04?](https://unix.stackexchange.com/questions/442926/what-is-correct-fstab-line-for-root-file-system-in-ubuntu-16-04)
