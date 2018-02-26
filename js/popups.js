'use strict';
(function () {
  var blockGallery = document.querySelector('.pictures');
  var formCloseButton = document.querySelector('.upload-form-cancel');
  var prewiewCloseButton = document.querySelector('.gallery-overlay-close');
  var mainPicture = document.querySelector('.gallery-overlay');
  var selectFile = document.querySelector('#upload-file');

  blockGallery.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      evt.preventDefault();
      openPrewiew();
      getData(target);
    }
  });

  var onPrewievPressEnter = function (evt) {
    var realTarget = evt.target;
    if (realTarget.tagName.toLowerCase() === 'a') {
      window.util.isEnterEvent(evt, openPrewiew, getData(realTarget.querySelector('img')));
    }
  };
  blockGallery.addEventListener('keydown', onPrewievPressEnter);
  var getData = function (target) {
    mainPicture.querySelector('.gallery-overlay-image').src = target.src;
    mainPicture.querySelector('.likes-count').textContent = target.parentNode.querySelector('.picture-likes').textContent;
    mainPicture.querySelector('.comments-count').textContent = target.parentNode.querySelector('.picture-comments').textContent;
  };
  var openPrewiew = function () {
    mainPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPrewiewEscPress);
    blockGallery.removeEventListener('keydown', onPrewievPressEnter);
  };
  var closePrewiew = function () {
    mainPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPrewiewEscPress);
    blockGallery.addEventListener('keydown', onPrewievPressEnter);
  };
  var onPrewiewEscPress = function (evt) {
    window.util.isEscEvent(evt, closePrewiew);
  };
  prewiewCloseButton.addEventListener('click', closePrewiew);
  prewiewCloseButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePrewiew);
  });
  var onSettingsEscPress = function (evt) {
    window.util.isEscEvent(evt, window.onCloseSettings);
  };
  // --- Открытие закрытие окна --------- Подтягиваем изображение
  var openSettings = function () {
    window.SETTINGS.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsEscPress);
  };
  window.onCloseSettings = function () {
    window.SETTINGS.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsEscPress);
    window.cleaningForm();
    document.querySelector('#upload-effect-none').click();
  };
  var loadPicture = function () {
    var fileName = selectFile.files[0].name;
    window.IMG_PREV.src = 'photos/' + fileName;
  };
  selectFile.addEventListener('change', function () {
    openSettings();
    loadPicture();
  });
  formCloseButton.addEventListener('click', function () {
    window.onCloseSettings();
  });
  // --- Очистка поля Инпут
  window.cleaningForm = function () {
    window.HASH_TAG.value = '';
    window.HASH_TAG.style.outlineColor = window.GOOD;
    window.HASH_TAG.style.borderColor = window.GOOD;
    window.DESCRIPTION.value = '';
  };
})();
