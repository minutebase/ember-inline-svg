import Ember from 'ember';
import Aria from '../mixins/aria';
import Common from '../mixins/common';
const PREFIX = '/ember-inline-svg';

const async = Ember.Component.extend(Aria, Common, {
  _svg: Ember.computed('src', function() {
    const src = this.get('src').replace(/\.svg$/, '');
    Ember.$.ajax({
      method: 'GET',
      url: `${PREFIX}/${src}.svg`
    }).done(data => {
      this.setSVG(data);
    });
    return true;
  })
});

async.reopenClass({
  positionalParams: ['src']
});
async[Ember.NAME_KEY] = 'async-svg';
export default async;
