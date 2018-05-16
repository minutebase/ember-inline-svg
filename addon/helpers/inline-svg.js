import Ember from 'ember';

import {
  dottify,
  applyClass
} from 'ember-inline-svg/utils/general';

function inlineSvg(svgs, path, options) {
  var jsonPath = dottify(path);
  var svg = Ember.get(svgs, jsonPath);

  // TODO: Ember.get should return `null`, not `undefined`.
  // if (svg === null && /\.svg$/.test(path))
  if (typeof svg === "undefined" && /\.svg$/.test(path)) {
    svg = Ember.get(svgs, jsonPath.slice(0, -4));
  }

  Ember.assert("No SVG found for "+path, svg);

  svg = applyClass(svg, options.class);

  return Ember.String.htmlSafe(svg);
};

let helper;
if (Ember.Helper && Ember.Helper.helper) {
  helper = Ember.Helper.helper(function([path], options) {
    return inlineSvg(APP_SVGs, path, options);
  });
} else {
  helper = Ember.Handlebars.makeBoundHelper(function(path, options) {
    return inlineSvg(APP_SVGs, path, options.hash || {});
  });
}

export default helper;

