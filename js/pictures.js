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

// --- Маштаб Плюс

var onSizeIncClick = function () {
  var currentCount = parseInt(sizeValue.value, 0);
  var count = 25;
  if (currentCount - count >= 25) {
    sizeValue.value = currentCount - count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount - count) / 100 + ')';
  }
};

// --- Маштаб Минус

var onSizeDecClick = function () {
  var currentCount = parseInt(sizeValue.value, 0);
  var count = 25;
  if (currentCount + count <= 100) {
    sizeValue.value = currentCount + count + '%';
    imgPreview.style.transform = 'scale(' + (currentCount + count) / 100 + ')';
  }
};

buttonDec.addEventListener('click', function () {
  onSizeIncClick();
});

buttonInc.addEventListener('click', function () {
  onSizeDecClick();
});

// --- Слайдер
var runner = document.querySelector('.upload-effect-level-pin');
var percentBar = document.querySelector('.upload-effect-level-line');
var groundColor = document.querySelector('.upload-effect-level-val');

// --- приминение эффектов

// imgPreview
var effects = document.querySelectorAll('input[name=effect]');
var slider = document.querySelector('.upload-effect-level');
// var effValue = document.querySelector('.upload-effect-level-value');
var saveValue = document.querySelector('.upload-effect-level-value');

// --- отмеченный эффект (скрытие слайдера по-умолчанию)
var getChecked = function () {
  var inp = effects;
  for (var o = 0; o < inp.length; o++) {
    if (inp[o].type === 'radio' && inp[o].checked) {
      if (inp[o].value === 'none') {
        slider.classList.add('hidden');
        saveValue.value = 0;
      }
    }
  }
};
getChecked();

// //////////////////////////// ---------------------------- Обработчик событий смены Эффектов -------------------- ///////////////////////////
var getEffects = function (curEff) {
  for (var e = 0; e < effects.length; e++) {
    curEff[e].addEventListener('change', function () {
      var defaultEff = 'effect-image-preview';
      var newEff = this.id.slice(7);
      if (newEff === 'effect-none') {
        imgPreview.className = '';
        imgPreview.classList.add(defaultEff);
        slider.classList.add('hidden');
        imgPreview.style.filter = '';
        saveValue.value = 0;
      } else {
        imgPreview.className = defaultEff;
        imgPreview.classList.add(newEff);
        slider.classList.remove('hidden');
        saveValue.value = 0;
        imgPreview.style = '';
        groundColor.style.width = '100%';
        runner.style.left = '460px';
      }
    });
  }
};

getEffects(effects);


// //////////////////////////// ---------------------------- обработчик бегунка -------------------- ///////////////////////////
var onRunnerShift = function () {
  // evt.preventDefault();
  var valueBar = percentBar.offsetWidth;
  var startCord = runner.offsetLeft;
  var currentValue = startCord / valueBar;
  var currentEffect = getComputedStyle(imgPreview);
  var effectDone = String(currentEffect.filter);
  effectDone = effectDone.substring(0, effectDone.lastIndexOf('('));
  groundColor.style.width = (startCord / valueBar) * 100 + '%';
  // --- условия определения эффектов вычисление применяемых значений
  switch (effectDone) {
    case 'invert':
      imgPreview.style.filter = effectDone + '(' + currentValue * 100 + '%' + ')';
      saveValue.value = Math.round(currentValue * 100);
      break;
    case 'blur':
      imgPreview.style.filter = effectDone + '(' + currentValue * 3 + 'px' + ')';
      saveValue.value = (currentValue * 3).toFixed(2);
      break;
    case 'brightness':
      imgPreview.style.filter = effectDone + '(' + currentValue * 3 + ')';
      saveValue.value = (currentValue * 3).toFixed(2);
      break;
    default:
      imgPreview.style.filter = effectDone + '(' + currentValue + ')';
      saveValue.value = currentValue.toFixed(2);
  }
};

runner.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {x: evt.clientX};
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {x: startCoords.x - moveEvt.clientX};
    startCoords = {
      x: moveEvt.clientX
    };
    runner.style.left = (runner.offsetLeft - shift.x) + 'px';
    if (runner.offsetLeft - shift.x < 0 || runner.offsetLeft - shift.x > 460) {
      document.removeEventListener('mousedown', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
    onRunnerShift();
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// //////////////////////////// ------------------------- Открытие Миниатюр -------------------- ///////////////////////////

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
closeButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mainPicture.classList.add('hidden');
  }
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

// //////////////////////////// -------------------------  Проверка Формы ------------------------ ///////////////////////////

var hashTags = document.querySelector('.upload-form-hashtags');
var description = document.querySelector('.upload-form-description');

var spaceDel = function (str) {
  str = str.replace(/\s/g, '');
  return str;
};

hashTags.addEventListener('change', function () {

  var found = hashTags.value.indexOf('#');
  if (found === -1) {
    hashTags.setCustomValidity('надо #');
  } else {
    hashTags.setCustomValidity('');
  }
  // --- удаляем пробелы  +  приводим к нижнему регистру  +  строка в массив по знаку#
  var arr = spaceDel(hashTags.value).toLowerCase().split('#', 6);
  arr.shift();
  // --- Проверяем длинну хэш-тега
  for (i = 0; i < arr.length; i++) {
    if (arr[i].length >= 19) {
      arr.splice(i, 1);
    }
  }
  // --- проверка на совпадения
  var match = arr.length;
  arr.sort();
  while (match--) {
    if (arr[match] === arr[match - 1]) {
      arr.splice(match, 1);
    }
  }
  hashTags.value = '#' + arr.join(' #');
});
// --- Отправка формы

// --- проверка поля File

// --- длинна комментария
description.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});
description.addEventListener('change', function () {
  if (description.value.length > 140) {
    description.setCustomValidity('Максимальная длинна комментария 140символов!');
    description.style.borderColor = '#E82C31';
  } else {
    description.setCustomValidity('');
    description.style.borderColor = 'inherit';
  }
});
// var SUBMITT = document.querySelector('.upload-form-submit')

// SUBMITT.addEventListener('click', function () {
//     // this.submit();
// });
