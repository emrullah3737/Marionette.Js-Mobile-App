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

  takePhoto(from, cb) {
    if (from === 'library') {
      this.getPhoto(this.cameraOptions('PHOTOLIBRARY'), cb);
      return true;
    }
    this.getPhoto(this.cameraOptions('CAMERA'), cb);
  }

  saveToLocal(
    NedbOptions = { filename: 'Photos', isNew: true, data: {} },
    cameraOptions = { from: 'library', writeToTxt: true },
    cb,
  ) {
    this.takePhoto(cameraOptions.from, (err, image) => {
      if (err) return;

      let uuidPhoto = UUID();
      uuidPhoto += '.txt';
      const data = NedbOptions.data;

      // if NedbOptions isNewis true, create NeDB Collection
      if (NedbOptions.isNew === true && NedbOptions.filename) {
        NeDB.create(NedbOptions.filename);
      }

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

  fetchFromLocal(NedbOptions = { filename: 'Photos', uuidPhoto: '' }, cb) {
    const uuidPhoto = NedbOptions.uuidPhoto;
    NeDB.find(NedbOptions.filename, { uuidPhoto }, 'findOne', (err, docs) => {
      if (err) { cb(err, null); return; }
      File.read(docs.uuidPhoto, (data) => { cb(null, data); });
    });
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
}

export default new Camera();
