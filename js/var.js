'use strict';
(function () {
  window.SETTINGS = document.querySelector('.upload-overlay');
  window.SELECTED_FILE = document.querySelector('#upload-file');
  window.IMG_PREV = document.querySelector('.effect-image-preview');
  window.RUNNER = document.querySelector('.upload-effect-level-pin');
  window.SHADOW_SLI = document.querySelector('.upload-effect-level-val');
  window.HASH_TAG = document.querySelector('.upload-form-hashtags');
  window.DESCRIPTION = document.querySelector('.upload-form-description');
  window.levelEffect = document.querySelector('.upload-effect-level-value').value;
  window.PIC_LIST = document.querySelector('.pictures');
  window.PIC_TEMPLATE = document.querySelector('#picture-template').content;
  window.GOOD = 'inherit';
  window.BAD = '#E82C31';
})();
