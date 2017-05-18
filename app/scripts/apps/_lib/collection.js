import _ from 'underscore';
import async from 'async';
import $ from 'jquery';
import Site from './site';

class Collection {
  fetchAll(collections = []) {
    return new Promise((resolve, reject) => {
      const obj = {};
      const limit = 4;
      async.eachLimit(
        collections,
        limit,
        (file, cb) => {
          _.each(file, (collection, index) => {
            const qs = collection.qs || '';
            if (collection.col.fetch) {
              collection.col.fetch({
                data: $.param(qs),
                success(data) {
                  obj[index] = data;
                  cb();
                },
                error(err) {
                  obj[index] = err;
                  cb();
                },
              });
            }
          });
        },
        (err) => {
          if (err) throw err;
          resolve(obj);
        },
      );
    });
  }

  fetch(collection, qs = {}) {
    return new Promise((resolve, reject) => {
      Site.loader('show');
      collection.fetch({
        data: $.param(qs),
        success(model, data) {
          Site.loader('hide');
          resolve({ model, data });
        },
        error(error) {
          Site.loader('hide');
          reject(error);
        },
      });
    });
  }
}

export default new Collection();
