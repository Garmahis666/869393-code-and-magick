'use strict';

(function () {

  var ESC_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';
  var dragged = false;
  var startCoords = {
    x: 0,
    xStart: 0,
    y: 0,
    yStart: 0
  };

  var randomSettings = {
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var userNameInput = setupWindow.querySelector('.setup-user-name');
  var wizardCoat = setupWindow.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');
  var wizardEyes = setupWindow.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');
  var fireballInput = fireball.querySelector('input[name=fireball-color]');
  var setupUserPic = setupWindow.querySelector('.upload');

  var changeFireballColor = function () {
    var fireballColor = window.getRandomValue(randomSettings.FIREBALL_COLOR);
    fireball.style.background = fireballColor;
    fireballInput.value = fireballColor;
  };

  var changeCoatColor = function () {
    var coatColor = window.getRandomValue(randomSettings.COAT_COLOR);
    wizardCoat.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  };

  var changeEyesColor = function () {
    var eyesColor = window.getRandomValue(randomSettings.EYES_COLOR);
    wizardEyes.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  };

  var onChangeColorClick = function (evt) {
    if (evt.target.classList.contains('setup-fireball')) {
      changeFireballColor();
    } else if (evt.target.classList.contains('wizard-coat')) {
      changeCoatColor();
    } else {
      changeEyesColor();
    }
  };

  var onSetupUserPicMouseMove = function (evt) {
    evt.preventDefault();
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };
    if (Math.abs(shift.x) + Math.abs(shift.y) > 3) {
      dragged = true;
    }
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
    setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
  };

  var onSetupUserPicMouseUp = function (evt) {
    evt.preventDefault();
    if (dragged) {
      var onClickPreventDefault = function (evtClick) {
        evtClick.preventDefault();
        setupUserPic.removeEventListener('click', onClickPreventDefault);
      };
      setupUserPic.addEventListener('click', onClickPreventDefault);
    }
    document.removeEventListener('mousemove', onSetupUserPicMouseMove);
    document.removeEventListener('mouseup', onSetupUserPicMouseUp);
    setupUserPic.addEventListener('mousedown', onSetupUserPicMouseDown);
    dragged = false;
  };

  var onSetupUserPicMouseDown = function (evt) {
    evt.preventDefault();
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    if (!(startCoords.xStart + startCoords.yStart)) {
      startCoords.xStart = setupWindow.style.left;
      startCoords.yStart = setupWindow.style.top;
    }
    document.addEventListener('mousemove', onSetupUserPicMouseMove);
    document.addEventListener('mouseup', onSetupUserPicMouseUp);
    setupUserPic.removeEventListener('mousedown', onSetupUserPicMouseDown);
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
    setupUserPic.addEventListener('mousedown', onSetupUserPicMouseDown);
    if (startCoords.xStart !== 0 && startCoords.yStart !== 0) {
      setupWindow.style.top = startCoords.yStart;
      setupWindow.style.left = startCoords.xStart;
    }
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
    setupUserPic.removeEventListener('mousedown', onSetupUserPicMouseDown);
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

  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
})();
