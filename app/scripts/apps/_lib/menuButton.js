class MenuButton {
  constructor() {
    document.addEventListener('backbutton', this.onBackKeyDown, false);
    document.addEventListener('menubutton', this.onMenuKeyDown, false);
  }

  onBackKeyDown() {
    console.log('Back Button Clicked!');
  }
  onMenuKeyDown() {
    console.log('Menu Button Clicked!');
  }
}

export default new MenuButton();
