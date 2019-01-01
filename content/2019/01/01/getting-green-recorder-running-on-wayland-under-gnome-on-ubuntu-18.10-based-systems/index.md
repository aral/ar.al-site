---
title: "Getting Green Recorder running on Wayland under Gnome on Ubuntu 18.10-based systems"
date: 2019-01-01T20:17:41Z
draft: false
---

[Green Recorder](https://github.com/foss-project/green-recorder) is an app for recording your screen on Linux which, as far as I know, is the only such app at the moment that works with Wayland. It’s what I used to capture [the video of my segment on Al Jazeera News today](../al-jazeera-news-interview-french-tech-tax/)[^1].

I had trouble trying to install it on my laptop running [Pop!_OS](/2018/07/26/popos-18.04-the-state-of-the-art-in-linux-on-desktop/) 18.10[^2] with Gnome 3.30.

Here’s a brief summary of the issues I encountered and the workarounds I implemented to get it running.

## E: Unable to locate package green-recorder

I was unable to install Green Recorder via apt[^3].

### To fix:

I installed it from source:

{{<highlight bash>}}
sudo pip install pydbus
git clone https://github.com/foss-project/green-recorder.git
cd green-recorder
sudo python setup.py install
{{</highlight>}}

The build succeeded but running the _green-recorder_ binary resulted in a series of errors.

## Failed to open file “/usr/share/green-recorder/ui.glade”: No such file or directory

{{<highlight bash>}}
Traceback (most recent call last):
  File "./green-recorder", line 262, in <module>
    builder.add_from_file("/usr/share/green-recorder/ui.glade")
gi.repository.GLib.Error: g-file-error-quark: Failed to open file “/usr/share/green-recorder/ui.glade”: No such file or directory (4)
{{</highlight>}}

### To fix:

{{<highlight bash>}}
sudo mv /usr/local/share/green-recorder /usr/share/
{{</highlight>}}

## Could not load '/usr/share/pixmaps/green-recorder.png'

{{<highlight bash>}}
(green-recorder:12589): Gtk-WARNING **: 15:59:28.105: Could not load image '/usr/share/pixmaps/green-recorder.png': Failed to open file “/usr/share/pixmaps/green-recorder.png”: No such file or directory
{{</highlight>}}

### To fix:

Move it to `/usr/share/pixmaps/`:

{{<highlight bash>}}
sudo mv /usr/local/share/pixmaps/green-recorder.png /usr/share/pixmaps
{{</highlight>}}

## ConfigParser.NoOptionError errors

You encounter a number of errors as certain app options do not exist:

{{<highlight bash>}}
ConfigParser.NoOptionError: No option 'videoswitch' in section: 'Options'
ConfigParser.NoOptionError: No option 'audioswitch' in section: 'Options'
ConfigParser.NoOptionError: No option 'mouseswitch' in section: 'Options'
ConfigParser.NoOptionError: No option 'followmouseswitch' in section: 'Options'
{{</highlight>}}

### To fix:

{{<highlight bash>}}
echo 'videoswitch = True' >>  ~/.config/green-recorder/config.ini
echo 'audioswitch = True' >>  ~/.config/green-recorder/config.ini
echo 'mouseswitch = True' >>  ~/.config/green-recorder/config.ini
echo 'followmouseswitch = False' >>  ~/.config/green-recorder/config.ini
{{</highlight>}}

(You can toggle all of these defaults in the interface later but they need to be set in the config file for the app to run properly for the first time.)

With those fixes, the app ran and I was able to get a fullscreen recording[^4].

## Outstanding issues

Although full-screen recording works, the _Select a Window_ button is disabled.

Selecting the _Select an Area_ button results in a selection window but clicking the _Apply_ button results in the following error:

{{<highlight bash>}}
xwininfo: error: No window with name "Area Chooser" exists!
Traceback (most recent call last):
  File "./green-recorder", line 453, in areasettings
    output = subprocess.check_output(["xwininfo -name \"Area Chooser\" | grep -e Width -e Height -e Absolute"], shell=True)[:-1]
  File "/usr/lib/python2.7/subprocess.py", line 223, in check_output
    raise CalledProcessError(retcode, cmd, output=output)
subprocess.CalledProcessError: Command '['xwininfo -name "Area Chooser" | grep -e Width -e Height -e Absolute']' returned non-zero exit status 1
{{</highlight>}}

I haven’t had a chance to look into those issues yet.

[^1]: I also used [Pitivi](http://www.pitivi.org/) to edit it. It’s hosted on a paid-for Vimeo account and presented on my site via a simple video tag without any tracking.

[^2]: Based on Ubuntu 18.10.

[^3]: I also tried via Gnome Software and although it said it was installed, it wouldn’t launch.

[^4]: The only setting to record computer audio that worked for me was _Monitor of Built-in Audio Analogue Stereo_.
