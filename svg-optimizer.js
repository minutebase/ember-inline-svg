'use strict';
/* global require module */

var Plugin        = require('broccoli-caching-writer');
var mapSeries     = require('promise-map-series');
var walkSync      = require('walk-sync');
var mkdirp        = require('mkdirp');
var path          = require('path');
var SVGO          = require('svgo');
var RSVP          = require('rsvp');
var fs            = require('fs');


SVGOptimizer.prototype = Object.create(Plugin.prototype);
SVGOptimizer.prototype.constructor = SVGOptimizer;
function SVGOptimizer(inputNodes, options) {
  options = options || {};
  this.svgoConfig = options.svgoConfig;
  Plugin.call(this, inputNodes, {
    annotation: options.annotation,
    cacheInclude: [/\.svg/]
  });
}

SVGOptimizer.prototype.build = function() {
  var svgo = new SVGO(this.svgoConfig);
  var destDir = this.outputPath;

  return mapSeries(this.inputPaths, function(srcDir) {
    var paths = walkSync(srcDir);

    return mapSeries(paths, function(relativePath) {
      if (/\/$/.test(relativePath)) {
        mkdirp.sync(destDir + '/' + relativePath);
        return;
      }

      if (/\.svg$/.test(relativePath)) {
        var srcPath  = path.join(srcDir, relativePath);
        var destPath = path.join(destDir, relativePath);
        var rawSVG   = fs.readFileSync(srcPath, { encoding: 'utf8' });

        return new RSVP.Promise(function(resolve, reject) {
          svgo.optimize(rawSVG, function(result) {
            if (result.error) {
              var error = new Error(result.error);
              error.file = relativePath;
              return reject(error);
            }

            fs.writeFileSync(destPath, result.data, { encoding: 'utf8'});
            resolve();
          });
        });
      }
    });
  });
};

module.exports = SVGOptimizer;
