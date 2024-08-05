---
layout: essay
type: essay
draft: false
title: "Using the Stream Deck as a Modern Cartwall"
date: 2024-07-18
published: true
labels:
  - Radio
  - Audio Playback
  - 3D Printing

---

When I began DJing at [WBOR 91.1 FM](https://wbor.org) we used iTunes (now Music.app) to play pre-recorded Public Service Announcements (PSAs). While it got the job done, the interface had shortcomings:

* It took DJs time to locate and open the PSA folder
* It took DJs time to clear or update their playback queue
* Finally, DJs needed to ensure that after a PSA finished playing that the next track in the playlist didn't accidentally *also* start (in many cases, a PSA would finish and then the first second or two of the next PSA in the queue would play until the DJ noticed and intervened).

Traditionally, professional radio stations have a dedicated touchscreen monitor with a specialized ["cartwall"](https://www.playitsoftware.com/Products/Cartwall) playout software for playing PSAs/Jingles/Station IDs/Idents. As a college station with non-technical volunteer DJs (and a constrained budget), a touchscreen was out of the picture.

While working at my school's events production office, I became aware of the [Bitfocus Companion Software](https://bitfocus.io/companion) for the [Stream Deck](https://amzn.to/3LMqoe0). In a brief conversation with my boss, I realized that the Stream Deck could *also* be used for audio playout.

With 3D printing support from our campus [Maker Space](https://make.bowdoin.edu/), I was able to get a [Stream Deck tripod mount holder](https://www.thingiverse.com/thing:5491157) made. I then put this on an adjustable articulating arm [meant for small monitors](https://amzn.to/3LNAiMy), attached to a [quick release plate](https://amzn.to/3YpNApR) mounted to the desk. All together, we now had a semi-professional and programmable soundboard:

<div class="row">
  <div class="col-lg-4 mb-1 mb-lg-0">
    <img
      src="/img/streamdeck/streamdeck-front.JPG"
      class="w-100 shadow-1-strong rounded mb-4"
      alt=""
    />
  </div>
  <div class="col-lg-4 mb-1 mb-lg-0">
    <img
      src="/img/streamdeck/streamdeck-side.JPG"
      class="w-100 shadow-1-strong rounded mb-4"
      alt=""
    />
  </div>
  <div class="col-lg-4 mb-1 mb-lg-0">
    <img
      src="/img/streamdeck/streamdeck-birds-eye.JPG"
      class="w-100 shadow-1-strong rounded mb-4"
      alt=""
    />
  </div>
</div>

To configure the Stream Deck to our needs, I set up three pages:

1. Home
2. PSAs
3. SFX

The home page serves as the entry point when DJs arrive at the studio. It includes a button to open the PSAs and SFX folders as well as shortcuts to our station website, calendar, and the log-in to our [backend logging software](https://spinitron.com/).

Inside each folder are a grid of buttons, each with an icon and label. In our case, the PSA labels match what is in our logging software for quick and convenient logging:

<img width="66%" class="rounded img-fluid d-block" src="/img/streamdeck/streamdeck-psas.png" alt="">

The Stream Deck software includes some basic audio processing to clean things up around the edges, such as fade in/out and gain adjustment to match unity on the audio console (and not blow a listener's ears out!).

Both the PSA and SFX page are include a button to return to home, and will automatically go there after a minute of inactivity.

Hopefully other stations can find use out of this relatively inexpensive and easy to set up solution!
