---
title: "Hypha Spike: Deployment 1"
date: 2019-01-05T23:40:29Z
tags:
  - hypha
draft: false
---

[Source code](https://source.ind.ie/hypha/spikes/deployment-1)

Wait, what, we’re deploying [Hypha](https://ar.al/2018/12/07/baby-steps/) ([subscribe via RSS](/tags/hypha/index.xml)) – but we haven’t even built it yet?!

Exactly.

## Philosophy

  * [The post-Web is single tenant](/2019/01/09/the-post-web-is-single-tenant/)
  * [Success criteria for the PC 2.0 era](/2019/01/09/success-criteria-for-the-pc-2.0-era/)
  * [Deployment-first development](/2019/01/09/deployment-first-development/)

## Design and scope limitation for the spike

There are two interrelated processes to deploying your own instance of Hypha:

1. Domain registration and/or DNS setup
2. VPS server setup
3. TLS setup

There is a somewhat cyclic relationship between these three steps as they each depend on the other for certain information.

The DNS setup requires the IP address of the server and the server needs to know the domain that it will be responding for. To complicate things a little more, the domain name has to propagate before we can obtain a free TLS certificate from [Let’s Encrypt](https://beakerbrowser.com/).

Also, steps 1 and 2 have a commercial aspect.

For the purposes of this spike, I want to concentrate only on Step 2: automating the VPS server setup.

## Cloud-init

VPS accounts are available for a couple of euros per month these days and many support cloud-config syntax ([examples](https://cloudinit.readthedocs.io/en/latest/topics/examples.html#yaml-examples)) via [the cloud-init standard](https://cloud-init.io/) by Canonical as part of the new instance provisioning process via a ‘user data’ field on their online forms or via their APIs. [Supported operating systems](https://cloudinit.readthedocs.io/en/latest/topics/availability.html) include Ubuntu, Fedora, Debian, RHEL, CentOS, and others.

In this spike, I’m going to explore using cloud-init to set up a server so that we can automatically:

  * Install the latest Long-Term Support (LTS) version of [Node.js](https://nodejs.org/en/) in a manner that would make it easy to perform updates on it.

  * Clone and run an empty (‘hello world’) version of Hypha.

Thankfully, Canonical has a tool called [multipass](https://github.com/CanonicalLtd/multipass) that lets you easily spin up Ubuntu instances locally [and pass them a cloud-init file](https://blog.ubuntu.com/2018/04/02/using-cloud-init-with-multipass). I’ll be using that to iterate on the cloud-init script.

### Notes

  * [Spike source code repository](https://source.ind.ie/hypha/spikes/deployment-1)

  * [cloud-init documentation](https://cloudinit.readthedocs.io/en/latest/)

  * cloud-init format supports Gzip compression as [user-data is limited to ~16,384 bytes](https://cloudinit.readthedocs.io/en/latest/topics/format.html#gzip-compressed-content).

#### Add an account so you can ssh into the instance

{{<highlight yaml>}}
#cloud-config
users:
  - name: <INSERT ACCOUNT NAME HERE>
    groups: sudo
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh-authorized-keys:
      <INSERT SSH PUBLIC KEY HERE>

{{</highlight>}}

Replace `<INSERT ACCOUNT NAME HERE>` with the account name you want (e.g., this is the `<account name>@<your instance ip>` that you will use to SSH into the instance).

Replace `<INSERT SSH PUBLIC KEY HERE>` with your public SSH key, which you can most likely find in `~/.ssh/id_rsa.pub`.

For example, if your account name is _indie_, you want the instance to be called _hypha_, and you save the above file as _cloud-init.yaml_, you can start up a new instance and connect to it over SSH:

  1. Create an launch the hypha instance:

    {{<highlight bash>}}multipass launch --name hypha --cloud-init cloud-init.yaml{{</highlight>}}

  2. List the available instances to find the IP address of the new hypha instance (e.g., 10.83.214.166):

    {{<highlight bash>}}multipass list{{</highlight>}}

  3. Connect via SSH:

    {{<highlight bash>}}ssh indie@10.83.214.166{{</highlight>}}

Here is a good article on [users and groups](https://serversforhackers.com/c/permissions-and-user-management).

For the final cloud init file, with many more tasks, see [cloud-init.yaml](https://source.ind.ie/hypha/spikes/deployment-1/blob/master/cloud-init.yaml) and read the comments.

## Thoughts/to-dos/questions

  * Since TLS setup with Let’s Encrypt depends on domain name propagation, it is the last thing we must do (and is thus outside the scope of this spike). See [dns-01 verification](https://www.aaflalo.me/2017/02/lets-encrypt-with-dehydrated-dns-01/) ([examples](https://github.com/lukas2511/dehydrated/wiki/Examples-for-DNS-01-hooks)). Can be used along with [Lexicon](https://github.com/AnalogJ/lexicon) for manipulating DNS records in a standardised way across providers. e.g., See [this Dehydrated hook for Namecheap + Let’s Encrypt](https://github.com/aral/dehydrated_namecheap_dns_api_hook?organization=aral&organization=aral). Also interesting, IWantMyName has [a Dynamic DNS interface](https://iwantmyname.com/developer/domain-dns-api) which [could possibly be used for this](https://github.com/hughdavenport/letsencrypt-iwantmyname-hook/issues/1).

  * Node.js is perfectly capable as its own server and does not need to be proxied (e.g., by nginx) for single-tenant use.

  * ✓ ~~Add link to spike source code repository~~

  * How long does server setup take?

    About ~2 minutes 30 seconds. 2 minutes of that is our custom initialisation and 30 seconds the generic server setup. That incudes apt update/upgrade, Node.js install, PM2 install, etc.

  * Test the cloud-init script with a number of different hosts.

## To explore in future spikes

  * Domain registration and DNS setup via third-party service and API.

  * Native app that handles onboarding (domain registration, DNS setup, VPS setup, TLS setup, and app setup) in a seamless experience.

  * As above but with the integration of a payment step for the domain registration and hosting.

## Postmortem

We can get a server up and running with a Node.js app in ~ 2 minutes 30 seconds without any optimisations. This could be hugely optimised for everyday use later by having prebuilt server images but it is entirely acceptable as-is for use by developer to deploy their own copy of Hypha. Even when TLS is supported, the longest part of a developer getting up and running with their own node of Hypha will be the DNS propagation.

## References

### TLS

  * [mkcert](https://github.com/FiloSottile/mkcert): a simple zero-config tool to make locally trusted development certificates with any names you'd like

### Server setup

  * [multipass](https://github.com/CanonicalLtd/multipass): orchestrate virtual Ubuntu instances (supports cloud-init)
  * [cloud-init](https://cloud-init.io/): the standard for customising cloud instances
  * [NodeSource Node.js binary distributions](https://github.com/nodesource/distributions): [for Ubuntu](https://github.com/nodesource/distributions#deb), etc.
  * [PM2](https://github.com/Unitech/pm2): Node.js Production Process Manager with a built-in Load Balancer.

### Promising discoveries

(Unused in current spike but might be useful in the future.)

  * [greenlock-express](https://github.com/Daplie/greenlock-express): Free SSL and managed or automatic HTTPS for node.js with Express…
  * [nodenv](https://github.com/nodenv/nodenv): for managing node versions in production


