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
    var node = document.createElement('div');
    node.style = 'z-index: 10; text-align: center; background-color: #232321; color: #EFD20A;';
    node.style.position = 'fixed';
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.width = '500px';
    node.style.height = '200px';
    node.style.lineHeight = '200px';
    node.style.transform = 'translate(-50% , -50%)';
    node.style.fontSize = '22px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(onLoad, onError);
})();
