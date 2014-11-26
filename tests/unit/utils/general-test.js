import {
  dottify,
  applyClass
} from 'ember-inline-svg/utils/general';

module('utils: dottify');

test('replaces slashes with dots', function() {
  equal(dottify("foo/bar/baz"), "foo.bar.baz");
});

module('utils: applyClass');

test('adds class to svg element', function() {
  equal(applyClass('<svg></svg>', 'a-class'), '<svg class="a-class"></svg>');
  equal(applyClass('<svg width="100"></svg>', 'a-class'), '<svg class="a-class" width="100"></svg>');
  equal(applyClass('<svg></svg>', null), '<svg></svg>');
});
