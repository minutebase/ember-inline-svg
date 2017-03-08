// converts slash paths to dot paths so nested hash values can be fetched with Ember.get
// foo/bar/baz -> foo.bar.baz
export function dottify(path) {
  return (path.toString() || '').replace(/^\//g, '').replace(/\//g, '.');
}

// maybe this should be a component with tagName: 'svg' and strip the outer <svg> tag
// so we can use standard component class stuff?
export function applyOptions(svg, options) {
  if (!options) { return svg; }

  optString = "";
  for(option in options) {
    optString += ` ${option}="${options[option]}"`;
  }

  // now we have 2 problems...
  return svg.replace('<svg', '<svg'+optString);
}
