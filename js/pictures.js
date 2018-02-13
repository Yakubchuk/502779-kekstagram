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
var ENTER_KEYCODE = 13;

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
  cleaningInput();
  document.removeEventListener('keydown', onPopupEscPress);
  imgPreview.setAttribute('class', 'effect-image-preview');
};
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSettings();
    onCloseButtonClick();
    imgPreview.setAttribute('class', 'effect-image-preview');
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
  if (currentCount - count >= 25) {
    sizeValue.value = currentCount - count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount - count) / 100 + ')';
  }
});
// --- Маштаб Плюс
buttonInc.addEventListener('click', function () {
  var currentCount = parseInt(sizeValue.value);
  var count = 25;
  if (currentCount + count <= 100) {
    sizeValue.value = currentCount + count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount + count) / 100 + ')';
  }
});

// --- Слайдер
var runner = document.querySelector('.upload-effect-level-pin');
var percentBar = document.querySelector('.upload-effect-level-line');

var getPosition = function () {
  var obj = runner; // берем интересующий элемент
  var posX = obj.offsetTop;  // верхний отступ эл-та от родителя
  var posY = obj.offsetLeft; // левый отступ эл-та от родителя
  console.log('x=[' + posX + '] y=[' + posY + ']'); // печатаем координаты
};


// --- приминение эффектов

// imgPreview
var effects = document.querySelectorAll('input[name=effect]');
var slider = document.querySelector('.upload-effect-level');

var getChecked = function () {
  var inp = effects;
  for (var i = 0; i < inp.length; i++) {
    if (inp[i].type === 'radio' && inp[i].checked) {
      if (inp[i].value === 'none') {
        slider.classList.add('hidden');
      }
    }
  }
};
getChecked();

for (var e = 0; e < effects.length; e++) {
  effects[e].addEventListener('change', function () {
    var defaultEff = 'effect-image-preview';
    var newEff = this.id.slice(7);
    if (newEff === 'effect-none') {
      imgPreview.setAttribute('class', '');
      imgPreview.setAttribute('class', '' + defaultEff + '');
      slider.classList.add('hidden');
    } else {
      imgPreview.setAttribute('class', '');
      imgPreview.setAttribute('class', '' + newEff + ' ' + defaultEff + '');
      slider.classList.remove('hidden');
    }
  });
}



runner.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  getPosition();

  var valueBar = percentBar.offsetWidth;
  var startCoord = {
    y: runner.offsetLeft
  };
  var currentValue = startCoord / valueBar;
  var currentEffect = getComputedStyle(document.querySelector('.effect-image-preview'));
  var effectDone = currentEffect.filter.slice(0, -3);

  document.querySelector('.effect-image-preview').setAttribute('style', 'filter :' + effectDone + '(' + currentEffect + ')');
  console.log(document.querySelector('.effect-image-preview').style);
  console.log(effectDone);
  console.log(startCoord);
  console.log(valueBar);



  // var onMouseMove = function (moveEvt) {
  //   moveEvt.preventDefault();
  //
  //   var shift = {
  //     x: startCoord.x - runner.offsetLeft
  //   };
  //   startCoord = {
  //     x: moveEvt.offsetLeft
  //   };
  //   runner.style.left = (runner.offsetLeft - shift.x) + 'px';
  //
  // };
  //
  // var onMouseUp = function (upEvt) {
  //   upEvt.preventDefault();
  //
  //   runner.removeEventListener('mousemove', onMouseMove);
  //   runner.removeEventListener('mouseup', onMouseUp);
  // };
  //
  // runner.addEventListener('mousemove', onMouseMove);
  // runner.addEventListener('mouseup', onMouseUp);

});

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

// --- проверка формы
var hashTags = document.querySelector('.upload-form-hashtags');
var description = document.querySelector('.upload-form-description');

var spaceDel = function (str) {
  console.log(str);
  str = str.replace(/\s/g, '');
  console.log(str);
  return str;
};

hashTags.addEventListener('change', function () {
  // --- удаляем пробелы  +  приводим к нижнему регистру  +  строка в массив по знаку#
  // alert(hashTags.value);
  var arr = spaceDel(hashTags.value).toLowerCase().split('#', 6);
  // alert(arr);
  arr.shift();
  // --- Проверяем длинну хэш-тега
  for (i = 0; i < arr.length; i++) {
    if (arr[i].length >= 20) {
      arr.splice(i, 1);
    }
  }
  console.log(arr);
  // --- проверка на совпадения
  // console.log(arr);

  var match = arr.length;
  arr.sort();

  while (match--) {
    if (arr[match] === arr[match - 1]) {
      arr.splice(match, 1);
    }
    // console.log(arr);
  }
  console.log(arr);
});


// var hasWhiteSpace = function(s) {
//   return s.indexOf(' ') >= 0;
// };

// --- Отправка формы

// --- проверка поля File
var fileName = document.querySelector('.upload-file');
fileName.addEventListener('invalid', function (evt) {
  if (fileName.validity.valueMissing) {
    fileName.setCustomValidity('обязательное поле');
  }
});

// --- длинна комментария
// description.addEventListener('change', function () {
//
//
//
//
// var SUBMITT = document.querySelector('.upload-form-submit')

// SUBMITT.addEventListener('click', function () {
//     // this.submit();
// });
