---
title: "Hypha: Glossary"
date: 2019-02-18T10:05:48Z
draft: false
---

__This is a work-in-progress glossary of terms for Hypha.__


| Term | Description |
| ---- | ----------- |
| Hypha | A __small technology__ [peer web](https://ar.al/2019/02/13/on-the-general-architecture-of-the-peer-web/) platform (work-in-progress) that provides individual sovereignty over those aspects of your self that you choose to express digitally and a means of communicating with others on your own terms without third-party mediators or filters. Hypha is free software and peer to peer. It aims to create a bridge from the centralised web to the peer web. Hypha is based on [the Dat ecosystem](https://datproject.org). |
| Small Technology | Technology created by organisations for which exponential growth and making a billion dollars or “becoming a unicorn” is a failure state. Technology designed for individuals that respects, protects, and strengthens the integrity and dignity of the person and thus provides the basis for a healthy commons. Technology designed to further social justice. |
| A hypha | A single database that replicates according to the protocols of the Hypha platform. A hypha is addressed on the centralised Web by a domain name and on the peer Web by its _hyphalink_. |
| Node | A node within a hypha is any location that replicates that particular hypha. |
| Initialised node | A node that has a local copy of a hypha set up (even if it has not replicated yet). |
| Uninitialised node | A node that does not have a local copy of a hypha set up yet. |
| Passphrase | A secret Diceware phrase generated with a process that has at least 100 bits of entropy. All key material used in a hypha, including the hyphalink, are generated from this passphrase. The passphrase is never stored anywhere (people are highly encouraged to store it in their password managers). |
| Domain | A centralised ICAAN domain that points to the Relay Node. |
| Relay Node | An _unprivileged_ __always-on__ node that can either be hosted first-party or (more commonly) third-party. The Relay Node: __a)__ provides distribution of the latest Hypha source to browser nodes (and perhaps, later, native nodes), __b)__ acts as a bridge between the centralised web and the peer web by __i)__ providing findability, __ii)__ bridging replication between browser and native nodes, __c)__ provides signalling etc. (e.g., for WebRTC), and __d)__ provides availability. The domain points to the relay node. |
| Hyphalink | An Ed25519 public key that uniquely identifies a Hypha. A discovery key generated from this key is used with [Hyperswarm](https://github.com/hyperswarm/network) to provide peer-to-peer findability for hyphas. |
| Authorised node | An initialised node that has write privileges for a hypha. |
| Unauthorised node | An initialised node that has read-only access for a hypha. |
| Signed-in node | An authorised node with an unlocked local writer. |
| Signed-out node | An authorised node with a locked local writer. |
| Origin node | The initial database that’s created for a hypha. The only purpose of the origin node is the authorise the first writer. |
| Writer | Any node with write privileges. Synonymous with authorised node. |
| Reader | Any node with real-only privileges. Synonymous with unauthorised node. |
