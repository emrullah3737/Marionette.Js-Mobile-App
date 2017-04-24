import Backbone from 'backbone';
import Model from '../_models/model';

export default class Collection extends Backbone.Collection {
  constructor(...args) {
    super(...args);
    this.model = Model;
  }

  url() {
    return 'api/o/api';
  }

  parse(response) {
    return response.data;
  }
}
