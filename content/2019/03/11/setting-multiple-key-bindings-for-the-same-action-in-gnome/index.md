---
title: "Setting multiple key bindings for the same action in GNOME"
date: 2019-03-11T21:44:37Z
draft: false
---

In GNOME, you can only set one key binding for a given action using the Settings app (under Devices → Keyboard) even though the settings data structure itself accepts an array. You can, however, set multiple key bindings per action through the command-line using the `gsettings` command.

For example, here’s how you’d set two sets of actions for cycling between the windows of the same application:

{{<highlight sh>}}
gsettings set org.gnome.desktop.wm.keybindings switch-group "['<Alt>section', '<Super>section']"
gsettings set org.gnome.desktop.wm.keybindings switch-group-backward "['<Shift><Alt>section', '<Shift><Super>section']"
{{</highlight>}}
