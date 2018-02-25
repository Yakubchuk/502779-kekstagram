'use strict';
(function () {
  var sortFilters = document.querySelector('.filters-radio');

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className == 'filters-radio') {
      evt.preventDefault();
      
    }
  });

})();
