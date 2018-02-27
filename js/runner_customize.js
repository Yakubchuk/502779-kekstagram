'use strict';

// //////////////////////////// ---------------------------- Обработчик событий смены Эффектов -------------------- ///////////////////////////
(function () {
  // --- Слайдер
  var effectsBlock = document.querySelector('.upload-effect-controls');
  var slider = document.querySelector('.upload-effect-level');
  window.effOriginal = document.querySelector('#upload-effect-none');
  // --- какой эффект применить

  effectsBlock.addEventListener('change', function (evt) {
    var target = evt.target;
    var defaultEff = 'effect-image-preview';
    var newEff = target.id.slice(7);
    if (newEff === 'effect-none') {
      window.hideSliderBar(defaultEff);
    } else {
      moveSliderBarToDefault(defaultEff, newEff);
    }
  });
  // --- скрываем ползунок
  window.hideSliderBar = function (defclass) {
    window.IMG_PREV.className = '';
    window.IMG_PREV.classList.add(defclass);
    slider.classList.add('hidden');
    window.IMG_PREV.style.filter = '';
    window.LEVEL_EFF = 0;
  };
  // --- наложение эффекта
  var moveSliderBarToDefault = function (defclass, newclass) {
    window.IMG_PREV.className = defclass;
    window.IMG_PREV.classList.add(newclass);
    slider.classList.remove('hidden');
    // --- бегунок на 100%
    window.LEVEL_EFF = 100;
    window.IMG_PREV.style = '';
    window.RUNNER.style.left = '460px';
    window.SHADOW_SLI.style.width = window.RUNNER.offsetLeft + 'px';
  };
  // --- скрытие ползунка
  slider.classList.add('hidden');
})();
