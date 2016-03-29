import Ember from 'ember';
import layout from '../templates/components/svg';
const htmlSafe = Ember.String.htmlSafe;

export default Ember.Mixin.create({
  layout: layout,
  tagName: '',

  width: '100%',
  /**
   * Initialize SVG on load
   */
  init() {
    this._super(...arguments);
    Ember.run.schedule('afterRender', () => {
      this.get('_svg');
    });
  },
  setSVG(data) {
    this.set('svg', htmlSafe(Ember.$(data).find('svg').html()));
    this.set('viewBox', Ember.$(data).find('svg').attr('viewBox'));
  }

});
