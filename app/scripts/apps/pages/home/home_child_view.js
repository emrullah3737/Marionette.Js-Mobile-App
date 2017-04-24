import Marionette from 'backbone.marionette';
import Template from './home_child_template.hbs';

export default class View extends Marionette.View {
  get slug() {
    return 'View';
  }
  get template() {
    return Template;
  }

  constructor(...args) {
    super(...args);
  }
  onRender() {}
}
