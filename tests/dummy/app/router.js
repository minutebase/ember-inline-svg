import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("root");
  this.route("subdirectory");
  this.route("class");
  this.route("extension");
  this.route("title");
});

export default Router;
