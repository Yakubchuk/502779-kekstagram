'use strict';
(function () {
  var gallery = document.querySelector('.pictures');
  var formCloseButton = document.querySelector('.upload-form-cancel');
  var prewiewCloseButton = document.querySelector('.gallery-overlay-close');
  var mainPicture = document.querySelector('.gallery-overlay');
  var selectFile = document.querySelector('#upload-file');

  gallery.addEventListener('mousedown', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      evt.preventDefault();
      openPrewiew();
      getData(target);
    }
  });
  var getData = function (target) {
    mainPicture.querySelector('.gallery-overlay-image').src = target.src;
    mainPicture.querySelector('.likes-count').textContent = target.parentNode.querySelector('.picture-likes').textContent;
    mainPicture.querySelector('.comments-count').textContent = target.parentNode.querySelector('.picture-comments').textContent;
  };
  var openPrewiew = function () {
    mainPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPrewiewEscPress);
  };
  var closePrewiew = function () {
    mainPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPrewiewEscPress);
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
    selectFile.value = ('');
    window.IMG_PREV.setAttribute('class', 'effect-image-preview');
    window.HASH_TAG.value = '';
    window.HASH_TAG.style.outlineColor = window.GOOD;
    window.HASH_TAG.style.borderColor = window.GOOD;
    window.DESCRIPTION.value = '';
  };
})();
