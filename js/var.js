'use strict';
window.getVar = (function () {
  return {
    getRunner: document.querySelector('.upload-effect-level-pin'),
    getImgPreview: document.querySelector('.effect-image-preview'),
    getHashTag: document.querySelector('.upload-form-hashtags'),
    getGroundCol: document.querySelector('.upload-effect-level-val'),
    getSaveVal: document.querySelector('.upload-effect-level-value')
  };
})();
