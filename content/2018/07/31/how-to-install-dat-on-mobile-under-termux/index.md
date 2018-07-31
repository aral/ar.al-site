---
title: "How to install DAT on mobile under Termux"
date: 2018-07-31T17:21:29+01:00
draft: false
---

The instructions below document how to install DAT[^1] under [Termux](https://termux.com/) and have been tested on [LineageOS](https://lineageos.org) 15.1 running on an S9+[^2]:

1. __Install dependencies__[^3]

    {{< highlight bash >}}pkg install libtool autoconf automake python2 nodejs{{< /highlight >}}

2. __Patch node-gyp__

    There is [a bug in node-gyp](https://github.com/termux/termux-packages/issues/307#issuecomment-244601906) that prevents the installation of node projects that use native libraries. To fix it, you need to apply the changes shown in the following patch to the [common.gypi file](https://github.com/nodejs/node/blob/master/common.gypi) in your Node installation:

    {{< highlight patch >}}
--- a/common.gypi
+++ b/common.gypi
@@ -90,8 +90,8 @@
             'ldflags': [ '-Wl,-bbigtoc' ],
           }],
           ['OS == "android"', {
-            'cflags': [ '-fPIE' ],
-            'ldflags': [ '-fPIE', '-pie' ]
+            'cflags': [ '-fPIC' ],
+            'ldflags': [ '-fPIC' ]
           }],
           ['node_shared=="true"', {
             'msvs_settings': {
@@ -144,8 +144,8 @@
             'cflags': [ '-fno-omit-frame-pointer' ],
           }],
           ['OS == "android"', {
-            'cflags': [ '-fPIE' ],
-            'ldflags': [ '-fPIE', '-pie' ]
+            'cflags': [ '-fPIC' ],
+            'ldflags': [ '-fPIC' ]
           }],
           ['node_shared=="true"', {
             'msvs_settings': {{{< /highlight >}}

    You can either do this manually by editing the file by hand, or, if you’re on the same version as me (Node 8.11.3), you can use the following command to automatically apply [the patch](android.patch) I generated:[^4]

    {{< highlight bash >}}curl https://ar.al/2018/07/31/how-to-install-dat-on-mobile-under-termux/android.patch -o android.patch && patch ~/.node-gyp/8.11.3/include/node/common.gypi android.patch{{< /highlight >}}

3. __Install DAT__

  Now that your environment is ready, you should be able to install DAT in the regular way:

  {{< highlight bash >}}npm install -g dat{{< /highlight >}}

### References

  * [Building Node-Sass || LibSass-Python Natively on Android 6 & 7](http://blog.akehir.com/2017/05/building-node-sass-libsass-python.html)

[^1]: [DAT](http://datproject.org/) is one of the technologies currently vying to be the fundamental protocol of the peer-to-peer Web. In my opinion, it is also the most promising. It’s what powers the peer web elements of [this web site](https://ar.al/2018/06/15/hello-peer-to-peer-web/), it’s a core component of [Web+](https://ar.al/2018/06/26/web+/), and it’s what we’re basing our current and future work on at [Ind.ie](https://ind.ie).

[^2]: I’m currently running Termux on two devices: on my Nexus 5 under LineageOS 14.1 and on my S9+ under LineageOS 15.1. The instructions in this post have been tested and work on the S9+, which is a 64-bit device. I was able to get DAT to compile [but not run](https://github.com/datproject/dat/issues/1007) on the Nexus 5. Whether that was due to its 32-bit architecture or due to LineageOS 14.1, I cannot say for sure at the moment.

[^3]: You might want to do a `pkg upgrade` beforehand to make sure you have the latest and greatest of your currently-installed packages. If you already have the required dependencies this command should not hurt your setup, although it may update them to the latest versions. 

[^4]: android.patch (809 bytes, MD5: `2f0b9b25e4fa12f9d9db16e2f6616f7c`). To verify, download the patch and compare the result you get from running `md5sum android.patch` in Terminal with the MD5 hash presented here.
