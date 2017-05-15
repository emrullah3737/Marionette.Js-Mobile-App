import UUID from 'lil-uuid';
import Utils from './utils';
import NeDB from './nedb';
import File from './file';

class Camera {
  constructor() {
    Utils.log('Camera constructor', 'info');
    this.init();
  }

  init() {
    if (
      typeof navigator.camera === 'undefined' ||
      typeof navigator.camera.DestinationType === 'undefined'
    ) {
      Utils.log(
        `Camera plugin is undefined! at: class ${this.constructor.name}`,
        'error',
      );
      return false;
    }
  }

  cameraOptions(type) {
    return typeof navigator.camera === 'undefined'
      ? false
      : {
        quality: 75,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        allowEdit: true,
        encodingType: navigator.camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        sourceType: navigator.camera.PictureSourceType[type],
      };
  }

  // ---------------------------------------
  // -------------- TAKE PHOTO -------------
  // ---------------------------------------
  takePhoto(from, cb) {
    if (from === 'library') {
      this.getPhoto(this.cameraOptions('PHOTOLIBRARY'), cb);
      return true;
    }
    this.getPhoto(this.cameraOptions('CAMERA'), cb);
  }

  getPhoto(options, cb) {
    if (!options) return;
    navigator.camera.getPicture(
      (imageData) => {
        // photo id
        const image = `data:image/jpeg;base64,${imageData}`;

        cb(null, image);
      },
      (error) => {
        cb(error, null);
      },
      options,
    );
  }

  // ---------------------------------------
  // ----- TAKE PHOTO AND SAVE TO NEDB -----
  // ---------------------------------------
  saveToLocal(
    cb,
    NedbOptions = { filename: 'Photos', data: {} },
    cameraOptions = { from: 'library', writeToTxt: true },
  ) {
    this.takePhoto(cameraOptions.from, (err, image) => {
      if (err) return;

      let uuidPhoto = UUID();
      uuidPhoto += '.txt';
      const data = NedbOptions.data;

      NeDB.create(NedbOptions.filename);

      // if cameraOptions writeToTxt is true, image b64 write to txt file
      if (cameraOptions.writeToTxt === true) {
        File.write(
          uuidPhoto,
          image,
          () => {
            NeDB.insert(NedbOptions.filename, { uuidPhoto, data }, cb);
          },
          (error) => {
            console.log(error);
          },
        );
      } else {
        NeDB.insert(NedbOptions.filename, { image, data }, cb);
      }
    });
  }

  // ---------------------------------------
  // - FETCH PHOTO FROM NEDB AND TXT FILE  -
  // ---------------------------------------
  fetchFromLocal(cb, NedbOptions = { filename: 'Photos', uuidPhoto: '' }) {
    const uuidPhoto = NedbOptions.uuidPhoto;
    NeDB.find(NedbOptions.filename, { uuidPhoto }, 'findOne', (err, docs) => {
      if (err) { cb(err, null); return; }
      File.read(docs.uuidPhoto, (data) => { cb(null, data); });
    });
  }
}

export default new Camera();
