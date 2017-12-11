'use strict';
window.card = (function () {

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
  var featuresList = window.map.card.querySelectorAll('.feature');
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
    var articleP = window.map.card.querySelectorAll('p');
    window.map.card.querySelector('h3').textContent = offerItem.title;
    window.map.card.querySelector('small').textContent = offerItem.address;
    window.map.card.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
    window.map.card.querySelector('h4').textContent = getPlaceType(offerItem.type);
    articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
    articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
    articleP[4].textContent = offerItem.description;
    window.map.card.querySelector('.popup__avatar').src = window.data.announcements[index].author.avatar;

    hideFeatures();
    showFeatures(offerItem.features);
  };

  var cardsClose = document.querySelector('.popup__close');
  cardsClose.setAttribute.tabIndex = 0;

  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      window.map.card.classList.add('hidden');
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
    window.map.clearPin();
    fillCard(index);
    window.map.card.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closeCard = function () {
    window.map.card.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  cardsClose.addEventListener('click', closeCard);
  cardsClose.addEventListener('keydown', onCloseEnterPress);

  return {
    openCard: openCard,
  };

})();
