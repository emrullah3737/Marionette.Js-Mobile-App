import Backbone from 'backbone';
import _ from 'underscore';
import Site from '../helpers/site';
import Utils from '../helpers/utils';

function configureApp(callback) {
  Backbone.$
    .get('environment.json')
    .done((envfile) => {
      if (!envfile) {
        return;
      }

      try {
        window.config = JSON.parse(envfile);
      } catch (err) {
        window.config = envfile;
      }

      const config = window.config[window.config.configuration];
      const origAjax = Backbone.ajax;
      const conn = function () {
        if (
          typeof Connection === 'undefined' ||
          typeof navigator === 'undefined' ||
          typeof navigator.connection === 'undefined'
        ) {
          return true;
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
      };
      Backbone.ajax = function (options) {
        if (conn() === 'NONE') {
          Site.loaderHide();
          Site.modal('INTERNET', 'Connection Failed!', 'OK');
        }
        conn();
        // setup headers
        const option = options;
        const header = {
          'X-Client-Id': config['X-Client-Id'],
          'X-Client-Secret': config['X-Client-Secret'],
        };

        if (Utils.user) {
          header['X-Access-Token'] = Utils.user.token;
          // utils.log('helpers/configure', utils.user);
        }


        option.headers = _.extend(option.headers || {}, header);

        // environment endpoint
        if (
          option.url.indexOf('http') === -1 &&
          config.endpoint &&
          config.endpoint.indexOf('http') !== -1
        ) {
          option.url = config.endpoint + option.url;
        }

        // Error Codes
        option.statusCode = {
          403(model) {},
          404(model) {},
        };

        return origAjax.apply(this, arguments);
      };

      // custom logging (prepared for server side logging)
      window.onerror = function (msg, file, line, col) {
        const date = new Date().toISOString();
        const errorMessage = `${date} - error: ${msg} - file: ${file}, line: ${line}, col:${col}`;
        console.error(errorMessage);
      };

      callback();
    })
    .fail(() => {
      callback();
    });
}

export default configureApp;
