'use strict';

(function () {
  var slider = document.querySelector('.upload-effect-level');
  var hideSliderBar = function (defaultClass) {
    window.var.IMG_PREV.className = '';
    window.var.IMG_PREV.classList.add(defaultClass);
    slider.classList.add('hidden');
    window.var.IMG_PREV.style.filter = '';
    window.var.levelEffect = 0;
  };
  // --- наложение эффекта
  var moveSliderBarToDefault = function (defaultClass, newClass) {
    window.var.IMG_PREV.className = defaultClass;
    window.var.IMG_PREV.classList.add(newClass);
    slider.classList.remove('hidden');
    // --- бегунок на 100%
    window.levelEffect = 100;
    window.var.IMG_PREV.style.filter = '';
    window.var.RUNNER.style.left = '460px';
    window.var.SHADOW_SLI.style.width = window.var.RUNNER.offsetLeft + 'px';
  };
  // --- скрытие ползунка
  slider.classList.add('hidden');
  // --- пространство имен
  window.runnerCustomize = {
    effectsBlock: document.querySelector('.upload-effect-controls'),
    effectsOriginal: document.querySelector('#upload-effect-none'),
    // --- какой эффект применить
    onEffectsChange: function (evt) {
      var target = evt.target;
      var defaultEffect = 'effect-image-preview';
      var newEff = target.id.slice(7);
      if (newEff === 'effect-none') {
        hideSliderBar(defaultEffect);
      } else {
        moveSliderBarToDefault(defaultEffect, newEff);
      }
    }
  };
})();
