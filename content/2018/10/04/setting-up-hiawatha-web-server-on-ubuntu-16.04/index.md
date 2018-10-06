---
title: "Setting up Hiawatha web server on Ubuntu 16.04"
date: 2018-10-04T17:09:00+02:00
draft: false
---

The unfortunately-named [Hiawatha web server](https://www.hiawatha-webserver.org) with its problematic logo[^1] is an independent, non-commercial, free and open web server built by Dutchman Hugo Leisink as a hobby project for the last 15 years or so. It’s primarily focused on security and the author appears to have [a no-nonsense approach to its development](https://www.hiawatha-webserver.org/weblog/123).

<iframe src="https://mastodon.ar.al/@aral/100825658318496939/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400"></iframe><script src="https://mastodon.ar.al/embed.js" async="async"></script>

## Installing Hiawatha on Ubuntu

You can install Hiawatha on [various platforms](https://www.hiawatha-webserver.org/download), including Linux, macOS, and Windows[^2].

To test it out, I first installed it [from source](https://www.hiawatha-webserver.org/howto/compilation_and_installation) on an Ubuntu 18.04 machine I commissioned from my regular host, [CloudScale](https://cloudscale.ch). While that worked, it was rather involved. If you are going to install it, I would highly recommed using [the Hiawatha apt package](https://launchpad.net/~octavhendra/+archive/ubuntu/hiawatha). Sadly, there isn’t one for 18.04 yet so you’ll have to use 16.04.

## Installing via apt

To begin, add the apt repository to your system, update your packages, and install the Hiawatha apt package:

{{<highlight bash>}}
sudo add-apt-repository ppa:octavhendra/hiawatha
sudo apt update
sudo apt upgrade
sudo apt install hiawatha
{{</highlight>}}

That will install the server but it will not run it. To do that, you need to use systemd:

{{<highlight bash>}}
sudo systemctl enable hiawatha
sudo systemctl start hiawatha
{{</highlight>}}

That will set up Hiawatha to be started automatically on restarts and start it up for the first time.

If you go to your domain/IP at this point, you should see the default Hiawatha welcome page.

## Configuration

One of the goals of Hiawatha is to be easy to configure and to provide sane, safe defaults. To that end, once I learned the basics, I did find it much easier to understand than my regular web server, nginx.

The following is my setup[^3].

### Highlights:

  * Binds to port 80 (insecure; we will set up TLS later)
  * Binds to both IPv4 and IPv6

### Directory details:

  * Hiawatha’s general logs: _/var/log/hiawatha_
  * The default web site (this should be an empty page to thwart IP scanners as recommedended in the default configuation file comments): _/var/www/default_
  * My web site’s root: _/var/www/equinodal.org/public_

### Configuration file:

{{<highlight yaml>}}
#
# General settings.
#
ConnectionsTotal = 1000
ConnectionsPerIP = 25
SystemLogfile = /var/log/hiawatha/system.log
GarbageLogfile = /var/log/hiawatha/garbage.log

#
# Insecure servers (IPv4 and IPv6).
#
Binding {
  Port = 80
}

Binding {
  Port = 80
  Interface = 2a06:c01:1:1104::9349:73
}

#
# Default site.
#
# The default website is just a blank webpage. This is to thwart automated
# scanners as recommended in the default configuration.
Hostname = 127.0.0.1
WebsiteRoot = /var/www/default
StartFile = index.html
AccessLogfile = /var/log/hiawatha/access.log
ErrorLogfile = /var/log/hiawatha/error.log

#
# Virtual hosts.
#
VirtualHost {
  Hostname = equinodal.org, www.equinodal.org
  WebsiteRoot = /var/www/equinodal.org/public
  AccessLogfile = /var/www/equinodal.org/log/access.log
  ErrorLogfile = /var/www/equinodal.org/log/error.log
}
{{</highlight>}}

To activate the current configuration:

{{<highlight bash>}}
sudo systemctl restart hiawatha
{{</highlight>}}

You should now be able to access your site from your domain over HTTP (port 80).

## TLS

Now that your site is up and running, it’s time to implement TLS. The days of HTTP are behind us, long live HTTPS.

### Download PHP CLI:

Hiawatha has [Let’s Encrypt](https://letsencrypt.org) support in the form of [a script you can download](https://www.hiawatha-webserver.org/letsencrypt) but it is written in PHP and so you will need a bit of setup:

{{<highlight bash>}}
sudo apt install php7-cli
{{</highlight>}}

### Dowload and install the Hiawatha Let’s Encrypt script:

Once you have the PHP CLI installed, [download the Let’s Encrypt script](https://www.hiawatha-webserver.org/letsencrypt) (get the ACME v2 version) and uncompress it:

{{<highlight bash>}}
cd /usr/local/etc
wget https://www.hiawatha-webserver.org/files/letsencrypt-2.0.tar.gz
tar -zxf letsencrypt-2.0.tar.gz
rm letsencrypt-2.0.tar.gz
cd letsencrypt
{{</highlight>}}

### Configure the Hiawatha Let’s Encrypt script:

In the _letsencrypt_ folder, you’ll find a configuration file named _letsencrypt.conf_ that you need to customise for your own needs.

The only changes I made were to add my email address for the `ACCOUNT_EMAIL_ADDRESS` field and to change the `HIAWATHA_RESTART_COMMAND` field to use systemd:

{{<highlight yaml>}}
HIAWATHA_RESTART_COMMAND = sudo systemctl hiawatha restart
{{</highlight>}}

You also have to create the _tls_ folder as specified by the `HIAWATHA_CONFIG_DIR` and `HIAWATHA_CERT_DIR` settings or the script will fail (this feels like a bug):

{{<highlight bash>}}
mkdir /etc/hiawatha/tls
{{</highlight>}}

### Request the TLS certificate from the staging server:

Once you’ve configured the script, you need to actually request the certificate. Initially, you will be using the Let’s Encrypt staging server to make sure that everything works and then you will switch to using the production server.

With the current script, requesting a certificate is a two-step process (this should really be simplified to a single step) that involves registering and requesting.

From the folder that contains the _letsencrypt_ script:

{{<highlight bash>}}
./letsencrypt register
./letsencrypt request equinodal.org
{{</highlight>}}

### Request the certificate from the production server:

Unless you changed the configuration file, the first attempt will use the Let’s Encrypt staging server. Once that runs correctly, you can change the configuration file to use the production server and actually get your certificates:

{{<highlight yaml>}}
# Let's Encrypt API settings
LE_CA_HOSTNAME = acme-v02.api.letsencrypt.org		# Production
LE_ISSUERS = Let's Encrypt Authority X3 \
             Let's Encrypt Authority X4
{{</highlight>}}

### Update your Hiawatha configuration to use TLS:

Now it’s time to update your configuration to implement TLS. Here’s what my configuration looks like with TLS enabled and required.

#### Highlights:

  * Forwards all connections to TLS
  * Gets an A on [the SSLLabs tests](https://www.ssllabs.com/ssltest/) (with the default settings)

#### Directories:

  * The TLS certificate (you will need to create this directory manually): _/etc/hiawatha/tls_

{{<highlight yaml>}}
#
# General settings.
#
ConnectionsTotal = 1000
ConnectionsPerIP = 25
SystemLogfile = /var/log/hiawatha/system.log
GarbageLogfile = /var/log/hiawatha/garbage.log

#
# Insecure servers (IPv4 and IPv6).
#
Binding {
  Port = 80
}

Binding {
  Port = 80
  Interface = 2a06:c01:1:1104::9349:73
}

#
# Secure servers (IPv4 and IPv6).
#
Binding {
  Port = 443
  TLScertFile = /etc/hiawatha/tls/equinodal.org.pem
}

Binding {
  Port = 443
  Interface = 2a06:c01:1:1104::9349:73
  TLScertFile = /etc/hiawatha/tls/equinodal.org.pem
}

#
# Default site.
#
# The default website is just a blank webpage. This is to thwart automated
# scanners as recommended in the default configuration.
Hostname = 127.0.0.1
WebsiteRoot = /var/www/default
StartFile = index.html
AccessLogfile = /var/log/hiawatha/access.log
ErrorLogfile = /var/log/hiawatha/error.log

#
# Virtual hosts.
#
VirtualHost {
  Hostname = equinodal.org, www.equinodal.org
  WebsiteRoot = /var/www/equinodal.org/public
  RequireTLS = yes
  AccessLogfile = /var/www/equinodal.org/log/access.log
  ErrorLogfile = /var/www/equinodal.org/log/error.log
}
{{</highlight>}}

The only changes are the addition of secure IPv4 and IPv6 binding sections for TLS that reference the Let’s Encrypt certificate and the addition of the `RequireTLS = yes` setting to the virtual host.

Restart your server and you should be up and running over HTTPS:

{{<highlight bash>}}
sudo systemctl restart hiawatha
{{</highlight>}}

## Node.js with a reverse proxy

The above is all you need if you want to host a static site with Hiawatha but what if you want to host your Node.js site? For that, we need to configure a reverse proxy and it is stupidly simple to do.

First, [install Node.js on your server](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) if you haven’t already:

{{<highlight bash>}}
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
{{</highlight>}}

Then, create a project to hold a very simple test server:

{{<highlight bash>}}
mkdir ~/node-server && cd ~/node-server
npm init -y
nano index.js
{{</highlight>}}

In _index.js_:

{{<highlight javascript>}}
const http = require('http')

const server = http.createServer((request, response) => {
  response.statusCode = 200
  response.end('Hello from Node.js!\n')
})

server.listen(3000)
{{</highlight>}}

Run the Node server[^4]:

{{<highlight bash>}}
node index.js
{{</highlight>}}

In another ssh session (or terminal window if local), test that the Node server works:

{{<highlight bash>}}
curl http://localhost:3000
{{</highlight>}}

You should see something like:

{{<highlight bash>}}
ubuntu@equinodal:~/spike$ curl http://localhost:3000
Hello from Node.js!
{{</highlight>}}

So, now, all we need to do is to update our Hiawatha configuration to use a reverse proxy that forwards all requests to our Node server. You do this in the virtual host section:

{{<highlight yaml>}}
VirtualHost {
  Hostname = equinodal.org, www.equinodal.org
  ReverseProxy .* http://localhost:3000/
  WebsiteRoot = /var/www/equinodal.org/public
  RequireTLS = yes
  AccessLogfile = /var/www/equinodal.org/log/access.log
  ErrorLogfile = /var/www/equinodal.org/log/error.log
}
{{</highlight>}}

The only change is the addition of the `ReverseProxy` setting. (For some reason, the virtual host still needs the `WebsiteRoot` setting even though it is overriden by the reverse proxy setting.)

Restart the Hiawatha server and make sure that your Node server is running and you should be able to access it over TLS via your domain.

## Conclusion

Hiawatha feels like a great alternative to nginx and other heavier web servers for personal projects and I look forward to using it in some of mine. I do hope that Hugo will do something to update the problematic name and iconography for 2018 so that I don’t have any reservations when I recommend it to others. If you do give it a shot, [let me know how you get on](https://mastodon.ar.al) via [Mastodon](https://joinmastodon.org).


[^1]: [Cultural appropriation](https://en.wikipedia.org/wiki/Cultural_appropriation) is never fun. [Hiawatha](https://en.wikipedia.org/wiki/Hiawatha) is [#NotYourMascot](https://duckduckgo.com/?q=%23notyourmascot). I do hope that Hugo will reconsider the naming and iconography of an otherwise excellent project.

[^2]: Note the following [caveat](https://www.hiawatha-webserver.org/download) for Windows: “I've never fully tested the impact that Cygwin or Windows has on Hiawatha, so don't use the Windows version for production websites unless you've tested it yourself.”

[^3]: Don’t try and access the site itself, I’m just using that domain to test with so it will most likely be offline.

[^4]: Normally, you would run the server with a script like [forever](https://github.com/foreverjs/forever).