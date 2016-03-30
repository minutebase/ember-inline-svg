import Ember from 'ember';
import layout from '../templates/components/svg';
const htmlSafe = Ember.String.htmlSafe;

export default Ember.Mixin.create({
  layout: layout,
  tagName: '',

  /**
   * Initialize SVG on load
   */
  init() {
    this._super(...arguments);
    Ember.run.schedule('afterRender', () => {
      this.notifyPropertyChange('src');
    });
  },
  setSVG(data) {
    const {width, height, x, y} = this.getProperties('width', 'height', 'x', 'y');
    this.set('svg', htmlSafe(Ember.$(data).find('svg').html()));
    const viewBox = Ember.$(data).find('svg').attr('viewBox');
    if (viewBox) { this.set('viewBox', viewBox); }

    const defaultWidth = Ember.$(data).find('svg').attr('width');
    const defaultHeight = Ember.$(data).find('svg').attr('height');

    if (!width) { this.set('width', defaultWidth || '100%'); }
    if (!height && !width && defaultHeight) { this.set('height', defaultHeight); }

    const defaultX = Ember.$(data).find('svg').attr('x');
    const defaultY = Ember.$(data).find('svg').attr('y');
    if (!x && defaultX) { this.set('x', Ember.$(data).find('svg').attr('x')); }
    if (!y && defaultY) { this.set('y', Ember.$(data).find('svg').attr('y')); }
  }

});
