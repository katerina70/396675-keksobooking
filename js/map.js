'use strict';

var TITLE_VALUES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_VALUES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosItems = [];
var MIN_ROOM = 1;
var MAX_ROOM = 6;
var MIN_GUEST = 1;
var MAX_GUEST = 12;

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function randomArr(arr) {
  var arrTemp = arr.slice();
  var newLength = Math.ceil(Math.random() * arrTemp.length);
  var newArray = [];
  for (var i = 0; i < newLength; i++) {
    var randomIndex = Math.floor(Math.random() * arrTemp.length);
    newArray[i] = arrTemp[randomIndex];
    arrTemp.splice(randomIndex, 1);
  }

  return newArray;
}

var announcements = [];
for (var i = 0; i < 8; i++) {
  var locationX = getRandom(300, 900);
  var locationY = getRandom(200, 500);
  var numberAvatar = i + 1;
  announcements[i] = {
    author: {
      avatar: 'img/avatars/user0' + numberAvatar + '.png'
    },
    offer: {
      title: TITLE_VALUES[i],
      address: 'location.' + locationX + ', ' + 'location.' + locationY,
      price: getRandom(1000, 1000001),
      type: TYPE_VALUES[getRandom(0, TYPE_VALUES.length)],
      rooms: getRandom(MIN_ROOM, MAX_ROOM),
      guests: getRandom(MIN_GUEST, MAX_GUEST),
      checkin: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      checkout: CHECK_TIMES[getRandom(0, CHECK_TIMES.length)],
      features: randomArr(FEATURES_ITEMS),
      description: '',
      photos: photosItems

    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}
var mapTokio = document.querySelector('.map');
mapTokio.classList.remove('map--faded');

var template = document.querySelector('template').content;
var buttonTemplate = template.querySelector('.map__pin');
var getButtonMap = function (ad) {
  var buttonMap = buttonTemplate.cloneNode(true);
  buttonMap.style.left = (ad.location.x - 20) + 'px';
  buttonMap.style.top = (ad.location.y - 60) + 'px';
  buttonMap.querySelector('img').src = ad.author.avatar;
  return buttonMap;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var n = 0; n < announcements.length; n++) {
  fragment.appendChild(getButtonMap(announcements[n]));
}
mapPins.appendChild(fragment);

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

var articleTemplate = template.querySelector('.map__card');
var getHidden = function () {
  var listHidden = articleTemplate.querySelectorAll('.feature');
  for (i = 0; i < listHidden.length; i++) {
    listHidden[i].classList.add('hidden');
  }
  return listHidden;
};
getHidden();

var getArticleProperty = function (index) {
  var articleProperty = articleTemplate.cloneNode(true);
  var offerItem = announcements[index].offer;
  var articleP = articleProperty.querySelectorAll('p');
  articleProperty.querySelector('h3').textContent = offerItem.title;
  articleProperty.querySelector('small').textContent = offerItem.address;
  articleProperty.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
  articleProperty.querySelector('h4').textContent = typeTranslateRus(offerItem.type);
  articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
  articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
  articleP[4].textContent = offerItem.description;
  articleProperty.querySelector('.popup__avatar').src = announcements[index].author.avatar;
  return articleProperty;
};
var mapFilters = mapTokio.querySelector('.map__filters-container');
mapTokio.insertBefore(getArticleProperty(0), mapFilters);
