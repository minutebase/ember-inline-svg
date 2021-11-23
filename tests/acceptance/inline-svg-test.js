import { module, test } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | inline-svg', function (hooks) {
  setupApplicationTest(hooks);

  test('displays SVG at root', async function (assert) {
    await visit('/root');

    assert.dom('.kiwi-image-at-root svg').exists('has an SVG');
  });

  test('displays SVG in subdirectory', async function (assert) {
    await visit('/subdirectory');

    assert
      .dom('.kiwi-image-in-directory svg')
      .exists('has an SVG which is in a directory');
  });

  test('adds class to SVG', async function (assert) {
    await visit('/class');

    assert
      .dom('.kiwi-image-with-a-class svg.with-a-class')
      .exists('has added the class');
  });

  test('adds/update title to SVG', async function (assert) {
    await visit('/title');
    assert.equal(find('title').textContent, 'with-a-title', 'has added title');
  });

  test('trims unnecessary .svg` extension', async function (assert) {
    await visit('/extension');

    assert
      .dom('.kiwi-image-with-extension svg')
      .exists('has an SVG, extension was trimmed');
  });

  test('runs through SVGO', async function (assert) {
    await visit('/root');

    assert.notOk(
      find('.kiwi-image-at-root svg title'),
      'has stripped the title'
    );
  });
});
