---
title: "Setting multiple key bindings for the same action in GNOME"
date: 2019-03-11T21:44:37Z
draft: false
---

{{<figure src="dconf-editor.jpeg" alt="Screenshot of dconf-editor showing the keybindings for switching the windows of an applicaiton." caption="Editing keybindings in dconf Editor.">}}

In GNOME, you can only set one key binding for a given action using the Settings app (under Devices → Keyboard) even though the settings data structure itself accepts an array.

You can, however, set multiple key bindings per action by installing the dconf Editor app or through the command-line using the `gsettings` command.

To install dconf Editor:

{{<highlight sh>}}
sudo apt install dconf-editor
{{</highlight>}}

To change key bindings via the command-line (e.g. for switching the windows of an application):

{{<highlight sh>}}
gsettings set org.gnome.desktop.wm.keybindings switch-group "['<Alt>Above_Tab', '<Super>Above_Tab']"
gsettings set org.gnome.desktop.wm.keybindings switch-group-backward "['<Shift><Alt>Above_Tab', '<Shift><Super>Above_Tab']"
{{</highlight>}}
