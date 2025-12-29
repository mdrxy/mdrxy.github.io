---
layout: essay
type: essay
draft: false
title: "Deploying Custom Packages in Apple Business Essentials"
date: 2024-07-18
published: true
labels:
  - MDM
  - macOS
  - Enterprise Deployment

---

Apple's [documentation on deploying custom packages](https://support.apple.com/en-nz/guide/apple-business-essentials/axmeeed343b0/web) using Apple Business Essentials lacks in-depth examples of real-world implementations. Here are two!

## Prerequisites

Your organization must have an approved tax status under "Organization Settings" at [business.apple.com](https://business.apple.com). Once received, turn on custom apps:

<img width="66%" class="rounded img-fluid d-block" src="/img/abe-packages/abe-tax.png" alt="Apple Business Essentials Organization Settings page showcasing tax status and custom apps settings">

## [zoom.us](https://zoom.us/)

1. Navigate to Zoom's [download page](https://zoom.us/download).
2. Copy the appropriate download URL, writing it down somewhere for later. I'm deploying to Apple Silicon, so I chose the ARM distribution.

    {% include warning.html content="\"if you decide to use a developer-hosted link to a package, make sure that the package doesn’t get updated by the developer in-place.\" As noted in [Apple's documentation](https://support.apple.com/en-nz/guide/apple-business-essentials/axmeeed343b0/web), if you are in a position to host the package on your own server, you should consider doing so in order to prevent any changes upstream from affecting your deployment." %}

3. In a new browser tab, test the download URL. Pressing enter should immediately download/prompt you to download the `zoomusInstallerFull.pkg`. Per [Apple](https://support.apple.com/en-nz/guide/apple-business-essentials/axmeeed343b0/web), "the package must begin to download when the link is used. The link can’t lead to a webpage with another link."
4. In terminal, run `shasum -a 256 zoomusInstallerFull.pkg`. The output should look something like the following. We want to copy the long string of numbers and letters, *excluding* the filename.

    Terminal output:
    ```bash
    08104901aee19f3d08d9cb449fb0cc77379712ce31f9a12612bf8be3675da971  zoomusInstallerFull.pkg
    ```
    
    Desired SHA-256 hash:
    ```bash
    08104901aee19f3d08d9cb449fb0cc77379712ce31f9a12612bf8be3675da971
    ```

5. Follow through with the package installation on your machine/a testing machine. With the app open, write down the app version. In Zoom's case, it is written at the bottom of the login page. (If it isn't, you can use the app's "about" pane. With the app open, select its name in the macOS menu bar and click "About Zoom Workplace")

    <img width="66%" class="rounded img-fluid d-block" src="/img/abe-packages/zoom-about-panel.png" alt="zoom.us about panel">

6. In Finder, open the applications folder and find `zoom.us`. Right click and select "Show Package Contents". In the `Contents` folder, open `Info.plist`. We're looking for the `CFBundleIdentifier`'s value, which in this case, is `us.zoom.xos`. Write this down.

    ```xml
    <key>CFBundleIdentifier</key>
    <string>us.zoom.xos</string> 
    ```

7. Back in Finder, right click `zoom.us` and press "Get Info" (alternatively, press <kbd>command</kbd> + <kbd>i</kbd>).
8. Click the small app icon so that it is selected and then press <kbd>command</kbd> + <kbd>c</kbd> to copy the icon.

    <img width="33%" class="rounded img-fluid d-block" src="/img/abe-packages/zoom-info-panel.png" alt="zoom.us Finder Get Info panel">

9.  Open `Preview.app`, and in the macOS menu bar, select "New from Clipboard" (or <kbd>command</kbd> + <kbd>n</kbd>). Save the file as a `.png` somewhere on your disk.

    {% include note.html content="per [Apple's documentation](https://support.apple.com/en-nz/guide/apple-business-essentials/axm8e397e77d/1.0/web/1.0#axma08a8ff5a), icons must be either a `.icns`, `.jpeg`, or `.png` file, no larger than 1024x1024 and under 10 MB." %}

10. In [Apple Business Essentials (ABE)](https://business.apple.com), under the apps tab, select "New Package". The fields are to be filled out as follows:

    * **Package Name:** `zoom.us`
    * **macOS Package URL:** The download URL you wrote down in step #2
    * **SHA-256 Hash:** The hash you wrote down in step #4
    * **Bundle ID:** The `CFBundleIdentifier` you wrote down in step #6
    * **Version:** The app version you wrote down in step #5
    * **App Icon:** The `.png` you saved in step #9
    * **Description:** I included Zoom's website here, though this isn't necessary.

    I didn't add any System Extensions, Privacy Preference Permissions, or Login and Background Item Management items.

11. Save the package. Add the app to a [collection](https://support.apple.com/en-nz/guide/apple-business-essentials/axm0d43737a4/1.0/web/1.0) or [assign it to a device](https://support.apple.com/en-nz/guide/apple-business-essentials/axmf6ab5d3eb/1.0/web/1.0). Using a device that has been assigned the new package, open `Essentials.app`, find your new package, and press install. (It may take a little while for the package to appear -- it took around 10 seconds in my case.)

That's it! During the app install process, the user might be prompted to choose whether to "Automatically keep the Zoom Workplace app up to date". My recommendation is to keep this checked and press done, otherwise the Sysadmin will need to regularly upload update packages into ABE. I encourage users at this point to also configure the necessary app permissions so that they don't experience any hiccups during their first meeting:

* Open Zoom settings by pressing "Zoom Workplace" in the menu bar and selecting "Settings…" (alternatively, press the command key and , at the same time).
* Press "Video" in the left hand tab. When prompted, press "Allow" when Zoom asks to access the camera. Change any other settings you’d like now.
* Press "Audio" in the left hand tab. Same as before, press "Allow" when it asks to use the microphone.

To get set up for screen sharing:

* Open macOS System Settings (click the Apple Icon in the menu bar -> "System settings…")
* In the list on the lefthand side of the screen, select "Privacy & Security" (under Siri)
* Scroll down to "Screen & System Audio Recording" and click it
* Under "Screen & System Audio Recording" it will likely say "No items" - click the plus + icon and then use your finger print/type in your laptop password. A select window will open. Press "Applications" in the left hand menu, and then scroll to the bottom and select zoom.us and then press open.

*(AFAIK, there isn’t a way to automate this part of the setup...)*

Back in ABE, you can view app [installation status](https://support.apple.com/en-nz/guide/apple-business-essentials/axme7df3fd13/1.0/web/1.0) on assigned devices:

<img width="100%" class="rounded img-fluid d-block" src="/img/abe-packages/abe-status.png" alt="App install status list in Apple Business Essentials">

## [Google Chrome](https://chromeenterprise.google/download/)

The process for deploying Chrome's package is more or less the same as Zoom's. However, what isn't obvious at first is that Chrome has a [download page targeted at enterprise users](https://chromeenterprise.google/download/) where you can choose to download a `.pkg` instead of a `.dmg` installer. Google likes to obfuscate their download URLs, but with a little bit of trickery it can be acquired:

1. Using Firefox, download your chosen installer
2. Open the downloads pane
3. Right click your download and select "Copy Download Link"

<img width="66%" class="rounded img-fluid d-block" src="/img/abe-packages/abe-chrome.png" alt="Firefox downloads menu">

Otherwise, the installation follows in the same order as Zoom. Follow steps #1-11, changing the names and icon as needed.

Happy deployment!
