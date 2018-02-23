'use strict';
(function () {
  var form = document.querySelector('.upload-form');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.onCloseSettings();
    });
    evt.preventDefault();
  });
})();


