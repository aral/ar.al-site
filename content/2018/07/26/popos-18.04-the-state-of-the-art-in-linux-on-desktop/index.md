---
title: "Pop!_OS 18.04: the state of the art in GNU/Linux on Desktop"
date: 2018-07-26T09:01:42+01:00
draft: false
---

{{< figure src="lock-screen.jpg" alt="The Pop!_OS lock screen showing a beautifully illustrated space scene with planets and the current time (3:33PM on Saturday, 21 July)" caption="Pop!_OS is beautiful, thanks in no small part to Kate Hazen’s beautiful space-themed illustrations." >}}

[Pop!_OS 18.04](https://system76.com/pop) is a GNU/Linux distribution curated by US-based computer maker [System76](https://system76.com). It is the state of the art in usability and experience when it comes to desktop Linux today[^1].

The genius of the System76 team was in realising that all the components for a usable, convenient, and delightful GNU/Linux desktop experience are already here, they're just not tastefully curated. System76 took the best bits of the Linux ecosystem, added some of their own special sauce, and ended up creating a minimal, coherent, consistent and – at times – _delightful_ experience. Take note, because this is a inflection point in desktop Linux. If you had asked me a few years ago, these are not words I thought I would ever be using to describe a Linux distribution.

([I recently switched my main development machine](https://ar.al/2018/07/16/changes/) from a Macbook to a notebook running Pop!_OS after falling in love with it in a virtual machine.)

The main elements System76 used to craft the Pop!_OS experience are [Ubuntu 18.04](https://arstechnica.com/information-technology/2018/05/ubuntu-18-04-the-return-of-a-familiar-interface-marks-the-best-ubuntu-in-years/) LTS, [Gnome 3](https://www.gnome.org/gnome-3/) with [Gnome Shell](https://wiki.gnome.org/Projects/GnomeShell), a unified theme that uses [material design](https://wiki.gnome.org/Projects/GnomeShell), consistent keyboard shortcuts, an adapted version of the [elementaryOS](https://elementary.io/) [AppCenter](https://github.com/elementary/appcenter), and a minimal set of core apps.

You combine these elements while focusing on creating a simple experience for your target audience and you get Pop!_OS.

> We’re building an OS for the software developer, maker, and computer science professional who uses their computer as a tool to discover and create. – [System76](https://system76.com/pop)

I will be exploring the various aspects of the design in detail in future posts. Suffice to say for now that Pop!_OS offers a more minimalist – and definitely less corporate – experience than macOS without attempting to recreate it. A huge amount of the kudos for that goes to Gnome 3 and Gnome Shell.

### Gnome Shell 3: A masterpiece in interface design

[Gnome 3](https://www.gnome.org/gnome-3/) and [Gnome Shell](https://wiki.gnome.org/Projects/GnomeShell) should be case studies in great interaction design. 

Instead of copying Windows or macOS (an affliction that effects other alternatives and is inexplicably seen as a feature in those communities), Gnome 3 has its own culture and consistencies. These clearly derive from a first-principles approach to design and are refreshing to behold.

Much of the simplicity of Gnome 3 comes from the conceptual unity provided by the Activities view. A single key ([the super key](https://en.wikipedia.org/wiki/Super_key_(keyboard_button))), takes you to this view where you can see all of your current apps as well as search for anything on the system or the store from a single place.

{{< figure src="activities-view.jpg" alt="The Activities view in Pop!_OS showing me my currently active applications, desktop, and a search bar." caption="The Activities view in Gnome 3 beats Windows and macOS on simplicity." >}}

Unlike Windows, there is no ungainly multi-level start menu from hell. Unlike macOS, the task of finding things is encapsulated in a single place instead of being split among two different features (Mission Control and Spotlight). If you are looking for something, there is one place to go. I know that I can get to anything I want using the Activities button or pressing the super key. This is as low as you can get in terms of cognitive load and is an absolute joy to use. This is the state of the art in operating system navigation interfaces bar none. This is as good as it gets. Neither macOS nor Windows compare.

Another brilliant design decision in Gnome 3 is to have a separate, always on App Menu in the menu bar. This creates what we call a landmark in interface design. Whereas I'm constantly lost on Windows, on Gnome 3, I can always tell exactly where I am. Which is why I was very sad to learn that [there is work to reverse this beautiful feature](https://www.omgubuntu.co.uk/2018/06/gnome-app-menu-migration). I cannot stress enough how much of a backwards step this is and I would urge the team to stop and reconsider.

### Three steps forwards, two steps back?

{{< figure src="landmarks.jpg" alt="Screenshot showing this blog post open in Visual Studio Code on the left half of the screen and a Web browser open on the right, showing the rendered post. The App Menu reads “Web”" caption="Am I in Visual Studio Code or Web? Web, of course. How do I know? Because the App Menu tells me so. It's an important landmark." >}}

[The reasons given for the migration](https://wiki.gnome.org/Design/Whiteboards/AppMenuMigration) simply do not make sense to me as am interaction designer. I will write up a separate post directly addressing this issue because of how important I feel this is to the future of this project.

In short, however, having the App Menu separate from app windows is the conceptually correct grouping of elements and serves as a crucial landmark to designate the currently-active application. Also, “no other platform has this pattern” is correct as long as you don't consider macOS a platform and “our own apps use it inconsistently” is a good reason to get your own apps to use it consistently, not to formalise the inconsistency by breaking an otherwise consistent conceptual model. There's a difference between paving the cow paths and framing cow shit. 

The only intellectually honest reason for removing the App Menu from Gnome 3 is “we want it to work like Windows.” And that's the worst-possible reason for breaking the conceptual unity of an otherwise beautiful design.

<figure>
  <video controls src="https://player.vimeo.com/external/133430959.hd.mp4?s=11ab523d76408b6b4cac51a1c3c99c58cdb28fa2&profile_id=119" poster="https://i.vimeocdn.com/video/526512828.jpg?mw=2880&mh=1620&q=70"><a href='https://vimeo.com/133430959'>Video of a talk I gave on experience design at the Thinking Digital conference.</a></video>
  <figcaption>A little background: my approach to design.</figcaption>
</figure>

### On consistency

There is a very real problem in the GNU/Linux ecosystem but it's not the App Menu in Gnome 3. The problem is lack of consistency. Or maybe, more precisely, a culture that celebrates lack of consistency as a feature, confusing it with “choice”. Beautiful, consistent defaults are not mutually exclusive with choice. Choice is about having the option of diverging from the defaults, not whether or not those defaults mandate a certain cultural cohesion or consistency.

Gnome should not be ashamed of [its culture](https://developer.gnome.org/hig/stable/). On the contrary, it should be working to implement it as consistently as possible in its ecosystem. So, for example, get Gnome apps to use the App Menu consistently instead of removing it and thereby violating the conceptual unity of the design and destroying a valuable landmark.

<figure>
  <video controls src='https://player.vimeo.com/external/134835662.hd.mp4?s=6f919dd129fef4231ece40d7c36591c2a9e03357&profile_id=113' poster='https://i.vimeocdn.com/video/528502794.jpg?mw=2880&mh=1620&q=70'><a href='https://vimeo.com/134835662'>Video of a talk I gave on experience design at the Thinking Digital conference.</a></video>
  <figcaption>A short demonstration: great design should empower, amuse, and delight.</figcaption>
</figure>

The lack of a strong, coherent culture for applications is the last thing holding back desktop Linux. As evidenced by Pop!_OS, it's entirely possible to build a Linux distribution that can challenge the flagships of multibillion-dollar behemoths like Apple and Microsoft. The bit where the experience falls flat is the moment you install an app that doesn't respect the culture of the platform. Opening a KDE app on a Gnome desktop is like mixing imperial and metric measurements in the same academic paper: each might make sense within its own context but when you mix the two, you double the cognitive load and soon everyone’s confused.

This is the biggest challenge both for innovative organisations like [Purism](https://puri.sm) and System76 who are making progress towards controlling the whole stack, and thus the whole experience. They are competing with the meticulously-crafted and (like it or not) _consistent_ culture of a platform like macOS. Imagine if every macOS app looked and behaved differently. Imagine if some third-party could arbitrarily decide to make menus in macOS work more like those in Windows for the next release. Apple wouldn't be where it is today. And that's exactly the situation Purism and System76 find themselves in today because they both use Gnome 3. If GNU/Linux is going to compete with the likes of Apple, we must start to value, not despise consistency and we must not be afraid to create and enforce strong cultures for our platforms.

<figure>
  <video controls src="https://player.vimeo.com/external/281704944.hd.mp4?s=232971103213d9def6cc584c0e701202449517d0&profile_id=174" poster="https://i.vimeocdn.com/video/715518313.jpg?mw=1600&mh=899&q=70"><a href='https://vimeo.com/281704944'>Video of a talk I gave on design vs. decoration.</a></video>
  <figcaption>Our greatest advantage: we practice design; surveillance capitalists practice decoration.</figcaption>
</figure>

[^1]: Instead of merely going on my gut instinct and over three decades of experience in living and breathing technology, I wanted to make sure I tried a wide gamut of what’s currently available so, before writing this I tried the following distributions: Ubuntu 18.04, elementaryOS, Kubuntu, Mint, Nitrux, Solus, Deepin, Feren, and PureOS. The distribution that comes closest to Pop!_OS right now is PureOS. I also have notebooks running the latest Windows 10 and macOS.