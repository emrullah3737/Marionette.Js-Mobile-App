import Auth from './auth';
import Utils from './utils';
import Site from './site';

class Init {
  constructor() {
    Utils.log('Init constructor', 'info');
  }

  init() {
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
