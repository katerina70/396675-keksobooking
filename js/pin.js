'use strict';
window.pin = (function () {
  var pinTemplate = window.card.template.querySelector('.map__pin');

  var getPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.id = ad.announcementId;
    pin.style.left = (ad.location.x - 20) + 'px';
    pin.style.top = (ad.location.y - 60) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    return pin;
  };
  // вставляем пины со свойствами на карту
  var mapPins = document.querySelector('.map__pins');
  var showPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.announcements.length; i++) {
      fragment.appendChild(getPin(window.data.announcements[i]));
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
  return {
    pinElements: pinElements
  };
})();
