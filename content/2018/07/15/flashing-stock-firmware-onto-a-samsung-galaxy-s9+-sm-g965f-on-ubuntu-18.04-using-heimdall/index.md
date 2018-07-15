---
title: "Flashing stock firmware onto a Samsung Galaxy S9+ ( SM-G965F) on Ubuntu 18.04 using Heimdall"
date: 2018-07-15T20:06:45+01:00
draft: false
---

{{< figure src="samsung-stock-rom.jpg" alt="Photo of my Samsung S9+ showing a folder in the stock ROM with a bunch of Samsung apps." caption="Samsung stock Android." >}}

On the way back from London last week, I picked up an unlocked, EU region Samsung Galaxy S9+ to install [LineageOS](https://lineageos.org/) on. 

When I got back, I proceeded to install the July 3rd [nightly build](https://download.lineageos.org/star2lte) and everything was good until I tried the camera app and it kept hanging. Apparently, [this is a known issue](https://www.reddit.com/r/LineageOS/comments/8oflu2/samsung_s9_how_to_update_the_firmware/) and a "won't fix" as far as the LineageOS folks are concerned as it can be resolved by updating the stock firmware. Which, of course, means that you have to install said firmware again.

(Lesson learned: before installing a different operating system, make sure you update your phone to the latest official firmware to potentially save yourself some trouble.)

### Adventures in firmware

To complicate things, Samsung UK doesn't make the firmware for its phones available on [the S9+ support site](https://www.samsung.com/uk/support/model/SM-G965FZAEXEU). When I reached them for help via DM on Twitter, they very nicely told me where I could stick my new €1,000 phone because I had had the audacity to install a different operating system on it than the dark-pattern-ridden spyware/bloatware that it came with. Thanks, folks, great customer service! (Every day that passes, I'm thankful that Todd and the lovely folks at [Purism](https://puri.sm) are working on full-stack freedom with their computers and upcoming phone.)

Samsung's reluctance to offer system restoration firmware for download means that a cottage industry, most of it rather shady, has popped up to fill the demand. Of the more reputable sites for information is [XDA Developers](https://www.xda-developers.com/) and that's where I found [the firmware for my S9+](https://forum.xda-developers.com/galaxy-s9-plus/how-to/official-stock-firmware-thread-samsung-t3764479).

(Again, Samsung, you are failing your customers and potentially opening them up to security issues by not making the firmware available on your site. Please reconsider. The folks on XDA and SamMobile get it from you somehow and you know this is happening so why not "legalise" it so that people know they're getting the real deal and don't end up installing trojans and backdoors on their devices and end up making both themselves and the rest of us less safe.)

That all said, finding the firmware was only the beginning of the journey.

Here are the other steps I had to follow to install said firmware. 

### Flashing with Heimdall

{{< figure src="./heimdall.jpg" alt="The god Heimdall stands among a group of people with a torch in his hand, framed by a tree in the center of this painting." caption="Heimdallr brings forth the gift of the gods to mankind (1907) by Nils Asplund" >}}

These instructions are for the Samsung S9+ (SM-G965F), EU region, unlocked, using the stock firmware linked to from [the "Official Stock Firmware Thread for S9+ (SM-G965F) on XDA](https://forum.xda-developers.com/galaxy-s9-plus/how-to/official-stock-firmware-thread-samsung-t3764479). Furthermore, they assume that you are carrying out the flashing using [Heimdall](https://www.glassechidna.com.au/heimdall/) (son of [Odin](https://en.wikipedia.org/wiki/Odin_(firmware_flashing_software))), on a computer running some variant of Debian so you can use the excellent [apt package manager](https://en.wikipedia.org/wiki/APT_(Debian)). I'm currently running [Pop!_OS 18.04](https://system76.com/pop) which is based on [elementary OS](https://elementary.io/)/[Ubuntu](https://en.wikipedia.org/wiki/Ubuntu_(operating_system)).

<p class='important-warning'><svg class='warning-icon' viewBox='0 0 1792 1896.0833' alt='Warning!'><use class='warning-path' xlink:href='/icons/font-awesome.svg#warning'></use></svg><span>These instructions are specific to my unique setup. You might have to adapt them to yours. Flashing firmware carries the risk of potentially bricking your device. Needless to say, <strong>proceed at your own risk.</strong></span></p>

1. Install Heimdall:

    {{< highlight bash >}}sudo apt install heimdall-flash{{< /highlight >}}

2. Install [lz4](http://manpages.ubuntu.com/manpages/xenial/man1/lz4c.1.html) (you will need this later to uncompress files):

    {{< highlight bash >}}sudo apt install liblz4-tool{{< /highlight >}}

3. Unzip all the files from the firmware file (which, in my case, is called _G965FXXU1BRF8.zip_. This is a little like unpacking Russian dolls given that there's a zip that contains [tar.md5](https://stackoverflow.com/questions/39173256/how-to-handle-tar-md5-files) files which contain lz4 files. The following commands will extract everything (this may take some time):

    {{< highlight bash >}}unzip G965FXXU1BRF8.zip -d firmware && cd firmware
for f in *.tar; do tar xf $f; done
lz4 -dm *.lz4{{< /highlight >}}

4. You should now have a bunch of files. The important ones end in _.img_ and _.bin_. These are what we're going to flash onto the partitions on your phone using Heimdall. If you want to jump right into doing that without understanding how we know how to map the files to the partitions, you can safely jump to Step 9 now. Otherwise, read on and learn...

5. To find out where we need to flash the various files we have, we need to ask Heimdall to inspect our phone and dump a Partition Information Table (PIT) file for us. To do this, first connect your phone to your computer via USB and boot the phone into Download Mode (hold down the _power_, _volume down_, and _Bixby_ buttons - that's the button on the top-right, along with the second and third buttons from the top on the left). When you see the Download Mode splash screen, press the Volume Up button as instructed to enter Download Mode. 

6. Test the connection:

    {{< highlight bash >}}heimdall detect{{< /highlight >}}

7. Dump the PIT file using Heimdall. (Note: your phone will reboot after this. Enter Download Mode again using the technique you learned in Step 5):

    {{< highlight bash >}}heimdall print-pit > phone.pit{{< /highlight >}}

8. Open up _phone.pit_ in a text editor and search for the names of the extracted files in Step 3 that end with _.img_ and _.bin_. Note the corresponding _Partition Name_ values as those are what you will be using in the next step as the names of the flags to the `heimdall flash` command.

    {{<figure src="vscode-pit-file.png" alt="Excerpt of my phone's PIT file showing that the boot.img flash file maps to the BOOT partition name." caption="Partition name to image file name mapping." >}}

9. <span id='step-9'>Flash<span> the firmware using Heimdall (your partition name -> flash filename mappings may vary. I'd highly recommend not skipping Steps 4-8 above and confirming that the mappings in your PIT file match before executing the following command):

    {{< highlight bash >}}sudo heimdall flash --BOOT boot.img --CACHE cache.img --CM cm.bin --DQMDBG dqmdbg.img --HIDDEN hidden.img --KEYSTORAGE keystorage.bin --RADIO modem.bin --CP_DEBUG modem_debug.bin --ODM odm.img --OMR omr.img --PARAM param.bin --RECOVERY recovery.img --BOOTLOADER sboot.bin --SYSTEM system.img --UP_PARAM up_param.bin --USERDATA userdata.img --VENDOR vendor.img{{< /highlight >}}

That should do it! (Whew!)

Your phone should restart and you may be dumped into a recovery screen (I was). Just unplug your USB cable and choose to reboot your phone and you should see the stock Samsung firmware boot up following a pulsating Samsung logo (this might take a little while). You should eventually be greeted with the "Hello!" screen and prompted to set up your phone.

This process is much more convoluted than it should be (due, in no small part, to Samsung's lack of cooperation). I hope that this post makes it a bit easier to grasp and carry out. 

A huge thank-you to everyone who documented their own experiences (see links above and references, below) and to [Benjamin Dobell](https://gitlab.com/BenjaminDobell) and [Glass Echidna](https://glassechidna.com.au/) for Heimdall without which none of this would be possible.

Next up: I'll be installing LineageOS again and hopefully have the camera work this time.

### References

  * [How to use Heimdall (xda)](https://forum.xda-developers.com/showthread.php?t=1508703)
  * [How to install stock ROM using Heimdall under Linux (xda)](https://forum.xda-developers.com/showthread.php?t=2317311)
  * [Flashing ROM to Samsung Phone](http://zderadicka.eu/flashing-rom-to-samsung-phone/)
  * [How can you untar more than one file at a time?](https://stackoverflow.com/a/583891)
  * [Heimdallr (Wikipedia)](https://en.wikipedia.org/wiki/Heimdallr)