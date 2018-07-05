---
title: "Web+ on a Phone"
date: 2018-07-02T14:45:04Z
---

I'm blogging this from a phone.

OK, so your mind isn't blown. I understand. After all, anyone can 
blog from a phone using a native or web app that speaks to a 
server somewhere. The difference is I have an entire copy of my 
site on my phone and I'm blogging using the exact same 
[Web+](/2018/06/26/web+/) setup I described earlier on my Mac.

To recap: there's [a Node.js-based watcher 
running](https://source.ind.ie/ar.al/sync) which, if I'm 
online, synchronises my local site with the site on my server 
using [rsync](https://rsync.samba.org/). And 
I'm using a Go-based static site generator, 
[Hugo](https://gohugo.io), to generate the site every time I save. 
And all this is running on the old Nexus 5 I had lying around 
thanks to a little miracle of an app called 
[Termux](https://termux.com/). And, of course, on my server, I'm 
running [DAT](https://datproject.org) so that updates to my site 
automatically get shared on the peer web also. The only thing 
that's different is that I'm writing this in [GNU 
Nano](https://en.m.wikipedia.org/wiki/GNU_nano) instead of in 
VSCode.

Just like on my main machine, I have full local/offline storage, 
local and (if connected and running in live mode) remote live 
reload, etc. 

### Setup

Here are some brief notes on how I got this working in case any 
other developers want to play with a similar setup at any point.

1. I installed [LineageOS](https://lineageos.org/) on my old Nexus 
5 [using the instructions 
on their Wiki](https://wiki.lineageos.org/devices/hammerhead). 
They have [detailed installation instructions for a plethora of 
devices](https://wiki.lineageos.org/devices/) on the wiki.

2. I installed the [F-Droid app store](https://f-droid.org/). This 
is a freedom technology alternative for people who don't want 
Google's surveillance services on their phones.

3. Using F-Droid, I installed [Termux](https://termux.com). This 
is where the magic happens. Termux gives you 
a lightweight Linux environment on your Android phone and doesn't 
even ask you to root your device. I could have installed it on a 
stock Android phone (but then I'd have a Google surveillance 
device in my pocket... so no thanks).

4. 

### The experience

I am using a Logitect external keyboard, without which this would 
not be a viable tool for coding or blogging. With it... my mind is 
blown by how well this four-year-old phone runs this stuff.

There is absolutely no lag: Hugo's rebuilds are instant as is 
the responsiveness of the rsync watcher. As far as I can tell, 
everything runs as well as it does on my Macbook.

It is definitely not the most ergonomic setup even with the 
excellent Logitech keyboard. Using an external monitor via 
Miracast mirroring the screen does help make it better but also 
adds a slight lag to the display.

Also, nano isn't VSCode but it doesn't help that I seem to 
stubbornly refuse to learn anything but the shortcuts that I 
absolutely need to get the job done. It also doesn't help that 
they're about as intuitive as a washing machine dashboard.

{{< figure src="tmux.png" alt="Screenshot of tmux terminal multiplexer running three vertically-split sessions. In the top one is the blog post I'm writing. In the middle one, a directory listing the pictures and camera directories, and in the last one, the console output from the Hugo and rsync watchers." caption="Three-way split terminal sessions on a mobile phone, did you say?" >}}

Using split screen and task switching, I can easily browse the web 
to find and copy links. Adding images is slightly more convoluted 
due to the lack of a visual process (e.g., drag and drop). Instead 
I use Termux's storage extension to copy images in from 
_~/storage/pictures_ and _~/storage/dcim/Camera_. I also use the 
built-in Gallery app to browse images and the `termux-open` 
command from the [Termux API 
add-on](https://termux.com/add-on-api.html) to open images from 
the commandline. I am also using 
[tmux](https://github.com/tmux/tmux/wiki), a terminal multiplexer, 
which lets me have multiple terminal panels on screen at the same 
time. On a mobile phone. I know. 😱


