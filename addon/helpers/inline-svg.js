import { htmlSafe } from '@ember/string';
import { assert } from '@ember/debug';
import { get } from '@ember/object';

import {
  dottify,
  applyClass
} from 'ember-inline-svg/utils/general';

export function inlineSvg(svgs, path, options) {
  var jsonPath = dottify(path);
  var svg = get(svgs, jsonPath);

  // TODO: Ember.get should return `null`, not `undefined`.
  // if (svg === null && /\.svg$/.test(path))
  if (typeof svg === "undefined" && /\.svg$/.test(path)) {
    svg = get(svgs, jsonPath.slice(0, -4));
  }

  assert("No SVG found for "+path, svg);

  svg = applyClass(svg, options.class);

  return htmlSafe(svg);
}
