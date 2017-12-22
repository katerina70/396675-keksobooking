'use strict';
window.util = (function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var showElement = function (element) {
    element.classList.remove('hidden');
  };
  var hideElement = function (element) {
    element.classList.add('hidden');
  };
  var lastTimeout;
  var debounce = function (functionToDebounce, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      functionToDebounce();
    }, time);
  };

  return {
    debounce: debounce,
    showElement: showElement,
    hideElement: hideElement,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
  };
})();
