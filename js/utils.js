'use strict';

(function () {
  window.getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };
})();

