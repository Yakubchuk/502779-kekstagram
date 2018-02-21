'use strict';
(function () {
  var percentBar = document.querySelector('.upload-effect-level-line');
// --- насыщенность эффектов по положению ползунка
  window.onRunnerShift = function () {
    var valueBar = percentBar.offsetWidth;
    var startCord = window.RUNNER.offsetLeft;
    var currentValue = startCord / valueBar;
    var currentEffect = getComputedStyle(window.IMG_PREV);
    var effectDone = String(currentEffect.filter);
    effectDone = effectDone.substring(0, effectDone.lastIndexOf('('));
    window.SHADOW_SLI.style.width = (startCord / valueBar) * 100 + '%';
    // --- условия определения эффектов вычисление применяемых значений
    switch (effectDone) {
      case 'invert':
        window.IMG_PREV.style.filter = effectDone + '(' + currentValue * 100 + '%' + ')';
        window.LEVEL_EFF = Math.round(currentValue * 100);
        break;
      case 'blur':
        window.IMG_PREV.style.filter = effectDone + '(' + currentValue * 3 + 'px' + ')';
        window.LEVEL_EFF = Math.round(currentValue * 100);
        break;
      case 'brightness':
        window.IMG_PREV.style.filter = effectDone + '(' + currentValue * 3 + ')';
        window.LEVEL_EFF = Math.round(currentValue * 100);
        break;
      default:
        window.IMG_PREV.style.filter = effectDone + '(' + currentValue + ')';
        window.LEVEL_EFF = Math.round(currentValue * 100);
    }
  }
})();