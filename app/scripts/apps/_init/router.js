import Marionette from 'backbone.marionette';
import Controller from './controller';

export default class Router extends Marionette.AppRouter {
  constructor(...args) {
    super(...args);
  }

  get controller() {
    return new Controller({ rootView: this.options.rootView });
  }
  get appRoutes() {
    return {
      '': 'login',
      home: 'home',
    };
  }
}
