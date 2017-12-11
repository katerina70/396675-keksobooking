'use strict';
window.map = (function () {
  var articleTemplate = window.data.template.querySelector('.map__card');
  var card = articleTemplate.cloneNode(true);
  var mapFilters = window.data.mapTokio.querySelector('.map__filters-container');
  window.data.mapTokio.insertBefore(card, mapFilters);
  card.classList.add('hidden');

  var mapPins = document.querySelector('.map__pins');
  var showPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.announcements.length; i++) {
      fragment.appendChild(window.pin.getPin(window.data.announcements[i]));
    }
    mapPins.appendChild(fragment);
  };
  showPins();
  var pinElements = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

  var hidePins = function () {
    for (var i = 0; i < pinElements.length; i++) {
      pinElements[i].classList.add('hidden');
    }
  };
  hidePins();

  var pinMain = window.data.mapTokio.querySelector('.map__pin--main');

  var mainPinHeight = 84;
  var mainPinShiftHeight = 34;
  var getMainPinCoordinates = function () {
    var mainPinY = pinMain.offsetTop + mainPinHeight - mainPinShiftHeight;
    var mainPinX = pinMain.offsetLeft;
    return {
      coordinateY: mainPinY,
      coordinateX: mainPinX
    };
  };

  var getLimitedY = function (startY, limitedY) {
    var mapPinsoverlay = document.querySelector('.map__pinsoverlay');
    var maxMapY = mapPinsoverlay.offsetHeight;
    var maxMoveY = startY - pinMain.offsetTop + maxMapY - (mainPinHeight - mainPinShiftHeight);
    var minMoveY = startY - pinMain.offsetTop + 100 - (mainPinHeight - mainPinShiftHeight);
    if (limitedY >= maxMoveY) {
      return maxMoveY;
    } else if (limitedY <= minMoveY) {
      return minMoveY;
    } else {
      return limitedY;
    }
  };
  // перетаскивание пина
  pinMain.addEventListener('mousedown', function (evt) {
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
      openMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // открытие карты
  var openMap = function () {
    window.data.mapTokio.classList.remove('map--faded');
    window.form.enableForm();
    for (var i = 0; i < pinElements.length; i++) {
      pinElements[i].classList.remove('hidden');
    }
  };

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      openMap();
    }
  });
  // события пинов

  var clearPin = function () {
    var activePin = mapPins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
  var removeActivePin = function () {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };
  var addActivePin = function (index) {
    pinElements[index].classList.add('map__pin--active');
  };

  var onPinClick = function (index) {
    return function () {
      window.card.openCard(index);
      addActivePin(index);
    };
  };
  var onPinEnterPress = function (evt, index) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.card.openCard(index);
      addActivePin(index);
    }
  };
  for (var e = 0; e < pinElements.length; e++) {
    pinElements[e].addEventListener('click', onPinClick(e));
    pinElements[e].addEventListener('keydown', onPinEnterPress(e));
  }

  return {
    clearPin: clearPin,
    card: card,
    removeActivePin: removeActivePin
  };
})();
