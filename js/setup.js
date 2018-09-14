'use strict';

var SIMILAR_COUNT = 4;

var randomSettings = {
  name: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastName: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var templateSimilar = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var genererateSimilarsObject = function (count) {
  var similarsObjects = [];
  for (var i = 0; i < count; i++) {
    var similarsObject = {
      name: getRandomValue(randomSettings.name) + ' ' + getRandomValue(randomSettings.lastName),
      coatColor: getRandomValue(randomSettings.coatColor),
      eyesColor: getRandomValue(randomSettings.eyesColor)
    };
    similarsObjects.push(similarsObject);
  }
  return similarsObjects;
};

var generateElement = function (similar) {
  var newWlement = templateSimilar.cloneNode(true);
  newWlement.querySelector('.setup-similar-label').textContent = similar.name;
  newWlement.querySelector('.wizard-coat').style.fill = similar.coatColor;
  newWlement.querySelector('.wizard-eyes').style.fill = similar.eyesColor;
  return newWlement;
};

var generateSimilars = function () {
  var similarsObjects = genererateSimilarsObject(SIMILAR_COUNT);
  var mainElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarsObjects.length; i++) {
    var similarElement = generateElement(similarsObjects[i]);
    fragment.appendChild(similarElement);
  }
  mainElement.appendChild(fragment);
};

var prepareSetup = function () {
  generateSimilars();
};

prepareSetup();
