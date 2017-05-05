import Backbone from 'backbone';
import Site from './site';

class Utils {
  constructor() {
    this.log('Utils constructor', 'info');
  }
  init() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  log(message = '', type = '') {
    let color;
    let icon;
    switch (type) {
      case 'success': icon = '\u2713'; color = '#bada55'; break;
      case 'error': icon = '\u26A0'; color = 'red'; break;
      case 'warning': icon = '\u0021'; color = 'yellow'; break;
      case 'info': icon = '\u0069'; color = 'lightblue'; break;
      default: icon = ''; color = 'grey'; break;
    }
    console.log(
      `%c ${icon} ${message} `,
      `background: #222; color: ${color};`,
    );
  }

  page(name) {
    Backbone.history.navigate(name, { trigger: true });
  }

  toStr(text) {
    this.text = text;
    this.text = this.text.replace(/İ/g, 'i');
    this.text = this.text.replace(/I/g, 'i');
    this.text = this.text.replace(/ı/g, 'i');
    this.text = this.text.replace(/ğ/g, 'g');
    this.text = this.text.replace(/Ğ/g, 'g');
    this.text = this.text.replace(/ü/g, 'u');
    this.text = this.text.replace(/Ü/g, 'u');
    this.text = this.text.replace(/ş/g, 's');
    this.text = this.text.replace(/Ş/g, 's');
    this.text = this.text.replace(/ö/g, 'o');
    this.text = this.text.replace(/Ö/g, 'o');
    this.text = this.text.replace(/ç/g, 'c');
    this.text = this.text.replace(/Ç/g, 'c');

    return this.text.toLowerCase();
  }
}
export default new Utils();
