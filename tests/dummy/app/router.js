import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("root");
  this.route("subdirectory");
  this.route("class");
  this.route("extension");
});

export default Router;
