import Ember from 'ember';
import AriaMixin from '../../../mixins/aria';
import { module, test } from 'qunit';

module('Unit | Mixin | aria');

// Replace this with your real tests.
test('it works', function(assert) {
  let AriaObject = Ember.Object.extend(AriaMixin);
  let subject = AriaObject.create();
  assert.ok(subject);
});
