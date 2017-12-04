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
var ANNOUNCEMENTS_COUNT = 8;

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
for (var n = 0; n < ANNOUNCEMENTS_COUNT; n++) {
  var locationX = getRandom(300, 900);
  var locationY = getRandom(200, 500);
  var numberAvatar = n + 1;
  announcements[n] = {
    author: {
      avatar: 'img/avatars/user0' + numberAvatar + '.png'
    },
    offer: {
      title: TITLE_VALUES[n],
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

var template = document.querySelector('template').content;
var pinTemplate = template.querySelector('.map__pin');

var getPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  pin.id = ad.announcementId;
  pin.style.left = (ad.location.x - 20) + 'px';
  pin.style.top = (ad.location.y - 60) + 'px';
  pin.querySelector('img').src = ad.author.avatar;
  return pin;
};

var mapPins = document.querySelector('.map__pins');
var showPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(getPin(announcements[i]));
  }
  mapPins.appendChild(fragment);
};
showPins();

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
var featuresList = articleTemplate.querySelectorAll('.feature');

var hideFeatures = function () {
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i].classList.add('hidden');
  }
};

var showFeatures = function (adItem, newList) {
  var array = adItem.features;
  for (var i = 0; i < array.length; i++) {
    articleTemplate.querySelector('feature--' + array[i]);
    newList[i].classList.remove('hidden');
  }
};
hideFeatures();

var fillCard = function (index) {
  var offerItem = announcements[index].offer;
  var articleP = card.querySelectorAll('p');
  var featuresListNew = card.querySelectorAll('.feature');

  card.querySelector('h3').textContent = offerItem.title;
  card.querySelector('small').textContent = offerItem.address;
  card.querySelector('.popup__price').textContent = offerItem.price + ' ₽' + '/ночь';
  card.querySelector('h4').textContent = typeTranslateRus(offerItem.type);
  articleP[2].textContent = offerItem.rooms + ' комнаты для ' + offerItem.guests + ' гостей';
  articleP[3].textContent = 'Заезд после ' + offerItem.checkin + ', выезд до' + offerItem.checkout;
  articleP[4].textContent = offerItem.description;
  card.querySelector('.popup__avatar').src = announcements[index].author.avatar;

  showFeatures(offerItem, featuresListNew);
};

var mapTokio = document.querySelector('.map');
var mapFilters = mapTokio.querySelector('.map__filters-container');
var noticeForm = document.querySelector('.notice__form');
var fieldsNotice = noticeForm.querySelectorAll('fieldset');

var disableFields = function () {
  for (var i = 0; i < fieldsNotice.length; i++) {
    fieldsNotice[i].setAttribute('disabled', '');
  }
};
disableFields();

var enableFields = function () {
  for (var i = 0; i < fieldsNotice.length; i++) {
    fieldsNotice[i].removeAttribute('disabled', '');
  }
};
enableFields();

var pinMain = mapTokio.querySelector('.map__pin--main');
var pinElements = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var hidePins = function () {
  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].classList.add('hidden');
  }
};
hidePins();

// перетаскивание, открытие карты

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    openMap();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var openMap = function () {
  mapTokio.classList.remove('map--faded');
  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].classList.remove('hidden');
  }
  noticeForm.classList.remove('notice__form--disabled');
  enableFields();
};

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

// открытие-закрытие карточек

var card = articleTemplate.cloneNode(true);
card.classList.add('hidden');
mapTokio.insertBefore(card, mapFilters);
var cardsClose = document.querySelector('.popup__close');
cardsClose.setAttribute.tabIndex = 0;

var clearPin = function () {
  for (var i = 0; i < pinElements.length; i++) {
    if (pinElements[i].classList.contains('map__pin--active')) {
      pinElements[i].classList.remove('map__pin--active');
    }
  }
};

var openCard = function (index) {
  clearPin();
  pinElements[index].classList.add('map__pin--active');
  fillCard(index);
  card.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

var closeCard = function (index) {
  card.classList.add('hidden');
  pinElements[index].classList.remove('map__pin--active');
  document.removeEventListener('keydown', onEscPress);
};

var onPinClick = function (index) {
  return function () {
    openCard(index);
  };
};
var onCardsCloseClick = function (index) {
  return function () {
    closeCard(index);
  };
};

var onPinEnterPress = function (evt, index) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPinClick(index);
  }
};

var onEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    card.classList.add('hidden');
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }
};

var onCloseEnterPress = function (evt, index) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onCardsCloseClick(index);
  }
};

for (var e = 0; e < pinElements.length; e++) {
  pinElements[e].addEventListener('click', onPinClick(e));
  cardsClose.addEventListener('click', onCardsCloseClick(e));
  pinElements[e].addEventListener('keydown', onPinEnterPress(e));
  cardsClose.addEventListener('keydown', onCloseEnterPress(e));
}
