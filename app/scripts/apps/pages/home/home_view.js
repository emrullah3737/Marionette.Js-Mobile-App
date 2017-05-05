import Marionette from 'backbone.marionette';
import StaticPageBehavior from '../../_behaviors/staticPage';
import ChildView from './home_child_view';
import EmptyViewTemplate from './home_empty_template.hbs';
import Camera from '../../_lib/camera';


export default class CollectionView extends Marionette.CollectionView {
  get slug() {
    return 'Home View';
  }
  get className() {
    return 'page-inner';
  }

  get behaviors() {
    return {
      StaticPage: {
        behaviorClass: StaticPageBehavior,
        page: 'home',
      },
    };
  }
  childView() {
    return ChildView;
  }

  events() {
    return {
      'click .camera': 'takePhoto',
    };
  }

  takePhoto() {
    Camera.takePhoto('library', (data) => {
      console.log(data);
    });
  }

  constructor(...args) {
    super(...args);
    const MyEmptyView = Marionette.View.extend({
      template: EmptyViewTemplate,
    });
    this.emptyView = MyEmptyView;
  }

}
