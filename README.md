# Professional Portfolio

![Personal Résume Website](/img/page.png)

[Based on TechFolios](https://techfolios.github.io), modified by yours truly to include:

* [Dynamically updating now/recently played song pulled from Last.fm's API](https://www.last.fm/api/show/user.getRecentTracks)
* [GitHub's "alert" markdown syntax](https://mcraiha.github.io/jekyll/alert/liquid/markdown/template/2018/07/22/jekyll-alerts-aka-colored-boxes.html)
* [Open embedded links using target="_blank" by default](https://github.com/keithmifsud/jekyll-target-blank)
* [Fixed to display long names](https://github.com/techfolios/template/issues/13)
* [Use `page.projecturl` only if it is defined - `page.url` otherwise](https://github.com/mdrxy/mdrxy.com/commit/e8510866c52a1c1e305b2d5afe3129243d6aab1c)

Amongst other small tweaks...

## Local Development

[Refer to Jekyll's Quickstart for macOS](https://jekyllrb.com/docs/installation/macos/). With dependencies installed, `cd` to the site's folder and run:

```sh
bundle install && bundle exec jekyll serve
```

Then, navigate to the server address provided (usually [http://localhost:4000/](http://localhost:4000/)) to preview local changes.

## TODO

* [Guest book](https://indieweb.org/Webmention)
