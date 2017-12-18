'use strict';
window.form = (function () {
  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
  var fieldsNotice = noticeForm.querySelectorAll('fieldset');

  var disableFields = function () {
    for (var i = 0; i < fieldsNotice.length; i++) {
      fieldsNotice[i].disabled = true;
    }
  };
  disableFields();
  var enableFields = function () {
    for (var i = 0; i < fieldsNotice.length; i++) {
      fieldsNotice[i].disabled = false;
    }
  };
  var enableForm = function () {
    enableFields();
    noticeForm.classList.remove('notice__form--disabled');
  };

  var typePlace = noticeForm.querySelector('#type');
  var pricePlace = noticeForm.querySelector('#price');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityPlace = noticeForm.querySelector('#capacity');
  var title = noticeForm.querySelector('#title');

  var formSubmit = noticeForm.querySelector('.form__submit');

  // минимальная цена - кол-во комнат

  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var onTypePlaceChange = function (fieldFirst, fieldSecond) {
    fieldSecond.min = MIN_PRICES[fieldFirst.value];
  };

  window.synchronizeFields(typePlace, pricePlace, onTypePlaceChange);

  // время заезда-выезда

  var syncTime = function (timeFirst, timeSecond) {
    timeSecond.selectedIndex = timeFirst.selectedIndex;
  };
  window.synchronizeFields(timeOutField, timeInField, syncTime);
  window.synchronizeFields(timeInField, timeOutField, syncTime);

  // комнаты-гости

  var CAPACITY_ROOMS = {
    rooms1: ['1'],
    rooms2: ['2', '1'],
    rooms3: ['3', '2', '1'],
    rooms100: ['0']
  };
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

  roomNumber.addEventListener('change', onCapacityChange);

  title.addEventListener('invalid', function () {
    title.style.borderColor = '#ff5635';
  });
  pricePlace.addEventListener('invalid', function () {
    pricePlace.style.borderColor = '#ff5635';
  });

  var sendHandler = function () {
    window.popup.successMessageShow();
    noticeForm.reset();
  };

  formSubmit.addEventListener('submit', function (evt) {

    window.backend.save(new FormData(noticeForm), sendHandler, window.popup.errorMessageShow);
    evt.preventDefault();

  });
  return {
    enableForm: enableForm,
    address: address
  };
})();
