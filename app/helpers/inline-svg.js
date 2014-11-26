import Ember from 'ember';
import SVGs from '../svgs';
import {
  dottify,
  applyClass
} from 'ember-inline-svg/utils/general';

export function inlineSvg(path, options) {
  var svg = Ember.get(SVGs, dottify(path));
  Ember.assert("No SVG found for "+path, svg);

  var hash  = options.hash || {};
  svg = applyClass(svg, hash.class);

  return new Ember.Handlebars.SafeString(svg);
}

export default Ember.Handlebars.makeBoundHelper(inlineSvg);