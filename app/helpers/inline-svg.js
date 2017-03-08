import { inlineSvg } from 'ember-inline-svg/helpers/inline-svg';
import SVGs from '../svgs';
import {
  dottify,
  applyOptions
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

  svg = applyOptions(svg, options);

  return Ember.String.htmlSafe(svg);
}

let helper;
if (Ember.Helper && Ember.Helper.helper) {
  helper = Ember.Helper.helper(function([path], options) {
    return inlineSvg(SVGs, path, options);
  });
} else {
  helper = Ember.Handlebars.makeBoundHelper(function(path, options) {
    return inlineSvg(SVGs, path, options.hash || {});
  });
}

export default helper;
