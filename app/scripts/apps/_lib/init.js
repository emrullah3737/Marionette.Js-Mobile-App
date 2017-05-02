import Auth from './auth';
import Utils from './utils';

class Init {
  constructor() {
    console.log('Init constructor');
  }

  init() {
    Auth.init() // Auth initialized
      .then(() => {
        Auth.loginRedirection();// After auth, redirection called
        return Utils.init();// Utils initialized
      })
      .then(() => {
        console.log('All requirements successfully initialized');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Init();
