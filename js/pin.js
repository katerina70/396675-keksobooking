'use strict';
window.pin = (function () {
  var pinTemplate = window.data.template.querySelector('.map__pin');

  var getPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.id = ad.announcementId;
    pin.style.left = (ad.location.x - 20) + 'px';
    pin.style.top = (ad.location.y - 60) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    return pin;
  };
  return {
    getPin: getPin
  };

})();
