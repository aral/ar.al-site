---
title: "Spellcheck With Emacs on Termux"
date: 2018-07-05T11:12:08Z
---

{{< figure src="spellcheck.png" alt="Emacs under Termux running a spell check on my document using hunspell." caption="I missspell sometimes." >}}

I'm using Emacs on Termux to blog with on my phone and realised that, by default, spellcheck doesn't work. `M-x ispell` (<kbd>Alt</kbd><kbd>x</kbd> _ispell_) fails with the error "Searching for program: no such file or directory, ispell".

After investigating a bit, it turns out that neither ispell or aspell are available as packages for Termux. Instead, they're concentrating their efforts on supporting hunspell.

To get spellcheck working under Emacs with hunspell:

1. Install the hunspell package
  {{< highlight bash >}}
pkg install hunspell{{< /highlight >}}

2. Add the following to your Emacs configuration:
  {{< highlight emacs >}}
(setq ispell-program-name (executable-find "hunspell")){{< /highlight >}}

3. Restart Emacs.

That should get you a spell checker in Emacs.