'use strict';

var fs            = require('fs');
var mergeTrees    = require('broccoli-merge-trees');
var flattenFolder = require('broccoli-spelunk');
var pickFiles     = require('broccoli-static-compiler');


module.exports = {
  name: 'ember-inline-svg',

  svgPaths: function() {
    if (this.isDevelopingAddon()) {
      return ['tests/dummy/public/images'];
    }
    return this.app.options.svgPaths || ['public/images'];
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

    svgs = flattenFolder(svgs, {
      outputFile: 'svgs.js',
      mode: 'es6',
      keepExtensions: false
    });

    return this.mergeTrees([tree, svgs]);
  }
};
