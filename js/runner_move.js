'use strict';
(function () {
  var MAX_WIDTH = 460;
  var movementBlock = document.querySelector('.upload-effect-level');
  window.var.RUNNER.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {x: evt.clientX};
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {x: startCoords.x - moveEvt.clientX};
      startCoords = {
        x: moveEvt.clientX
      };
      var leftBreak = movementBlock.getBoundingClientRect();
      var curMove = (window.var.RUNNER.offsetLeft - shift.x);
      if (moveEvt.clientX <= leftBreak.x) {
        curMove = 0;
      }
      if (moveEvt.clientX >= leftBreak.x + MAX_WIDTH) {
        curMove = MAX_WIDTH;
      }
      window.var.RUNNER.style.left = curMove + 'px';
      window.onRunnerShift();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseUp);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
