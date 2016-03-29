import Ember from 'ember';
import Aria from '../mixins/aria';
import Common from '../mixins/common';
import SVGs from 'ember-inline-svg/resource';

const inline = Ember.Component.extend(Aria, Common, {
  _svg: Ember.computed('src', function() {
    const src = this.get('src') || '';
    const path = src.replace(/\.svg$/, '').replace(/\//g, '.');
    const svg = Ember.get(SVGs, path);

    Ember.assert(`No SVG found for ${path}`, svg);

    this.setSVG(svg);
  })
});

inline.reopenClass({
  positionalParams: ['src']
});
inline[Ember.NAME_KEY] = 'inline-svg';
export default inline;
