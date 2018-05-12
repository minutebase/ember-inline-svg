import { module, test } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | inline-svg', function(hooks) {
  setupApplicationTest(hooks);

  test('displays SVG at root', async function(assert) {
    await visit('/root');

    assert.ok(find(".kiwi-image-at-root svg"), "has an SVG");
  });

  test('displays SVG in subdirectory', async function(assert) {
    await visit('/subdirectory');

    assert.ok(find(".kiwi-image-in-directory svg"), "has an SVG which is in a directory");
  });

  test('adds class to SVG', async function(assert) {
    await visit('/class');

    assert.ok(find(".kiwi-image-with-a-class svg.with-a-class"), "has added the class");
  });

  test('trims unnecessary .svg` extension', async function(assert) {
    await visit('/extension');

    assert.ok(find(".kiwi-image-with-extension svg"), "has an SVG, extension was trimmed");
  });

  test('runs through SVGO', async function(assert) {
    await visit('/root');

    assert.ok(!find(".kiwi-image-at-root svg title"), "has stripped the title");
  });
});
