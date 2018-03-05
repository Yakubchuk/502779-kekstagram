'use strict';

(function () {
  var ITEM_TEMPLATE = document.querySelector('#picture-template').content;
  var itemsList = document.querySelector('.pictures');
  var sortBlock = document.querySelector('.filters');
  var insertItems = function (item) {
    var currentPictures = ITEM_TEMPLATE.cloneNode(true);
    currentPictures.querySelector('img').src = item.url;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  var drawPictures = function (data) {
    var fragment = document.createDocumentFragment();
    window.pictures = data;
    for (var j = 0; j < data.length; j++) {
      fragment.appendChild(insertItems(data[j]));
    }
    itemsList.appendChild(fragment);
    sortBlock.classList.remove('filters-inactive');
  };
  window.backend.load(drawPictures, window.onError);
})();
