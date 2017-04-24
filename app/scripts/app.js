
import FastClick from 'fastclick';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Validation from 'backbone-validation';
import Locally from 'locallyjs';
import * as moment from 'moment';
import 'moment/locale/tr';
import Layout from './apps/main/view';
import Router from './apps/_init/router';
import Transition from '../library/transition';
import Utils from './helpers/utils';
import ConfigureApp from './helpers/configure';

import HandlebarsHelper from './helpers/handlebars_helper';

HandlebarsHelper.init();

const App = new Marionette.Application();

App.on('start', () => {
  const layout = {
    el: '#wrapper',
    pages: {
      login: '#page-login',
      home: '#page-home',
    },
  };
  // set Pages
  const rootView = new Layout(layout);
  rootView.render();
  rootView.setPages();

  // router
  new Router({ rootView });
  Transition.init();

  // Framework7 init
  window.myApp = new Framework7({
    modalTitle: 'Title',
    modalButtonCancel: 'Cancel',
    modalButtonOk: 'OK',
  });

  window.$$ = Dom7;

  // FastClick init
  FastClick(document.body);

  // set local storage (locally)
  window.store = new Locally.Store();

  // Utils init
  Utils.init();

  if (Backbone.history) {
    const opts = {
      pushState: false,
    };

    if (Utils.isLoggedIn && window.location.hash === '') {
      opts.silent = true;
      Backbone.history.start(opts);
      Utils.page('/home');
    } else {
      Backbone.history.start({
        pushState: false,
      });
    }
  }
});
// Configure App
ConfigureApp(() => {
  App.start();
});
