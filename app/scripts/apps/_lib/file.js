import Utils from './utils';
import b64 from './base64';

class File {
  constructor() {
    Utils.log('File constructor', 'info');
  }

  init() {
    if (typeof cordova === 'undefined' || typeof cordova.file === 'undefined') {
      Utils.log(
        `File plugin is undefined! at: class ${this.constructor.name}`,
        'error',
      );
      return false;
    }
    return true;
  }

  read(fileName, success, error) {
    if (!fileName || !this.init()) {
      return false;
    }

    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory + fileName,
      (fileEntry) => {
        fileEntry.file((file) => {
          const reader = new FileReader();
          reader.onloadend = function (evt) {
            let result = b64.decode(evt.target._result);
            result = result.substr(result.indexOf('data:'), result.length);
            success(result);
          };

          reader.readAsDataURL(file);
        }, error);
      },
      error,
    );
  }

  write(fileName, data = '', success, error) {
    if (!fileName || !this.init()) {
      return false;
    }

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (dir) => {
      dir.getFile(fileName, { create: true }, (file) => {
        file.createWriter((fileWriter) => {
          const blob = new Blob([data], { type: 'text/plain' });
          fileWriter.write(blob);
          success(file);
        }, error);
      });
    });
  }
}

export default new File();
