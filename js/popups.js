'use strict';
(function () {
  var blockGallery = document.querySelector('.pictures');
  var formCloseButton = document.querySelector('.upload-form-cancel');
  var prewiewCloseButton = document.querySelector('.gallery-overlay-close');
  var overlayPicture = document.querySelector('.gallery-overlay');
  var selectedFile = document.querySelector('#upload-file');
  // --- ловим клик по миниатюре
  blockGallery.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      evt.preventDefault();
      openPrewiew();
      getData(target);
    }
  });
  // --- открытие миниатюры на ENTER
  var onPrewievPressEnter = function (evt) {
    var realTarget = evt.target;
    if (realTarget.tagName.toLowerCase() === 'a') {
      window.util.isEnterEvent(evt, openPrewiew, getData(realTarget.querySelector('img')));
    }
  };
  // --- ловим нажатие на ENTER
  blockGallery.addEventListener('keydown', onPrewievPressEnter);
  // --- заполнение полной версии данными из миниатюры
  var getData = function (target) {
    overlayPicture.querySelector('.gallery-overlay-image').src = target.src;
    overlayPicture.querySelector('.likes-count').textContent = target.parentNode.querySelector('.picture-likes').textContent;
    overlayPicture.querySelector('.comments-count').textContent = target.parentNode.querySelector('.picture-comments').textContent;
  };
  // --- функция открытия миниатюры
  var openPrewiew = function () {
    overlayPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPrewiewEscPress);
    blockGallery.removeEventListener('keydown', onPrewievPressEnter);
    prewiewCloseButton.addEventListener('click', closePrewiew);
    prewiewCloseButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePrewiew);
    });
  };
  // --- функция закрытия миниатюры
  var closePrewiew = function () {
    overlayPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPrewiewEscPress);
    prewiewCloseButton.removeEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePrewiew);
    });
    blockGallery.addEventListener('keydown', onPrewievPressEnter);
  };
  // --- закрытие миниатюры по ESC
  var onPrewiewEscPress = function (evt) {
    window.util.isEscEvent(evt, closePrewiew);
  };
  var onSettingsEscPress = function (evt) {
    window.util.isEscEvent(evt, window.onCloseSettings);
  };
  // --- Открытие закрытие Form --------- Подтягиваем изображение
  var openSettings = function () {
    window.SETTINGS.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsEscPress);
    formCloseButton.addEventListener('click', function () {
      window.onCloseSettings();
    });
    window.buttonDec.addEventListener('click', window.onSizeIncClick);
    window.buttonInc.addEventListener('click', window.onSizeDecClick);
    window.effectsBlock.addEventListener('change', window.onEffectsChange);
  };
  window.onCloseSettings = function () {
    window.SETTINGS.classList.add('hidden');
    document.removeEventListener('keydown', onSettingsEscPress);
    window.cleaningForm();
    window.effOriginal.click();
    window.buttonDec.removeEventListener('click', function () {
      window.onSizeIncClick();
    });
    window.buttonInc.removeEventListener('click', function () {
      window.onSizeDecClick();
    });
    window.effectsBlock.removeEventListener('change', window.onEffectsChange);
  };
  // --- src загружаемой картинки
  var loadPicture = function () {
    var fileName = selectedFile.files[0].name;
    window.IMG_PREV.src = 'photos/' + fileName;
  };
  // --- открытие по выбору файла
  selectedFile.addEventListener('change', function () {
    openSettings();
    loadPicture();
  });
  // --- Очистка поля Инпут
  window.cleaningForm = function () {
    window.HASH_TAG.value = '';
    window.HASH_TAG.style.outlineColor = window.GOOD;
    window.HASH_TAG.style.borderColor = window.GOOD;
    window.DESCRIPTION.value = '';
  };
})();
