'use strict';
(function () {
  var typePlace = window.map.noticeForm.querySelector('#type');
  var pricePlace = window.map.noticeForm.querySelector('#price');
  var timeInField = window.map.noticeForm.querySelector('#timein');
  var timeOutField = window.map.noticeForm.querySelector('#timeout');
  var roomNumber = window.map.noticeForm.querySelector('#room_number');
  var capacityPlace = window.map.noticeForm.querySelector('#capacity');
  var title = window.map.noticeForm.querySelector('#title');

  var formSubmit = window.map.noticeForm.querySelector('.form__submit');
  // данные data.js

  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var CAPACITY_ROOMS = {
    rooms1: ['1'],
    rooms2: ['2', '1'],
    rooms3: ['3', '2', '1'],
    rooms100: ['0']
  };
  // form.js
  var onTypePlaceChange = function (evt) {
    pricePlace.min = MIN_PRICES[evt.currentTarget.value];
  };
  // время заезда-выезда
  var syncTimeInField = function () {
    timeOutField.selectedIndex = timeInField.selectedIndex;
  };
  var syncTimeOutField = function () {
    timeInField.selectedIndex = timeOutField.selectedIndex;
  };

  // комнаты-гости

  var onCapacityChange = function (evt) {
    var roomNumberValue = 'rooms' + evt.currentTarget.value;
    for (var i = 0; i < capacityPlace.options.length; i++) {
      var shownOptions = CAPACITY_ROOMS[roomNumberValue];
      var optionValue = capacityPlace.options[i].value;
      capacityPlace.options[i].hidden = shownOptions.indexOf(optionValue) === -1;
      if (shownOptions[0] === optionValue) {
        var selectedOption = i;
      }
    }
    capacityPlace.options[selectedOption].selected = true;
  };

  var checkValidField = function (field) {
    field.style.borderColor = (!field.validity.valid) ? '#ff5635' : '';
  };
  var onSubmitClick = function () {
    checkValidField(title);
    checkValidField(window.map.address);
    checkValidField(pricePlace);
  };
  var onValuesDefault = function () {
    formSubmit.removeEventListener('click', onSubmitClick);
  };

  typePlace.addEventListener('change', onTypePlaceChange);
  roomNumber.addEventListener('change', onCapacityChange);
  timeInField.addEventListener('change', syncTimeInField);
  timeOutField.addEventListener('change', syncTimeOutField);
  formSubmit.addEventListener('click', onSubmitClick);
  formSubmit.addEventListener('submit', onValuesDefault);

})();
