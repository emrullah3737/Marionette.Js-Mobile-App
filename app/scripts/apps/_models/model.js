import Backbone from 'backbone';

export default class Model extends Backbone.Model {
  constructor(...args) {
    super(...args);
  }

  urlRoot() {
    return 'api/o/api';
  }
}
