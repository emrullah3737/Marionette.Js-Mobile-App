import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';
import _ from 'underscore';
import Transition from '../../../library/transition';
import Template from './template.hbs';
import SiteLayoutBehavior from '../_behaviors/siteLayout';

export default class MainView extends Marionette.View {
  get slug() {
    return 'Root View';
  }
  get template() {
    return Template;
  }
  get event() {
    // return 'ontouchstart' in document ? 'touchstart' : 'click';
    return 'click';
  }

  get behaviors() {
    return {
      SiteLayout: {
        behaviorClass: SiteLayoutBehavior,
      },
    };
  }

  constructor(...args) {
    super(...args);
    this.clicks = [];
    this.routes = {};
    const vent = Radio.channel('navigation');
    this.listenTo(vent, 'page:animate', this.animate);
    this.listenTo(vent, 'page:navigate', this.navigate);
    this.setModel();
  }

  setModel() {
    const arr = [];
    _.each(this.options.pages, (val) => {
      arr.push({ page: val.split('#')[1] });
    });

    this.model = new Backbone.Model({ pages: arr });
  }

  regions() {
    // set ui elements
    const ui = {
      page: '.page',
      goto: '.goto_page',
      link: "a[href^='/']",
    };

    // listen global goto_page click events
    $(document).on(this.event, '.goto_page', this.go.bind(this));

    // set ui elements for pagesopages
    _.each(this.options.pages, (val, key) => {
      ui[key] = val;
    });
    this.ui = ui;

    // set regions
    const obj = {};
    _.each(this.pages, (val, key) => {
      obj[`${key}Region`] = val;
    });
    this.regionList = obj;
    return obj;
  }

  setPages() {
    const obj = {};
    _.each(this.options.pages, (val, key) => {
      obj[`${key}Region`] = val;
      this.addRegion(`${key}Region`, val);
    });
    this.regionList = obj;
  }

  events() {
    const events = {
      'page:transition:reset @ui.page': 'resetRegions',
    };

    return events;
  }

  resetRegions() {
    const self = this;
    let region;
    _.each(this.regionList, (val, key) => {
      if (key === `${self.active}Region`) {
        return;
      }

      region = self.getRegion(key);

      if (region.currentView) {
        region.currentView.destroy();
      }
    });
  }

  // page animations
  go(e) {
    e.stopPropagation();
    e.preventDefault();

    if (window.isAnimating) {
      // return utils.log(this._slug, 'window is animating!');
      return false;
    }

    const self = $(e.currentTarget);
    self.removeClass('goto-page');

    // check href and navigate
    const href = self.data('href') || self.attr('href');

    if (!href) {
      // return console.log(this._slug, 'href not found!');
      return false;
    }

    this.clicks.push(self);
    Backbone.history.navigate(href, { trigger: true });
  }

  // listens for page:animate
  animate(params) {
    this.active = params.page;
    const clicks = this.clicks;

    // select page if clicks not found
    if (!clicks.length) {
      return this.select(params);
    }

    let i;
    for (i in clicks) {
      if (Object.prototype.hasOwnProperty.call(clicks, i)) {
        Transition.animate(clicks[i]);
      }
    }

    this.clicks = [];
  }

  select(params) {
    // check for manual navigated page
    if (Object.keys(this.routes).length) {
      const pages = this.pages || this.options.pages;
      Transition.navigate(this.routes.animation, pages[this.routes.page]);
      this.routes = {};
      return;
    }

    // select initial page
    Transition.select(this.ui[params.page]);
  }

  navigate(params) {
    this.routes = params;
    let qs = '';
    if (params.qs) {
      qs += `?${$.param(params.qs)}`;
    }

    Backbone.history.navigate(`/${params.page}${qs}`, { trigger: true });
  }

  onDestroy() {}
}
