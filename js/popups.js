'use strict';
(function () {
  var blockGallery = document.querySelector('.pictures');
  var formCloseButton = document.querySelector('.upload-form-cancel');
  var prewiewCloseButton = document.querySelector('.gallery-overlay-close');
  var overlayPicture = document.querySelector('.gallery-overlay');
  var selectedFile = document.querySelector('#upload-file');
  // --- ловим клик по миниатюре

  // --- Очистка поля Инпут
  var cleanForm = function () {
    window.var.HASH_TAG.value = '';
    window.validation.clearErrorMessage(window.var.DESCRIPTION);
    window.validation.clearErrorMessage(window.var.HASH_TAG);
    window.var.DESCRIPTION.value = '';
    selectedFile.value = '';
    window.var.IMG_PREV.style = '';
    window.zoom.sizeValue.value = '100%';
  };
  window.popups = {
    onCloseSettings: function () {
      window.var.SETTINGS.classList.add('hidden');
      cleanForm();
      window.runnerCustomize.effectsOriginal.click();
      document.removeEventListener('keydown', onSettingsEscPress);
      window.zoom.buttonDec.removeEventListener('click', function () {
        window.zoom.onSizeIncClick();
      });
      window.zoom.buttonInc.removeEventListener('click', function () {
        window.zoom.onSizeDecClick();
      });
      window.runnerCustomize.effectsBlock.removeEventListener('change', window.runnerCustomize.onEffectsChange);
    }
  };
  blockGallery.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      evt.preventDefault();
      onPreviewClick();
      getData(target);
    }
    if (target.tagName.toLowerCase() === 'span') {
      evt.preventDefault();
    }
  });
  // --- открытие миниатюры на ENTER
  var onPreviewPressEnter = function (evt) {
    var realTarget = evt.target;
    if (realTarget.tagName.toLowerCase() === 'a') {
      window.util.isEnterEvent(evt, onPreviewClick, getData(realTarget.querySelector('img')));
    }
  };
  // --- ловим нажатие на ENTER
  blockGallery.addEventListener('keydown', onPreviewPressEnter);
  // --- заполнение полной версии данными из миниатюры
  var getData = function (target) {
    overlayPicture.querySelector('.gallery-overlay-image').src = target.src;
    overlayPicture.querySelector('.likes-count').textContent = target.parentNode.querySelector('.picture-likes').textContent;
    overlayPicture.querySelector('.comments-count').textContent = target.parentNode.querySelector('.picture-comments').textContent;
  };
  // --- функция открытия миниатюры
  var onPreviewClick = function () {
    overlayPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPrewiewEscPress);
    blockGallery.removeEventListener('keydown', onPreviewPressEnter);
    prewiewCloseButton.addEventListener('click', onCloseButtonPreviewClick);
    prewiewCloseButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, onCloseButtonPreviewClick);
    });
  };
  // --- функция закрытия миниатюры
  var onCloseButtonPreviewClick = function () {
    overlayPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPrewiewEscPress);
    prewiewCloseButton.removeEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, onCloseButtonPreviewClick);
    });
    blockGallery.addEventListener('keydown', onPreviewPressEnter);
  };
  // --- закрытие миниатюры по ESC
  var onPrewiewEscPress = function (evt) {
    window.util.isEscEvent(evt, onCloseButtonPreviewClick);
  };
  var onSettingsEscPress = function (evt) {
    window.util.isEscEvent(evt, window.popups.onCloseSettings);
  };
  // --- Открытие закрытие Form --------- Подтягиваем изображение
  var openSettings = function () {
    window.var.SETTINGS.classList.remove('hidden');
    document.addEventListener('keydown', onSettingsEscPress);
    formCloseButton.addEventListener('click', function () {
      window.popups.onCloseSettings();
    });
    window.zoom.buttonDec.addEventListener('click', window.zoom.onSizeIncClick);
    window.zoom.buttonInc.addEventListener('click', window.zoom.onSizeDecClick);
    window.runnerCustomize.effectsBlock.addEventListener('change', window.runnerCustomize.onEffectsChange);
  };

  // --- src загружаемой картинки
  var loadPicture = function () {
    var fileName = selectedFile.files[0].name;
    window.var.IMG_PREV.src = 'photos/' + fileName;
  };
  // --- открытие по выбору файла
  selectedFile.addEventListener('change', function () {
    openSettings();
    loadPicture();
  });
})();
