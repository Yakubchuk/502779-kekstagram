// //////////////////////////// ---------------------------- Обработчик событий смены Эффектов -------------------- ///////////////////////////
(function () {
  // --- Слайдер
  var runner = document.querySelector('.upload-effect-level-pin');
  var groundColor = document.querySelector('.upload-effect-level-val');
  var effects = document.querySelectorAll('input[name=effect]');
  var imgPreview = document.querySelector('.effect-image-preview');
  var slider = document.querySelector('.upload-effect-level');
  var saveValue = document.querySelector('.upload-effect-level-value');

  for (var e = 0; e < effects.length; e++) {
    effects[e].addEventListener('change', function () {
      var defaultEff = 'effect-image-preview';
      var newEff = this.id.slice(7);
      if (newEff === 'effect-none') {
        imgPreview.className = '';
        imgPreview.classList.add(defaultEff);
        slider.classList.add('hidden');
        imgPreview.style.filter = '';
        saveValue.value = 0;
      } else {
        // --- наложение эффекта
        imgPreview.className = defaultEff;
        imgPreview.classList.add(newEff);
        slider.classList.remove('hidden');
        // --- бегунок на 100%
        saveValue.value = 100;
        imgPreview.style = '';
        groundColor.style.width = '100%';
        runner.style.left = '460px';
      }
    });
  }
})();

(function () {
  // //////////////////////////// ---------------------------- бегунок -------------------- ///////////////////////////
  var runner = document.querySelector('.upload-effect-level-pin');
  var imgPreview = document.querySelector('.effect-image-preview');
  var saveValue = document.querySelector('.upload-effect-level-value');
  var groundColor = document.querySelector('.upload-effect-level-val');
  var percentBar = document.querySelector('.upload-effect-level-line');
  var onRunnerShift = function () {
    var valueBar = percentBar.offsetWidth;
    var startCord = runner.offsetLeft;
    var currentValue = startCord / valueBar;
    var currentEffect = getComputedStyle(imgPreview);
    var effectDone = String(currentEffect.filter);
    effectDone = effectDone.substring(0, effectDone.lastIndexOf('('));
    groundColor.style.width = (startCord / valueBar) * 100 + '%';
    // --- условия определения эффектов вычисление применяемых значений
    switch (effectDone) {
      case 'invert':
        imgPreview.style.filter = effectDone + '(' + currentValue * 100 + '%' + ')';
        saveValue.value = Math.round(currentValue * 100);
        break;
      case 'blur':
        imgPreview.style.filter = effectDone + '(' + currentValue * 3 + 'px' + ')';
        saveValue.value = Math.round(currentValue * 100);
        break;
      case 'brightness':
        imgPreview.style.filter = effectDone + '(' + currentValue * 3 + ')';
        saveValue.value = Math.round(currentValue * 100);
        break;
      default:
        imgPreview.style.filter = effectDone + '(' + currentValue + ')';
        saveValue.value = Math.round(currentValue * 100);
    }
  };
  // //////////////////////////// ---------------------------- обработчик бегунка -------------------- ///////////////////////////
  runner.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {x: evt.clientX};
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {x: startCoords.x - moveEvt.clientX};
      startCoords = {
        x: moveEvt.clientX
      };
      runner.style.left = (runner.offsetLeft - shift.x) + 'px';
      if (runner.offsetLeft - shift.x < 0 || runner.offsetLeft - shift.x > 460) {
        document.removeEventListener('mousedown', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
      onRunnerShift();
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
