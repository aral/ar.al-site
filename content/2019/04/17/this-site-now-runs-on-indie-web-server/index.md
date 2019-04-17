---
title: "This site now runs on Indie Web Server"
date: 2019-04-17T17:38:18+01:00
draft: false
---

In the interests of eating my own hamster food[^1], I just switched this site from nginx to [Indie Web Server](https://ind.ie/web-server).

The only complication in the process was that I had to update the hostname of the server to match the domain name.

Otherwise, the whole process was basically as follows:

{{<highlight shell>}}
# Disable nginx.
sudo systemctl disable nginx

# Copy the web directory into a more human-sounding place
# (not necessary but I like it better, so there!)
cp -R /var/www/live.ar.al/html/ ~/site

# Update the hostname to match the domain.
sudo hostnamectl set-hostname ar.al

# Install Indie Web Server.
wget -qO- https://ind.ie/web-server/install.sh | bash

# Stop nginx.
sudo systemctl stop nginx

# Launch Indie Web Server as a startup daemon.
web-server enable
{{</highlight>}}

I also had to update the path in [my rsync-based deployment script](https://source.ind.ie/ar.al/sync)[^2] since I’d changed the path of the web site files on the server.

And that was it! Within seconds, the site was up and running again on Indie Web Server.

Mmm, hamster food is yum!

🐹🥜

PS. [Watch this two-minute video](https://ar.al/2019/04/16/set-up-a-live-static-personal-web-site-in-seconds-with-indie-web-server-8.0.0/) to see just how easy it is to install and run Indie Web Server from scratch.

[^1]: What, dogs have a monopoly on the concept or something?
[^2]: Part of [my Web+ system](https://ar.al/2018/06/26/web+).
