'use strict';
window.card = (function () {
  var card = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

  document.querySelector('.map').appendChild(card);

  card.classList.add('hidden');
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

  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
      window.pin.removeActivePin();
    }
  };
  var onCloseEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closeCard();
      window.pin.removeActivePin();
    }
  };

  var onCloseClick = function () {
    closeCard();
    window.pin.removeActivePin();
  };

  var closeCard = function () {

    card.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };
  var openCard = function () {
    card.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var featuresList = card.querySelectorAll('.feature');
  var hideFeatures = function () {
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i].classList.add('hidden');
    }
  };

  var showFeatures = function (features) {
    for (var i = 0; i < features.length; i++) {
      featuresList[i].classList.remove('hidden');
    }
  };
  var cardsClose = card.querySelector('.popup__close');
  cardsClose.setAttribute.tabIndex = 0;

  var fillCard = function (announcement) {

    var offerItem = announcement.offer;
    var articleP = card.querySelectorAll('p');
    card.querySelector('h3').textContent = offerItem.title;
    card.querySelector('small').textContent = offerItem.address;
    card.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
    card.querySelector('h4').textContent = getPlaceType(offerItem.type);
    articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
    articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
    articleP[4].textContent = offerItem.description;
    card.querySelector('.popup__avatar').src = announcement.author.avatar;
    hideFeatures();
    showFeatures(offerItem.features);
    cardsClose.addEventListener('click', onCloseClick);
    cardsClose.addEventListener('keydown', onCloseEnterPress);
    document.querySelector('.map').addEventListener('keydown', onEscPress);
  };

  return {
    fillCard: fillCard,
    openCard: openCard,

  };
})();
