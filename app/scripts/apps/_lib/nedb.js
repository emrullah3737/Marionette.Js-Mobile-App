import Datastore from 'nedb';
import Utils from './utils';

// more information at https://github.com/louischatriot/nedb
class NeDB {
  constructor() {
    Utils.log('NeDB constructor', 'info');
  }

  // create(filename, callback);
  // callback is optional
  create(
    filename,
    cb = (err, newDoc) => {
      if (err) return;
      Utils.log(`neDB.${filename} created`, 'success');
    },
  ) {
    window[filename] = new Datastore({ filename });
    window[filename].loadDatabase((err) => {
      if (err) cb(err, null);
      cb(null, filename);
    });
  }

  // insert(filename, doc, callback);
  // callback is optional
  insert(
    filename,
    doc,
    cb = (err, newDoc) => {
      if (err) return;
      Utils.log(`neDB.${filename} inserted`, 'success');
      console.log(newDoc);
    },
  ) {
    window[filename].insert(doc, (err, newDoc) => {
      if (err) cb(err, null);
      cb(null, newDoc);
    });
  }

  // find(filename, filterDoc, callback);
  // callback is optional
  find(
    filename,
    filterDoc,
    cb = (err, docs) => {
      if (err || !docs) {
        Utils.log(`neDB.${filename} data not found`, 'error');
      } else {
        Utils.log(`neDB.${filename} data found`, 'success');
        console.log(docs);
      }
    },
  ) {
    window[filename].find(filterDoc, (err, docs) => {
      if (err) cb(err, null);
      cb(null, docs);
    });
  }

  // findOne(filename, _id, callback);
  // callback is optional
  findOne(
    filename,
    _id,
    cb = (err, doc) => {
      if (err || !doc) {
        Utils.log(`neDB.${filename} One data not found`, 'error');
      } else {
        Utils.log(`neDB.${filename} One data found`, 'success');
        console.log(doc);
      }
    },
  ) {
    window[filename].findOne({ _id }, (err, doc) => {
      if (err) cb(err, null);
      cb(null, doc);
    });
  }

  // update(filename, filterDoc, newDoc, optionDoc, callback);
  // callback and optionDoc are optional
  update(
    filename,
    filterDoc,
    newDoc,
    optionDoc = {},
    cb = (err, numReplaced) => {
      if (err || !numReplaced) {
        Utils.log(`neDB.${filename} not updated`, 'error');
      } else {
        Utils.log(`neDB.${filename} updated`, 'success');
        console.log(numReplaced);
      }
    },
  ) {
    window[
      filename
    ].update(filterDoc, newDoc, optionDoc, (err, numReplaced) => {
      if (err) cb(err, null);
      cb(null, numReplaced);
    });
  }

  // upsert(filename, filterDoc, newDoc, callback);
  // callback is optional
  upsert(
    filename,
    filterDoc,
    newDoc,
    optionDoc = { upsert: true },
    cb = (err, numReplaced) => {
      if (err || !numReplaced) {
        Utils.log(`neDB.${filename} not updated`, 'error');
      } else {
        Utils.log(`neDB.${filename} updated`, 'success');
        console.log(numReplaced);
      }
    },
  ) {
    window[
      filename
    ].update(filterDoc, newDoc, optionDoc, (err, numReplaced) => {
      if (err) cb(err, null);
      cb(null, numReplaced);
    });
  }

  // remove(filename, filterDoc, optionDoc, callback);
  // filterDoc,  is optional
  remove(
    filename,
    filterDoc = {},
    optionDoc = {},
    cb = (err, numRemoved) => {
      if (err || !numRemoved) {
        Utils.log(`neDB.${filename} not removed`, 'error');
      } else {
        Utils.log(`neDB.${filename} removed`, 'success');
        console.log(numRemoved);
      }
    },
  ) {
    window[filename].remove(filterDoc, optionDoc, (err, numRemoved) => {
      if (err) cb(err, null);
      cb(null, numRemoved);
    });
  }
}

export default new NeDB();
