import Helper, { helper as buildHelper } from '@ember/component/helper';
import { inlineSvg } from 'ember-inline-svg/helpers/inline-svg';
import SVGs from '../svgs';
import Ember from 'ember';

let helper;
if (Helper && buildHelper) {
  helper = buildHelper(function([path], options) {
    return inlineSvg(SVGs, path, options);
  });
} else {
  helper = Ember.Handlebars.makeBoundHelper(function(path, options) {
    return inlineSvg(SVGs, path, options.hash || {});
  });
}

export default helper;
