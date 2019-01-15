---
title: "Hypha Spike: Diceware"
date: 2019-01-15T21:34:17Z
draft: false
---

Pulled out from [Hypha Spike: DAT 1](../../14/hypha-spike-dat-1).

[Source code](https://source.ind.ie/hypha/spikes/diceware)

## Design

{{<figure src="spike-screenshot.jpeg" alt="Screenshot of the completed spike in the browser: Domain: ar.al Password: chive cartwheel attire headlamp approach alphabet splendid deceptive. There is a button labeled “Change”. Underneath, the generated public signing key, private signing key, public encryption key, and private encryption key are listed in form fields. The footnote reads that the password generation process has 100 bits of entropy and would take roughly a few hundred million years to brute force with government-level resources. It also says that the generated keyse are Ed25519 (signing) and Curve25519 (encryption)" caption="Screenshot of the completed spike.">}}

  * Use [Diceware](https://www.rempe.us/diceware/) for passphrase generation to ensure a high-entropy process.

  * Use [budo](https://github.com/mattdesl/budo) in the spikes to enable lightweight use of bundling/modules/etc.

## Postmortem

Pulled this out into its own Spike so that it doesn’t clutter the DAT 1 spike.

Starting with the [Aspect Setup 1 spike](../../10/hypha-spike-aspect-setup-1), in this spike I:

  * Refactored to use budo so I can use requires, etc.

  * Was getting an error in budo due to Chokidar on Linux:

    {{<highlight bash>}}Error: Cannot find module 'fsevents' from '…/node_modules/chokidar/lib'{{</highlight>}}

    Ended up upgrading dependencies for budo ([pull request](https://github.com/mattdesl/budo/pull/240)) and also squashing this error as the error is in error ([pull request](https://github.com/mattdesl/budo/pull/241)). We will, of course, not be using budo in production but it’s fine for the purposes of this spike.

  * Started generating passphrases using [Diceware](https://www.rempe.us/diceware/) and [EFF’s New Wordlists for Random Passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases)

## References

  * [xkcd: Password Strength](https://xkcd.com/936/)
  * [Excellent explanation of above xkcd](https://security.stackexchange.com/questions/6095/xkcd-936-short-complex-password-or-long-dictionary-passphrase/6116#6116). Quote: “Security at the expense of usability comes at the expense of security.” – [AviD](https://security.stackexchange.com/users/33/avid)
  * [Passphrases that you can memorize — but that even the NSA can’t guess](https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/)
  * [Diceware](https://www.rempe.us/diceware/) ([Source code](https://github.com/grempe/diceware))
  * [EFF’s New Wordlists for Random Passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases)
  * [eff-diceware-passphrase](https://github.com/emilbayes/eff-diceware-passphrase)


