import {
  dottify,
  applyClass
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
