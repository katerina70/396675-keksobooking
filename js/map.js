'use strict';
// Создаем функцию для получения случайного целого числа в диапазоне
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// создаем значения для author ??????????? не понимаю, почему number = undefined (((((((((( То есть другими словами я вообще не понимаю, как вернуть один элемент массива хоть последовательно, хоть рандомный, неповторящийся.  

var numbers = [1, 2, 3, 4, 5, 6, 7, 8];

var getNumber = function () {
  for (var i = 0; i <= 8; i++) {
    var number = numbers[i];
  }
  return number;
};

var getAuthor = function () {
  return {
    avatar: 'img/avatars/user0' + getNumber() + '.png'
  };
};


// Cоздаем значение для tittle
var titleValues = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// ??????????????  Не могу сделать, чтобы они не повторялись(((((

var getTitle = function () {
  for (var n = 0; n <= titleValues.length; n++) {
    var arrTemp = titleValues;
    var randomIndex = getRandom(0, arrTemp.length);
    var titleValue = arrTemp[randomIndex];
    arrTemp.splice(randomIndex, 1);
  }
  return titleValue;
};
// Массив значений для type
var typeValues = ['flat', 'house', 'bungalo'];
// Массив значений для checkin/out
var checkTime = ['12:00', '13:00', '14:00'];

// Находим значение для features
var featuresItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getFeatures = function (arr) {
  var arrTemp = arr;
  var array = [];
  for (var m = 0; m <= getRandom(1, arr.length); m++) {
    var i = getRandom(0, arrTemp.length);
    var randomItem = arrTemp[i];
    array.push(randomItem);
    arrTemp.splice(i, 1);
  }
  return array.join(', ');
};
// Создаем массив photos
var photosItems = [];

// Создаем объект offer
var getOffer = function () {
  return {
    title: getTitle(),
    address: 'location.' + getRandom(300, 900) + ',' + 'location.' + getRandom(100, 500),
    price: getRandom(1000, 1000001),
    type: typeValues[getRandom(0, 3)],
    rooms: getRandom(1, 6),
    guests: getRandom(1, 12),
    checkin: checkTime[getRandom(0, 3)],
    checkout: checkTime[getRandom(0, 3)],
    features: getFeatures(featuresItems),
    description: '',
    photos: photosItems

  };
};
// Создаем объект location

var getLocation = function () {
  return {
    x: getRandom(300, 900),
    y: getRandom(100, 500)
  };
};

// создаем объект announcement

var getAnnouncement = function () {
  return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation()
  };
};

// создаем массив из 8 объектов announcement

var announcements = [];
for (var i = 0; i < 8; i++) {
  announcements.push(getAnnouncement());
}


// Удаляем класс у map
var mapTokio = document.querySelector('.map');
mapTokio.classList.remove('map--faded');

// Создаем элемент button и отрисовываем его в maps__pins
var mapsPin = document.querySelector('.map__pins');

var fragment = mapsPin.createDocumentFragment();

var adressPin = document.createElement('BUTTON');
adressPin.className = 'map__pin';
adressPin.style.cssText = 'left:' + getLocation().x + ';' + 'top:' + getLocation().y + 'px;';
fragment.appendChild(adressPin);
