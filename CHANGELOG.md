# CHANGELOG

## Master

## v0.0.4

* #5 The path to an image can now optionally have a `.svg` extension.
* #6 The default source directory changed from `./public/images` to `./public`.
* #7 If there is an error during SVG optimization, the build is now aborted and a descriptive error is displayed.
* #7 If there are no images present, nothing happens and the build continues. [More info](https://github.com/minutebase/ember-inline-svg/issues/1#issuecomment-70625510).
* #9 Refactored tests to be independent of one another.

## v0.0.3

* Update Ember CLI to 0.1.5

## v0.0.2

* Optimize SVGs with svgo

## v0.0.1

* initial release
