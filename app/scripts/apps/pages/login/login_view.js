import Marionette from 'backbone.marionette';
import StaticPageBehavior from '../../_behaviors/staticPage';
import FormPageBehavior from '../../_behaviors/formPage';
import Template from './login_template.hbs';

export default class View extends Marionette.View {
  get slug() {
    return 'Login View';
  }
  get template() {
    return Template;
  }
  get className() {
    return 'page-inner login-bg';
  }

  get behaviors() {
    return {
      StaticPage: {
        behaviorClass: StaticPageBehavior,
        page: 'login',
      },
      LoginPage: {
        behaviorClass: FormPageBehavior,
      },
    };
  }

  constructor(...args) {
    super(...args);
    this.args = args[0];
  }

  formSuccess(model, data) {
    // Form On Success
  }

  formError(req, err) {
    // Form On Error
  }

}
