'use strict';
window.getVar = (function () {
  return {
    // getRunner: document.querySelector('.upload-effect-level-pin'),
    // getImgPreview: document.querySelector('.effect-image-preview'),
    // getHashTag: document.querySelector('.upload-form-hashtags'),
    // getGroundCol: document.querySelector('.upload-effect-level-val'),
    // getSaveVal: document.querySelector('.upload-effect-level-value')
  };
})();

(function () {
  window.IMG_PREV = document.querySelector('.effect-image-preview');
  window.RUNNER = document.querySelector('.upload-effect-level-pin');
  window.SHADOW_SLI = document.querySelector('.upload-effect-level-val');
  window.HASH_TAG = document.querySelector('.upload-form-hashtags');
  window.LEVEL_EFF = document.querySelector('.upload-effect-level-value').value;
  window.PIC_LIST = document.querySelector('.pictures');
  window.PIC_TEMPLATE = document.querySelector('#picture-template').content;
  window.PHOTO_DATA = [];
  window.GOOD = 'inherit';
  window.BAD = '#E82C31';

})();
