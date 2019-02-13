---
title: "Hypha Spike: Persistence 1"
date: 2019-02-12T14:18:04Z
draft: false
---

---
__2019/02/12: This is a Work In Progress (WIP).__ I will be live-updating this post as I work on the spike. If you want to get streaming updates without having to refresh your browser, [open the DAT version](dat://ar.al/2019/02/12/hypha-spike-persistence-1/) in [Beaker Browser](https://beakerbrowser.com/) and toggle the _live reloading_ feature. Please feel free to [talk to me about this](https://mastodon.ar.al/@aral) on the fediverse as I work on it, perhaps via [Mastodon](https://joinmastodon.org).

{{< lastmodified >}}

---

## Source

  * [source.ind.ie/hypha/spikes/persistence-1](https://source.ind.ie/hypha/spikes/persistence-1) (canonical location)
  * [Github mirror](https://github.com/indie-mirror/hypha-spike-persistence-1) (pull requests, issues, etc. welcome)


## Scope

Following on from [Hypha Spike: Multiwriter 2](/2019/01/01/hypha-spike-multiwriter-2) this spike aims to:

  * Use persistent storage
  * Evolve the sign up / sign in processes accordingly


## Design

{{<figure src="flow.jpeg" alt="Screenshot of the flow to be implemented in this spike. The details are explained in the text below." caption="Implementing persistance and getting closer to the actual flow.">}}

1. Domain registration + hosting setup (out of scope, although see [Hypha Spike: Deployment 1](/2019/01/05/hypha-spike-deployment-1/))

2. Origin node setup: an uninitialised always-on node is hit: the setup page is delivered. In browser (and, later, also via native app), person chooses a generated Diceware passphrase. The node that the person is using becomes the origin node.

3. Origin node replicates to the unprivileged always-on node via WebSocket. At this point the always-on node is initialised and set to replicate that particular database only.

4. The person sees themselves as signed in and can post entries. (For the purposes of this spike, simple text-only public posts – just so we have some data and can see things replicate.)

5. On some other node (browser or native), person accesses the domain. They can see the public posts as we set up a read-only local database and replicate them. We know which database to replicate based on a [Dat-DNS](https://www.datprotocol.com/deps/0005-dns/) lookup via the __.well-known/dat__ location on the domain of the always-on node. __See security note 1.__

    They do not see the positing interface. Instead, they see a passphrase field (not shown in above whiteboard sketch) and a sign in button. Entering a passphrase creates the deterministic keys and proceeds to request authorisation via the [secure ephemeral messaging channel](https://source.ind.ie/hypha/secure-ephemeral-messaging-channel). The person is asked to authorise the request from an existing node (e.g., the browser(/native app*) they set up from). _* out of scope for this spike._

6. On a previously-authorised node (e.g., the origin node), the person approves the authorisation request.

7. On the newly-authorised node, the person sees the posting interface and can now write to the database.

### Iteration plan

1. Implement [random-access-idb](https://github.com/random-access-storage/random-access-idb) in the browser node.
2. Implement [random-access-file](https://github.com/random-access-storage/random-access-file) in the always-on node.
3. Update interface and flow according to the design notes above.

## Future plans

  * Create a higher level Hypha authentication library with a simpler API that abstracts away the messaging aspect (@hypha/auth)
  * Tie in with [Hypha Spike: Deployment 1](/2019/01/05/hypha-spike-deployment-1/)
  * Add options to interface to selectively enable replication over WebSocket or WebRTC or both for testing.
  * Clean up the interface and carry out some general housekeeping on the code.

## Upcoming spikes

  * multiwriter hyperdrive (carried over from multiwriter-2)


### Security considerations

1. __Regarding design step 5:__ Remember that the always-on node is untrusted and unprivileged. We could easily set it up so that it returns the Dat URL in the rendered source but we won’t be doing that. The unprivileged node will return unaltered source that we will verify using [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (out of scope for this spike). We will also implement trusted third-party audits of the source (this could, for example, be handled by a browser extension that compares the hashes received as well as the hash of the source code with the trusted hashes from the source code repository).

__Other:__ See [Hypha Spike: Multiwriter 2](/2019/01/01/hypha-spike-multiwriter-2)


## Postmortem

Spike is in progress.


## Reference

  * [random-access-idb](https://github.com/random-access-storage/random-access-idb): Random-access-compatible indexedDB storage layer.
  * [random-access-file](https://github.com/random-access-storage/random-access-file):  Continuous reading or writing to a file using random offsets and lengths.

Also see [Hypha Spike: Multiwriter 2 Reference](/2019/01/01/hypha-spike-multiwriter-2#reference)