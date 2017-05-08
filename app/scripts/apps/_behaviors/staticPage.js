import Marionette from 'backbone.marionette';
import $ from 'jquery';
import Radio from 'backbone.radio';
import Site from '../_lib/site';

export default class StaticPage extends Marionette.Behavior {
  constructor(...args) {
    super(...args);
    this.defaults = { page: '' };
  }

  onRender() {
    const vent = Radio.channel('navigation');
    vent.trigger('page:animate', {
      page: this.options.page,
    });
  }

  onAttach() {
    const self = this;
    // If View is Collection View or has Collection
    if (this.view.collection) {
      Site.loader('open');
      const qs = this.view.options.params ? this.view.options.params : '';
      this.view.collection.fetch({
        data: $.param(qs),
        success() {
          Site.loader('hide');
          if (self.view.fetchSuccess) {
            self.view.fetchSuccess();
          }
        },
        error() {
          Site.loader('hide');
          if (self.view.fetchError) {
            self.view.fetchError();
          }
        },
      });
    }
  }

  onDestroy() {}
}
