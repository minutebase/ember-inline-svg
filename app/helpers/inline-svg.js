import { inlineSvg } from 'ember-inline-svg/helpers/inline-svg';
import SVGs from '../svgs';
import Ember from 'ember';

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
