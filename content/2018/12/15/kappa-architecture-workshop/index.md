---
title: "Kappa Architecture workshop"
date: 2018-12-15T18:04:33Z
tags:
  - hypha
  - p2p
  - indie
draft: false
---

[Kappa Architecture Workshop](https://kappa-db.github.io/workshop/build/01.html) is an excellent online resource by Stephen Whitmore (of [Cabal](https://github.com/cabal-club/cabal) fame), Mathias Buus (one of the cornerstones of [the DAT Project](https://datproject.org)), [et al.](https://github.com/mafintosh), that gives you an introduction to [Kappa Architecture](http://milinda.pathirage.org/kappa-architecture.com/) using modules from the DAT Node.js ecosystem like [hypercore](https://github.com/mafintosh/hypercore), [multifeed](https://github.com/noffle/multifeed), [discovery-swarm](https://github.com/mafintosh/discovery-swarm)[^1] and [kappa-core](https://github.com/hyperswarm/discovery)[^2].

The examples take you from the very basics – such as how to make peer to connections and send simple ephemeral chat messages (code below) to [P2P replicated feeds with multiple writers](https://github.com/aral/kappa-architecture-workshop-work-files/blob/master/multi-chat.js) and beyond.

You can follow along with the workshop [online](https://kappa-db.github.io/workshop/build/01.html), view [my working files](https://github.com/aral/kappa-architecture-workshop-work-files) as I do, and also submit any issues you may run into or [improvements you might want to suggest](https://github.com/kappa-db/workshop/pulls) on [the workshop’s source code repository](https://github.com/kappa-db/workshop).


{{<highlight javascript>}}
const discovery = require('discovery-swarm')
const swarm = discovery()

const nickname = 'person' +  Math.floor(Math.random() * 42) + 1

swarm.join('my-very-very-simple-p2p-app')

swarm.on('connection', function (connection, info) {
  console.log(`Found a peer: ${info.host}:${info.port}`)

  process.stdin.on('data', function (data) {
    connection.write(JSON.stringify({
      type: 'chat-message',
      nickname,
      text: data.toString().trim(),
      timestamp: new Date().toISOString()
    }))
  })

  connection.on('data', function (data) {
    data = JSON.parse(data)
    console.log(`${data.timestamp} ${data.nickname}: ${data.text}`)
  })
})
{{</highlight>}}

[^1]: See the new, improved version called [hyperswarm](https://github.com/hyperswarm/network), which you should be able to replace discovery-swarm with in the examples in the workshop.

[^2]: For an example of kappa-core in use in a real-world library, see [cabal-core](https://github.com/cabal-club/cabal-core), the – uhum ­– _core_ of [Cabal](https://github.com/cabal-club/cabal).