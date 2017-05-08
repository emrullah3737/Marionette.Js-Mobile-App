import _ from 'underscore';
import Backbone from 'backbone';
import Radio from 'backbone.radio';

class Site {
  nav(page, animation = 1, qs) {
    if (!page) return;
    const vent = Radio.channel('navigation');
    vent.trigger('page:navigate', { page, animation, qs });
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


  modal({ title = 'title', text = 'text', buttons = [{ text, onClick }] }) {
    myApp.modal({ title, text, buttons });
  }

  loaderIsActive(cond) {
    this.loaderActive = cond === true;
  }

  loader(type) {
    if (this.loaderActive) {
      myApp[type === 'open' ? 'showIndicator' : 'hideIndicator']();
    }
  }
}

export default new Site();
