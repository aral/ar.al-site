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

  * The hypercore protocol is defined using [protocol buffers](https://developers.google.com/protocol-buffers/) in [schema.proto](https://github.com/mafintosh/hypercore-protocol/blob/master/schema.proto). From this, [message.js](https://github.com/mafintosh/hypercore-protocol/blob/master/messages.js) is generated [via](https://github.com/mafintosh/hypercore-protocol/blob/7c79430ac108c758b50586fdda42bf8bfe533406/package.json#L24) `npm run protobuf`.

  * Initial message sent when establishing a connection is a [Feed message](https://github.com/mafintosh/hypercore-protocol/blob/7c79430ac108c758b50586fdda42bf8bfe533406/schema.proto#L5) that includes the discovery key and a nonce[^1]. If both parties have the read key (public signing key of the hypercore), then they can replicate from the second message onwards [via an encrypted connection that uses XSalsa20](https://datprotocol.github.io/how-dat-works/#Encryption) to encrypt the messages with the read key and the nonce.

## Limitations

### Lack of general ephemeral messaging channel

For certain use cases (e.g., ability to share public keys in multi-writer replication/presence), it would be useful to have a generic and ephemeral (non-persisted) messaging channel. There is currently a DEP by Paul Frazee for using the extension message feature in the protocol to implement this ([DEP-0006: Session Data](https://www.datprotocol.com/deps/0006-session-data-extension/))

Also see: [DEP: Ephemeral message extension pull request](https://github.com/datprotocol/DEPs/pull/28). This PR was closed but I’m not sure why exactly as – unless I’m missing something – the privacy concerns can be addressed by signing the messages with the Feed key as part of the extension protocol itself ([comment](https://github.com/datprotocol/DEPs/pull/28#issuecomment-457111761)).

[The discussion on the DEP’s pull request](https://github.com/datprotocol/DEPs/pull/27) is very valuable and concerns the use cases that we have for Hypha also.

__Note:__ there are ephemeral messages within the protocol (e.g., [keepalive](https://datprotocol.github.io/how-dat-works/#keepalive)) but no general means to send arbitrary ephemeral messages.

## References

  * [How Dat works](https://datprotocol.github.io/how-dat-works/) ([blog post](https://blog.datproject.org/2019/01/21/how-dat-works/)): documentation for the Dat protocol
  * [DAT protocol spec](https://www.datprotocol.com/)
  * [Protocol buffers](https://developers.google.com/protocol-buffers/)

[^1]: Number only used once.