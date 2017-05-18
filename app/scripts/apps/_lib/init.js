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
      { Col1: { col: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]), qs: { populate: 'profile' } } },
      { Col2: { col: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]), qs: '' } },
      { Col3: { col: new ExpCollection([{ name: 'Emo' }, { name: 'Emsfsdfo' }]), qs: '' } },
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
