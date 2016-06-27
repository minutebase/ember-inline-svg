import Ember from 'ember';
import SVGs from '../svgs';
import {
  dottify,
  applyClass
} from 'ember-inline-svg/utils/general';

export function inlineSvg(path, options) {
  var jsonPath = dottify(path);
  var svg = Ember.get(SVGs, jsonPath);

  // TODO: Ember.get should return `null`, not `undefined`.
  // if (svg === null && /\.svg$/.test(path))
  if (typeof svg === "undefined" && /\.svg$/.test(path)) {
    svg = Ember.get(SVGs, jsonPath.slice(0, -4));
  }

  Ember.assert("No SVG found for "+path, svg);

  svg = applyClass(svg, options.class);

  return new Ember.String.htmlSafe(svg);
}

let helper;
if (Ember.Helper && Ember.Helper.helper) {
  helper = Ember.Helper.helper(function([path], options) {
    return inlineSvg(path, options);
  });
} else {
  helper = Ember.Handlebars.makeBoundHelper(function(path, options) {
    return inlineSvg(path, options.hash || {});
  });
}

export default helper;
