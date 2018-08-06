---
title: "Getting your iCloud contacts on GNU/Linux"
date: 2018-08-05T22:43:21+01:00
draft: false
---

{{<figure src="contacts.jpg" alt="Screenshot of the Gnome Contacts app, showing a portion of my own contact card." caption="I’m my own best contact.">}}

Just like you can [use iCloud calendars on GNU/Linux](../using-icloud-calendars-on-gnu-linux), you can also synchronise your contacts as iCloud uses an open standard called [CardDAV](https://en.wikipedia.org/wiki/CardDAV). 

## No photos please, we’re Gnomish!

{{<figure src="error.jpg" alt="Screenshot of the error message you get when you try to create a contact with a photo on iCloud." caption="">}}

The caveat is that contacts with photos will be missing the photos. And you cannot create a contact with a photo either.

I’ve opened two issues for this in the [Gnome Contacts source code repository](https://gitlab.gnome.org/GNOME/gnome-contacts). If this is something you would like to see fixed, please show them some love:

  * [#100](https://gitlab.gnome.org/GNOME/gnome-contacts/issues/100): Photos do not sync with iCloud via CardDAV

  * [#101](https://gitlab.gnome.org/GNOME/gnome-contacts/issues/101): Error when creating a contact that has a photo when using CardDAV with iCloud  

Not having photos is not a show stopper but it does make the experience less than ideal. Needless to say, this is of course something that will be fixed in time. If anyone from Apple is reading this and would like to lend the Gnome Contacts team a friendly hand with this, that would also be very much appreciated.

## Instructions

The instructions for setting up contacts are similar to those for [setting up calendars](../using-icloud-calendars-on-gnu-linux).

To use your iCloud contacts under GNU/Linux[^1]:

### A. Install the required software.

Install the following apps if you don’t already have them:

1. Install [Evolution](https://wiki.gnome.org/Apps/Evolution/):

    {{<highlight bash>}}sudo apt install evolution{{</highlight>}}

2. Install [Gnome Contacts](https://wiki.gnome.org/Apps/Contacts):

    {{<highlight bash>}}sudo apt install gnome-contacts{{</highlight>}}

We will be using Evolution to set up the iCloud accounts but you will most likely want to use Gnome Calendar as your daily calendar as it offers a minimal, beautiful experience.

### B. Set up an app-specific password on iCloud.

_(If you’ve already set-up an app-specific password for your [calendars](../using-icloud-calendars-on-gnu-linux), you can skip this step and use the same password.)_

1. Sign into your Apple account at [https://appleid.apple.com/](https://appleid.apple.com/)

    {{<figure src="../using-icloud-calendars-on-gnu-linux/apple-1.jpg" alt="The Apple ID sign-in page" caption="">}}

2. Scroll down to the _App-Specific Passwords_ area in the _Security_ section and select the _Generate Password…_ link.

    {{<figure class="hairline-border" src="../using-icloud-calendars-on-gnu-linux/apple-2.jpg" alt="Screenshot of the Generate Password… pop-over under the Security → App-specific passwords section with “CalDAV on notebook” entered in the textbox followed by Cancel and Create buttons." caption="">}}

3. In the resulting pop-over, enter a descriptive name for this password.

4. Copy the password onto the clipboard.

### C. Set up your iCloud address book in Evolution

1. {{<figure class="half-width-flush-right" src="contacts-section.png" alt="Screenshot of the main navigation item with the contacts icon with the word Contacts next to it." caption="">}} Select the _Contacts_ section in the main navigation.

2. Open the drop-down menu next to the _New_ button and select _Address Book_.
    
    {{<figure src="new-address-book.jpg" alt="Screenshot of the drop-down menu next to the New button. The dropdown is marked up with a red circle." caption="">}}

3. In the resulting _New Address Book_ window, select _CardDAV_ from the _Type_ drop-down.

    {{<figure class="half-width-flush-right" src="new-address-book-window.jpg" alt="Screenshot of the New Address Book window. All of the settings shown are described in the instructions here." caption="">}}

4. In the _URL_ field, enter _https://contacts.icloud.com_

5. In the _User_ field, enter your Apple ID

6. Press the _Find Address Books_ button.

    {{<figure class="half-width-flush-right" src="choose-an-address-book.jpg" alt="Screenshot of the Choose an Address Book window. There is only one address book shown in the table and it is selected: Name: card, Supports: Contacts. At the bottom of the dialog are two buttons: Cancel and OK." caption="">}}

7. In the resulting password entry pop-up, paste the app-specific password you copied onto the clipboard in the last section.

8. In the resulting _Choose an Address Book_ window, select the address book shown and press the _OK_ button. When I did this, there was only one entry and it was called _card_.

9. Back in the _New Address Book_ window, check the options you want to set for your address book and press the _OK_ button. I checked all of the options except for _Avoid IfMatch_ – mostly because I don’t know what an IfMatch is and nor would I recognise one if were to stumble upon it in a dark alley.

### This _should_ be easier…

Once you’ve set up your address book, launch Gnome Contacts and you should see your contacts show up, sans any photos you may have had for them.

Any entries you make in Gnome Contacts will sync to iCloud and, from there, to all of your Apple toys, and vice-versa. Just remember not to include photos in your contacts or things will get borked.

Ideally, CardDAV setup should be a seamless process that’s built into Gnome Contacts[^2].

### References

  * [How to integrate iCloud contact, calendar, or email accounts on the BlackBerry 10 smartphone](http://support.blackberry.com/kb/articleDetail?ArticleNumber=000033812)

[^1]: The examples here are tested to work on [Pop!_OS](/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/) 18.04 running Gnome 3.28.2.

[^2]: I opened an issue for this at the [Gnome Contacts source code repository](https://gitlab.gnome.org/GNOME/gnome-contacts): [Feature request: integrate iCloud CardDAV setup](https://gitlab.gnome.org/GNOME/gnome-contacts/issues/102).
