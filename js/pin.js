'use strict';
window.pin = (function () {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var activePin = null;

  var setPinActive = function (clickedPin) {
    clickedPin.classList.add('map__pin--active');
    activePin = clickedPin;
  };
  var removeActivePin = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };
  var onPinClick = function (evt, announcement) {
    var pin = evt.currentTarget;
    window.showCard(announcement);
    removeActivePin();
    setPinActive(pin);
  };

  var onPinEnterPress = function (evt, announcement) {
    var pin = evt.currentTarget;
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.showCard(announcement);
      removeActivePin();
      setPinActive(pin);
    }
  };

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = (ad.location.x - 20) + 'px';
    pin.style.top = (ad.location.y - 60) + 'px';
    pin.querySelector('img').src = ad.author.avatar;

    pin.addEventListener('click', function (evt) {
      onPinClick(evt, ad);
    });
    pin.addEventListener('keydown', function (evt) {
      onPinEnterPress(evt, ad);
    });
    return pin;
  };

  return {
    createPin: createPin,
    removeActivePin: removeActivePin
  };
})();
