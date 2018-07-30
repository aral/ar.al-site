---
title: "Workaround for npm install error on Lineageos 15.1"
date: 2018-07-30T21:46:04+01:00
draft: false
---

{{< figure src="the-fix.png" alt="Screenshot of Emacs showing the fix outlined in this post being applied." caption="The fix." >}}

`npm install` fails in Termux on LineageOS 15.1[^1] with the following error:

{{< highlight bash >}}NPM ERR! Cannot read property 'length' of undefined{{< /highlight >}}

[The issue](https://github.com/npm/npm/issues/19265) originates from [a bug in node](https://github.com/nodejs/node/issues/19022). The affected module has implemented [a workaround](https://github.com/rvagg/node-worker-farm/commit/0b2349c6c7ed5c51e234e418fad226875313e773) that you can manually apply to your npm installation to avoid the issue until the upstreams fix it properly.

To implement the workaround:

1. Open the file you need to patch in your editor[^2]:

    {{< highlight bash >}}$EDITOR $PREFIX/lib/node_modules/npm/node_modules/worker-farm/lib/farm.js{{< /highlight >}}

2. Update line 5:

    __From:__

    {{< highlight javascript >}}, maxConcurrentWorkers : require('os').cpus().length{{< /highlight >}}

    __To:__

    {{< highlight javascript >}}, maxConcurrentWorkers : (require('os').cpus() || { length: 1 }).length{{< /highlight >}}

3. Replace the `1` in the code snippet above with the number of cores that your phone has and save the file. (For my Samsung S9+, I used 8 as it has an octa-core processor.)

That should fix the problem and you should be able to use npm again.

[^1]: I did not encounter this error on my Nexus 5 with LineageOS 14.1. The phone exhibiting the error is running LineageOS 15.1, Termux version 0.64, Node.js version 8.11.3 and npm version 5.6.0.

[^2]: If you get a _command not found_ error at this step, it's most likely because you haven't specified a default editor to use in your shell configuration. To fix that and use a simple editor called nano as your default, execute the following command: `echo "export EDITOR='nano'" >> ~/.bashrc && source ~/.bashrc`. Replace `.bashrc` with `.zshrc` if you're using zsh instead of bash as your shell.