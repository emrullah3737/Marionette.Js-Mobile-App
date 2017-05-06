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

  model() {
    // The device.model returns the name of the device's model or product.
    if (this.init() === true) return device.model;
    return 'undefined model';
  }

  platform() {
    // Get the device's operating system name.
    if (this.init() === true) return device.platform;
    return 'undefined platform';
  }

  version() {
    // Get the operating system version.
    if (this.init() === true) return device.version;
    return 'undefined version';
  }

  uuid() {
    // Get the device's Universally Unique Identifier
    if (this.init() === true) return device.uuid;
    return 'undefined uuid';
  }

  manufacturer() {
    // Get the device's manufacturer.
    if (this.init() === true) return device.manufacturer;
    return 'undefined manufacturer';
  }

  isVirtual() {
    // whether the device is running on a simulator.
    if (this.init() === true) return device.isVirtual;
    return 'undefined isVirtual';
  }

  serial() {
    // Get the device hardware serial number
    if (this.init() === true) return device.serial;
    return 'undefined serial';
  }
}

export default new Device();
