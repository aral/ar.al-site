---
title: "Workaround for npm install error on Lineageos 15.1"
date: 2018-07-30T21:46:04+01:00
draft: false
---

{{< figure src="the-fix.png" alt="Screenshot of Emacs showing the fix outlined in this post being applied." caption="The fix." >}}

`npm install` fails on LineageOS 15.1[^1] with the following error:

{{< highlight bash >}}NPM ERR! Cannot read property 'length' of undefined{{< /highlight >}}

[The issue](https://github.com/npm/npm/issues/19265) originates from [a bug in node](https://github.com/nodejs/node/issues/19022). The affected module has implemented [a workaround](https://github.com/rvagg/node-worker-farm/commit/0b2349c6c7ed5c51e234e418fad226875313e773) that you can manually apply to your npm installation to avoid the issue until the upstreams fix it properly.

To implement the workaround:

1. Open _$PREFIX/lib/node_modules/npm/node_modules/worker-farm/lib/farm.js_ in your editor.
2. Update line 5:

    __From:__

    {{< highlight javascript >}}, maxConcurrentWorkers : require('os').cpus().length{{< /highlight >}}

    __To:__

    {{< highlight javascript >}}, maxConcurrentWorkers : (require('os').cpus() || { length: 1 }).length{{< /highlight >}}

    Replace the `1` in the code snippet above with the number of cores that your phone has. For my Samsung S9+, I used 8 as it has an octa-core processor.

3. Save the file.

That should fix the problem and you should be able to use npm again.

[^1]: I did not encounter this error on my Nexus 5 with LineageOS 14.1.