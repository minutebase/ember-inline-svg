# CHANGELOG

## v1.0.0

### BREAKING

* Drop Node < 8 support
* Drop Babel 6

### Internal

* Ember.js v3.13.x upgrade

## v0.3.0

### Added

* #60 Add `title` support to SVGs (thanks @Willibaur)

### Security

* #63 Upgrade `js-yaml` (thanks @nhemanth007)

## v0.2.1

* Fix `htmlSafe` import path from `@ember/template` -> `@ember/string`

## v0.2.0

* Update SVGO to ~1.0.5
* Update broccoli-flatiron to ~0.1.3 - no more deprecation warnings

## v0.1.12

* Update Ember CLI to ~3.3.0 (thanks @lozjackson & @raido)
* Update flatiron to ^0.1.2 (thanks @raido)
* Update svgo (thanks @lozjackson)
* Use yarn.lock vs package-json.lock
* Use new ember modules (thanks @lozjackson)

## v0.1.11

* Filter SVGs before merging and allow duplicates when merging SVG dirs

## v0.1.10

* Fix SVGO options not being passed through

## v0.1.9

* Move helper to addon branch so it can be imported and overridden

## v0.1.8

* Update dependencies to latest versions and turn into plugin (thanks @vitch)

## v0.1.7

* ember-cli 2.8 (thanks @Dhaulagiri)
* remove any leading slashes from paths before dottify-ing (thanks @Dhaulagiri)

## v0.1.6

* use `Ember.String.htmlSafe` to remove warning (thanks @GavinJoyce)
* updated to ember-cli@1.13.14 (thanks @ksnyde)
* Dont need to call included first to be able to introspect options (thanks @john-kurkowski)

## v0.1.5

* Nested Addon Usage (thanks @onlymejosh)

## v0.1.4

* Support latest Ember without deprecations
* Update SVGO to ^0.5.6 & document custom plugins
* Update Ember CLI to 1.13.8

## v0.1.3

* Update Ember CLI to 0.2.6
* Update SVGO to ^0.5.2

## v0.1.2

* Update Ember CLI to 0.2.3
* Doc tweaks

## v0.1.1

* Doc only change - Updated README

## v0.1.0

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
