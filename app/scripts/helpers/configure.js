import Backbone from 'backbone';
import _ from 'underscore';
import Connection from './connection';

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
      // const conn = function () {};
      // Connection initialized
      Connection.init();
      Backbone.ajax = function (options) {
        // setup headers
        const option = options;
        const header = Connection.setHeaders(config);

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
        option.statusCode = Connection.statusCodes();

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
