'use strict';
(function () {
  // var sortFilters = document.querySelector('.filters-radio');

  // window.Filters = {
  //   'popular': (data.sort(function (a, b) {
  //     return b.likes - a.likes;
  //     console.log(data);
  //   })),
  //   'discussed': (data.sort(function (a, b) {
  //     return a.comments.length - b.comments.length;
  //     console.log(data);
  //   })),
  //   'random':
//    (data.sort(function (a, b) {
  //     return Math.random() - 0.5;
  //     console.log(data);
  //   })),
  //   'recommend': (window.load(window.drawPictures, window.onError))
  // };
  var filterlikes = function (data) {
    var likes = data.sort(function (a, b) {
      return b.likes - a.likes;
    });
  };
  var filterDisscus = function (data) {
    var Disscus = data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };
  var filterRandom = function (data) {
    var Random = data.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    return Random;
  };
  document.addEventListener('change', function (evt) {
    var target = evt.target;
    console.log(target);
    if (target.className === 'filters-radio') {
      if (target.value === 'popular') {
        filterlikes(window.pictures);
      }
      if (target.value === 'discussed') {
        filterDisscus(window.pictures);
      }
      if (target.value === 'random') {
        window.drawPictures(filterRandom(window.pictures));
      }
    }
  });
})();
