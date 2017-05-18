import _ from 'underscore';
import async from 'async';
import $ from 'jquery';
import Site from './site';

class Model {
  fetchAll(models = []) {
    return new Promise((resolve, reject) => {
      const obj = {};
      const limit = 4;
      async.eachLimit(
        models,
        limit,
        (file, cb) => {
          _.each(file, (model, index) => {
            if (model.fetch) {
              model.fetch({
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

  fetch(models, qs = {}) {
    return new Promise((resolve, reject) => {
      Site.loader('show');
      models.fetch({
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

  save(models, dataArr = [], options = { limit: 4 }) {
    return new Promise((resolve, reject) => {
      const arr = [];
      Site.loader('show');
      async.eachLimit(
        dataArr,
        options.limit,
        (datas, cb) => {
          models.save(datas, {
            success(response) { arr.push({ datas, response }); cb(); },
            error(error) { arr.push({ datas, error }); cb(); },
          });
        },
        (err) => {
          if (err) throw err;
          Site.loader('hide');
          resolve(arr);
        },
      );
    });
  }

  destroy(models, dataArr = [], options = { limit: 4 }) {
    return new Promise((resolve, reject) => {
      const arr = [];
      Site.loader('show');
      async.eachLimit(
        dataArr,
        options.limit,
        (datas, cb) => {
          models.set(datas);
          models.destroy({
            success(response) { arr.push({ datas, response }); cb(); },
            error(error) { arr.push({ datas, error }); cb(); },
          });
        },
        (err) => {
          if (err) throw err;
          Site.loader('hide');
          resolve(arr);
        },
      );
    });
  }
}

export default new Model();
