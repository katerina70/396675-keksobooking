'use strict';
window.card = (function () {
  var cardElement = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
  document.querySelector('.map').appendChild(cardElement);

  cardElement.classList.add('hidden');

  var getPlaceType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      default:
        return 'Бунгало';
    }
  };

  var closeCard = function () {
    if (cardElement) {
      window.util.hideElement(cardElement);
    }
    document.removeEventListener('keydown', onEscPress);
  };

  var openCard = function () {
    cardElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
      window.pin.remove();
    }
  };
  var onCloseEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closeCard();
      window.pin.remove();
    }
  };

  var onCloseClick = function () {
    closeCard();
    window.pin.remove();
  };

  var featuresElements = cardElement.querySelectorAll('.feature');

  var hideFeatures = function () {
    featuresElements.forEach(function (item) {
      window.util.hideElement(item);
    });
  };
  var showFeatures = function (features) {
    featuresElements.forEach(function (item) {
      features.forEach(function (element) {
        if (item.classList.contains('feature--' + element)) {
          window.util.showElement(item);
        }
      });
    });
  };

  var cardsClose = cardElement.querySelector('.popup__close');
  cardsClose.setAttribute.tabIndex = 0;

  var fillCard = function (announcement) {
    var offerItem = announcement.offer;
    var articleP = cardElement.querySelectorAll('p');
    cardElement.querySelector('h3').textContent = offerItem.title;
    cardElement.querySelector('small').textContent = offerItem.address;
    cardElement.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
    cardElement.querySelector('h4').textContent = getPlaceType(offerItem.type);
    articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
    articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
    articleP[4].textContent = offerItem.description;
    cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;
    hideFeatures();
    showFeatures(offerItem.features);
    cardsClose.addEventListener('click', onCloseClick);
    cardsClose.addEventListener('keydown', onCloseEnterPress);
    document.querySelector('.map').addEventListener('keydown', onEscPress);
  };

  return {
    fill: fillCard,
    open: openCard,
    close: closeCard
  };
})();
