---
title: "With this amazing trick, you can stay an extra night in Paris but only if you use Linux!"
date: 2018-10-26T16:27:15+01:00
draft: false
---

{{<figure src="time-4-25-5-25-pm.jpg" alt="A screenshot of my desktop showing that my machine thinks the local time in Paris is 4:25PM while it is actually 5:25PM." caption="Give or take an hour.">}}

I was supposed to be back in Cork right now but instead I’m staying an extra night in Paris and it’s all because I was using my Linux machine instead of my Mac at the airport. If you too want to take advantage of this nifty little trick, here’s how it works:

1. Make sure you fly into France from a country that’s in a different time zone and connect through Paris on your way back.[^1] In my case, I flew into France from Ireland, which is one hour behind.

2. Ensure that both _Automatic Date & Time_ and _Automatic Time Zone_ are set to _ON_ in the Settings app of your Linux laptop[^2]. Also, make sure you understand that for those settings to work you must connect to the Internet and thus make a point of connecting your Linux machine to the Internet so that you can safely assume that the time zone and time are automatically updated as promised.[^3]

    {{<figure src="settings-time-and-date.png" alt="Screenshot of my Time and Date settings showing that even though automatic date and time and automatic time zone are set to ON, the time has not updated." caption="Linux can automatically update your time and timezone… sometimes… maybe.">}}

3. Start working on something on your Linux computer[^4] but make sure to keep your eye on the clock on your desktop so that you don’t miss your flight.

4. With about 20 minutes to go to your boarding time, close the lid of your computer and start to make your way to the gate so that you can get there in plenty of time for your flight.

5. On the way, glance at your iPhone and notice that it is actually one hour later in Paris than the time that was showing on your Linux machine.

6. Realise that you’ve missed your flight.

7. Call your girlfriend and tell her you won’t be home tonight as planned.

8. Watch as your poor, loving girlfriend scrambles to book you a flight for the next day and a hotel for the night. End up paying €394.47 for the combo (€277.99 for the flight and €116.48 for the hotel room).

That’s it, there is no Step 9! You’ve now got an extra night in Paris. And it’s all thanks to Linux!

It does rather feel like in our relentless drive for MORE! FASTER! SHINIER!, we often neglect the essentials.[^5]

And this isn’t even the first time something like this has happened to me. The only other time I’ve ever missed a flight was again due to technology and timezones. But that time it was Apple’s fault.[^6]

Here’s hoping that this is yet another small reminder for those of us that build the new everyday things that when those things don’t work as they should [it has consequences for people’s lives](http://www.breakingthin.gs/this-is-all-there-is.html).

## Update (a few hours later)

So, after writing this, I went searching to isolate the bug that led to the situation. I realised that the issue was due to a bug where if Location Services is off under the Privacy section of Settings, it disables the ability to automatically set the time and time zone. However, the interface does not reflect this in any way and allows you to enable the automatic time and time zone settings, thereby giving you a false impression that your time and timezone will be updated automatically.

[Thanks to Mathieu](https://mstdn.fr/@mathieu/100963293983797012), we now know that this was a known issue in Gnome __for over a year__ because the Gnome developers themselves were effected by it when travelling for their developer conference. Although [the issue was reported in October, 2017](https://bugzilla.gnome.org/show_bug.cgi?id=788714), it [took about a year for it to be addressed](https://gitlab.gnome.org/GNOME/gnome-control-center/merge_requests/165). And, even then, it was decided to delay its release for 3.30 (which I’m running) and instead wait for 3.32 due to a string freeze.

It’s clear that something seriously went wrong here where a core feature that affects the reality presented to the person using the computer took over a year to be fixed and then wasn’t seen as important enough to include in a major release even though it was ready.

I’d love to have a post-mortem about this with the Gnome folks at some point to see what we can do to improve the triage process so that such core issues can be identified as such and handled with priority. This bug cost me €394.47 and a day away from home. I’m sure I’m not the only who was effected in the last year. How can we improve the bug triage procedure at Gnome to make sure that we can catch such issues earlier and give them the priority they deserve in the future?

[^1]: This trick will actually work in any country as long as you fly in from a different time zone.

[^2]: Mine’s running Pop!_OS 18.10 so your milage may vary but given that Pop!_OS is based on Ubuntu, there’s a chance that this trick will work for you if you have a recent Ubuntu derivative.

[^3]: In my case, I was connected to the Internet for several hours at the airport.

[^4]: It’s essential here that you focus and only use your Linux machine. If you glance at your iPhone or start working on your Mac, this trick will not work for you.

[^5]: As I write this, connected to the Internet, the time zone and displayed time still hasn’t updated. I just tried manually flipping the _Automatic Date & Time_ and _Automatic Time Zone_ switches off and on again and that didn’t do anything either. Either in Pop!_OS 18.10 or in Ubuntu 18.10 or maybe even somewhere further upstream, that feature seems to be entirely broken. (I was finally able to get the timezone to update by setting it manually.)

[^6]: Many years ago, the calendar app used to have a bug where it would recalculate the times of events based on the timezone they were entered in when you changed timezones. So if you were in Timezone A when you entered the time of a flight back from Timezone B, when you travelled to Timezone B the calendar would offset the time of the flight based on the time difference between Timezone A and B, thereby presenting your flight back at the wrong local time. Apple has long since fixed this issue.
