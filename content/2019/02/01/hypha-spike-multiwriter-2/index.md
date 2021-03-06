---
title: "Hypha Spike: Multiwriter 2"
date: 2019-02-01T15:04:03Z
draft: false
---

## Source

  * [source.ind.ie/hypha/spikes/multiwriter-2](https://source.ind.ie/hypha/spikes/multiwriter-2) (canonical location)
  * [Github mirror](https://github.com/indie-mirror/hypha-spike-multiwriter-2) (pull requests, issues, etc. welcome)


## Scope

Following on from [Hypha Spike: Multiwriter 1](/2019/01/22/hypha-spike-multiwriter-1) this spike aims to:

  * Simplify the node authorisation flow to a simple authorisation alert on already-authorised nodes.


## Design

{{<figure src="authorisation-request.jpeg" alt="Screenshot of an authorisation request. Message: Authorise node Firefox on Ubuntu 64-bit? Button with label: Authorise" caption="Peer-to-peer node authorisation: early proof of concept.">}}

This is the onboarding and new node authorisation (sign up/sign in) flow:

1. Person signs up either via a native app or the web. The app or the browser becomes the origin node. The database is only writable on this node at this point.

2. Person signs in using their password on a second node (either native or web). A database is created on this node and replicates with the origin database but it is read only at creation. The person is asked to sign into an existing node and approve the new node.

    {{<figure src="authorisation-via-ephemeral-message.jpeg" alt="Description is in the caption" caption="Whiteboard sketch showing sign up (origin node) and sign in (read-only node) and the means available for peer-to-peer authorisation request of nodes via an encrypted ephemeral messaging channel.">}}

3. The second node uses an encrypted ephemeral messaging channel extension to the Dat protocol to ask for authorisation. This request is sent browser-to-browser via WebRTC, native-to-native via TCP, and browser-to-native and native-to-browser via WebSocket (the always-on node proxies the requests via WebSocket but it cannot see the contents of the messages as it is an unprivileged node and doesn’t have the secret key).

4. On the origin node (or, later, on any other authorised node), the person is prompted to authorise the new node. When they do, the new node becomes able to both read and write to the common database.


### Iteration plan

1. ~~✔ Refactor to create [reproducible local writers](https://github.com/mafintosh/hyperdb/issues/158)~~
2. ~~✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/manual-authentication-with-reproducible-local-writers)) Authenticate (manually) using the node name and reproducing the remote node’s local keys~~
3. ✔ ([pull request](https://github.com/beakerbrowser/dat-ephemeral-ext-msg/pull/1)) Update [DEP-0000: Ephemeral Message (Extension Message)](https://github.com/beakerbrowser/dat-ephemeral-ext-msg) to support hyperdb.
4. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/ephemeral-messaging-1)) Implement an [ephemeral messaging channel](https://github.com/beakerbrowser/dat-ephemeral-ext-msg) between nodes and use a JSON request to ask for authorisation of new nodes (WebRTC)
5. ✔ Also add the ephemeral messaging channel to replication over WebSocket
6. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/relay-1)) Also add the ephemeral messaging channel to replication over TCP
7. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/deduplication)) Add ephemeral message deduplication to the browser and native clients as messages may be received more than once due to the always-on node relay.
8. ✔ ([source](https://source.ind.ie/hypha/secure-ephemeral-messaging-channel)) Implement a secure ephemeral messaging channel as a Dat extension based on [DEP-0000: Ephemeral Message (Extension Message)](https://github.com/beakerbrowser/dat-ephemeral-ext-msg).
9. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/secure-messages-1)) Implement the secure ephemeral messaging channel in the spike. (Currently only on WebRTC replication.)
10. ✔ ([tag](https://source.ind.ie/hypha/secure-ephemeral-messaging-channel/tags/unprivileged-relay-nodes)) Extend the secure ephemeral messaging channel to support unprivileged relay nodes (the always-on nodes).
11. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/secure-messages-2)) Implement secure ephemeral messaging channel on WebSocket connection. (Encrypted messages are now relayed by the always-on node.)
12. ✔ Update the native app (mock) to accept a secret key and set up the secure ephemeral messaging channel over a TCP connection.
13. ✔ ([tag](https://source.ind.ie/hypha/spikes/multiwriter-2/tags/secure-messages-3)) Fix: allow any authorised node to authorise any other node.

### Pushed to later spikes:

1. Create a higher level Hypha authentication library with a simpler API that abstracts away the messaging aspect (@hypha/auth)
2. Add options to interface to selectively enable replication over WebSocket or WebRTC or both for testing.
3. Clean up the interface and carry out some general housekeeping on the code.

## Future plans

Release the authentication functionality as a stand-alone module that can be used across projects – e.g., @hypha/auth


## Upcoming spikes

  * persistence
  * multiwriter hyperdrive


### Security considerations

* Authentication is stateless and handled via encrypted messages over an encrypted connection. Valid handled messages could be stored in the persistent database and used to protect against replay attacks (this would require a man in the middle attack on an encrypted connection with very little possible gain as the message can only be acted upon from a writeable node. If an adversary has the writeable node already, they would not need to request authorisation. The only scenario I can think of is if they somehow came across a read-only node that had requested authorisation but hadn’t been granted it.)

* As the messages are sent over an ephemeral messaging channel they cannot be used to denial of service the database as they are not persisted. They also cannot be used to denial of service the person’s experience (e.g., by causing endless alerts) as any messaged not encrypted with the secret key is simply discarded. Other techniques (rate limiting, etc.) can also be employed in a manner similar to how they are used in traditional APIs.

* Hypha is app and browser-based. If a device containing authorised nodes is lost and stolen that is outside of Hypha’s jurisdiction. Proper device security should be employed (i.e., auto lock, password on lock, full-disk encryption). That said, if an unlocked device with an authorised Hypha node is compromised, we could consider having a ‘compromised’ message replicate to the other nodes. If the legitimate owner is still in possession of multiple nodes, they could send a compromised message from all those nodes, strengthening the trust in the message. Regardless, a single compromised message should be cause to not trust the database any longer. Additionally, the always-on node can be updated with a new database backed-up from the old one and Dat DNS could be used to point to the new database to enable the person to continue where they left off.

* The secret keys are never persisted on nodes. They are regenerated as necessary from the passphrase.

* If the always-on node is compromised, the adversary cannot write to the person’s database as the always-on node is an unprivileged node and has read-only access. If we decide to use Dat DNS (either host-based or DNS-record based), it could be used by an adversary to spoof the person’s database and replace it with another for anyone relying solely on the lookup. However, clients could check for changes in the read key and consider that a compromise unless the change is, for example, written into the database itself.

* If both a writable node and the always-on-node are compromised that particular aspect of the person should be considered compromised.

## Postmortem

In this spike, I added hyperdb support to Paul Frazee’s dat-ephemeral-ext-msg module and created an end-to-end encrypted secure messaging channel for use between nodes owned by the name person: [secure-ephemeral-messaging-channel](https://source.ind.ie/hypha/secure-ephemeral-messaging-channel).

Any authenticated node can now securely authorise any other node as a writer.

Up to this point, the spikes have been using random-access-memory as the storage layer. In the next spike, I will expore persistence. My plan is to then look at the auth module refactor once the sign up/sign in process more closely implements real-world behaviour.

## Reference

  * [Dat Ephemeral Message Extension](https://github.com/beakerbrowser/dat-ephemeral-ext-msg)
  * [Hyperdb architecture](https://github.com/mafintosh/hyperdb/blob/master/ARCHITECTURE.md)
  * [Hyperdb authorisation guide](https://github.com/lachenmayer/hyperdb-authorization-guide)
  * [The definitive replication and authorization guide (github issue)](https://github.com/mafintosh/hyperdb/issues/153)
  * [How DAT works](https://datprotocol.github.io/how-dat-works)
  * [Hyperlog-style semantics with hypercore/hyperdb?](https://github.com/mafintosh/hyperdb/issues/58)
  * [Multiwriter hyperdb WIP pull request](https://github.com/mafintosh/hyperdrive/pull/204)

## Historic links (Heartbeat – 2014)

[Heartbeat](https://2017.ind.ie/heartbeat/) was the initial precursor to Hypha. We were limited by lack of control over the replication engine we had chosen ­(syncthing). Other limitations were: it was single writer/device, it had a privileged centralised signalling server. That said, it basically used [kappa architecture](http://ar.al/2018/12/15/kappa-architecture-workshop/) (although the term was independently being coined at about the same time) and did solve some of the same challenges we need to solve now using the Dat protocol/ecosystem. The design is very close to that of [Cabal](https://github.com/cabal-club/cabal) but with the addition of authentication and private messaging.

  * [Heartbeat pre-alpha release](https://forum.ind.ie/t/heartbeat-pre-alpha-release/740)
  * [Heartbeat conceptual design](https://forum.ind.ie/t/pre-alpha-conceptual-design/25)
  * [Heartbeat technical design](https://forum.ind.ie/t/pre-alpha-technical-design/42)
  * [Heartbeat sequence diagrams](https://forum.ind.ie/t/pre-alpha-core-sequence-diagrams/34)

## Interesting links

  * [DatFS](https://github.com/fsteff/DatFS)
  * [Hyperidentity](https://github.com/poga/hyperidentity)
  * [hypercore-encrypted](https://github.com/aral/hypercore-encrypted)
  * [hyperdb-encrypted](https://github.com/fsteff/hyperdb-encrypted)
