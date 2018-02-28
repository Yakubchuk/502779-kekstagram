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
  window.PHOTOS_DATA = [];
  window.COMMENTS =
    ['Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
  window.GOOD = 'inherit';
  window.BAD = '#E82C31';
})();
