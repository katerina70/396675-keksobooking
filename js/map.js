'use strict';
window.map = (function () {
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_SHIFT = 34;

  var showPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.createPin(array[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };
  var onLoadData = function (data) {
    showPins(data);
  };

  var pinMain = document.querySelector('.map__pin--main');
  var onPinMainClick = function () {
    pinMain.removeEventListener('mouseup', onPinMainClick);
    window.backend.load(onLoadData, window.popup.errorMessageShow);
    document.querySelector('.map').classList.remove('map--faded');
    window.form.enableForm();

  };

  var getMainPinCoordinates = function () {
    var mainPinY = pinMain.offsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT;
    var mainPinX = pinMain.offsetLeft;
    return {
      coordinateY: mainPinY,
      coordinateX: mainPinX
    };
  };

  var getLimitedY = function (startY, limitedY) {
    var mapPinsoverlay = document.querySelector('.map__pinsoverlay');
    var minMapY = 100;
    var maxMapY = mapPinsoverlay.offsetHeight;
    var maxMoveY = startY - pinMain.offsetTop + maxMapY - (MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT);
    var minMoveY = startY - pinMain.offsetTop +
      minMapY - (MAIN_PIN_HEIGHT - MAIN_PIN_SHIFT);
    if (limitedY >= maxMoveY) {
      return maxMoveY;
    } else if (limitedY <= minMoveY) {
      return minMoveY;
    } else {
      return limitedY;
    }
  };


  // перетаскивание пина
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

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
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

  pinMain.addEventListener('mousedown', function (evt) {
    onPinMainMove(evt);
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      onPinMainClick();
    }
  });
  pinMain.addEventListener('mouseup', onPinMainClick);

})();
