import {
  dottify,
  applyClass,
  applyTitle
} from 'ember-inline-svg/utils/general';

import { module, test } from 'qunit';

module('utils: dottify', function() {
  test('replaces slashes with dots', function(assert) {
    assert.equal(dottify("foo/bar/baz"), "foo.bar.baz");
  });

  test('removes leading slashes before replacing slashes with dots', function(assert) {
    assert.equal(dottify("/foo/bar/baz"), "foo.bar.baz");
  });
});

module('utils: applyClass', function() {
  test('adds class to svg element', function(assert) {
    assert.equal(applyClass('<svg></svg>', 'a-class'), '<svg class="a-class"></svg>');
    assert.equal(applyClass('<svg width="100"></svg>', 'a-class'), '<svg class="a-class" width="100"></svg>');
    assert.equal(applyClass('<svg></svg>', null), '<svg></svg>');
  });
});

module('utils: applyTitle');

test('adds/updates title to svg element', function(assert) {
  assert.equal(applyTitle('<svg></svg>', 'svgTitle'), '<svg><title>svgTitle</title></svg>');
  assert.equal(applyTitle("<svg width='100'></svg>", 'svgTitle'), "<svg width='100'><title>svgTitle</title></svg>");
  assert.equal(applyTitle('<svg><title>Original Title</title></svg>', 'New Title'), '<svg><title>New Title</title></svg>');
  assert.equal(applyTitle('<svg></svg>', null), '<svg></svg>');
  assert.equal(applyTitle("<svg class='title'></svg>", 'svgTitle'), "<svg class='title'><title>svgTitle</title></svg>");
});
