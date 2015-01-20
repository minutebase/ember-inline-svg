/* jshint node: true */
'use strict';

var fs            = require('fs');
var merge         = require('merge')
var mergeTrees    = require('broccoli-merge-trees');
var flattenFolder = require('broccoli-spelunk');
var pickFiles     = require('broccoli-static-compiler');
var SVGOptmizer   = require('./svg-optimizer');

module.exports = {
  name: 'ember-inline-svg',

  options: function() {
    return merge(true, {}, {
      paths:   ['public'],
      optimize: { /* svgo defaults */ }
    }, this.app.options.svg || {});
  },

  svgPaths: function() {
    if (this.isDevelopingAddon()) {
      return ['tests/dummy/public'];
    }
    return this.options().paths;
  },

  optimizeSVGs: function(tree) {
    var config = this.options().optimize;
    if (!config) {
      return tree;
    }

    return new SVGOptmizer(tree, {svgoConfig: config});
  },

  treeForApp: function(tree) {
    var svgs = mergeTrees(this.svgPaths().filter(function(path) {
      return fs.existsSync(path);
    }));

    svgs = pickFiles(svgs, {
      srcDir: '/',
      files: ['**/*.svg'],
      destDir: '/'
    });

    svgs = this.optimizeSVGs(svgs);

    svgs = flattenFolder(svgs, {
      outputFile: 'svgs.js',
      mode: 'es6',
      keepExtensions: false
    });

    return this.mergeTrees([tree, svgs]);
  }
};
