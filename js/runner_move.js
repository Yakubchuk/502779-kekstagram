'use strict';
(function () {
  window.RUNNER.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {x: evt.clientX};
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {x: startCoords.x - moveEvt.clientX};
      startCoords = {
        x: moveEvt.clientX
      };
      window.RUNNER.style.left = (window.RUNNER.offsetLeft - shift.x) + 'px';
      if (window.RUNNER.offsetLeft - shift.x < 0 || window.RUNNER.offsetLeft - shift.x > 460) {
        document.removeEventListener('mousedown', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
      window.onRunnerShift();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
