import { htmlSafe } from '@ember/string';
import { get } from '@ember/object';

import {
  dottify,
  applyClass,
  applyTitle,
  assert
} from 'ember-inline-svg/utils/general';

export function inlineSvg(svgs, path, options) {
  var jsonPath = dottify(path);
  var svg = get(svgs, jsonPath);

  // TODO: Ember.get should return `null`, not `undefined`.
  // if (svg === null && /\.svg$/.test(path))
  if (typeof svg === "undefined" && /\.svg$/.test(path)) {
    svg = get(svgs, jsonPath.slice(0, -4));
  }

  assert(svg, `No SVG found for ${path}`);

  svg = applyClass(svg, options.class);
  svg = applyTitle(svg, options.title);

  return htmlSafe(svg);
}
