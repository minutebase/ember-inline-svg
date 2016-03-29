import Ember from 'ember';
import layout from '../templates/components/svg';
const PREFIX = '/inline-svg';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  layout: layout,
  tagName: '',
  _svg: Ember.computed('src', function() {
    const src = this.get('src').replace(/\.svg$/, '');
    Ember.$.ajax({
      method: 'GET',
      url: `/${PREFIX}/${src}.svg`
    }).done(data => {
      this.set('svg', data);
    });
  })
});
