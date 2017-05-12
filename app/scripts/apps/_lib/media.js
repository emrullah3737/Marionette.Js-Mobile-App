class Media {
  constructor() {
    // Media constructor
  }

  init() {
    return typeof navigator.device === 'undefined' ? false : typeof navigator.device.capture !== 'undefined';
  }

  // Capture({type: 'captureVideo', limit: 2}, (data, err) => {});
  // Capture({type: 'captureImage', limit: 2}, (data, err) => {});
  // Capture({type: 'captureAudio', limit: 2}, (data, err) => {});
  Capture(AudioOptions, cb) {
    if (!this.init()) { cb(null, 'Capture plugin is undefined'); return false; }

    // capture callback
    const captureSuccess = (mediaFiles) => {
      cb(mediaFiles, null);
    };

    // capture error callback
    const captureError = (error) => {
      cb(null, error);
    };

    // start capture
    if (!AudioOptions.type) return false;
    navigator.device.capture[AudioOptions.type](captureSuccess, captureError, AudioOptions);
  }
}

export default new Media();
