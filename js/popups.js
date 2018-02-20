'use strict';
(function () {
  var settings = document.querySelector('.upload-overlay');
  var formClose = document.querySelector('.upload-form-cancel');
  var pictures = document.querySelectorAll('.picture');
  var closeButton = document.querySelector('.gallery-overlay-close');
  var mainPicture = document.querySelector('.gallery-overlay');
  var selectFile = document.querySelector('#upload-file');

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
  closeButton.addEventListener('click', closePrewiew);
  closeButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePrewiew);
  });
  var onSettingsEscPress = function (evt) {
    window.util.isEscEvent(evt, onCloseSettings);
  };
  for (var x = 0; x < pictures.length; x++) {
    pictures[x].addEventListener('click', function (evt) {
      evt.preventDefault();
      openPrewiew();
      mainPicture.querySelector('.gallery-overlay-image').src = this.querySelector('img').src;
      mainPicture.querySelector('.likes-count').textContent = this.querySelector('.picture-likes').textContent;
      mainPicture.querySelector('.comments-count').textContent = this.querySelector('.picture-comments').textContent;
    });
  }
  // --- Открытие закрытие окна --------- Подтягиваем изображение
  var openSettings = function () {
    settings.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsEscPress);
  };
  var onCloseSettings = function () {
    settings.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsEscPress);
    cleaningForm();
  };
  var loadPicture = function () {
    var fileName = selectFile.files[0].name;
    window.IMG_PREV.src = 'photos/' + fileName;
  };
  selectFile.addEventListener('change', function () {
    openSettings();
    loadPicture();
  });
  formClose.addEventListener('click', function () {
    onCloseSettings();
  });
  // --- Очистка поля Инпут
  var cleaningForm = function () {
    selectFile.value = ('');
    window.IMG_PREV.setAttribute('class', 'effect-image-preview');
    window.HASH_TAG.value = '';
    window.HASH_TAG.style.outlineColor = window.GOOD;
    window.HASH_TAG.style.borderColor = window.GOOD;
  };
})();
