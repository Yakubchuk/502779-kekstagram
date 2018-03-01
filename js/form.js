'use strict';
(function () {
  var form = document.querySelector('.upload-form');

  var onLoad = function () {
    window.popups.onCloseSettings();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), onLoad, window.onError);
    evt.preventDefault();
  });
})();


