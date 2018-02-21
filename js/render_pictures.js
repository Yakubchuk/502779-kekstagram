'use strict';

(function () {
  var renderPhotos = function (item) {
    var currentPictures = window.PIC_TEMPLATE.cloneNode(true);
    currentPictures.querySelector('img').src = item.urls;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.PHOTO_DATA.length; j++) {
    fragment.appendChild(renderPhotos(window.PHOTO_DATA[j]));
  }
  window.PIC_LIST.appendChild(fragment);
})();
