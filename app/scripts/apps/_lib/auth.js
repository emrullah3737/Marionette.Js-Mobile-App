import Backbone from 'backbone';
import Utils from './utils';

class Auth {
  constructor() {
    console.log('Auth constructor');
    this.LoggedIn = false;
    this.user = false;
    this.profile = false;
    this.passwordStatus = true; // First Password Status
  }

  init() {
    return new Promise((resolve, reject) => {
      // store is localstorage
      const auth = store.get('auth');
      if (auth && auth.data) {
        this.isLoggedIn(true);
        this.setUser(auth);
        this.setProfile(auth.profile);
        this.isChangePassword(auth.passwordChanged);
      }
      resolve();
    });
  }

  auth(data) {
    // store is localstorage
    const response = this.response(data);
    store.set('auth', response);
    this.isLoggedIn(true);
    this.setUser(response);
    this.setProfile(response.profile);
    this.isChangePassword(response.password_changed);
  }

  response(response) {
    if (response !== undefined) return response;
    throw new Error('Undefined response data!');
  }

  isLoggedIn(LoggedIn) {
    if (LoggedIn === true) this.LoggedIn = true;
  }

  setUser(user) {
    if (user !== undefined) this.user = user;
  }

  setProfile(profile) {
    if (profile !== undefined) this.profile = profile;
  }

  isChangePassword(passwordState) {
    if (passwordState === 'Y') {
      this.passwordStatus = false;
    }
  }

  loginRedirection() {
    if (Backbone.history) {
      const opts = {
        pushState: false,
      };

      if (this.LoggedIn && window.location.hash === '') {
        opts.silent = true;
        Backbone.history.start(opts);
        Utils.page('/home');
      } else {
        Backbone.history.start({
          pushState: false,
        });
      }
    }
  }
}

export default new Auth();
