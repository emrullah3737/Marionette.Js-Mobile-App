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
    window[filename].insert(doc, cb);
  }

  // find(filename, filterDoc, type, callback);
  // callback and type are optional
  find(
    filename,
    type = 'find',
    filterDoc = {},
    cb = (err, docs) => {
      if (err || !docs) {
        Utils.log(`neDB.${filename} data not found`, 'error');
      } else {
        Utils.log(`neDB.${filename} data found`, 'success');
        console.log(docs);
      }
    },
  ) {
    window[filename][type](filterDoc, cb);
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
    window[filename].update(filterDoc, newDoc, optionDoc, cb);
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
    ].update(filterDoc, newDoc, optionDoc, cb);
  }

  // remove(filename, filterDoc, optionDoc, callback);
  // filterDoc, optionDoc, callback  are optional
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
    window[filename].remove(filterDoc, optionDoc, cb);
  }
}

export default new NeDB();
