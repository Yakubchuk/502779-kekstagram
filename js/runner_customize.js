'use strict';

// //////////////////////////// ---------------------------- Обработчик событий смены Эффектов -------------------- ///////////////////////////
(function () {
  // --- Слайдер
  var effects = document.querySelectorAll('input[name=effect]');
  var slider = document.querySelector('.upload-effect-level');

  for (var e = 0; e < effects.length; e++) {
    effects[e].addEventListener('change', function () {
      var defaultEff = 'effect-image-preview';
      var newEff = this.id.slice(7);
      if (newEff === 'effect-none') {
        window.hideSliderBar(defaultEff);
      } else {
        moveSliderBarToDefault(defaultEff, newEff);
      }
    });
  }
  window.hideSliderBar = function (a) {
    window.IMG_PREV.className = '';
    window.IMG_PREV.classList.add(a);
    slider.classList.add('hidden');
    window.IMG_PREV.style.filter = '';
    window.LEVEL_EFF = 0;
  };
  // --- наложение эффекта
  var moveSliderBarToDefault = function (a,b) {
    window.IMG_PREV.className = a;
    window.IMG_PREV.classList.add(b);
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
    for (var o = 0; o < inp.length; o++) {
      if (inp[o].type === 'radio' && inp[o].checked) {
        if (inp[o].value === 'none') {
          slider.classList.add('hidden');
          window.LEVEL_EFF = 0;
        }
      }
    }
  })();
})();
