'use strict';

(function () {
  // ---функция вычисления случайных значений
  var getRandomNum = function (max, min) {
    return Math.floor(Math.random() * (max + 1 - min));
  };
  // ---перемешиваем массив
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  // ---функция выбора одного\двух комментариев
  var mixinDatas = function () {
    var currentComments = [];
    var block = window.COMMENTS.sort(compareRandom);
    var counter = Math.round(Math.random() + 1);
    for (var i = 0; i < counter; i++) {
      currentComments[i] = block[i];
    }
    return currentComments;
  };
  // ---Запонлнение Массива Объектов Данными
  for (var i = 0; i < 25; i++) {
    window.PHOTO_DATA[i] =
      {
        urls: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNum(200, 15),
        comments: mixinDatas()
      };
  }
})();
