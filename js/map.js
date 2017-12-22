'use strict';
window.map = (function () {
  var MAX_PINS = 5;
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_SHIFT = 34;
  var TIME_STEP = 500;
  var offers = [];
  var filterElements = document.querySelector('.map__filters');
  var pinElements;

  var showPins = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(window.pin.create(item));
    });
    document.querySelector('.map__pins').appendChild(fragment);
  };

  var hidePins = function () {

    pinElements.forEach(function (item) {
      window.util.hideElement(item);
    });
  };

  var onLoadData = function (data) {
    offers = data;
    var visiblePins = offers.slice(MAX_PINS);
    showPins(visiblePins);
    pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var updateMap = function () {
    var filteredPins = window.filters.offers(offers);
    hidePins();
    window.card.close();
    if (filteredPins.length > MAX_PINS) {
      filteredPins = filteredPins.slice(MAX_PINS);
    }
    showPins(filteredPins);
  };

  filterElements.addEventListener('change', function () {
    window.util.debounce(updateMap, TIME_STEP);
  });

  var pinMainElement = document.querySelector('.map__pin--main');

  var onPinMainClick = function () {
    pinMainElement.removeEventListener('mouseup', onPinMainClick);
    window.backend.load(onLoadData, window.popup.showErrorMessage);
    document.querySelector('.map').classList.remove('map--faded');
    window.form.enable();
  };

  var getMainPinCoordinates = function () {
    var mainPinY = pinMainElement.offsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT;
    var mainPinX = pinMainElement.offsetLeft;
    return {
      coordinateY: mainPinY,
      coordinateX: mainPinX
    };
  };

  var getLimitedY = function (startY, limitedY) {
    var mapPinsoverlay = document.querySelector('.map__pinsoverlay');
    var minMapY = 100;
    var maxMapY = mapPinsoverlay.offsetHeight;
    var maxMoveY = startY - pinMainElement.offsetTop + maxMapY - (MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT);
    var minMoveY = startY - pinMainElement.offsetTop +
      minMapY - (MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT);
    if (limitedY >= maxMoveY) {
      return maxMoveY;
    } else if (limitedY <= minMoveY) {
      return minMoveY;
    } else {
      return limitedY;
    }
  };

  var onPinMainMove = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - getLimitedY(startCoords.y, moveEvt.clientY)
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainElement.style.top = (pinMainElement.offsetTop - shift.y) + 'px';
      pinMainElement.style.left = (pinMainElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.address.value = getMainPinCoordinates().coordinateX + ' ,' + getMainPinCoordinates().coordinateY;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMainElement.addEventListener('mousedown', function (evt) {
    onPinMainMove(evt);
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      onPinMainClick();
    }
  });
  pinMainElement.addEventListener('mouseup', onPinMainClick);

})();
