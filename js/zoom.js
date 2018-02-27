'use strict';
// //////////////////////////// ---------------------------- Маштаб изображения -------------------- ///////////////////////////
(function () {
  window.buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  window.buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var sizeValue = document.querySelector('.upload-resize-controls-value');
  var countZoom = 25;

  // --- Маштаб Плюс
  window.onSizeIncClick = function () {
    var currentCount = parseInt(sizeValue.value, 0);
    if (currentCount - countZoom >= countZoom) {
      sizeValue.value = currentCount - countZoom + '%';
      window.IMG_PREV.style.transform = 'scale(' + (currentCount - countZoom) / 100 + ')';
    }
  };
  // --- Маштаб Минус
  window.onSizeDecClick = function () {
    var currentCount = parseInt(sizeValue.value, 0);
    if (currentCount + countZoom <= 100) {
      sizeValue.value = currentCount + countZoom + '%';
      window.IMG_PREV.style.transform = 'scale(' + (currentCount + countZoom) / 100 + ')';
    }
  };
})();
