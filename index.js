/* jshint node: true */
'use strict';

var fs          = require('fs');
var merge       = require('merge');
var mergeTrees  = require('broccoli-merge-trees');
var flatiron    = require('broccoli-flatiron');
var Funnel      = require('broccoli-funnel');
var SVGOptmizer = require('./svg-optimizer');

module.exports = {
  name: 'ember-inline-svg',

  included: function(app) {
    if (app.app) {
      app = app.app;
    }
    this.app = app;
  },

  options: function() {
    return merge(true, {}, {
      paths:   ['public'],
      optimize: { /* svgo defaults */ }
    }, (this.app && this.app.options && this.app.options.svg) || {});
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

    return new SVGOptmizer([tree], {svgoConfig: config});
  },
  
  treeForPublic: function(tree) {
    var existingPaths = this.svgPaths().filter(function(path) {
      return fs.existsSync(path);
    });
  
    var svgTrees = existingPaths.map(function(path) {
      return new Funnel(path, {
        include: [new RegExp(/\.svg$/)]
      });
    });
  
    var svgs = mergeTrees(svgTrees, {
      overwrite: true
    });
  
    var optimized = this.optimizeSVGs(svgs);
  
    var manifest = flatiron(optimized, {
      outputFile: 'assets/svgs.js',
      trimExtensions: true,
      prefix: 'APP_SVGs = '
    });
  
    return manifest;
  }
};
