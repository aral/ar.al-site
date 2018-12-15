---
title: "Remember directory from last session in Tilix with zsh"
date: 2018-12-15T17:46:40Z
draft: false
---

If you’re using the excellent [Tilix](https://gnunn1.github.io/tilix-web/) terminal with the wonderful [zsh](http://www.zsh.org/) shell (in my case, via [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)), you might notice that opening a new session (e.g., splitting your current session vertically or horizontally or opening a new window), doesn’t start you at the directory you were in in the previous one as you would expect but rather returns you to your home directory.

I’ve been getting increasingly fed up with this but not so much that I actually felt bothered enough to do something about it. Until today.

To fix it, you apparently have to source file called vte.sh in your shell configuration[^1]. Why? To be honest, I couldn’t care less. This is one yak I really do not need to shave right now. Some yaks look better with hair. It’s a fact. Don’t @ me.

On my machine, I did the following to find the file:

```bash
find / -type f -name "vte.sh"
```

That located several copies – the most promising of which seemed to be:

```
/var/lib/flatpak/runtime/org.gnome.Platform/x86_64/3.28/6d1d0ebbd72404c61d109307eb2240542b7ad82608bc6428bba6f3eebcfc8bf3/files/etc/profile.d/vte.sh
```

So, in my _.zshrc_ file, I added the following line to source it:

```bash
# Make Tilix remember the path from previous sessions.
source /var/lib/flatpak/runtime/org.gnome.Platform/x86_64/3.28/6d1d0ebbd72404c61d109307eb2240542b7ad82608bc6428bba6f3eebcfc8bf3/files/etc/profile.d/vte.sh
```

I opened a new window, changed into a directory off of home, split the window, and boom, it remembered my path.

Case closed.

What lovely hair you have. Good yak! Down boy!

[^1]: Source: https://github.com/gnunn1/tilix/issues/1208
