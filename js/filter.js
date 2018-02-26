'use strict';
(function () {
  var newfilter = [];
  // --- фильтрация по количеству лайков
  var filterlikes = function (data) {
    newfilter = data.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
  };
  // --- фильтрация по комментариям
  var filterDisscus = function (data) {
    newfilter = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };
  // --- случайная фильтрация
  var filterRandom = function (data) {
    newfilter = data.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

  // --- Отрисовка по данным из нового массива
  var drawingFilter = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].querySelector('img').src = newfilter[i].url;
      pictures[i].querySelector('.picture-likes').textContent = newfilter[i].likes;
      pictures[i].querySelector('.picture-comments').textContent = newfilter[i].comments.length;
    }
  };
  // --- функция DEBOUNCE
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
  // --- клик фильтра
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'filters-radio') {
      // --- фильтрация по загрузке
      if (target.value === 'recommend') {
        newfilter = window.pictures;
        window.debounce(drawingFilter);
      }
      // --- фильтрация по количеству лайков
      if (target.value === 'popular') {
        filterlikes(window.pictures);
        window.debounce(drawingFilter);
      }
      // --- фильтрация по комментариям
      if (target.value === 'discussed') {
        filterDisscus(window.pictures);
        window.debounce(drawingFilter);
      }
      // --- случайная фильтрация
      if (target.value === 'random') {
        filterRandom(window.pictures);
        window.debounce(drawingFilter);
      }
    }
  });
})();
