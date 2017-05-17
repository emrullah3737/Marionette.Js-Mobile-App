import _ from 'underscore';
import async from 'async';

class Collection {
  bindCollections(collections = []) {
    return new Promise((resolve, reject) => {
      const obj = {};
      async.eachLimit(
        collections,
        4,
        (file, cb) => {
          _.each(file, (collection, index) => {
            if (collection.fetch) {
              collection.fetch({
                success(data) { obj[index] = data; cb(); },
                error(err) { obj[index] = err; cb(); },
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
}

export default new Collection();
