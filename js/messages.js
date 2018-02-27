'use strict';
window.onError = function (message) {
  var node = document.createElement('div');
  node.style = 'z-index: 10; text-align: center; background-color: rgba(35,35,33,0.88); color: #EFD20A;';
  node.style.position = 'fixed';
  node.style.left = '50%';
  node.style.top = '50%';
  node.style.width = '500px';
  node.style.height = '200px';
  node.style.lineHeight = '200px';
  node.style.transform = 'translate(-50% , -50%)';
  node.style.fontSize = '22px';
  node.textContent = message;
  document.body.insertAdjacentElement('afterbegin', node);
};
