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
  var drawingFilter = function (curent) {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].querySelector('img').src = curent[i].url;
      pictures[i].querySelector('.picture-likes').textContent = curent[i].likes;
      pictures[i].querySelector('.picture-comments').textContent = curent[i].comments.length;
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
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          drawingFilter(window.pictures);
        }, DEBOUNCE_INTERVAL);
      }
      // --- фильтрация по количеству лайков
      if (target.value === 'popular') {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          filterlikes(window.pictures);
          drawingFilter(newfilter);
        }, DEBOUNCE_INTERVAL);
      }
      // --- фильтрация по комментариям
      if (target.value === 'discussed') {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          filterDisscus(window.pictures);
          drawingFilter(newfilter);
        }, DEBOUNCE_INTERVAL);
      }
      // --- случайная фильтрация
      if (target.value === 'random') {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          filterRandom(window.pictures);
          drawingFilter(newfilter);
        }, DEBOUNCE_INTERVAL);
      }
    }
  });
})();
