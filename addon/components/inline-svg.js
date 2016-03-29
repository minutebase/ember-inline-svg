import Ember from 'ember';
import layout from '../templates/components/inline-svg';
import SVGs from '../svgs';
const htmlSafe = Ember.String.htmlSafe;

const inline = Ember.Component.extend({
  layout: layout,
  tagName: '',
  svg: Ember.computed('src', function() {
    const src = this.get('src') || '';
    const path = src.replace(/\.svg$/, '').replace(/\//g, '.');
    const svg = Ember.get(SVGs, path);

    Ember.assert(`No SVG found for ${path}`, svg);

    return htmlSafe(svg);
  }),
  describedBy: Ember.computed('title', 'desc', function() {
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
