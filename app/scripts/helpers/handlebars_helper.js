import Handlebars from 'hbsfy/runtime';
import moment from 'moment';

class HandlebarsHelper {
  init() {
    Handlebars.registerHelper('upcase', s => s.toUpperCase());

    Handlebars.registerHelper('timeForEvent', data => moment(data).format('HH:mm'));
    Handlebars.registerHelper('timeForNotification', data => moment(data).format(' DD MMMM YYYY, HH:mm'));
    Handlebars.registerHelper('getDay', data => `${moment(data).format('DD MMMM YYYY')}, ${moment(data).format('dddd')}`);

    Handlebars.registerHelper('getDate', data => `${moment(data).format('YYYY/MM/DD hh:mm:ss')}`);

    Handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
      switch (operator) {
        case '==':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '===':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '!==':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '<':
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case '<=':
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case '>':
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '>=':
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case '&&':
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case '||':
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });
  }
}
export default new HandlebarsHelper();
