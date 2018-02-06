/* eslint-disable comma-spacing */
'use strict';
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesList = document.querySelector('.pictures');
var mainPicture = document.querySelector('.gallery-overlay');
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
function compareRandom(a, b) {
  return Math.random() - 0.5;
}

// ---функция выбора одного\двух комментариев
function mixinDatas() {
  var currentComments = [];
  var block = COMMENTS.sort(compareRandom);
  var counter = Math.round(Math.random()+1);
  for (var n = 0; n < counter; n++){
    currentComments[n] = block[n];
  }
  return currentComments;
}
// mixinDatas();

// function getRndQuantity() {
//   var num = [];
//   var obj = COMMENTS;
//   var count = getRandomNum(2, 1) + 1;
//   // num.slice(0, num.length);
//   for (var j = 0; j < count; j++) {
//     num[j] = obj[Math.floor(Math.random() * obj.length)];
//   }
//   return num;
// }

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

// ---Заполнение ДОМ данными
var renderPhotos = function (item) {
  var currentPictures = pictureTemplate.cloneNode(true);
  currentPictures.querySelector('img').src = item.urls;
  currentPictures.querySelector('.picture-likes').textContent = item.likes;
  currentPictures.querySelector('.picture-comments').textContent = item.comments.length;
  return currentPictures;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}

picturesList.appendChild(fragment);

// --- Заполняем ДОМ данными из первого объекта массива
// mainPicture.classList.remove('hidden');
mainPicture.querySelector('.gallery-overlay-image').src = photos[0].urls;
mainPicture.querySelector('.likes-count').textContent = photos[0].likes;
mainPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
