'use strict';
window.card = (function () {

  var typeTranslateRus = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      default:
        return 'Бунгало';
    }
  };

  var template = document.querySelector('template').content;
  var articleTemplate = template.querySelector('.map__card');
  var card = articleTemplate.cloneNode(true);
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
    card.querySelector('h4').textContent = typeTranslateRus(offerItem.type);
    articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
    articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
    articleP[4].textContent = offerItem.description;
    card.querySelector('.popup__avatar').src = window.data.announcements[index].author.avatar;

    hideFeatures();
    showFeatures(offerItem.features);
  };

  return {
    card: card,
    fillCard: fillCard,
    template: template
  };
})();
