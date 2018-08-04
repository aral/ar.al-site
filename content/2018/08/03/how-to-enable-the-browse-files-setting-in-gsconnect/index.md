---
title: "How to enable the Browse Files setting in GSConnect"
date: 2018-08-03T15:47:01+01:00
draft: false
---

{{<figure src="browse-files-error.jpg" alt="The GSConnect settings panel showing the error condition for the Browse Files setting that is described in this post." caption="Browse Files? Not so fast…">}}

[GSConnect](/2018/08/02/crafting-a-continuous-client-desktop-mobile-experience-on-linux-with-gsconnect/) is a beautiful shell extension for [Gnome Shell](https://wiki.gnome.org/Projects/GnomeShell) that integrates mobile devices that can run [KDE Connect](https://community.kde.org/KDEConnect) (like phones and tablets that run [LineageOS](https://lineageos.org)) with desktop computers that run Gnome on GNU/Linux (like my notebook running [Pop!_OS](https://ar.al/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/)).

One of the features that you might have trouble with is Browse Files as [it is broken by default](https://github.com/andyholmes/gnome-shell-extension-gsconnect/issues/162). It fails unless you have a separate app installed.

When you flip the relevant switch in the Mobile Settings for your device to turn it on, you are greeted with an exclamation mark icon and the setting stays off. So you have a good idea that something went wrong but you don’t know what, exactly[^1]. By turning on the debugging option[^2], I was able to see the actual error messages in one of the developer consoles and realised that it had to do with a missing dependency; a package called [SSHFS](https://github.com/libfuse/sshfs) that mounts a remote filesystem locally using SFTP.

To fix this error, you have to install SSHFS separately: 

{{<highlight bash>}}
sudo apt install sshfs
{{</highlight>}}

Once that’s installed, you can successfully flip the switch and start browsing the file system of your phone on your desktop.

{{<figure src="browse-files-context-menu.jpg" alt="My computer desktop, showing the Gnome system menu with the Browse Files options expanded for my mobile phone. The relevant options are All Files, Camera Pictures, and Unmount." caption="Press the third button from left (highlighted) to see the Browse Files options.">}}

Needless to say, and quite strikingly so given how polished the rest of the extension is, this is not a great experience.

As I mentioned in my [bug report](https://github.com/andyholmes/gnome-shell-extension-gsconnect/issues/162), GSConnect should ideally seamlessly install and use SSHFS or, if there is some reason for which that is impossible, detect whether it is installed, disable the setting for turning the Browse Files on if the dependency is missing, and provide instructions[^3] for how to install it.

{{<figure src="browse-files.jpg" alt="Thumbnails of the photos on my phone being displayed in Gnome Files on my desktop. The location bar reads (a hash code)/storage/emulated/0/DCIM/Camera." caption="Photos from my phone on my desktop, courtesy of GSConnect.">}}

While developers may understand that many apps in Linux make use of specialised commandline packages behind the scenes[^4], that’s an implementation detail as far as the people using these tools are concerned.

If a feature in an app doesn’t work, it’s because the app is broken, not because I haven’t installed a dependency. Installing an app should install everything that the app needs to work. No ifs, no buts[^5].

This is not the first time I’ve encountered apps that are broken by default [since switching my main development machine](https://ar.al/2018/07/16/changes/) [to GNU/Linux](https://ar.al/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/). A principle such as the following should be included in the [design principles](https://developer.gnome.org/hig/stable/design-principles.html.en) section of the [Gnome Human Interface Guidelines](https://developer.gnome.org/hig/stable/) to avoid this antipattern:

### Your application should work by default

> Installing an application should install all dependencies necessary for running the application. If this is not possible (for example, for legal reasons), then the application should detect missing dependencies and both inform and guide people on how to install them. It should not be possible to access or attempt to use features that depend on missing dependencies.

[^1]: If you hover over the icon you do get a tooltip with the error message informing you that SSHFS has not been installed but, of course, that is a hidden gesture and we cannot expect people to intuit it.

[^2]: _Mobile Devices_ → (My device name) → _Mobile Settings_ → _About_ → _Debug Mode_

[^3]: Or a link to instructions.

[^4]: [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)

[^5]: And if it cannot for reasons beyond its control (e.g., for legal reasons), it should be very humble and ashamed about this and do whatever it can to make the person aware of this limitation, apologise for it (even if it’s not its fault) and help the person to fix the problem that it created for them (even if it was for reasons outside of its control).
