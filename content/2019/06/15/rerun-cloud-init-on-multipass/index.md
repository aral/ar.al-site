---
title: "Rerun cloud-init on multipass"
date: 2019-06-15T22:17:58+01:00
draft: false
---

Today, I had the need to experiment with rerunning [cloud-init](https://cloud-init.io/) on a virtual machine created with [multipass](https://multipass.run/). You can [use cloud-init with multipass](https://blog.ubuntu.com/2018/04/02/using-cloud-init-with-multipass) by specifying a cloud-init.yaml file when creating your instance. e.g,

{{<highlight sh>}}
multipass launch --name my-instance --cloud-init ./cloud-init.yaml
{{</highlight>}}

This is all well and good and works as you would expect.

However, today, I wanted to experiment with running cloud-init on an already-provisioned instance. My use case is that the lovely folks at [Eclips.is](https://eclips.is) (a project by [Greenhost](https://greenhost.net) and the [Open Technology Fund](https://www.opentech.fund/)) who have given [Ind.ie](https://ind.ie) a generous amount of free hosting do not yet support cloud-init when provisioning a server. So I wanted to see if I can run my cloud-init script after I provisioned a server and I wanted to test that out locally using multipass.

## How to rerun cloud-init

Ordinarily, it is actually quite simply to rerun cloud-init after a server has been provisioned.

First, you use the `clean` command to remove the current build artifacts:

{{<highlight sh>}}
sudo cloud-init clean
{{</highlight>}}

Then, you specify your _meta-data_ and _user-data_ files in the _/var/lib/cloud/nocloud-net/_ directory, which you must create:

{{<highlight sh>}}
sudo mkdir /var/lib/cloud/nocloud-net/
sudo touch /var/lib/cloud/nocloud-net/meta-data
sudo nano /var/lib/cloud/nocloud-net/user-data
{{</highlight>}}

Then, paste your cloud-config file into the editor and save (in nano, Ctrl-o + Ctrl-x).

Finally, run the `init` command to re-initialise your instance using cloud-init:

{{<highlight sh>}}
sudo cloud-init init
{{</highlight>}}

Now, in theory, this should work.

In practice, however, we end up with a _/var/lib/cloud/instance/user-data.txt_ file that only contains the vendor-data provided by multipass, not our user-data.

## Multipass

Say you have created a multipass instance without specifying a _cloud-init.yaml_ file, like this:

{{<highlight sh>}}
multipass launch --name my-instance
{{</highlight>}}

To run your cloud-config file, you first have to SSH into the box. You can either do this by running `multipass ls` and finding the IP address and then using the account and key that multipass automatically creates to ssh to it (e.g., `ssh multipass@<ENTER THE IP-ADDRESS OF YOUR INSTANCE HERE> -i $(locate multipass | grep .*id_rsa)`) or you can use the handy shortcut that multipass provides:

{{<highlight sh>}}
multipass shell <NAME OF YOUR INSTANCE>
{{</highlight>}}

Then, to find the culprit, run the `status` command in verbose mode:

{{<highlight sh>}}
sudo cloud-init status --long
{{</highlight>}}

Which should give you something along the lines of:

{{<highlight sh>}}
status: running
time: Sat, 15 Jun 2019 21:11:55 +0000
detail:
DataSourceNoCloudNet [seed=/var/lib/cloud/seed/nocloud-net,/dev/sr0][dsmode=net]
{{</highlight>}}

The first seed source you see is the one you defined. The second one is the one that multipass passes in. You can cat it to see what it has:

{{<highlight sh>}}
sudo cat /dev/sr0
{{</highlight>}}

You should see the vendor-data specified and, at the end of that, you should see an empty cloud-init section:

{{<highlight sh>}}
#cloud-init
{}
{{</highlight>}}

This is also what I saw at the end of _/var/lib/cloud/instance/user-data.txt_ and that led to me to think that perhaps our datasource was being ignored or overwritten.

You can find the data sources defined in the file _/etc/cloud/cloud.cfg.d/90_dpkg.cfg_. To see its contents:

{{<highlight sh>}}
cat /etc/cloud/cloud.cfg.d/90_dpkg.cfg
{{</highlight>}}

And you should find a long list similar to:

{{<highlight sh>}}
datasource_list: [ NoCloud, ConfigDrive, OpenNebula, DigitalOcean, Azure, AltCloud, OVF, MAAS, GCE, OpenStack, CloudSigma, SmartOS, Bigstep, Scaleway, AliYun, Ec2, CloudStack, Hetzner, IBMCloud, None ]
{{</highlight>}}

I had a suspicion that the `ConfigDrive` data source might have been overriding my user-data, so I edited that file and reduced the list down to:

{{<highlight sh>}}
datasource_list: [ NoCloud, None ]
{{</highlight>}}

Then, after running `sudo cloud-init clean` and `sudo cloud-init init` again, I had multipass successfully using my cloud-config from _/var/lib/cloud/nocloud-net/user-data_.

Information about cloud-init seems hard to come by so while I’m mostly documenting this for my own sake, I hope it also ends up helping someone else out in the future.
