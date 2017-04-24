import Marionette from 'backbone.marionette';
import LoginController from '../pages/login/login_controller';
import HomeController from '../pages/home/home_controller';

export default class Controller extends Marionette.Object {
  constructor(...args) {
    super(...args);
    this.obj = { rootView: this.options.rootView };
  }

  login() {
    new LoginController(this.obj);
  }

  home() {
    new HomeController(this.obj);
  }
}
