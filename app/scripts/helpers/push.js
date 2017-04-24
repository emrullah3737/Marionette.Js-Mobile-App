let instance = null;
export default class Push {
  constructor() {
    if (!instance) {
      instance = this;
      // this.init();
    }
    return instance;
  }

  init() {
    if (this.push) {
      return;
    }

    if (typeof PushNotification !== 'undefined') {
      this.push = PushNotification.init({
        ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true',
        },
      });
    }
  }

  registration(cb) {
    this.init();
    this.push.on('registration', data => cb(null, data.registrationId));
    this.push.on('error', cb);
    this.finish();
  }

  notification(cb) {
    if (this.push !== undefined) {
      this.push.on('notification', (data) => {
        cb(null, data);
      });
      this.push.on('error', cb);
      this.finish();
    }
  }

  finish() {
    this.push.finish(() =>
      this.push.setApplicationIconBadgeNumber(() => {}, () => {}, 0));
  }
}
