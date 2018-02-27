'use strict';

// //////////////////////////// ---------------------------- Обработчик событий смены Эффектов -------------------- ///////////////////////////
(function () {
  // --- Слайдер
  var effects = document.querySelectorAll('input[name=effect]');
  var slider = document.querySelector('.upload-effect-level');
  // --- какой эффект применить
  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', function (evt) {
      var target = evt.target;
      var defaultEff = 'effect-image-preview';
      var newEff = target.id.slice(7);
      if (newEff === 'effect-none') {
        window.hideSliderBar(defaultEff);
      } else {
        moveSliderBarToDefault(defaultEff, newEff);
      }
    });
  }
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
    window.SHADOW_SLI.style.width = '100%';
    window.RUNNER.style.left = '460px';
  };
  // --- скрытие ползунка при переключении эффектов
  (function () {
    var inp = effects;
    for (var j = 0; j < inp.length; j++) {
      if (inp[j].type === 'radio' && inp[j].checked) {
        if (inp[j].value === 'none') {
          slider.classList.add('hidden');
          window.LEVEL_EFF = 0;
        }
      }
    }
  })();
})();
