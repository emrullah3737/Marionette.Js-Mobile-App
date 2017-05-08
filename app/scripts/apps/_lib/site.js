import _ from 'underscore';
import Backbone from 'backbone';
import Radio from 'backbone.radio';

class Site {
  nav(page, animation, qs) {
    if (!page) return;
    const vent = Radio.channel('navigation');
    vent.trigger('page:navigate', {
      page,
      animation: animation || 1,
      qs,
    });
  }

  page(name) {
    Backbone.history.navigate(name, { trigger: true });
  }

  qs(queryString) {
    const params = {};
    if (queryString) {
      _.each(
        _.map(decodeURI(queryString).split(/&/g), (el, i) => {
          const aux = el.split('=');
          const o = {};
          if (aux.length >= 1) {
            let val;
            if (aux.length === 2) val = aux[1];
            o[aux[0]] = val;
          }
          return o;
        }),
        (o) => {
          _.extend(params, o);
        },
      );
    }
    return params;
  }

  modal(title, message, buttonText, cb) {
    myApp.modal({
      title,
      text: message,
      buttons: [
        {
          text: buttonText,
          onClick() {
            if (cb) cb();
          },
        },
      ],
    });
  }

  modalDoubleButton(title, message, buttonText, buttonText2, cb, cb2) {
    myApp.modal({
      title,
      text: message,
      buttons: [
        {
          text: buttonText,
          onClick() {
            if (cb) cb();
          },
        },
        {
          text: buttonText2,
          onClick() {
            if (cb2) cb2();
          },
        },
      ],
    });
  }

  loaderIsActive(cond) {
    if (cond === true) {
      this.loaderActive = true;
      return;
    }
    this.loaderActive = false;
  }

  loaderOpen() {
    if (this.loaderActive === true) {
      myApp.showIndicator();
      return;
    }
    console.log('loader is inactive');
  }

  loaderHide() {
    if (this.loaderActive === true) {
      myApp.hideIndicator();
      return;
    }
    console.log('loader is inactive');
  }
}

export default new Site();
