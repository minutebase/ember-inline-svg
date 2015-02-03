# ember-inline-svg

Displays SVG images inline.

## Usage

```handlebars
{{inline-svg "path/to/file"}}
```

This will display the SVG found at `/public/images/path/to/file.svg` (see below on how to change this).

You can specify a class for the element like so:

```handlebars
{{inline-svg "my-svg" class="foo"}}
```

## Configuring

### SVG Paths

By default the addon expects to find your SVG images at `/public/images/`, but you can change this
by setting the `svg.paths` option in your application's Brocfile.js

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

## Troubleshooting

## Developing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
