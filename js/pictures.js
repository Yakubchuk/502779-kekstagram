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

//---функция вычисления случайных значений
function getRandomNum(max, min) {
  return Math.floor(Math.random() * (max + 1 - min));
}

//---Запонлнение Массива Объектов Данными
var photos = [];
for ( var i = 0; i < 25; i++) {
  photos [i] =
    {
      url: 'photos/'+ (i+1) +'.jpg',
      likes: getRandomNum(200, 15),
      comments: COMMENTS[getRandomNum(COMMENTS.length, 1)]
    }
}

console.log(photos);

var renderPhotos = function () {
  var currentPictures = pictureTemplate.cloneNode(true);
  currentPictures.querySelector('img').src = photos[i].url;
  currentPictures.querySelector('.picture-likes').textContent = photos[i].likes;
  currentPictures.querySelector('.picture-comments').textContent = photos[i].comments;
  return currentPictures;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
};
picturesList.appendChild(fragment);

//--- Заполняем ДОМ данными из первого объекта массива
mainPicture.classList.remove('hidden');
mainPicture.querySelector('.gallery-overlay-image').src = photos[0].url;
mainPicture.querySelector('.likes-count').textContent = photos[0].likes;
mainPicture.querySelector('.comments-count').textContent = photos[0].comments;
