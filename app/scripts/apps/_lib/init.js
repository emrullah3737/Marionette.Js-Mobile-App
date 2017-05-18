import Auth from './auth';
import Utils from './utils';
import Site from './site';
import ExpCollection from '../_collections/collection';
import Collection from './collection';

class Init {
  constructor() {
    Utils.log('Init constructor', 'info');
  }

  init() {
    const obj = [
      { Col1: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]) },
      { Col2: new ExpCollection([{ name: 'qwe' }, { name: 'Emodfg' }]) },
      { Col3: new ExpCollection([{ name: 'qwe' }, { name: 'Emodfg' }]) },
    ];
    Collection.fetchAll(obj)
    .then(console.log);
    Auth.init() // Auth initialized
      .then(
        () => {
          Site.loaderIsActive(false);
          return Utils.init();
        }, // Utils initialized
      )
      .then(() => {
        Utils.log('All requirements successfully initialized', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Init();
