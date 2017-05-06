import Auth from './auth';
import Utils from './utils';

class Init {
  constructor() {
    Utils.log('Init constructor', 'info');
  }

  init() {
    Auth.init() // Auth initialized
      .then(
        () => Utils.init(), // Utils initialized
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
