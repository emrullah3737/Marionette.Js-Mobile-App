import Marionette from 'backbone.marionette';

export default class SiteLayout extends Marionette.Behavior {
  constructor(...args) {
    super(...args);
    this.defaults = {};
    this.ui = {};
    this.events = {};
  }

  onRender() {}

  onAttach() {}

  onDestroy() {}
}
