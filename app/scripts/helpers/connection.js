import Utils from '../apps/_lib/utils';
import Auth from '../apps/_lib/auth';

class Connection {
  constructor() {
    Utils.log('Connection constructor', 'info');
  }

  init() {
    if (this.connection()) this.noneConnection();
  }

  connection() {
    if (
      typeof Connection === 'undefined' ||
      typeof navigator === 'undefined' ||
      typeof navigator.connection === 'undefined'
    ) {
      Utils.log(
        `Connection plugin is undefined! at: class ${this.constructor.name}`,
        'error',
      );
      return false;
    }

    const state = navigator.connection.type || null;

    const states = {};
    states[Connection.UNKNOWN] = 'UNKNOWN';
    states[Connection.ETHERNET] = 'ETHERNET';
    states[Connection.WIFI] = 'WIFI';
    states[Connection.CELL_2G] = 'CELL_2G';
    states[Connection.CELL_3G] = 'CELL_3G';
    states[Connection.CELL_4G] = 'CELL_4G';
    states[Connection.CELL] = 'CELL';
    states[Connection.NONE] = 'NONE';

    return states[state];
  }

  noneConnection() {
    if (this.connection() === 'NONE') {
      Site.loaderHide();
      Site.modal('INTERNET', 'Connection Failed!', 'OK');
    }
    this.connection();
  }

  setHeaders(config) {
    const header = {
      'X-Client-Id': config['X-Client-Id'],
      'X-Client-Secret': config['X-Client-Secret'],
    };

    if (Auth.getUser() !== undefined) {
      header['X-Access-Token'] = Auth.getUser().token;
    }
    return header;
  }

  statusCodes() {
    return {
      404(model) { console.log(model.responseText); },
    };
  }
}

export default new Connection();
