import Ember from 'ember';
import layout from '../templates/components/svg';
import SVGs from '../inline-svg/resource';
const htmlSafe = Ember.String.htmlSafe;

const inline = Ember.Component.extend({
  layout: layout,
  tagName: '',
  _svg: Ember.computed('src', function() {
    const src = this.get('src') || '';
    const path = src.replace(/\.svg$/, '').replace(/\//g, '.');
    const svg = Ember.get(SVGs, path);

    Ember.assert(`No SVG found for ${path}`, svg);

    this.set('svg', htmlSafe(svg));
    return htmlSafe(svg);
  }),
  labelledBy: Ember.computed('title', 'desc', function() {
    const title = this.get('title') ? 'title' : '';
    const desc = this.get('desc') ? ' desc' : '';
    return `${title}${desc}`;
  }),
  role: 'img'
});

inline.reopenClass({
  positionalParams: ['src']
});
inline[Ember.NAME_KEY] = 'inline-svg';
export default inline;
