---
title: "Responsive design got my app rejected"
date: 2018-09-16T13:52:05+01:00
draft: false
---

{{<figure src="rejected.jpg" alt="The App Store Connect Resolution Center page for the latest Better submission showing that it is Metadata Rejected because the 9.7-inch screenshots show an older iOS version in the status bar." caption="Rejection: a love story." >}}

[The iOS 12 version of Better](https://ar.al/2018/09/14/better-simpler-and-more-affordable/) is currently in review with a status of Metadata Rejected and I blame responsive design.

Let me explain.

In previous versions, I was using [Fastlane](https://fastlane.tools) (now owned by surveillance capitalist Google – *spit!*) to automatically generate screenshots for all possible screen resolutions and uploading them via the App Store API.

With the new version, I decided to take and upload the screenshots manually and to limit them to the only two required screen sizes: 5.5-inch (e.g., iPhone 6 Plus) and 12.9-inch display (i.e., iPad Pro) that I saw listed on the App Store Connect page. 

So I used the App Store Connect site to delete the existing screenshots and upload the new ones and, along with an updated description and binary, submitted the app for review on the 14th. I woke up on the 15th to find that it had been Metadata Rejected. The note read: 

> We noticed that your screenshots do not sufficiently reflect your app in use. Specifically, your 9.7-inch iPad screenshots display older IOS version in the status bar.

Wait a minute! 9.7-inch iPad screenshots? I didn’t upload any 9.7-inch iPad screenshots!

Oh, but previous versions of Fastlane had and so I must have forgotten to delete them before submitting the app.

I was so sure I had checked the interface to try and find all screen sizes but back I went to the App Store Connect site and, lo and behold, there was a faint blue-on-grey link titled “View All Sizes in Media Manager” under App Previews and Screenshots that I had apparently somehow missed while preparing the submission.

{{<figure src="app-store-connect-with-link.jpg" alt="The App Store Connect submission page for Better, showing that it is Metadata Rejected. There is a link to view all screen sizes under App Previews and Screenshots (which I’ve emphasised by framing it with a red rectangle)." caption="The link to View All Sizes in Media Manager (emphasis mine)… how had I missed it?">}}

Cussing my scatterbrained effort, I deleted all of the old screenshots and responded to the comment in the resolution centre.

However, something didn’t sit right with me. I mean, goodness knows I can be terribly aloof but I was certain I had searched for that link earlier and it wasn’t there. Going back to the site and resizing the window to half screen on my 4K 21" monitor, I realised what the problem was: the link disappears on viewports that are smaller than 1154px wide.

{{<figure src="app-store-connect-no-link.jpg" alt="The App Store Connect submission page for Better, showing that it is Metadata Rejected. The link to view all screen sizes under App Previews and Screenshots is hidden." caption="Exhibit A: the missing link.">}}

So I wasn’t losing my mind. I had been thwarted by a CSS breakpoint. When I was preparing my submission, the link simply wasn’t there.

And that’s how responsive design got my app rejected.

## Epilogue

The app is still in review but in the meanwhile, I reported the issue to Apple (radar 44499555) so hopefully it will be fixed soon.

One way to fix it would be to forgo the use of a link altogether and add another tab to the interface, as below:

{{<figure src="app-previews-fix.png" alt="A simple iteration on the design of the App Previews section on App Store Connect to add a tab bar item for other sizes.">}}
