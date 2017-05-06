import Utils from './utils';

class Camera {
  constructor() {
    Utils.log('Camera constructor', 'info');
    this.init();
  }

  init() {
    if (typeof navigator.camera === 'undefined' || typeof navigator.camera.DestinationType === 'undefined') {
      Utils.log(
        `Camera plugin is undefined! at: class ${this.constructor.name}`,
        'error',
      );
      return false;
    }
    // From camera
    this.photoOptionsCamera = {
      quality: 75,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      allowEdit: true,
      encodingType: navigator.camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      sourceType: navigator.camera.PictureSourceType.CAMERA,
    };
    // From Photo Library
    this.photoOptionsLibrary = {
      quality: 75,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      allowEdit: true,
      encodingType: navigator.camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    };
  }

  takePhoto(from, cb) {
    if (from === 'library') {
      this.getPhoto(this.photoOptionsLibrary, cb);
      return true;
    }
    this.getPhoto(this.photoOptionsCamera, cb);
  }

  getPhoto(options, cb) {
    if (!options) return;
    navigator.camera.getPicture(
      (imageData) => {
        // photo id
        const image = `data:image/jpeg;base64,${imageData}`;

        cb(image);
      },
      (error) => {
        cb(error);
      },
      options,
    );
  }
}

export default new Camera();
