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

  var fillCard = function (index) {
    var offerItem = window.data.announcements[index].offer;
    var articleP = card.querySelectorAll('p');
    card.querySelector('h3').textContent = offerItem.title;
    card.querySelector('small').textContent = offerItem.address;
    card.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
    card.querySelector('h4').textContent = getPlaceType(offerItem.type);
    articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
    articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
    articleP[4].textContent = offerItem.description;
    card.querySelector('.popup__avatar').src = window.data.announcements[index].author.avatar;

    hideFeatures();
    showFeatures(offerItem.features);
  };

  var cardsClose = document.querySelector('.popup__close');
  cardsClose.setAttribute.tabIndex = 0;

  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      card.classList.add('hidden');
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
  var onCloseEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closeCard();
      window.map.removeActivePin();
    }
  };
  var openCard = function (index) {
    fillCard(index);
    card.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closeCard = function () {
    card.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  cardsClose.addEventListener('click', closeCard);
  cardsClose.addEventListener('keydown', onCloseEnterPress);

  return {
    openCard: openCard,
  };

})();
