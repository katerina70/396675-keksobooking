'use strict';
window.pin = (function () {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.id = ad.announcementId;
    pin.style.left = (ad.location.x - 20) + 'px';
    pin.style.top = (ad.location.y - 60) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    return pin;
  };
  return {
    createPin: createPin
  };
})();
