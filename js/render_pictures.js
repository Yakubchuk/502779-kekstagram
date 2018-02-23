'use strict';

(function () {
  var renderPhotos = function (item) {
    var currentPictures = window.PIC_TEMPLATE.cloneNode(true);
    currentPictures.querySelector('img').src = item.url;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  window.load(function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pictures.length; j++) {
      fragment.appendChild(renderPhotos(pictures[j]));
    }
    window.PIC_LIST.appendChild(fragment);

  });
})();
