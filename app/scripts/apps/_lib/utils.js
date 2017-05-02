import Backbone from 'backbone';

class Utils {
  constructor() {
    console.log('Utils constructor');
  }
  init() {
    return new Promise((resolve, reject) => {
      resolve();
    });
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
