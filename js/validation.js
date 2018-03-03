'use strict';
// //////////////////////////// -------------------------  Проверка Формы ------------------------ ///////////////////////////
(function () {
  var MAX_DESCRIPTION_LENGHT = 140;
  var GOOD = 'inherit';
  var BAD = '#E82C31';
  var deleteSpace = function (str) {
    str = str.replace(/\s/g, '');
    return str;
  };
  window.var.HASH_TAG.addEventListener('change', function () {
    var message = '';
    if (window.var.HASH_TAG.value.charAt(0) !== '#' && window.var.HASH_TAG.value.length > 0 && window.var.HASH_TAG.value.charAt(0) !== ' ') {
      message += 'Хеш-тег должен начинаться с # ! ';
    } else {
      window.var.HASH_TAG.setCustomValidity('');
      window.var.HASH_TAG.style.borderColor = GOOD;
      window.var.HASH_TAG.style.outlineColor = GOOD;
      var tagsArray = window.var.HASH_TAG.value.toLowerCase().split('#');
      tagsArray.shift();
      var countHash = tagsArray.length;
      var m = 1;
      var tagsNoSpace = deleteSpace(window.var.HASH_TAG.value).toLowerCase().split('#', 6);
      tagsNoSpace.shift();
      tagsNoSpace.sort();
      // --- проверка на ошибки
      if (tagsArray.length <= 5) {
        for (var k = 0; k < tagsArray.length; k++) {
          // --- проверка на одинаковые теги
          if (tagsNoSpace[k] === tagsNoSpace[k - 1]) {
            message += 'Хеш-теги не должны повторяться! ';
            break;
          }
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
      giveErrorMessaage(window.var.HASH_TAG, message);
    } else {
      window.validation.clearErrorMessage(window.var.HASH_TAG);
    }
  });
  window.var.DESCRIPTION.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
  window.var.DESCRIPTION.addEventListener('change', function () {
    if (window.var.DESCRIPTION.value.length > MAX_DESCRIPTION_LENGHT) {
      giveErrorMessaage(window.var.DESCRIPTION);
    } else {
      window.validation.clearErrorMessage(window.var.DESCRIPTION);
    }
  });

  var giveErrorMessaage = function (fill, text) {
    if (!text) {
      fill.setCustomValidity('Максимальная длинна комментария 140символов!');
      fill.style.borderColor = BAD;
      fill.style.outlineColor = BAD;
    } else {
      fill.setCustomValidity(text);
      fill.style.borderColor = BAD;
      fill.style.outlineColor = BAD;
    }
  };
  window.validation = {
    clearErrorMessage: function (fill) {
      fill.setCustomValidity('');
      fill.style.outlineColor = GOOD;
      fill.style.borderColor = GOOD;
    }
  };
})();
