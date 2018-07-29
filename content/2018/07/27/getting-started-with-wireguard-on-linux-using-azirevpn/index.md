---
title: "Getting started with WireGuard on Linux using AzireVPN"
date: 2018-07-27T11:05:32+01:00
draft: false
---

A [Virtual Private Network](https://en.wikipedia.org/wiki/Virtual_private_network) (VPN) can be a practical tool that reinforces your security and privacy when using an Internet-connected device. It is not a panacea, however. You should be aware of both your own [threat model](https://en.wikipedia.org/wiki/Threat_model) and the security and privacy traits of VPNs so you can use one responsibly and ensure that you don’t succumb to a false sense of security or privacy.

### What is a VPN?

A VPN is basically an encrypted (private) connection to some other network through which all your traffic – web browsing, email, chats, etc. – is routed. Since the connection is encrypted, the network you're currently connected to cannot eavesdrop on you. All your Internet Service Provider (ISP) or the open WiFi network you just connected to at your local cafe can see is that you’ve made an encrypted connection to your VPN provider but they cannot see any of the traffic that flows through that connection.

Similarly, as far as any sites you connect to are concerned, your traffic originates from the servers of your VPN provider and not your own machine. This is why VPNs are commonly used to thwart region-locking schemes by the likes of Netflix and their cohorts in the copyright lobby[^1].

In a nutshell, if you live in a somewhat free society and have an everyday threat model, a VPN limits the number of parties that can trivially eavesdrop on your Internet activity to just your VPN provider.

### On trust

> Never trust anything that can think for itself if you can't see where it keeps its brain.
>
> – J.K. Rowling, Harry Potter and the Chamber of Secrets

Given that you have to trust your VPN provider, the choice of VPN provider is what determines the level of security and privacy you get by using a VPN.

Nothing about the design of VPN implies that you should in any way trust VPN providers.

<iframe src="https://octodon.social/@cwebber/100442926544174062/embed" class="mastodon-embed"></iframe><script src="https://octodon.social/embed.js" async="async"></script>

It is trivial for your VPN provider (or your web host, if you're hosting your VPN server yourself) to violate your privacy. Your connection is encrypted between you and the private network you're connecting to but it is not end-to-end encrypted between your computer and the parties you're communicating with.

This is why you should never trust free (as in cost) VPN providers. How are they making their money if not by you paying them? What are you paying them with? (Remember, they can see all of your Internet activity.)

Even with a VPN provider that you’ve chosen to trust, you should connect to web sites only using [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (HTTPS) and use end-to-end-encrypted communication apps like [Wire](https://wire.com/en/unsupported/) and [Signal](https://signal.org/). If you need greater levels of anonymity (e.g., if you are sharing information that might result in your assasination by an autocratic regime), consider using [Tor](https://www.torproject.org/).

It might seem like I am rambling and not getting to the point of the post but I cannot stress how important it is that you understand the security and threat models of the tools that you use. If nothing else, remember that a VPN is only as trustworthy as the people who run it.

### So which VPN do you use and recommend?

I get this question a lot. So before I get to the point of the post (oh, ffs!), I want to cover this too.

On iOS and macOS, I use [Encrypt.me](https://www.encrypt.me/) (née Cloak). Why? Because my friend [Dave Peck](https://davepeck.org/) set it up and I trust Dave. Dave’s since sold the company but it still seems to be run by good folks.

When [I recently switched my main phone from an iPhone to one running LineageOS](/2018/07/16/changes/) and [asked them](https://twitter.com/aral/status/1014430133837582338) for an [Android application package](https://en.wikipedia.org/wiki/Android_application_package) (APK) – as I didn’t want to use the Google Play store – they responded immediately[^2] and sent it to me.[^3] In addition to iOS, macOS, and Android, Encrypt.me is also available on Windows.

{{< figure class="half-width-flush-right" src="encryptme.jpg" alt="The interface for Encrypt.me, with a blue background, a WiFi symbol and text that reads: “Connecte to bean&amp;leaf, an untrusted Wi-Fi network, and secured with Encrypt.me. There is also switch control that reads Encrypted and three icons at the bottom of the screen for choosing server locations (a pin icon), network settings (a lock icon), and account settings (a gear icon)." caption="Encrypt.me: a beautiful VPN experience." >}}

### On usability

The main reason I've been using Encrypt.me is its ease of use. You install and launch it and it just works. Also, it automatically blocks network traffic before the VPN connection has been established. This should be – but sadly isn’t – standard functionality in VPN clients to prevent [data leaks between Wi-Fi connect and VPN launch](https://arstechnica.com/information-technology/2015/06/even-with-a-vpn-open-wi-fi-exposes-users/).

Since [I switched my main machine to GNU/Linux](/2018/07/16/changes/) and Encrypt.me is currently not available for it, I signed up for [AirVPN](https://airvpn.org/), which describes itself as “a VPN based on OpenVPN and operated by activists and hacktivists in defence of net neutrality, privacy and against censorship.” AirVPN has [setup instructions for nearly every platform on the face of the planet](https://airvpn.org/enter/) and [an app called Eddie for GNU/Linux](https://airvpn.org/linux/) that implements an automatic network block feature that protects against data leaks in the time between you connect to a WiFi network and before a VPN connection can be established. 

{{< figure src="eddie.jpg" alt="The interface of Eddie, the AirVPN client for GNU/Linux" caption="Eddie: an (inter)face only a mother could love." >}}

Unlike Encrypt.me, however, you cannot mark certain networks as trusted and so it’s currently an all or nothing setting. Also, on my machine at least, it’s possible to lose the ability to access the app’s interface while it remains running in the background. And the kindest thing you can say about the interface itself is that it’s what happened when _what-the-fuck_ had a lovechild with _oh-hell-no!_[^4]

So those are the VPNs I currently use. If you were to ask me which VPN I’d unconditionally trust, however, I would say [iPredator](https://www.ipredator.se/).

Why?

Because it’s run by my friend [Peter](https://en.wikipedia.org/wiki/Peter_Sunde) and I trust Peter unconditionally. Also, I’ve been in the cool little bunker in Sweden where everything’s hosted and I know that Peter runs it on his own machines that only he and his crew have access to.

The reason I don’t use iPredator myself is because Encrypt.me and AirVPN have apps that make them easier to setup and use. So convenience wins yet again. (I almost feel like there’s a lesson to be learned here for those of us that make the new everyday things for everyday people but I just can’t seem to put my finger on it… 🤔)

And that also brings us, finally, to the subject of this post: WireGuard and how to set it up on Linux.

### WireGuard

[WireGuard](https://www.wireguard.com/) describes itself as a “fast, modern, secure VPN tunnel.”

Part of the reason VPNs can be hassle to host, install, and use is because they are – relatively speaking – based on ancient, bloated technology. The two main protocols in use today, [IPsec](https://en.wikipedia.org/wiki/IPsec) and [OpenVPN](https://en.wikipedia.org/wiki/OpenVPN) date from the Nineties and the Noughties and are behemoths weighing in at roughly 400,000 and 100,000 lines of code, respectively. In comparison, WireGuard is a recent protocol that uses modern cryptographic algorithms and weighs in at ~4,000 lines of code.

In programming, like in most things, less is usually better. As long as it doesn't come at the expense of obfuscating intent, fewer lines of code means fewer places things can go wrong and less to audit. 

That WireGuard is new, however, is both a blessing and a curse. It is currently labelled as a “work in progress” by its authors.

> WireGuard is not yet complete. You should not rely on this code. It has not undergone proper degrees of security auditing and the protocol is still subject to change. We're working toward a stable 1.0 release, but that time has not yet come. – [WireGuard](https://www.wireguard.com/)

If you can live with that and want to try out the future of VPNs today, read on as there are already VPN hosts beta testing the service. One of those is [AzireVPN](https://www.azirevpn.com), by a Swedish company called Netbouncer AB based in Stockholm. According to their [about page](https://www.azirevpn.com/about), they’ve been running [a WireGuard beta programme](https://www.azirevpn.com/wireguard) since September 2017.

### WireGuard on AzireVPN

AzireVPN makes its money selling VPN services but, for the duration of the WireGuard beta, you can use WireGuard for “free” (in other words, in exchange for helping them test it. Remember, nothing is ever truly free as in cost unless it is also free as in freedom.)

You can set things up on Android using [the WireGuard app](https://f-droid.org/en/packages/com.wireguard.android/) (which is available on the [F-Droid catalogue](https://f-droid.org/)) but installation on Linux currently requires use of the command line. You will need to install some packages that the installation script doesn’t automatically install, including [WireGuard itself](https://www.wireguard.com/install/).

### Installing

{{< figure src="installation.jpg" alt="Screenshot of terminal showing the output of the installer script" caption="The AzireVPN WireGuard installation is carried out through the terminal." >}}

1. [Install WireGuard](https://www.wireguard.com/install/). On Debian/Ubuntu-based distributions (like Pop!_OS):

    {{< highlight bash >}}sudo add-apt-repository ppa:wireguard/wireguard
sudo apt install wireguard{{< /highlight >}}

2. Install curl and jq (if you already have them installed, the following commands will not hurt your system. The installer should really do this, and the above step, for you):

    {{< highlight bash >}}sudo apt install curl
sudo apt install jq{{< /highlight >}}

3. Run the installer script[^5]:

    {{< highlight bash >}}curl -LO https://www.azirevpn.com/dl/azirevpn-wg.sh && chmod +x ./azirevpn-wg.sh && ./azirevpn-wg.sh{{< /highlight >}}

### Using

You activate and deactivate the WireGuard VPN connection using the terminal commands `wg-quick up` and `wg-quick down` with the name of the server you want to connect to as the second argument.

To connect to AzireVPN’s server in Stockholm, Sweden, for example, you would type:

{{< highlight bash >}}wg-quick up azirevpn-se1{{< /highlight >}}

Similarly, to disconnect from that server:

{{< highlight bash >}}wg-quick down azirevpn-se1{{< /highlight >}}

At the time I installed it, the servers available to me were:

| Location          | Connection Name |
| ----------------- | --------------- |
| Stockholm, Sweden | `azirevpn-se1`  |
| London, UK        | `azirevpn-uk1`  |
| Malaga, Spain     | `azirevpn-es1`  |
| Miami, US         | `azirevpn-us1`  |
| Toronto, Canada   | `azirevpn-ca1`  |

Once you’ve activated your VPN connection, you can check that it is working by visiting [AzireVPN’s security check page](https://www.azirevpn.com/check).

{{< figure src="security-check.jpg" alt="A screenshot of the AzireVPN Security Check page. Copy: Security Check: Make sure that all tests below are green before you proceed. We’re here to keep your privacy. Service status: all services operational. VPN: you are connected. DNS leak: You are not leaking DNS. WebRTC leak: You are not leaking WebRTC." caption="The AzireVPN Security Check page." >}}

[^1]: These are the bastards that [want to destroy how the Internet works](https://edri.org/the-eu-gets-another-opportunity-to-improve-copyright-rules/).

[^2]: Thank you, folks! I haven't had a chance to try it yet as I've been busy, but I will.

[^3]: [1password](https://1password.com/), on the other hand, [told me I could pound sand](https://twitter.com/1Password/status/1014993975407730688) when I asked them the same thing. The cost of being 1password’s customer, if you are running an Android Open Source Project (AOSP)-based mobile operating system like [LineageOS](https://lineageos.org/), is to be tracked and profiled by Google ([Alphabet, Inc.](https://en.wikipedia.org/wiki/Alphabet_Inc.)) Needless to say, I am actively considering alternatives to 1password as we speak.

[^4]: That said, the app is free and open source so anyone (hint, hint, maybe me?), can help make it better. And that’s just one reason why free and open source rocks.

[^5]: Before you download and run any script, you should really [download the script](https://www.azirevpn.com/dl/azirevpn-wg.sh) and check out what it does first. That script also downloads [a list of locations](https://api.azirevpn.com/v1/locations), so you might want to make sure that what’s in that file is kosher too before running it.