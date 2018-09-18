'use strict';

var SIMILAR_WIZARD_COUNT_ON_SETUP = 4;
var ESC_KEYCODE = 'Escape';
var ENTER_KEYCODE = 'Enter';

var randomSettings = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var templateSimilar = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var mainElement = document.querySelector('.setup-similar-list');
var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var userNameInput = setupWindow.querySelector('.setup-user-name');
var wizardCoat = setupWindow.querySelector('.wizard-coat');
var wizardEyes = setupWindow.querySelector('.wizard-eyes');
var fireball = setupWindow.querySelector('.setup-fireball-wrap');

var onChangeColorClick = function (evt) {
  if (evt.target.classList.contains('setup-fireball')) {
    var fireballColor = getRandomValue(randomSettings.FIREBALL_COLOR);
    fireball.style.background = fireballColor;
    fireball.querySelector('input[name=fireball-color]').value = fireballColor;
  } else if (evt.target.classList.contains('wizard-coat')) {
    var coatColor = getRandomValue(randomSettings.COAT_COLOR);
    evt.target.style.fill = coatColor;
    document.querySelector('input[name=coat-color]').value = coatColor;
  } else {
    var eyesColor = getRandomValue(randomSettings.EYES_COLOR);
    evt.target.style.fill = eyesColor;
    document.querySelector('input[name=eyes-color]').value = eyesColor;
  }
};

var onUserNameFocus = function () {
  document.removeEventListener('keydown', onDocumentEscPress);
  userNameInput.addEventListener('blur', onUserNameBlur);
  userNameInput.removeEventListener('focus', onUserNameFocus);
};

var onUserNameBlur = function () {
  document.addEventListener('keydown', onDocumentEscPress);
  userNameInput.removeEventListener('blur', onUserNameBlur);
  userNameInput.addEventListener('focus', onUserNameFocus);
};

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  setupClose.addEventListener('click', closeSetupWindow);
  setupClose.addEventListener('keydown', onSetupCloseKeyPress);
  document.addEventListener('keydown', onDocumentEscPress);
  setupOpen.removeEventListener('click', openSetupWindow);
  setupOpen.removeEventListener('keydown', onSetupOpenEnterPress);
  fireball.addEventListener('click', onChangeColorClick);
  wizardCoat.addEventListener('click', onChangeColorClick);
  wizardEyes.addEventListener('click', onChangeColorClick);
  userNameInput.addEventListener('focus', onUserNameFocus);
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  setupClose.removeEventListener('click', closeSetupWindow);
  setupClose.removeEventListener('keydown', onSetupCloseKeyPress);
  document.removeEventListener('keydown', onDocumentEscPress);
  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
  fireball.removeEventListener('click', onChangeColorClick);
  wizardCoat.removeEventListener('click', onChangeColorClick);
  wizardEyes.removeEventListener('click', onChangeColorClick);
  userNameInput.removeEventListener('focus', onUserNameFocus);
};

var onSetupCloseKeyPress = function (evt) {
  if (evt.key === ENTER_KEYCODE) {
    closeSetupWindow();
  }
};

var onSetupOpenEnterPress = function (evt) {
  if (evt.key === ENTER_KEYCODE) {
    openSetupWindow();
  }
};

var onDocumentEscPress = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    closeSetupWindow();
  }
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
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
};

prepareSetup();
