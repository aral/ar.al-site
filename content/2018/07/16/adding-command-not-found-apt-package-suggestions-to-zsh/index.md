---
title: "Adding “command not found” apt package suggestions to zsh"
date: 2018-07-16T12:49:05+01:00
draft: false
---

{{< figure src="enabling-apt-package-suggestions-in-zsh.png" alt="Tilix terminal window showing the series of commands, detailed in this post, for enabling apt package suggestions in zsh." caption="How apt: package suggestions under zsh." >}}

Under the [GNU Bash](https://www.gnu.org/software/bash/) shell on a Debian-based system, if you type a command that is unrecognised, in addition to an error message telling you that the command is not found, you also get package suggestions for the [apt package manager](https://en.wikipedia.org/wiki/APT_(Debian)).

This is a wonderful pattern in interface design: instead of just telling you that something went wrong and leaving you to figure out what it was, we give you helpful suggestions to try and lead you in the right direction. In this specific use case, it also means that you get to discover new app packages that you might otherwise not have.

My shell of choice, [zsh](https://www.zsh.org/)[^1], doesn't have this feature built-in but, thankfully, someone created a package called _command-not-found_ that you can easily install to enable it:

{{< highlight bash >}}
sudo apt update
sudo apt install command-not-found
echo 'source /etc/zsh_command_not_found' >> ~/.zshrc
source ~/.zshrc
{{< /highlight >}}

Now, when you try to execute a command that doesn't exist, zsh will helpfully suggest a package or two that you might want to install that might have the command you were thinking of.

[^1]: I use zsh with the excellent [Oh My ZSH!](https://ohmyz.sh/) configuration with the [agnoster](https://github.com/agnoster/agnoster-zsh-theme) theme with [powerline fonts](https://github.com/powerline/fonts).