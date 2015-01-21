import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("root");
  this.route("subdirectory");
  this.route("class");
  this.route("extension");
});

export default Router;
