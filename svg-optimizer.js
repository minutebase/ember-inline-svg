'use strict';
/* global require module */

const Plugin = require('broccoli-caching-writer');
const mapSeries = require('promise-map-series');
const walkSync = require('walk-sync');
const mkdirp = require('mkdirp');
const path = require('path');
const { optimize } = require('svgo');
const fs = require('fs');

SVGOptimizer.prototype = Object.create(Plugin.prototype);
SVGOptimizer.prototype.constructor = SVGOptimizer;
function SVGOptimizer(inputNodes, options) {
  options = options || {};
  this.svgoConfig = options.svgoConfig;
  Plugin.call(this, inputNodes, {
    annotation: options.annotation,
    cacheInclude: [/\.svg/],
  });
}

SVGOptimizer.prototype.build = function () {
  const destDir = this.outputPath;
  const svgoConfig = this.svgoConfig;

  return mapSeries(this.inputPaths, function (srcDir) {
    walkSync(srcDir).forEach((relativePath) => {
      if (/\/$/.test(relativePath)) {
        mkdirp.sync(destDir + '/' + relativePath);
        return;
      }

      if (/\.svg$/.test(relativePath)) {
        const srcPath = path.join(srcDir, relativePath);
        const destPath = path.join(destDir, relativePath);
        const rawSVG = fs.readFileSync(srcPath, { encoding: 'utf8' });

        const result = optimize(rawSVG, svgoConfig);
        fs.writeFileSync(destPath, result.data, { encoding: 'utf8' });
      }
    });
  });
};

module.exports = SVGOptimizer;
