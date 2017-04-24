import Backbone from 'backbone';

class Utils {
  constructor() {
    this.isLoggedIn = false;
    this.passwordStatus = true; // First Password Status
  }

  init() {
    const auth = store.get('auth');
    if (auth && auth.data) {
      this.isLoggedIn = true;
      this.user = auth.data;
      this.setProfile(auth.data.profile);
      this.isChangePassword(auth.data.passwordChanged);
    }
  }

  auth(response) {
    store.set('auth', response);
    this.isLoggedIn = true;
    this.user = response.data;
    this.setProfile(response.data.profile);
    this.isChangePassword(response.data.password_changed);
  }

  setProfile(profile) {
    this.profile = profile;
  }

  isChangePassword(passwordState) {
    if (passwordState === 'Y') {
      this.passwordStatus = false;
    }
  }

  page(name) {
    Backbone.history.navigate(name, { trigger: true });
  }
  toStr(text) {
    this.text = text;
    this.text = this.text.replace(/İ/g, 'i');
    this.text = this.text.replace(/I/g, 'i');
    this.text = this.text.replace(/ı/g, 'i');
    this.text = this.text.replace(/ğ/g, 'g');
    this.text = this.text.replace(/Ğ/g, 'g');
    this.text = this.text.replace(/ü/g, 'u');
    this.text = this.text.replace(/Ü/g, 'u');
    this.text = this.text.replace(/ş/g, 's');
    this.text = this.text.replace(/Ş/g, 's');
    this.text = this.text.replace(/ö/g, 'o');
    this.text = this.text.replace(/Ö/g, 'o');
    this.text = this.text.replace(/ç/g, 'c');
    this.text = this.text.replace(/Ç/g, 'c');

    return this.text.toLowerCase();
  }
}
export default new Utils();
