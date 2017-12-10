'use strict';
window.map = (function () {

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

  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
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
      address.value = getMainPinCoordinates().coordinateX + ' ,' + getMainPinCoordinates().coordinateY;
      openMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // открытие карты
  var fieldsNotice = noticeForm.querySelectorAll('fieldset');
  var disableFields = function () {
    for (var i = 0; i < fieldsNotice.length; i++) {
      fieldsNotice[i].disabled = true;
    }
  };
  disableFields();
  var enableFields = function () {
    for (var i = 0; i < fieldsNotice.length; i++) {
      fieldsNotice[i].disabled = false;
    }
  };
  var openMap = function () {
    window.data.mapTokio.classList.remove('map--faded');
    for (var i = 0; i < pinElements.length; i++) {
      pinElements[i].classList.remove('hidden');
    }
    noticeForm.classList.remove('notice__form--disabled');
    enableFields();
  };

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      openMap();
    }
  });

  var clearPin = function () {
    for (var i = 0; i < pinElements.length; i++) {
      if (pinElements[i].classList.contains('map__pin--active')) {
        pinElements[i].classList.remove('map__pin--active');
      }
    }
  };

  var onPinClick = function (index) {
    return function () {
      window.card.openCard(index);
    };
  };

  var onPinEnterPress = function (evt, index) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.card.openCard(index);
    }
  };
  for (var e = 0; e < pinElements.length; e++) {
    pinElements[e].addEventListener('click', onPinClick(e));
    pinElements[e].addEventListener('keydown', onPinEnterPress(e));
  }

  return {
    noticeForm: noticeForm,
    address: address,
    clearPin: clearPin,
    pinElements: pinElements
  };
})();
