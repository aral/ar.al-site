---
title: "A simple Node transform stream with the new Node 10 pipeline() function"
date: 2018-12-20T12:54:13Z
tags:
  - hypha
draft: false
---

As part of my research for [Hypha](/2018/12/07/baby-steps/) ([RSS](/tags/hypha/index.xml)), I just completed the [Kappa Architecture Workshop](/2018/12/15/kappa-architecture-workshop/) and I’m continuing to dive deeper down the stack to brush up on the fundamental concepts I need to be comfortable with going forward.

Next up is [Node streams](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_stream).

Streams are used everywhere in Node and while I’ve made extensive use of them in the past, there’s always been parts that seemed magical[^1]. I don’t really grok them and I’m working to change that.

So this morning I whipped up a little custom transform stream and got up to speed with the new `pipeline()` function in Node 10 that adds the functionality of Matthias’s [pump](https://github.com/mafintosh/pump) module to Node proper[^2].

The simple example takes the raw stream of characters (Buffer objects) you type from `stdin`, pipes them through a transform stream that uppercases the lowercase characters (and handles CTRL + C for exit) and then pipes it to `stdout` to display in your console.

{{<highlight js>}}
const { pipeline, Transform } = require('stream')
const { StringDecoder } = require('string_decoder')

// Handle the raw output from standard input
// (characters, not lines, as is the default).
process.stdin.setRawMode(true)
process.stdin.resume()

class UppercaseCharacters extends Transform {
  constructor(options) {
    super (options)

    // The stream will have Buffer chunks. The
    // decoder converts these to String instances.
    this._decoder = new StringDecoder('utf-8')
  }

  _transform (chunk, encoding, callback) {
    // Convert the Buffer chunks to String.
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk)
    }

    // Exit on CTRL + C.
    if (chunk === '\u0003') {
      process.exit()
    }

    // Uppercase lowercase letters.
    if (chunk >= 'a' && chunk <= 'z') {
      chunk = chunk.toUpperCase()
    }

    // Pass the chunk on.
    callback(null, chunk)
  }
}

// pipeline() is new in Node 10
pipeline(
  process.stdin,
  new UppercaseCharacters(),
  process.stdout,
  err => {
    if (err) {
      console.log('Pipeline failed: ')
    } else {
      console.log('Pipeline succeeded.')
    }
  }
)
{{</highlight>}}

You can achive the same thing on earlier versions of Node using the [pump](https://github.com/mafintosh/pump) module simply by replacing the `pipeline` function with the `pump` function:

{{<highlight js>}}
const pump = require('pump')
pump(
  process.stdin,
  new UppercaseCharacters(),
  // …
)
{{</highlight>}}

[^1]: Especially duplex/transform streams – `a.pipe(b).pipe(a)` is still a royal mindfuck, made a little more sane [via pump syntax](https://source.ind.ie/aral/kappa-chat/blob/master/index.js#L103).

[^2]: See [Why use pump?](https://gulpjs.org/why-use-pump/) from the Gulp documentation for an explainer.
