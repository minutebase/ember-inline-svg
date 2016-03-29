import Ember from 'ember';

export default Ember.Mixin.create({
  labelledBy: Ember.computed('title', 'desc', function() {
    const title = this.get('title') ? 'title' : '';
    const desc = this.get('desc') ? ' desc' : '';
    return `${title}${desc}`;
  }),
  role: 'img'
});
