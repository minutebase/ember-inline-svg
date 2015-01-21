import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: InlineSvg', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('displays SVG at root', function() {
  visit('/root');

  andThen(function() {
    ok(find(".kiwi-image-at-root svg").length, "has an SVG");
  });
});

test('displays SVG in subdirectory', function() {
  visit('/subdirectory');

  andThen(function() {
    ok(find(".kiwi-image-in-directory svg").length, "has an SVG which is in a directory");
  });
});

test('adds class to SVG', function() {
  visit('/class');

  andThen(function() {
    ok(find(".kiwi-image-with-a-class svg.with-a-class").length, "has added the class");
  });
});

test('trims unnecessary .svg` extension', function() {
  visit('/extension');

  andThen(function() {
    ok(find(".kiwi-image-with-extension svg").length, "has an SVG, extension was trimmed");
  });
});
