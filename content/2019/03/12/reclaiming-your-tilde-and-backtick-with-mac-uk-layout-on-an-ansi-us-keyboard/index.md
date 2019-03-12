---
title: "Reclaiming your backtick-shift-tilde key with a UK Macintosh key layout on an ANSI US Keyboard in GNOME"
date: 2019-03-12T01:36:46Z
draft: false
---

{{<figure src="topre-realforce-87uw55g.jpeg" alt="A Topre Realforce 87UW 55g ANSI US layout keyboard with white and grey keys and a Filco wooden wrist rest." caption="Thonk, thonk, thonk!">}}

Let me begin by acknowledging that this is most likely a niche use case. I am documenting this for my own future reference as much as anything else. That said, the technique can be used to remap or swap or alter your keyboard layout to your heart’s content.

As a recent owner of a Topre Realforce 87UW 55g keyboard[^1] who uses UK Macintosh layout on his Linux box (🎶sosumi🎶), my one pain point is missing my beloved backtick[^2]-shift-tilde key (<kbd>\`~</kbd>).

Now, of course, I hear you mutter, “but, Aral, you could just hold down your handy <kbd>AltGR</kbd>[^3] key and tap the <kbd>\]</kbd> key _twice_ to create a tilde by abusing the diacritic[^4]” Goes without saying really – but that’s no fun when you’re running a Unix-based system[^5] and you’re a programmer who loves [template strings in JavaScript](http://tc39wiki.calculist.org/es6/template-strings/).

So, instead, here’s how to set the key marked as the <kbd>\`~</kbd> key on an ANSI US keyboard to actually be that key by assigning it the same values as the <kbd>\`~</kbd> key that falls between the <kbd>Shift</kbd> and <kbd>Z</kbd> keys on a UK Macintosh layout and which doesn’t exist on an ANSI US keyboard.

1. Backup your current keyboard mapping[^6]:

    {{<highlight sh>}}xmodmap -pke > ~/xmodmap_original{{</highlight>}}

2. Find the keycodes you need by running the following command and pressing the keys you’re interested in. You are going to override the values of the key you want to set with the non-existent key (in my case, I had to press the non-existent key on my laptop’s ISO UK keyboard):

    {{<highlight sh>}}xev -event keyboard{{</highlight>}}

3. Create a file in your home directory (e.g., called _my-keyboard-customisations_) with your Xmodmap setting:

    {{<highlight sh>}}! Make the useless section key in the Mac/UK layout
! into the priceless backtick-shift-tilde key.
keycode  49 = grave asciitilde less greater bar brokenbar bar brokenbar grave asciitilde bar brokenbar backslash bar bar brokenbar{{</highlight>}}

4. Make a simple script that will run [xmodmap](https://linux.die.net/man/1/xmodmap) with your customisations file (e.g., in _~/bin/modmap_):

    {{<highlight sh>}}#!/bin/sh
xmodmap ~/my-keyboard-customisations{{</highlight>}}

5. Remember to make the script file executable:

    {{<highlight sh>}}chmod +x ~/bin/modmap{{</highlight>}}

6. Create a GNOME Desktop file to run at startup (e.g., _~/.config/autostart/xmodmap.desktop) with the following contents:

    {{<highlight sh>}}[Desktop Entry]
Type=Application
Exec=/home/{REPLACE-WITH-YOUR-ACCOUNT-NAME}/bin/modmap
Hidden=false
X-GNOME-Autostart-enabled=true
Name=xmodmap
Comment=xmodmap script{{</highlight>}}

Now log out and log back in again and your new settings should take effect.

And voilà[^7], just like that, I have my backtick-shift-tilde key back and can enjoy my beloved UK Macintosh layout but with extra thonk-thonk-thonks! 🤓

`~~~ fin ~~~`

## Sources

  - http://xahlee.info/linux/linux_xmodmap_tutorial.html
  - https://askubuntu.com/a/1088394

[^1]: Oh my goodness these keys are amazing to type on!

[^2]: Alt Graph (Right Alt).

[^3]: Or the _accent grave_, if you will.

[^4]: And similarly, you can create a backtick by layering two _accent grave_ diacritics like this:

    <kbd>AltGr</kbd> <kbd>|</kbd> <kbd>|</kbd>

[^5]: There’s no place like ~.

[^6]: You can return to your original mapping at any time using: {{<highlight sh>}}xmodmap ~/xmodmap_original{{</highlight>}}

[^7]: In case you’re wondering what the _accent grave_ diacritic is useful for, I just used it to write the _a-grave_ in voilà:

    <kbd>AltGr</kbd> <kbd>|</kbd> <kbd>a</kbd>

    Of course, now that I have my backtick key back, [I can use my Compose Key](https://ar.al/2018/07/18/typographical-typing-habits-for-linux/) instead:

    <kbd>Compose</kbd> <kbd>`</kbd> <kbd>a</kbd>