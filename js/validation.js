'use strict';
// //////////////////////////// -------------------------  Проверка Формы ------------------------ ///////////////////////////
(function () {
  var hashTags = window.getVar.getHashTag;
  var description = document.querySelector('.upload-form-description');
  var BAD = '#E82C31';
  var GOOD = 'inherit';
  var spaceDel = function (str) {
    str = str.replace(/\s/g, '');
    return str;
  };
  hashTags.addEventListener('change', function () {
    var valueTag = document.querySelector('.upload-form-hashtags').value;
    var HASH_SYMBOL = '#';
    var SPACE_SYMBOL = ' ';
    var message = '';
    if (valueTag.charAt(0) !== HASH_SYMBOL && valueTag.length > 0 && valueTag.charAt(0) !== SPACE_SYMBOL) {
      message += 'Хеш-тег должен начинаться с # ! ';
    } else {
      hashTags.setCustomValidity('');
      hashTags.style.borderColor = GOOD;
      hashTags.style.outlineColor = GOOD;
      var arr = hashTags.value.toLowerCase().split(HASH_SYMBOL);
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
        var arrNoSpace = spaceDel(hashTags.value).toLowerCase().split(HASH_SYMBOL, 6);
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
      hashTags.setCustomValidity(message);
      hashTags.style.outlineColor = BAD;
      hashTags.style.borderColor = BAD;
    } else {
      hashTags.setCustomValidity('');
      hashTags.style.outlineColor = GOOD;
      hashTags.style.borderColor = GOOD;
    }
  });
  description.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
  description.addEventListener('change', function () {
    if (description.value.length > 140) {
      description.setCustomValidity('Максимальная длинна комментария 140символов!');
      description.style.borderColor = BAD;
      description.style.outlineColor = BAD;
    } else {
      description.setCustomValidity('');
      description.style.outlineColor = GOOD;
      description.style.borderColor = GOOD;
    }
  });
})();
