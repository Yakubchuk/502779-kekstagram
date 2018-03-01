'use strict';
// //////////////////////////// -------------------------  Проверка Формы ------------------------ ///////////////////////////
(function () {
  var MAX_DESCRIPTION_LENGHT = 140;
  window.description = document.querySelector('.upload-form-description');
  var spaceDelet = function (str) {
    str = str.replace(/\s/g, '');
    return str;
  };
  window.HASH_TAG.addEventListener('change', function () {
    var message = '';
    if (window.HASH_TAG.value.charAt(0) !== '#' && window.HASH_TAG.value.length > 0 && window.HASH_TAG.value.charAt(0) !== ' ') {
      message += 'Хеш-тег должен начинаться с # ! ';
    } else {
      window.HASH_TAG.setCustomValidity('');
      window.HASH_TAG.style.borderColor = window.GOOD;
      window.HASH_TAG.style.outlineColor = window.GOOD;
      var tagsArray = window.HASH_TAG.value.toLowerCase().split('#');
      tagsArray.shift();
      var countHash = tagsArray.length;
      var m = 1;
      // --- проверка на ошибки
      if (tagsArray.length <= 5) {
        for (var k = 0; k < tagsArray.length; k++) {
          if (tagsArray[k].indexOf(' ', 0) !== -1) {
            // --- проверка количества слов в тегах по пробелам
            if ((tagsArray[k].length - 1) !== (tagsArray[k].indexOf(' ', 0))) {
              message += 'Хеш-тег должен состоять из одного слова! ';
              break;
            }
          } else {
            // --- проверка на пробел перед следующим тегом
            if (countHash !== m) {
              message += 'Хеш-теги должны разделяться пробелами! ';
              break;
            }
          }
          // --- проверка количества символов в тегах
          if (tagsArray[k].length > 19) {
            message += 'Хеш-тег не должен превышать 20 символов! ';
            break;
          }
          m++;
        }
        // --- проверка на одинаковые теги
        var arrNoSpace = spaceDelet(window.HASH_TAG.value).toLowerCase().split('#', 6);
        arrNoSpace.shift();
        arrNoSpace.sort();
        var match = arrNoSpace.length;
        while (match--) {
          if (arrNoSpace[match] === arrNoSpace[match - 1]) {
            message += 'Хеш-теги не должны повторяться! ';
            break;
          }
        }
      } else {
        message += 'Максимальное количество хеш-тегов = 5 ';
      }
    }
    if (message) {
      var messages = message.split('!');
      messages.shift();
      messages.sort();
      var quantity = messages.length;
      while (quantity--) {
        if (messages[quantity] === messages[quantity - 1]) {
          messages.splice(quantity, 1);
        }
      }
      giveErrorMessaage(window.HASH_TAG, message);
    } else {
      clearErrorMessage(window.HASH_TAG);
    }
  });
  window.DESCRIPTION.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
  window.DESCRIPTION.addEventListener('change', function () {
    if (window.DESCRIPTION.value.length > MAX_DESCRIPTION_LENGHT) {
      giveErrorMessaage(window.DESCRIPTION);
    } else {
      clearErrorMessage(window.DESCRIPTION);
    }
  });

  var giveErrorMessaage = function (fill, text) {
    if (!text) {
      fill.setCustomValidity('Максимальная длинна комментария 140символов!');
      fill.style.borderColor = window.BAD;
      fill.style.outlineColor = window.BAD;
    } else {
      fill.setCustomValidity(text);
      fill.style.borderColor = window.BAD;
      fill.style.outlineColor = window.BAD;
    }
  };
  var clearErrorMessage = function (fill) {
    fill.setCustomValidity('');
    fill.style.outlineColor = window.GOOD;
    fill.style.borderColor = window.GOOD;
  };
})();
