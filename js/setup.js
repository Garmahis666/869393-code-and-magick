'use strict';

var SIMILAR_WIZARD_COUNT_ON_SETUP = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var randomSettings = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
};


var templateSimilar = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var mainElement = document.querySelector('.setup-similar-list');
var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');

var onSetupWindowEscPress = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    closeSetupWindow();
  }
};

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  setupClose.addEventListener('click', closeSetupWindow);
  document.addEventListener('keydown', onSetupWindowEscPress);
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);
};

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getSimilarObject = function () {
  return {
    name: getRandomValue(randomSettings.NAME) + ' ' + getRandomValue(randomSettings.LAST_NAME),
    coatColor: getRandomValue(randomSettings.COAT_COLOR),
    eyesColor: getRandomValue(randomSettings.EYES_COLOR)
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

var getSimilars = function () {
  var similarsArray = getSimilarsArray(SIMILAR_WIZARD_COUNT_ON_SETUP);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarsArray.length; i++) {
    var similarElement = getSimilarElement(similarsArray[i]);
    fragment.appendChild(similarElement);
  }
  mainElement.appendChild(fragment);
};

var prepareSetup = function () {
  getSimilars();
  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEYCODE) {
      openSetupWindow();
    }
  });
};

prepareSetup();
