'use strict';
// //////////////////////////// -------------------------  Проверка Формы ------------------------ ///////////////////////////
(function () {
  var description = document.querySelector('.upload-form-description');
  var spaceDel = function (str) {
    str = str.replace(/\s/g, '');
    return str;
  };
  window.HASH_TAG.addEventListener('change', function () {
    // var valueTag = document.querySelector('.upload-form-hashtags').value;
    var HASH_SYMBOL = '#';
    var SPACE_SYMBOL = ' ';
    var message = '';
    if (window.HASH_TAG.value.charAt(0) !== HASH_SYMBOL && window.HASH_TAG.value.length > 0 && window.HASH_TAG.value.charAt(0) !== SPACE_SYMBOL) {
      message += 'Хеш-тег должен начинаться с # ! ';
    } else {
      window.HASH_TAG.setCustomValidity('');
      window.HASH_TAG.style.borderColor = window.GOOD;
      window.HASH_TAG.style.outlineColor = window.GOOD;
      var arr = window.HASH_TAG.value.toLowerCase().split(HASH_SYMBOL);
      arr.shift();
      var countHash = arr.length;
      var m = 1;
      // --- проверка на ошибки
      if (arr.length <= 5) {
        for (var k = 0; k < arr.length; k++) {
          if (arr[k].indexOf(SPACE_SYMBOL, 0) !== -1) {
            // --- проверка количества слов в тегах по пробелам
            if ((arr[k].length - 1) !== (arr[k].indexOf(SPACE_SYMBOL, 0))) {
              message += 'Хеш-тег должен состоять из одного слова! ';
              // break;
            }
          } else {
            // --- проверка на пробел перед следующим тегом
            if (countHash !== m) {
              message += 'Хеш-теги должны разделяться пробелами! ';
            }
          }
          // --- проверка количества символов в тегах
          if (arr[k].length > 19) {
            message += 'Хеш-тег не должен превышать 20 символов! ';
          }
          m++;
        }
        // --- проверка на одинаковые теги
        var arrNoSpace = spaceDel(window.HASH_TAG.value).toLowerCase().split(HASH_SYMBOL, 6);
        arrNoSpace.shift();
        arrNoSpace.sort();
        var match = arrNoSpace.length;
        while (match--) {
          if (arrNoSpace[match] === arrNoSpace[match - 1]) {
            message += 'Хеш-теги не должны повторяться! ';
          }
        }
      } else {
        message += 'Максимальное количество хеш-тегов = 5 ';
      }
    }
    if (message !== '') {
      var messages = message.split('!');
      messages.shift();
      messages.sort();
      var once = messages.length;
      while (once--) {
        if (messages[once] === messages[once - 1]) {
          messages.splice(once, 1);
        }
      }
      giveErrorMessaage(window.HASH_TAG, message);
    } else {
      takeErrorMessage(window.HASH_TAG);
    }
  });
  description.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
  description.addEventListener('change', function () {
    if (description.value.length > 140) {
      giveErrorMessaage(description);
    } else {
      takeErrorMessage(description);
    }
  });

  var giveErrorMessaage = function (fill, text) {
    if (text === undefined) {
      fill.setCustomValidity('Максимальная длинна комментария 140символов!');
      fill.style.borderColor = window.BAD;
      fill.style.outlineColor = window.BAD;
    } else {
      fill.setCustomValidity(text);
      fill.style.borderColor = window.BAD;
      fill.style.outlineColor = window.BAD;
    }
  };
  var takeErrorMessage = function (fill) {
    fill.setCustomValidity('');
    fill.style.outlineColor = window.GOOD;
    fill.style.borderColor = window.GOOD;
  };
})();
