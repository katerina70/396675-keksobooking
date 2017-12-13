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


  return {
    fillCard: fillCard,
    card: card
  };
})();
