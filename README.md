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

By default the addon expects to find your SVG images at `/public/images/`, but you can change this
by setting the `svgPaths` option in your application's Brocfile.js

```javascript
var app = new EmberApp({
  svgPaths: [
    'public/images',
    'app/svgs'
  ]
});
```

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
