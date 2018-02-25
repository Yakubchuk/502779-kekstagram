'use strict';
(function () {
  var form = document.querySelector('.upload-form');

  var onLoad = function (data) {
    window.onCloseSettings();
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onLoad, window.onError);
    evt.preventDefault();
  });
})();


