'use strict';
// //////////////////////////// ---------------------------- Маштаб изображения -------------------- ///////////////////////////
(function () {
  var countZoom = 25;
  window.zoom = {
    buttonDec: document.querySelector('.upload-resize-controls-button-dec'),
    buttonInc: document.querySelector('.upload-resize-controls-button-inc'),
    sizeValue: document.querySelector('.upload-resize-controls-value'),
    // --- Маштаб Плюс
    onSizeIncClick: function () {
      var currentCount = parseInt(window.zoom.sizeValue.value, 0);
      if (currentCount - countZoom >= countZoom) {
        window.zoom.sizeValue.value = currentCount - countZoom + '%';
        window.var.IMG_PREV.style.transform = 'scale(' + (currentCount - countZoom) / 100 + ')';
      }
    },
    // --- Маштаб Минус
    onSizeDecClick: function () {
      var currentCount = parseInt(window.zoom.sizeValue.value, 0);
      if (currentCount + countZoom <= 100) {
        window.zoom.sizeValue.value = currentCount + countZoom + '%';
        window.var.IMG_PREV.style.transform = 'scale(' + (currentCount + countZoom) / 100 + ')';
      }
    }
  };
})();
