import _ from 'underscore';
import async from 'async';
import $ from 'jquery';

class Collection {
  /*
  Here is example for fetchAll
    const obj = [
      { Col1: { col: new ExpCollection([{ name: 'Emo' }]), qs: { populate: 'profile' } } },
      { Col2: { col: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]), qs: '' } },
      { Col3: { col: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]), qs: '' } },
    ];
    Collection.fetchAll(obj)
    .then(console.log);
    */
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
              this.fetch(collection.col, qs)
              .then((data) => {
                obj[index] = data;
                cb();
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
      collection.fetch({
        data: $.param(qs),
        success(data) {
          resolve(data);
        },
        error(error) {
          resolve(error);
        },
      });
    });
  }
}

export default new Collection();
