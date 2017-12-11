'use strict';
window.data = (function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
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
  // данные
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
  return {
    announcements: announcements,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
  };
})();
