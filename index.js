'use strict';

const fs = require('fs');
const merge = require('merge');
const mergeTrees = require('broccoli-merge-trees');
const flatiron = require('broccoli-flatiron');
const Funnel = require('broccoli-funnel');
const SVGOptmizer = require('./svg-optimizer');

module.exports = {
  name: require('./package').name,

  included(app) {
    if (app.app) {
      app = app.app;
    }
    this.app = app;
  },

  options() {
    return merge(
      true,
      {},
      {
        paths: ['public'],
        optimize: {
          /* svgo defaults */
        },
      },
      (this.app && this.app.options && this.app.options.svg) || {}
    );
  },

  svgPaths() {
    if (this.isDevelopingAddon()) {
      return ['tests/dummy/public'];
    }
    return this.options().paths;
  },

  optimizeSVGs(tree) {
    const config = this.options().optimize;
    // TODO throw deprecation warning
    if (!config) {
      return tree;
    }

    return new SVGOptmizer([tree], { svgoConfig: config });
  },

  treeForApp(tree) {
    const existingPaths = this.svgPaths().filter(function (path) {
      return fs.existsSync(path);
    });

    const svgTrees = existingPaths.map(function (path) {
      return new Funnel(path, {
        include: [new RegExp(/\.svg$/)],
      });
    });

    const svgs = mergeTrees(svgTrees, {
      overwrite: true,
    });

    const optimized = this.optimizeSVGs(svgs);

    const manifest = flatiron(optimized, {
      outputFile: 'svgs.js',
      trimExtensions: true,
    });

    return mergeTrees([tree, manifest]);
  },
};
