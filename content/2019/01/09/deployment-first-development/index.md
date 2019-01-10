---
title: "Deployment-first development"
date: 2019-01-09T11:59:46Z
tags:
  - hypha
  - philosophy
  - peerocracy
draft: false
---

Independent technology – [ethical technology](https://ind.ie/ethical-design) – must be as accessible as possible for its intended audience at every step of the process. That doesn’t mean it must be accessible as possible to _everyone_ at every stage in its development but rather it should be accessible as possible for the people that are working on it or with it at any given point.

Hypha is currently at the start of its development stage and thus must be as accessible as possible to developers who want to follow along with its development, run it themselves, and possibly fork it off and try new things with it.

One of the greatest barriers to trying out new free and open source web-related projects is the difficulty in deploying them. This is because nearly all web-related projects are designed as multi-tenant services. They are designed to scale to being used by thousands if not millions or billions of people. And that brings with it a whole slew of complexity.

Case in point: I spent hours and failed the first time I tried to deploy [Mastodon](https://joinmastodon.org)[^1]. One of my developers on the Ghent project last year gave up after struggling with it for most of a day. While I eventually managed to deploy Mastodon for myself initially via a “serverless” Heroku-ish service and, eventually, from source, today I do not maintain my own Mastodon instances. Instead, I offload that complicated and involved task to the wonderful Hugo who runs [masto.host](https://masto.host).

Which is why I’m looking into [deployment-first development with Hypha](/2019/01/05/hypha-spike-deployment-1/).

## See also

  * [The post-Web is single tenant](/2019/01/09/the-post-web-is-single-tenant/)
  * [Success criteria for the PC 2.0 era](/2019/01/09/success-criteria-for-the-pc-2.0-era/)
  * [Hypha deployment 1 spike](/2019/01/05/hypha-spike-deployment-1/)

[^1]: I love Mastodon. [Here’s mine.](https://mastodon.ar.al/@ind.ie) [Here’s Ind.ie’s.](https://mastodon.ind.ie/@indie) But it’s not personal technology. It is not single tenant. It has the complexity of a system that can host hundreds of thousands of people on a single instance. We are not building that. We are building for instances of one.
