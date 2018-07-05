---
title: "Web+ on a Phone"
date: 2018-07-05T12:47:04+01:00
---

{{< figure src="blogging.jpg" alt="Photo of my Nexus 5 phone. The screen is split horizontally down the middle. On the left side is Emacs running with the text of this blog post showing in it. On the right side is the DuckDuckGo browser showing the rendered HTML from localhost:1313" caption="E.T. blog phone." >}}

I'm blogging this from a phone.

OK, so your mind isn't blown. I understand. After all, anyone can blog from a phone using a native or web app that speaks to a server somewhere. The difference is I have an entire copy of my site on my phone and I'm blogging using the exact same [Web+](/2018/06/26/web+/) setup I described earlier on my Mac.

To recap: there's [a Node.js-based watcher running](https://source.ind.ie/ar.al/sync) which, if I'm online, synchronises my local site with the site on my server using [rsync](https://rsync.samba.org/). And I'm using a Go-based static site generator, [Hugo](https://gohugo.io), to generate the site every time I save.  And all this is running on the old Nexus 5 I had lying around thanks to a little miracle of an app called [Termux](https://termux.com/). And, of course, on my server, I'm running [DAT](https://datproject.org) so that updates to my site automatically get shared on the peer web. The only thing that's different is that I'm writing this in [GNU Emacs](https://www.gnu.org/software/emacs/) instead of in VSCode.

Just like on my main machine, I have full local/offline storage, local and (if online and running in live mode) remote live reload, etc.

<figure>
  <video controls src="https://player.vimeo.com/external/278310665.hd.mp4?s=b9921ca43511ea5180abddad05edaf2e0689d348&profile_id=175" poster="https://i.vimeocdn.com/video/711309596.jpg?mw=1920&mh=1080&q=70"><a href='https://vimeo.com/278310665'>Video of static site generation with live reload on my phone.</a></video>
  <figcaption>Live reload on a phone.</figcaption>
</figure>

### Setup

Here are some brief notes on how I got this working in case any other developers want to play with a similar setup at any point.

1. I installed [LineageOS](https://lineageos.org/) on my old Nexus 5 [using the instructions on their Wiki](https://wiki.lineageos.org/devices/hammerhead).  They have [detailed installation instructions for a plethora of devices](https://wiki.lineageos.org/devices/) there. I also compiled [a list of phones that can run the latest version of LineageOS](https://ar.al/2018/07/03/phones-lineageos-15.1-is-officially-supported-on/) (15.1). My Nexus 5 can only run 14.1, which runs just fine.

2. I installed the [F-Droid free software catalogue](https://f-droid.org/). This is a freedom technology alternative for people who don't want Google's surveillance services on their phones.

3. Using F-Droid, I installed [Termux](https://termux.com). This is where the magic happens. Termux gives you a lightweight Linux environment on your Android phone and doesn't even need root access on your device to do so. I could have installed it on a stock Android phone (but then I'd have a Google surveillance device in my pocket... so no thanks).

4. As Termux comes with the [apt package manager](https://wiki.debian.org/Apt) via the `pkg` command (this is amazing), I was able to install [git](https://git-scm.com/), clone [my Web+ setup repositories](https://source.ind.ie/ar.al), install [Node.js](https://nodejs.org), [Go](https://golang.org)[^1], and [Hugo](https://gohugo.io) (which I had to [compile from source](https://gohugo.io/getting-started/installing#fetch-from-github)).

Following those steps, I was up and running with essentially the same setup that I have on my Macbook.

### The experience

In a nutshell: it's rather amazing.

I am using a [Logitech hardware keyboard](https://www.logitech.com/en-sg/product/ultrathin-keyboard-cover) that I had for my iPad, without which this would not be a viable tool for coding or blogging. With it... well, my mind is blown by how well this four-year-old phone runs all this stuff.

There is absolutely no lag! Hugo's rebuilds are instant as is the responsiveness of the rsync watcher. As far as I can tell, everything runs as well as it does on my Macbook.

### Challenges and processes

That's not to say that it's perfect. This is not the most ergonomic setup ever, even with the excellent Logitech keyboard. Using an external monitor via [Miracast](https://en.m.wikipedia.org/wiki/Miracast) mirroring the screen does help make it better but also adds a slight lag to the display. I have to find [a slimport adapter](https://en.m.wikipedia.org/wiki/DisplayPort#SlimPort) and see what it's like using a wired connection. From a demonstration video I watched on the web, it looks like it has a perfectly smooth mirroring experience.

Also, I initially battled with my lazy fallback editor of choice on Linux terminals, [GNU nano](https://www.nano-editor.org/). I ended up somehow pressing some keyboard combination, I guess, that got nano to hard-wrap the lines of my post. While shaving that particular yak, I ended up giving [GNU Emacs](https://www.gnu.org/software/emacs/) a shot. After finally working my way through its tutorial some 30-odd years after it was written, I have to say, I really like Emacs. (I know, I'm shocked too... here, have some tea.)

There is nothing intuitive about Emacs but it is the product of another time and there is method behind the madness. And, for the moment at least, it suits my coding and blogging needs just fine. Running it in split screen with my browser also works really well (nano had trouble recovering from being resized).

Using a combination of split screen and task switching, I can easily browse the web to find and copy links.

Adding images and screenshots taken on the phone itself is slightly more convoluted due to the lack of a visual process (e.g., drag and drop). Instead [I gave Termux storage access](https://wiki.termux.com/wiki/Termux-setup-storage) and I use plain old `cp` to copy images in from _~/storage/pictures_ and _~/storage/dcim/Camera_. I also use the built-in Gallery app to browse images and the `termux-open` command from the [Termux API add-on](https://termux.com/add-on-api.html) to trigger image previews from the commandline.

As Termux supports multiple sessions, I can have my watchers running in one session and Emacs in another. When that, combined with Emacs's support for easy suspend and resume (<kbd>Ctrl</kbd> <kbd>x</kbd> <kbd>Ctrl</kbd> <kbd>z</kbd> to suspend, `fg` on the commandline to resume) isn't enough, I can also use [tmux](https://github.com/tmux/tmux/wiki) &ndash; a terminal multiplexer &ndash; to split my screen with multiple terminal sessions. On a mobile phone. I know! 😱

### Communicating with the outside world

Another issue is how to get things on this phone from my other devices, all of which are locked into Apple's nursery. This is where cross-platform [freedom apps](https://www.fsf.org/about/what-is-free-software) become an invaluable lifeline.

First off, [Signal](https://www.signal.org/) and [Wire](https://wire.com/en/). Freedom from the surveillance silos without becoming hermits requires that we have end-to-end encrypted means of communication between devices, platforms, and people. Both Signal and Wire solve this problem beautifully and in a manner that can be conveniently enjoyed by people without the necessary technical knowledge or time.

I initially found it difficult to sign into services I was using as all my passwords are in [1Password](https://1password.com/). 1Password does have an Android app but it's only available from the Google Play Store. I will not be installing any of Google's surveillance services on this phone. This creates a problem. (One that I also ran into with the VPN I'm using on Apple's platforms, [EncryptMe](https://encryptme.com.) I've raised the issue with [both](https://twitter.com/aral/status/1014560504038256647) [companies](https://twitter.com/aral/status/1014814579120070656) and I hope that we can make some progress there. Otherwise, I'll be looking for alternatives that enable people to use them without subjecting themselves to Google's surveillance machine.

To get around the problem of sharing information between my nursery machines (Apple devices) and my grown-up tools, I ended up just using Signal with disappearing messages. It's not a hassle to send a password, end-to-end encrypted from 1Password on my Mac/iPhone to my freedom phone. I also use the same system to send photos I've taken on my iPhone to my freedom phone. For videos, I upload them to [Vimeo](https://vimeo.com) ([Ind.ie](https://ind.ie) has a Pro account with Vimeo so that we can embed the video files directly without the Google surveillance that comes bundled with the default Vimeo player).

In the middle-term, I plan to try out my old friend [SyncThing](https://syncthing.net) for cross-platform secure file transfers. In the longer term, I will be looking into [KeePassXC](https://keepassxc.org/) as an alternative to 1Password and my own [DAT](https://datproject.org)-based solutions for private/secure file sync, messaging, and publishing.

### It's a great time for ethical technology

I have to say that I haven't been this excited about technology in a long while because I can finally see the pieces coming together for ethical alternatives to start making inroads into the mainstream. In a lot of ways, this process has already begun. [Mastodon](https://joinmastodon.org), [DAT](https://datproject.org), [Signal](https://signal.org), [Wire](https://wire.com/en/), [Matrix](https://matrix.org), [Purism](https://puri.sm), [Eelo](https://www.eelo.io/), [Gnome](https://www.gnome.org/), [Pop!_OS](https://system76.com/pop), [LineageOS](https://lineageos.org/), [Termux](https://termux.com/)... these are just some of the products and projects off the top of my head that give me immense hope for the future of [ethical technology](https://ind.ie/ethical-design). 

That's not to say that the setup I've described here and that I'm using is one that I expect people without technical knowledge and the time to spare to play with today. But it is giving me a myriad of ideas and this is stuff that developers (and not just I-think-in-binary-and-speak-fluent-hex developers) definitely can (and should) toy with. The challenge is exploring and then exposing what's possible with such freedom-respecting and freedom-preserving setups conveniently so that people who don't have the technical knowledge or perhaps just the time or resources can take advantage of the freedoms that they offer. For those of us that care about ethical technology, our job is to build the convenient bridges between the centralised, surveillance-based silos of today and the ethical, interoperable, and open freedom technologies of tomorrow.

Let's create beautiful defaults and layer the seams.

[^1]: I did discover a bug with Go under Termux: it doesn't get the correct timezone. A symptom of this, for Hugo, is that the dates of posts have the wrong timezone. I've [opened an issue for it](https://github.com/termux/termux-app/issues/760).
