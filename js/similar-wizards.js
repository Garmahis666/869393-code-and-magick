'use strict';

(function () {
  var SIMILAR_WIZARD_COUNT_ON_SETUP = 4;

  var randomSettings = {
    NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    LAST_NAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var templateSimilar = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var mainElement = document.querySelector('.setup-similar-list');

  var getSimilarObject = function () {
    return {
      name: window.getRandomValue(randomSettings.NAME) + ' ' + window.getRandomValue(randomSettings.LAST_NAME),
      coatColor: window.getRandomValue(randomSettings.COAT_COLOR),
      eyesColor: window.getRandomValue(randomSettings.EYES_COLOR)
    };
  };

  var getSimilarsArray = function (count) {
    var similarsArray = [];
    for (var i = 0; i < count; i++) {
      var similarObject = getSimilarObject();
      similarsArray.push(similarObject);
    }
    return similarsArray;
  };

  var getSimilarElement = function (similar) {
    var newElement = templateSimilar.cloneNode(true);
    newElement.querySelector('.setup-similar-label').textContent = similar.name;
    newElement.querySelector('.wizard-coat').style.fill = similar.coatColor;
    newElement.querySelector('.wizard-eyes').style.fill = similar.eyesColor;
    return newElement;
  };

  var similarsArray = getSimilarsArray(SIMILAR_WIZARD_COUNT_ON_SETUP);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarsArray.length; i++) {
    var similarElement = getSimilarElement(similarsArray[i]);
    fragment.appendChild(similarElement);
  }
  mainElement.appendChild(fragment);
})();
