# ember-inline-svg

Displays SVG images inline.

## Installation
```bash
ember install ember-inline-svg
```

## Usage

```handlebars
{{inline-svg "path/to/file"}}
```

This will display the SVG found at `/public/path/to/file.svg` (see below on how to change this).

You can specify a class for the element like so:

```handlebars
{{inline-svg "my-svg" class="foo"}}
```

## Configuring

### SVG Paths

By default the addon expects to find your SVG images at `/public/`, but you can change this
by setting the `svg.paths` option in your application's ember-cli-build.js like so:

```javascript
var app = new EmberApp({
  svg: {
    paths: [
      'public/images',
      'app/svgs'
    ]
  }
});
```

### Optimizing

SVGs are optimized by [svgo](https://github.com/svg/svgo) by default.

You can configure this by setting the `svg.optimize` options:

```javascript
var app = new EmberApp({
  svg: {
    optimize: {
      plugins: [
        { removeDoctype: false },
        { removeTitle: true },
        { removeDesc: true }
      ]
    }
  }
});
```

Alternatively, you can disable it completely by setting this to false:

```javascript
var app = new EmberApp({
  svg: {
    optimize: false
  }
});
```

### Custom Plugins

SVGO [now supports](https://github.com/svg/svgo/commit/1ec50c4a13ecea4c50619cdb3bab4926f6aa53e1) custom plugins.

See [SVGO's plugins](https://github.com/svg/svgo/tree/master/plugins) for examples on what you can do.

Eg, here's how you could strip IDs from all elements:

```javascript
var app = new EmberApp({
  svg: {
    optimize: {
      plugins: [
        {
          myCustomPlugin: {
            type: "perItem",
            fn: function(item) {
              item.eachAttr(function(attr) {
                if (attr.name === 'id') {
                  item.removeAttr('id')
                }
              });
            }
          }
        }
      ]
    }
  }
});
```

## Troubleshooting

##### Atrociously slow build times >:[

Longer build times have two main causes:

* huge `.svg` files
* lots of `.svg` files

You can easily run into this when using SVG fonts. By default `ember-inline-svg` processes *all* `.svg` files contained in the `/public` directory. If your fonts live somewhere inside that directory, e.g. `/public/fonts`, these files will be processed, although you will never use them (as inline SVGs).

A quick and easy fix is changing the [`svg.paths` option](#svg-paths) in the configuration. Just explicitly list all directories with images that you want processed by `ember-inline-svg`.

If the longer build time is not caused by SVG fonts, but by actual SVG images that you actually need, you can [turn off the optimization](#optimization) as a whole or individual plugins to remove or diminish another time-consuming build step.

Currently the caching does not work as expected. The bug is tracked in [issue #15](https://github.com/minutebase/ember-inline-svg/issues/15). We are positive, that fixing this bug will speed up the builds.

##### No SVG found / The Handlebars template is not rendered

If you switch to a route that contains an `{{inline-svg}}` helper and nothing is displayed, like really nothing, then this is caused by a failed assertion. Open the Dev Tools and you will see something like this:

```
Error: Assertion Failed: No SVG found for foo/bar/baz.svg
```

This happens, when you try to inline a non-exisent or wrongly addressed `.svg` file.

1. Check the spelling.
2. Make sure that your path is without a leading slash, e.g. `foo/bar/baz.svg` vs. `/foo/bar/baz.svg`.
3. The path is always absolute and not relative to the current URL.
4. `public` is not part of the path. So use `foo.svg` instead of `/public/foo.svg`.
5. If you fiddled around with the [`svg.paths` option](#svg-paths), check the following:
  - The `.svg` file you're trying to inline is a direct or indirect child of any of the directories listed in `svg.paths`.
  - If the filename is something like `/public/images/foo/bar.svg` and your `svg.paths` option is set to something like `['public/images']`, you have to address the image with `foo/bar.svg`, instead of the default `images/foo/bar.svg`.

## Developing

### Installation

* `git clone` this repository
* `npm install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
