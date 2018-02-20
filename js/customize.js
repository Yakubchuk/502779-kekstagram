'use strict';
// //////////////////////////// ---------------------------- Маштаб изображения -------------------- ///////////////////////////
(function () {
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var sizeValue = document.querySelector('.upload-resize-controls-value');
  // --- Маштаб Плюс
  var onSizeIncClick = function () {
    var currentCount = parseInt(sizeValue.value, 0);
    var count = 25;
    if (currentCount - count >= 25) {
      sizeValue.value = currentCount - count + '%';
      window.getVar.getImgPreview.style.transform = 'scale(' + (currentCount - count) / 100 + ')';
    }
  };
  // --- Маштаб Минус
  var onSizeDecClick = function () {
    var currentCount = parseInt(sizeValue.value, 0);
    var count = 25;
    if (currentCount + count <= 100) {
      sizeValue.value = currentCount + count + '%';
      window.getVar.getImgPreview.style.transform = 'scale(' + (currentCount + count) / 100 + ')';
    }
  };

  buttonDec.addEventListener('click', function () {
    onSizeIncClick();
  });

  buttonInc.addEventListener('click', function () {
    onSizeDecClick();
  });

})();
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
        window.getVar.getImgPreview.className = '';
        window.getVar.getImgPreview.classList.add(defaultEff);
        slider.classList.add('hidden');
        window.getVar.getImgPreview.style.filter = '';
        window.getVar.getSaveVal.value = 0;
      } else {
        // --- наложение эффекта
        window.getVar.getImgPreview.className = defaultEff;
        window.getVar.getImgPreview.classList.add(newEff);
        slider.classList.remove('hidden');
        // --- бегунок на 100%
        window.getVar.getSaveVal.value = 100;
        window.getVar.getImgPreview.style = '';
        window.getVar.getGroundCol.style.width = '100%';
        window.getVar.getRunner.style.left = '460px';
      }
    });
  }
  // --- скрытие ползунка при переключении эффектов
  (function () {
    var inp = effects;
    for (var o = 0; o < inp.length; o++) {
      if (inp[o].type === 'radio' && inp[o].checked) {
        if (inp[o].value === 'none') {
          slider.classList.add('hidden');
          window.getVar.getSaveVal.value = 0;
        }
      }
    }
  })();
})();

(function () {
  // //////////////////////////// ---------------------------- бегунок -------------------- ///////////////////////////
  var percentBar = document.querySelector('.upload-effect-level-line');
  // --- насыщенность эффектов по положению ползунка
  var onRunnerShift = function () {
    var valueBar = percentBar.offsetWidth;
    var startCord = window.getVar.getRunner.offsetLeft;
    var currentValue = startCord / valueBar;
    var currentEffect = getComputedStyle(window.getVar.getImgPreview);
    var effectDone = String(currentEffect.filter);
    effectDone = effectDone.substring(0, effectDone.lastIndexOf('('));
    window.getVar.getGroundCol.style.width = (startCord / valueBar) * 100 + '%';
    // --- условия определения эффектов вычисление применяемых значений
    switch (effectDone) {
      case 'invert':
        window.getVar.getImgPreview.style.filter = effectDone + '(' + currentValue * 100 + '%' + ')';
        window.getVar.getSaveVal.value = Math.round(currentValue * 100);
        break;
      case 'blur':
        window.getVar.getImgPreview.style.filter = effectDone + '(' + currentValue * 3 + 'px' + ')';
        window.getVar.getSaveVal.value = Math.round(currentValue * 100);
        break;
      case 'brightness':
        window.getVar.getImgPreview.style.filter = effectDone + '(' + currentValue * 3 + ')';
        window.getVar.getSaveVal.value = Math.round(currentValue * 100);
        break;
      default:
        window.getVar.getImgPreview.style.filter = effectDone + '(' + currentValue + ')';
        window.getVar.getSaveVal.value = Math.round(currentValue * 100);
    }
  };
})();
