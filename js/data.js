'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesList = document.querySelector('.pictures');
  var COMMENTS =
    ['Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
  // ---функция вычисления случайных значений
  function getRandomNum(max, min) {
    return Math.floor(Math.random() * (max + 1 - min));
  }
  // ---перемешиваем массив
  function compareRandom() {
    return Math.random() - 0.5;
  }
  // ---функция выбора одного\двух комментариев
  function mixinDatas() {
    var currentComments = [];
    var block = COMMENTS.sort(compareRandom);
    var counter = Math.round(Math.random() + 1);
    for (var n = 0; n < counter; n++) {
      currentComments[n] = block[n];
    }
    return currentComments;
  }
  // ---Запонлнение Массива Объектов Данными
  var photos = [];
  for (var i = 0; i < 25; i++) {
    photos [i] =
      {
        urls: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNum(200, 15),
        comments: mixinDatas()
      };
  }
  var renderPhotos = function (item) {
    var currentPictures = pictureTemplate.cloneNode(true);
    currentPictures.querySelector('img').src = item.urls;
    currentPictures.querySelector('.picture-likes').textContent = item.likes;
    currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
    return currentPictures;
  };
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < photos.length; j++) {
    fragment.appendChild(renderPhotos(photos[j]));
  }
  picturesList.appendChild(fragment);
})();
