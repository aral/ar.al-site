---
title: "Get Unicode-aware length of string in JavaScript"
date: 2018-08-26T21:10:59+01:00
draft: false
---

`stringInstance.length` in JavaScript is not Unicode aware.

That means, for example, that the following code:

{{<highlight javascript>}}
"🤓".length
{{</highlight>}}

Will return 2, not 1.

If you want a Unicode-aware string length, use this function:

{{<highlight javascript>}}
function unicodeLength(str) {
  return [...str].length
}
{{</highlight>}}

Using that function, the following code:

{{<highlight javascript>}}
unicodeLength("🤓")
{{</highlight>}}

Will return 1.

## References

  * The function is based on the method by [daxim](https://stackoverflow.com/users/46395/daxim) in [his response](https://stackoverflow.com/questions/51396490/getting-a-string-length-that-contains-unicode-character-exceeding-0xffff#comment89813733_51396686) to the question [Getting a string length that contains unicode character exceeding 0xffff](https://stackoverflow.com/questions/51396490/getting-a-string-length-that-contains-unicode-character-exceeding-0xffff#comment89813733_51396686) on Stack Overflow.