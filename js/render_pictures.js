'use strict';

(function () {
  window.Items = [];
  window.renderItems = function (item) {
    var currentPictures = window.PIC_TEMPLATE.cloneNode(true);
    currentPictures.querySelector('img').src = item.url;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  window.drawPictures = function (data) {
    var fragment = document.createDocumentFragment();
    window.pictures = data;
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(window.renderItems(data[j]));
    }
    window.PIC_LIST.appendChild(fragment);
    document.querySelector('.filters').classList.remove('filters-inactive');
  };
  window.load(window.drawPictures, window.onError);
})();
