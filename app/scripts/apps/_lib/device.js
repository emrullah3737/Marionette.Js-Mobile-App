import Utils from './utils';

class Device {
  constructor() {
    Utils.log('Device constructor', 'info');
  }

  init() {
    if (typeof device === 'undefined') {
      Utils.log(
        `Device plugin is undefined! at: class ${this.constructor.name}`,
        'error',
      );
      return false;
    }
    return true;
  }

  getDevice(type) { // model, platform, version, uuid, manufacturer, isVirtual, serial
    if (this.init() === true) return device[type];
  }
}

export default new Device();
