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

// ---Заполнение ДОМ данными
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

// --- Заполняем ДОМ данными из первого объекта массива

              // mainPicture.classList.remove('hidden');
              // mainPicture.querySelector('.gallery-overlay-image').src = photos[0].urls;
              // mainPicture.querySelector('.likes-count').textContent = photos[0].likes;
              // mainPicture.querySelector('.comments-count').textContent = photos[0].comments.length;

// --- Upload Form open/close


var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

var formClose = document.querySelector('.upload-form-cancel');
var selectFile = document.querySelector('#upload-file');
var settings = document.querySelector('.upload-overlay');
var previewImg = document.querySelector('.effect-image-preview');


// --- Очистка поля Инпут

var cleaningInput = function () {
  selectFile.value = ('');
};
// --- Открытие закрытие окна --------- Подтягиваем изображение
var openSettings = function () {
  settings.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closeSettings = function () {
  settings.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSettings();
    onCloseButtonClick();
  }
};
var loadPicture = function () {
  var fileName = selectFile.files[0].name;
  previewImg.src = 'photos/' + fileName;
};
selectFile.addEventListener('change', function () {
  openSettings();
  loadPicture();
});
formClose.addEventListener('click', function () {
  closeSettings();
  cleaningInput();
});


// --- Редактирование изображения

var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
var sizeValue = document.querySelector('.upload-resize-controls-value');
var imgPreview = document.querySelector('.effect-image-preview');

// --- Маштаб Минус
buttonDec.addEventListener('click', function () {
  var currentCount = parseInt(sizeValue.value);
  var count = 25;
  if (currentCount - count < 0) {
  } else {
    sizeValue.value = currentCount - count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount - count ) / 100 + ')';
  }
});
// --- Маштаб Плюс
buttonInc.addEventListener('click', function () {
  var currentCount = parseInt(sizeValue.value);
  var count = 25;
  if (currentCount + count > 100) {
  } else {
    sizeValue.value = currentCount + count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount + count ) / 100 + ')';
  }
});

// --- приминение эффектов

// imgPreview
var effects = document.querySelectorAll('input[name=effect]');
for (var e = 0; e < effects.length; e++) {
  effects[e].addEventListener('click', function () {
    var defaultEff = 'effect-image-preview';
    var newEff = this.id.slice(7);
    imgPreview.setAttribute('class', '');
    imgPreview.setAttribute('class', '' + newEff + ' ' + defaultEff + '');
  });
}

// --- открытие миниатюр

var pictures = document.querySelectorAll('.picture');
var closeButton = document.querySelector('.gallery-overlay-close');

var onCloseButtonClick = function () {
  mainPicture.classList.add('hidden');
};
var onPicturePrewiewClick = function () {
  mainPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

closeButton.addEventListener('click', function () {
  onCloseButtonClick();
  document.removeEventListener('keydown', onPopupEscPress);
});

for (var x = 0; x < pictures.length; x++) {
  pictures[x].addEventListener('click', function (evt) {
    evt.preventDefault();
    onPicturePrewiewClick();
    mainPicture.querySelector('.gallery-overlay-image').src = this.querySelector('img').src;
    mainPicture.querySelector('.likes-count').textContent = this.querySelector('.picture-likes').textContent;
    mainPicture.querySelector('.comments-count').textContent = this.querySelector('.picture-comments').textContent;
  });
}

