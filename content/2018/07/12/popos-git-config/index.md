---
title: "Pop!_OS git config"
date: 2018-07-12T16:42:38+01:00
---

{{<figure src="git-default-email.png" alt="Screenshot of Terminal showing the output from a git log -3 command where the commits have a default email address set up by Pop!_OS" caption="Wait a minute, that's not my email address!" >}}

[Pop! OS](https://system76.com/pop) comes with [git](https://git-scm.com/) preinstalled and certain default settings. The former is great, the latter caught me off guard today when I realised that I was using a bogus email address in my latest commits:

{{<highlight bash>}}
aral@pop-os.localdomain
{{</highlight>}}

To fix it, I just set my email address in the global git settings like this:

{{<highlight bash>}}
git config --global user.email mail@ar.al
{{</highlight>}}

I like that the folks at System76 are thinking about beautiful defaults in Pop!_OS but we have to be careful that those defaults are actually useful.

In this case, it would make sense to ask for the person's actual email address during setup and to use that to configure git (and perhaps also their email client) at installation time.
