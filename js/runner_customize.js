'use strict';

(function () {
  // --- Слайдер
  window.effectsBlock = document.querySelector('.upload-effect-controls');
  var slider = document.querySelector('.upload-effect-level');
  window.effOriginal = document.querySelector('#upload-effect-none');
  // --- какой эффект применить

  window.onEffectsChange = function (evt) {
    var target = evt.target;
    var defaultEff = 'effect-image-preview';
    var newEff = target.id.slice(7);
    if (newEff === 'effect-none') {
      hideSliderBar(defaultEff);
    } else {
      moveSliderBarToDefault(defaultEff, newEff);
    }
  };
  // --- скрываем ползунок
  var hideSliderBar = function (defclass) {
    window.IMG_PREV.className = '';
    window.IMG_PREV.classList.add(defclass);
    slider.classList.add('hidden');
    window.IMG_PREV.style.filter = '';
    window.levelEffect = 0;
  };
  // --- наложение эффекта
  var moveSliderBarToDefault = function (defclass, newclass) {
    window.IMG_PREV.className = defclass;
    window.IMG_PREV.classList.add(newclass);
    slider.classList.remove('hidden');
    // --- бегунок на 100%
    window.levelEffect = 100;
    window.IMG_PREV.style.filter = '';
    window.RUNNER.style.left = '460px';
    window.SHADOW_SLI.style.width = window.RUNNER.offsetLeft + 'px';
  };
  // --- скрытие ползунка
  slider.classList.add('hidden');
})();
