import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import Syphon from '../../../../bower_components/backbone.syphon/lib/backbone.syphon.min';
import Site from '../_lib/site';

export default class FormPage extends Marionette.Behavior {
  constructor(...args) {
    super(...args);
  }

  ui() {
    const ui = {
      input: 'input',
    };
    return ui;
  }

  events() {
    const events = {
      'submit form': 'process',
    };
    return events;
  }

  showErrors(errors) {
    let err = _.values(errors);
    err = err.join('<br />');
    Site.modal('Error', err, 'OK');
  }

  saveModel() {
    // Loading
    Site.loader('open');
    const self = this;
    this.view.model.save(null, {
      error(req, err) {
        // Loading stop
        Site.loader('hide');
        if (self.view.formError) {
          self.view.formError(req, err);
        }
      },
      success(model, data) {
        // Loading stop
        Site.loader('hide');
        if (self.view.formSuccess) {
          self.view.formSuccess(model, data);
        }
      },
    });
  }

  bindValidation() {
    // unbind first
    Backbone.Validation.unbind(this.view);
    this.view.model.unbind('validated');

    // field based validation
    Backbone.Validation.bind(this.view, {
      invalid(view, attr, error) {},
      valid(view, attr, selector) {},
    });

    // validated event
    this.view.model.bind('validated', (isValid, model, errors) => {});
  }

  process(e) {
    e.preventDefault();
    // input blur
    this.ui.input.blur();
    // serialize model data
    this.view.model.set(Syphon.serialize(this));
    // prevalidate model data
    const errors = this.view.model.preValidate(this.view.model.toJSON()) || {};
    if (Object.keys(errors).length) {
      this.showErrors(errors);
    } else {
      this.saveModel();
    }
  }

  onRender() {
    this.bindValidation();
  }

  onAttach() {}

  onDestroy() {
    Backbone.Validation.unbind(this.view);
    this.view.model.unbind('validated');
  }
}
