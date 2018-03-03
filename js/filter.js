'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var newFilters = [];
  // --- фильтрация по количеству лайков
  var getLikesFilter = function (data) {
    newFilters = data.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
  };
  // --- фильтрация по комментариям
  var getDisscussionFilter = function (data) {
    newFilters = data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };
  // --- случайная фильтрация
  var getRandomFilter = function (data) {
    newFilters = data.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

  // --- Отрисовка по данным из нового массива
  var drawFilter = function () {
    var pictures = document.querySelectorAll('.picture');
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].querySelector('img').src = newFilters[i].url;
      pictures[i].querySelector('.picture-likes').textContent = newFilters[i].likes;
      pictures[i].querySelector('.picture-comments').textContent = newFilters[i].comments.length;
    }
  };
  // --- функция DEBOUNCE
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
        newFilters = window.pictures;
      }
      // --- фильтрация по количеству лайков
      if (target.value === 'popular') {
        getLikesFilter(window.pictures);
      }
      // --- фильтрация по комментариям
      if (target.value === 'discussed') {
        getDisscussionFilter(window.pictures);
      }
      // --- случайная фильтрация
      if (target.value === 'random') {
        getRandomFilter(window.pictures);
      }
      window.debounce(drawFilter);
    }
  });
})();
