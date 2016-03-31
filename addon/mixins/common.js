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
  preserveAspectRatio: null,
  setSVG(data) {
    const {width, height, x, y} = this.getProperties('width', 'height', 'x', 'y');
    this.set('svg', htmlSafe(Ember.$(data).find('svg').html()));

    /**
     * viewBox
     *
     * Not required but often included;
     */
    const viewBox = Ember.$(data).find('svg').attr('viewBox');
    if (Ember.typeOf(this.get('viewBox')) === 'undefined' && viewBox) { this.set('viewBox', viewBox); }

    /**
     * viewport (width, height)
     *
     * The visible portion of the SVG. Firefox may object if not defined but isn't
     * strictly required and you run the risk of cutoff.
     *
     * By default if not set on component or in the SVG then a width of 100% will be
     * used; this is typically the desired behaviour.
     */
    const viewWidth = Ember.$(data).find('svg').attr('width');
    const viewHeight = Ember.$(data).find('svg').attr('height');
    if (!width) { this.set('width', viewWidth || '100%'); }
    if (!height && !width && viewHeight) { this.set('height', viewHeight); }

    /**
     * Aspect Ratio (preserveAspectRatio)
     *
     * SVG has a boolean flag to ensure that viewBox and viewport are the same aspect
     * ratio. If its stated in the file we'll proxy it through but default its not set.
     */
    const preserveAspectRatio = Ember.$(data).find('svg').attr('preserveAspectRatio');
    if (preserveAspectRatio) { this.set('preserveAspectRatio', preserveAspectRatio); }

    const defaultX = Ember.$(data).find('svg').attr('x');
    const defaultY = Ember.$(data).find('svg').attr('y');
    if (!x && defaultX) { this.set('x', Ember.$(data).find('svg').attr('x')); }
    if (!y && defaultY) { this.set('y', Ember.$(data).find('svg').attr('y')); }
  }

});
