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

  buildSvgTree: function() {
    let svgs = mergeTrees(this.svgPaths().filter(function(path) {
      return fs.existsSync(path);
    }));

    svgs = new Funnel(svgs, {
      include: [new RegExp(/\.svg$/)],
      destDir: '/'
    });

    return this.optimizeSVGs(svgs);
  },

  treeForPublic: function() {
    const trees = [];
    const tree = this._super.treeForPublic.apply(this, arguments);
    if(tree) {
      trees.push(tree);
    }
    const svgs = this.buildSvgTree();
    trees.push(svgs);

    trees.push(flatiron(svgs, {
      outputFile: 'ember-inline-svg/resource.js',
      trimExtensions: true
    }));

    return mergeTrees(trees);
  },

  // treeForAddon: function() {
  //   const trees = [];
  //   const svgs = this.buildSvgTree();
  //   const tree = this._super.treeForPublic.apply(this, arguments);
  //   if(tree) {
  //     trees.push(tree);
  //   }
  //   trees.push(flatiron(svgs, {
  //     outputFile: 'svgs.js',
  //     trimExtensions: true
  //   }));
  //   return mergeTrees(trees);
  // }
};
