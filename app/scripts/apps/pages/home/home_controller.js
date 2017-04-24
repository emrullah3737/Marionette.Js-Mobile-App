import Marionette from 'backbone.marionette';
import View from './home_view';
import Collection from '../../_collections/collection';

export default class Controller extends Marionette.Object {
  constructor(...args) {
    super(...args);
    this.region = this.options.rootView.getRegion('homeRegion');
    this.show();
  }

  show() {
    const view = new View({
      collection: new Collection(),
    });
    this.region.show(view);
  }
}
