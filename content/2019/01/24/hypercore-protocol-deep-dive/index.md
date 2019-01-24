---
title: "Hypercore protocol deep dive"
date: 2019-01-24T07:29:23Z
draft: false
---

---
__2019/01/24: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/01/24/hypercore-protocol-deep-dive/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

At the heart of [Dat](https://datproject.org) is the hypercore protocol. Understanding it is fundamental to grokking how and why the higher-level libraries and tools in the ecosystem work the way they do and have the properties they have.

This is a documentation of my study of the [hypercore-protocol](https://github.com/mafintosh/hypercore-protocol) code. It’s meant to be a personal reference. For introductory material as well as general references, please see the [references](#references) section.

## Overview

## Limitations

  * Lack of an ephemeral messaging channel. For certain use cases (e.g., ability to share public keys in multi-writer replication/presence), it would be useful to have a generic and ephemeral (non-persisted) messaging channel. There is currently a DEP by Paul Frazee for using the extension message feature in the protocol to implement this ([DEP-0006: Session Data](https://www.datprotocol.com/deps/0006-session-data-extension/))

## References

  * [How Dat works](https://datprotocol.github.io/how-dat-works/) ([blog post](https://blog.datproject.org/2019/01/21/how-dat-works/)): documentation for the Dat protocol
  * [DAT protocol spec](https://www.datprotocol.com/)
  * [Protocol buffers](https://developers.google.com/protocol-buffers/)
