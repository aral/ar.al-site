---
title: "Open from terminal in Linux"
date: 2018-07-17T22:38:23+01:00
draft: false
---

On macOS, if you want to open a file in its default viewer/editor from Terminal, you use the `open` command like this:

{{< highlight bash >}}
open name-of.file
{{< /highlight >}}

On X-based Linux systems, you can do the same thing using a command called `xdg-open`. However, it doesn't really have the same ring to it, does it?

If you want to speak human instead of xdg, add an alias to your shell configuration file (for bash, _~/.bashrc_, for zsh, _~/.zshrc_). In my case, all I had to do was:

{{< highlight bash >}}
# Add the alias to your shell configuration. 
echo "alias open='xdg-open'" >> ~/.zshrc

# Load your updated configuration.
source ~/.zshrc
{{< /highlight >}}

And now you can open directories in [Files](https://en.wikipedia.org/wiki/GNOME_Files) using:

{{< highlight bash >}}
open .
{{< /highlight >}}

And you can open images in [Image Viewer](https://wiki.gnome.org/Apps/EyeOfGnome/) and any other type of file in its default app using `open <name of file>`.

Enjoy!
