import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: InlineSvg', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('displays SVG at root', function(assert) {
  visit('/root');

  andThen(function() {
    assert.ok(find(".kiwi-image-at-root svg").length, "has an SVG");
  });
});

test('displays SVG in subdirectory', function(assert) {
  visit('/subdirectory');

  andThen(function() {
    assert.ok(find(".kiwi-image-in-directory svg").length, "has an SVG which is in a directory");
  });
});

test('adds class to SVG', function(assert) {
  visit('/class');

  andThen(function() {
    assert.ok(find(".kiwi-image-with-a-class svg.with-a-class").length, "has added the class");
  });
});

test('trims unnecessary .svg` extension', function(assert) {
  visit('/extension');

  andThen(function() {
    assert.ok(find(".kiwi-image-with-extension svg").length, "has an SVG, extension was trimmed");
  });
});

test('runs through SVGO', function(assert) {
  visit('/root');

  andThen(function() {
    assert.ok(!find(".kiwi-image-at-root svg title").length, "has stripped the title");
  });
});
