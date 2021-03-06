---
title: "Using iCloud calendars on GNU/Linux"
date: 2018-08-05T19:25:22+01:00
draft: false
---

{{<figure src="gnome-calendar.png" alt="Screenshot of Gnome Calendar showing my calendar entries from my iCloud calendars. I’m travelling to Denmark on Tuesday morning at 6:25AM with Ryanair and staying there until Thursday to speak at a festival called Smukfest. Laura is in Menorca Wednesday to Saturday. Meanwhile, Barry is housesitting and looking after Osky." caption="My week, courtesy of iCloud.">}}

[iCloud](https://en.wikipedia.org/wiki/ICloud) isn’t just for your Apple toys.

Since iCloud uses an open standard called [CalDAV](https://en.wikipedia.org/wiki/CalDAV), you can synchronise your calendars to your other devices on other operating systems like GNU/Linux.[^1]

To use your iCloud calendars under GNU/Linux[^2]:

### A. Install the required software.

Install the following apps if you don’t already have them:

1. Install [Evolution](https://wiki.gnome.org/Apps/Evolution/):

    {{<highlight bash>}}sudo apt install evolution{{</highlight>}}

2. Install [Gnome Calendar](https://wiki.gnome.org/Apps/Calendar):

    {{<highlight bash>}}sudo apt install gnome-contacts{{</highlight>}}

We will be using Evolution to set up the iCloud accounts but you will most likely want to use Gnome Calendar as your daily calendar as it offers a minimal, beautiful experience.

### B. Set up an app-specific password on iCloud.

1. Sign into your Apple account at [https://appleid.apple.com/](https://appleid.apple.com/)

    {{<figure src="apple-1.jpg" alt="The Apple ID sign-in page" caption="">}}

2. Scroll down to the _App-Specific Passwords_ area in the _Security_ section and select the _Generate Password…_ link.

    {{<figure class="hairline-border" src="apple-2.jpg" alt="Screenshot of the Generate Password… pop-over under the Security → App-specific passwords section with “CalDAV on notebook” entered in the textbox followed by Cancel and Create buttons." caption="">}}

3. In the resulting pop-over, enter a descriptive name for this password.

4. Copy the password onto the clipboard.

### C. Set up your calendar(s) in Evolution.

1. {{<figure class="half-width-flush-right" src="calendar.png" alt="Screenshot of the main navigation with the calender icon with the word Calendar next to it." caption="">}} Select the _Calendar_ section in the main navigation.

2. Open the drop-down menu next to the _New_ button and select _Calendar_[^3].
    
    {{<figure src="new-calendar-button.jpg" alt="Screenshot of the drop-down menu next to the New button. The dropdown is marked up with a red circle." caption="">}}

3. In the resulting _New Calendar_ window, select _CalDAV_ from the _Type_ drop-down.

    {{<figure class="half-width-flush-right" src="new-calendar.jpg" alt="Screenshot of the New Calendar window. All of the settings shown are described in the instructions here." caption="">}}

4. In the _URL_ field, enter _https://caldav.icloud.com_

5. In the _User_ field, enter your Apple ID

6. Press the _Find Calendars_ button.

    {{<figure class="half-width-flush-right" src="choose-a-calendar.jpg" alt="Screenshot of the Choose a Calendar window showing my various calendars. They are presented in a two-column table with headings that read Name and Supports. The names of the calendars shown are Jo and Aral (partial), Old events, Calendar, Home, Aral Work, Laura and Aral, Ind.ie Team, Laura’s Events, Laura’s Work, Holidays, CalChat, Laura Gym. All the entries in the Supports column read Events. Underneath the table is a field titled User mail. The value is one of my email addresses (aral@aralbalkan.com). At the bottom of the dialog are two buttons: Cancel and OK." caption="">}}

7. In the resulting password entry pop-up, paste the app-specific password you copied onto the clipboard in the last section.

8. In the resulting _Choose a Calendar_ window, select the calendar you want to set up[^4]. 

9. Back in the _New Calendar_ window, choose a colour to match the one you use on iCloud.

10. Set your options: I select _Copy calendar contents locally for offline operation_, as I want to be able to access the calendar even if I don’t have an Internet connection, and _Server handles meeting invitations_.[^5]

11. If you want this to be your default calendar, also check _Mark as default calendar_.

12. Set the _Refresh every_ setting[^6] to decide how frequently your calendars should synchronise.

13. Press the _OK_ button to create the calendar when you’re happy with your choices.

### This _should_ be easier…

That’s it! If all goes well, you should see your calendar entries begin to pop up in Evolution. If you want to set up additional calendars, rinse and repeat the instructions in this section.

Once you’ve set up your accounts, fire up Gnome Calendar and enjoy your synchronised calendars in a beautifully minimal interface.

Any entries you make in Gnome Calendar will sync to iCloud and, from there, to all of your Apple toys, and vice-versa.

Ideally, this should be a seamless process that’s built into Gnome Calendar[^7].

### Issues

As I discover issues, I will document them here.

#### You cannot move an event between calendars

{{<figure src="error-move-event-to-different-calendar.png" alt="Error dialogue: Calendar authentication request. Failed to put data: HTTP error code 403 (Forbidden): Found component … with same UID in a different collection." caption="">}}

[Issue #304](https://gitlab.gnome.org/GNOME/gnome-calendar/issues/304): Moving an event from one iCloud CalDAV calendar to another, results in a 403 (Forbidden) error. The exact error is “Failed to put data: HTTP error code 403 (Forbidden): Found component … with same UID in a different collection.”

### References

  * [How to integrate iCloud contact, calendar, or email accounts on the BlackBerry 10 smartphone](http://support.blackberry.com/kb/articleDetail?ArticleNumber=000033812)

  * [CalDAV: how to sync iCloud calendar? (2018 update)](https://askubuntu.com/a/1008701)

[^1]: That said, the process is not well-documented at Apple or elsewhere. There is a clear need for better documentation as well as a seamless process for using CalDAV-based calendars in GNU/Linux. This post aims to contribute to the former.

[^2]: The examples here are tested to work on [Pop!_OS](/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/) 18.04 running Gnome 3.28.2.

[^3]: I would have taken a screenshot of the menu itself but the system-wide screenshot hot-key stops responding in Evolution when any drop-down is open. The same thing happens on the _New Calendar_ window with the _Type_ field. I’ve noticed similar issues in modal states in some other apps also. Not sure if this is a bug with the apps, with Gnome, or even Xorg.

[^4]: You will have to set up your calendars one by one.

[^5]: Because iCloud reportedly [supports scheduling as described in RFC 6638](https://stackoverflow.com/a/27200424).

[^6]: I have mine set to every ten minutes at the moment but I might tweak that as – no pun intended – ­time goes by.

[^7]: I opened an issue for this on the [Gnome Calendar source code repository](https://gitlab.gnome.org/GNOME/gnome-calendar/): [Add support for iCloud CalDAV](https://gitlab.gnome.org/GNOME/gnome-calendar/issues/303).
