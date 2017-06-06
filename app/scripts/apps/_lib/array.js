import _ from 'underscore';

class Arr {

  search(data = [], regExp = '', cb) {
    const pattern = new RegExp(regExp.toLowerCase());
    const arr = [];
    _.each(data, (v, i) => {
      if (pattern.test(v.toLowerCase()) === true) arr.push({ v, i });
    });
    cb(arr);
  }

  inf(arr, storeName, res = []) {
    if (arr.length === undefined || typeof arr === 'string') {
      res.push(arr);
      return window.store.set(storeName, res);
    }
    _.each(arr, (v) => {
      this.inf(v, storeName, res);
    });
  }

  getAllData(arr, storeName) {
    this.inf(arr, storeName);
    return window.store.get(storeName);
  }
}

export default new Arr();
