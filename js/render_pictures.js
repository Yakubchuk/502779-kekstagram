'use strict';

(function () {
  var renderPhotos = function (item) {
    var currentPictures = window.PIC_TEMPLATE.cloneNode(true);
    currentPictures.querySelector('img').src = item.url;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  var onLoad = function (data) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(renderPhotos(data[j]));
    }
    window.PIC_LIST.appendChild(fragment);
  };
  var onError = function (errorMessage) {
    console.log(errorMessage);
  };
  window.load(onLoad, onError);
})();
