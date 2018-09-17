'use strict';
var windowParams = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  COLOR: '#fff',
  SHADOW_OFFSET: 10,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var headerParams = {
  X_GAP: 80,
  Y_GAP: 20,
  BORDER: 17,
  FONT_COLOR: '#000'
};

var barParams = {
  WIDTH: 40,
  HEIGHT: 150,
  X_GAP: 40,
  Y_GAP: 20,
  BORDER: 20
};

var fontParams = {
  SIZE: 16,
  FONT: 'PT Mono',
  getFont: function () {
    return this.SIZE + 'px ' + this.FONT;
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderRect = function (ctx, x, y, width, height, windowStyle) {
  ctx.fillStyle = windowStyle;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, style) {
  ctx.fillStyle = style;
  ctx.font = fontParams.getFont();
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, name, time, maxTime, x, y) {
  var barHeight = Math.round(barParams.HEIGHT * time / maxTime);
  var style = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, ' + Math.floor(Math.random() * 255) + 1 + ', 1)';
  renderText(ctx, name, x, y, style);
  renderText(ctx, (time / 1000).toFixed(3), x, (y - barHeight) - barParams.BORDER * 1.5, style);
  renderRect(ctx, x, y - barParams.BORDER, barParams.WIDTH, 0 - barHeight, style);
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно
  renderRect(ctx, windowParams.X + windowParams.SHADOW_OFFSET, windowParams.Y + windowParams.SHADOW_OFFSET,
      windowParams.WIDTH, windowParams.HEIGHT, windowParams.SHADOW_COLOR);
  renderRect(ctx, windowParams.X, windowParams.Y, windowParams.WIDTH, windowParams.HEIGHT, windowParams.COLOR);
  // Пишем текст
  renderText(ctx, 'Ура вы победили!', windowParams.X + headerParams.X_GAP, windowParams.Y + headerParams.Y_GAP,
      headerParams.FONT_COLOR);
  renderText(ctx, 'Список результатов:', windowParams.X + headerParams.X_GAP,
      windowParams.Y + headerParams.Y_GAP + headerParams.BORDER, headerParams.FONT_COLOR);
  // Рисуем бары
  var maxResult = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, names[i], times[i], maxResult,
        windowParams.X + barParams.X_GAP + ((windowParams.WIDTH - barParams.BORDER) / names.length) * i,
        windowParams.Y + windowParams.HEIGHT - barParams.Y_GAP);
  }
};

