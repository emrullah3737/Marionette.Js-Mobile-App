import _ from 'underscore';
import async from 'async';
import $ from 'jquery';
import Site from './site';
import NeDB from './nedb';

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
            const qs = model.qs || '';
            if (model.mdl.fetch) {
              this.fetch(model.mdl, qs)
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

  fetch(models, qs = {}) {
    return new Promise((resolve, reject) => {
      models.fetch({
        data: $.param(qs),
        success(model, data) {
          resolve({ model, data });
        },
        error(error) {
          reject(error);
        },
      });
    });
  }

  saveToLocal(options, dataArr) {
    NeDB.create(options.modelName);
    _.each(dataArr, (data, index) => {
      NeDB.insert(options.modelName, data);
    });
  }

  /*
    Here is example for save
    const obj = [
      { a: 'a', b: 'b' },
      { c: 'c', d: 'd' },
    ];
    Model.save(new ExpModel(), obj, { limit: 4, saveToLocal: true, modelName: 'ModelName' })
    .then(console.log);
  */
  save(models, dataArr = [], options = { limit: 4, saveToLocal: false, modelName: 'Model' }) {
    return new Promise((resolve, reject) => {
      const arr = [];
      Site.loader('show');

      // Save to LocalStorage
      if (options.saveToLocal === true) {
        this.saveToLocal(options, dataArr);
      }
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

  destroyFromLocal(options, dataArr) {
    NeDB.create(options.modelName);
    _.each(dataArr, (data, index) => {
      NeDB.remove(options.modelName, data, { multi: true });
    });
  }

  destroy(models, dataArr = [], options = { limit: 4, destroyFromLocal: false, modelName: 'Model' }) {
    return new Promise((resolve, reject) => {
      const arr = [];
      Site.loader('show');

      // Destroy from LocalStorage
      if (options.destroyFromLocal === true) {
        this.destroyFromLocal(options, dataArr);
      }
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
