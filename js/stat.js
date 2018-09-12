'use strict';

var WINDOW_WIDTH = 420;
var WINDOW_HEIGHT = 270;
var WINDOW_X = 100;
var WINDOW_Y = 10;
var SHADOW_OFFSET = 10;
var FONT = '16px PT Mono';
var HEADER_GAP = 80;
var CHART_WIDTH = 40;
var CHART_HEIGHT = 150;
var BORDER_GAP = 40;
var GAP = 10;

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

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = FONT;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, name, time, maxTime, x, y) {
  renderText(ctx, name, x, y);
  renderText(ctx, (time / 1000).toFixed(1), x, y - (CHART_HEIGHT + GAP * 3));
  var barHeight = Math.round(CHART_HEIGHT * time / maxTime);
  var style = 'rgba(255, 0, 0, 1)';
  if (name !== 'Вы') {
    style = 'rgba(0, 0, ' + Math.floor(Math.random() * 256) + ', 1)';
  }
  renderRect(ctx, x, y - GAP * 2, CHART_WIDTH, 0 - barHeight, style);
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно
  renderRect(ctx, WINDOW_X + SHADOW_OFFSET, WINDOW_Y + SHADOW_OFFSET, WINDOW_WIDTH, WINDOW_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, WINDOW_X, WINDOW_Y, WINDOW_WIDTH, WINDOW_HEIGHT, '#fff');
  // Пишем текст
  renderText(ctx, 'Ура вы победили!', WINDOW_X + HEADER_GAP, WINDOW_Y + GAP * 2);
  renderText(ctx, 'Список результатов:', WINDOW_X + HEADER_GAP, WINDOW_Y + GAP * 4);
  // Рисуем бары
  var maxResult = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, names[i], times[i], maxResult, WINDOW_X + BORDER_GAP + ((WINDOW_WIDTH - GAP * 2) / names.length) * i, WINDOW_Y + WINDOW_HEIGHT - GAP);
  }
};

