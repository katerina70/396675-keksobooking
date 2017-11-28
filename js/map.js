'use strict';

var NUMBERS_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
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
  var locationY = getRandom(100, 500);
  announcements[i] = {
    author: {
      avatar: 'img/avatars/user0' + NUMBERS_AVATAR[i] + '.png'
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
var getButtonMap = function (ad) {
  var buttonTemplate = template.querySelector('.map__pin');
  var buttonMap = buttonTemplate.cloneNode(true);
  buttonMap.style.left = (ad.location.x - 20) + 'px';
  buttonMap.style.top = (ad.location.y - 22) + 'px';
  buttonMap.firstChild.setAttribute('src', ad.author.avatar);
  return buttonMap;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var n = 0; n < announcements.length; n++) {
  fragment.appendChild(getButtonMap(announcements[n]));
  mapPins.appendChild(fragment);
}

function typeTranslateRus(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Бунгало';
  }
}


var getArticleProperty = function (e) {
  var articleTemplate = template.querySelector('.map__card');
  var articleProperty = articleTemplate.cloneNode(true);

  articleProperty.querySelector('h3').textContent = announcements[e].offer.title;
  articleProperty.querySelector('small').textContent = announcements[e].offer.address;
  articleProperty.querySelector('.popup__price').textContent = announcements[e].offer.price + ' ₽' + '/ночь';
  articleProperty.querySelector('h4').textContent = typeTranslateRus(announcements[e].offer.type);
  articleProperty.getElementsByTagName('p')[2].textContent = announcements[e].offer.rooms + ' комнаты для ' + announcements[e].offer.guests + ' гостей';
  articleProperty.getElementsByTagName('p')[3].textContent = 'Заезд после ' + announcements[e].offer.checkin + ', выезд до' + announcements[e].offer.checkout;
  articleProperty.getElementsByTagName('p')[4].textContent = announcements[e].offer.description;
  articleProperty.querySelector('.popup__avatar').setAttribute('src', announcements[e].author.avatar);
  // Изменяем features
  var popupFeatures = articleProperty.querySelector('.popup__features');
  var featuresList = popupFeatures.querySelectorAll('.feature');
  var namesFeatures = [];
  for (i = 0; i < featuresList.length; i++) {
    var nameFeature = featuresList[i].className;
    namesFeatures.push(nameFeature);
    featuresList[i].style.display = 'none';
  }
  var namesFeaturesFound = [];
  for (i = 0; i < announcements[e].offer.features.length; i++) {
    var nameFeaturesFound = 'feature feature--' + announcements[e].offer.features[i];
    namesFeaturesFound.push(nameFeaturesFound);
  }

  for (var h = 0; h < namesFeatures.length; h++) {
    for (var j = 0; j < namesFeaturesFound.length; j++) {
      if (namesFeatures[h] === namesFeaturesFound[j]) {
        featuresList[h].style.display = 'inline-block';
      }
    }
  }
  return articleProperty;
};

var mapFilters = mapTokio.querySelector('.map__filters-container');
mapTokio.insertBefore(getArticleProperty(0), mapFilters);
