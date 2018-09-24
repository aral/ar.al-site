---
title: "Workaround for unclickable app menu bug with window.makeKeyAndOrderFront and NSApp.activate on macOS"
date: 2018-09-17T11:08:47+01:00
draft: false
---

To open a window and make it appear on top of other windows on macOS, you can do the following:[^1]

{{<highlight swift>}}
myWindow.makeKeyAndOrderFront(nil)
NSApp.setActivationPolicy(.regular)
NSApp.activate(ignoringOtherApps: true)
{{</highlight>}}

This works to show the window, make it topmost and also display the app menu. The problem is that the app menu is not clickable until you tab away from the application and back again.

I couldn’t find this issue addressed with some cursory search engine trawling but the symptoms led to me think that it was most likely a timing problem. Which, it turns out, it probably is.

After my initial workaround[^2] exhibited random failures, I dug deeper into the issue and found [a more comprehensive workaround](https://stackoverflow.com/a/43780588):

{{<highlight swift>}}
myWindow.makeKeyAndOrderFront(nil)
NSApp.setActivationPolicy(.regular)
NSApp.activate(ignoringOtherApps: true)

// Workaround for window activation issues:
// toggle focus away from the app and back.
if (NSRunningApplication.runningApplications(withBundleIdentifier: "com.apple.dock").first?.activate(options: []))!
{
    let deadlineTime = DispatchTime.now() + .milliseconds(200)
    DispatchQueue.main.asyncAfter(deadline: deadlineTime)
    {
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
    }
}
{{</highlight>}}

This second workaround seems to be solid so far in my testing, even though it does cause a slight flash of the window, especially the first time it is opened. It’s what I’m currently using in [Better Blocker for macOS](https://better.fyi).

NB. There does seem to be a random element to this bug as, interestingly, as I was testing the app while writing this update, I coud not reproduce the bug even when testing without the workaround, on the latest macOS Mojave. I am keeping the workaround in for the time being in any case it is a failsafe. When I get some time I will try and see if Apple is aware of this issue and follow up on its resolution.

[^1]: The `NSApp.setActivationPolicy(.regular)` should not be necessary unless you are trying this from a status bar application like I was. The activation policy was originally set to `.accessory` so we have to set it back for it behave like a regular application (with a toolbar icon, etc.).

[^2]: My initial solution was to invoke the `NSApp.activate` call on the next stack frame using my little [delay](https://source.ind.ie/project/delay) library like this: {{<highlight swift>}}
myWindow.makeKeyAndOrderFront(nil)
_ = delay(0) {
    NSApp.activate(ignoringOtherApps: true)
}
{{</highlight>}}
