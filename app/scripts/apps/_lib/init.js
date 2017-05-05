import Auth from './auth';
import Utils from './utils';
import Device from './device';

class Init {
  constructor() {
    Utils.log('Init constructor', 'info');
  }

  init() {
    Auth.init() // Auth initialized
      .then(() => {
        console.log(Device.model());
        Auth.loginRedirection(); // After auth, redirection called
        return Utils.init(); // Utils initialized
      })
      .then(() => {
        Utils.log('All requirements successfully initialized', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Init();
