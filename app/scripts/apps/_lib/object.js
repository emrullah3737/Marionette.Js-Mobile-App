import _ from 'underscore';

class Obj {

  search(data = [], regExp = '', cb) {
    const pattern = new RegExp(regExp.toLowerCase());
    const arr = [];
    _.each(data, (v, i) => {
      if (pattern.test(v.toLowerCase()) === true) arr.push({ v, i });
    });
    cb(arr);
  }

  inf(obj, storeName, res = []) {
    if (typeof obj !== 'object') {
      res.push(obj);
      return window.store.set(storeName, res);
    }
    _.each(obj, (v) => {
      this.inf(v, storeName, res);
    });
  }

  getAllData(obj, storeName) {
    this.inf(obj, storeName);
    return window.store.get(storeName);
  }
}

export default new Obj();
