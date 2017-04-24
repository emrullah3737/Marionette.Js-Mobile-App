import Marionette from 'backbone.marionette';
import View from './login_view';
import Model from '../../_models/model';

export default class Controller extends Marionette.Object {
  constructor(...args) {
    super(...args);
    this.region = this.options.rootView.getRegion('loginRegion');
    this.show();
  }

  show() {
    const view = new View({
      model: new Model(),
    });
    this.region.show(view);
  }
}
