'use strict';
window.form = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var CAPACITY_ROOMS = {
    rooms1: ['1'],
    rooms2: ['2', '1'],
    rooms3: ['3', '2', '1'],
    rooms100: ['0']
  };
  var MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var fileImageChooser = document.querySelector('.form__photo-container input[type=file]');
  var fileAvatarChooser = document.querySelector('.notice__photo input[type=file]');
  var previewImage = document.querySelector('.form__photo-container .drop-zone');
  var previewAvatar = document.querySelector('.notice__preview img');
  var noticeForm = document.querySelector('.notice__form');
  var address = noticeForm.querySelector('#address');
  var fieldsNotice = noticeForm.querySelectorAll('fieldset');
  var typePlace = noticeForm.querySelector('#type');
  var pricePlace = noticeForm.querySelector('#price');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacityPlace = noticeForm.querySelector('#capacity');

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

  var onTypePlaceChange = function (fieldFirst, fieldSecond) {
    fieldSecond.min = MIN_PRICES[fieldFirst.value];
  };
  window.synchronizeFields(typePlace, pricePlace, onTypePlaceChange);

  var syncTime = function (timeFirst, timeSecond) {
    timeSecond.selectedIndex = timeFirst.selectedIndex;
  };
  window.synchronizeFields(timeOutField, timeInField, syncTime);
  window.synchronizeFields(timeInField, timeOutField, syncTime);

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

  var onFormInvalid = function (evt) {
    evt.target.style.borderColor = '#ff5635';
  };

  var removeFotos = function (previews) {
    for (var i = 0; i < previews.length; i++) {
      previews[i].remove();
    }
    previewAvatar.src = 'img/muffin.png';

  };
  var onSubmitData = function () {
    window.popup.successMessageShow();
    var images = previewImage.querySelectorAll('img');
    removeFotos(images);
    noticeForm.reset();
  };
  var onChangeFiles = function (input, preview, cb) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    if (fileTypeMatches(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        cb(preview, reader);
      });
      reader.readAsDataURL(file);
    }
  };

  var avatarPreviewShow = function (preview, reader) {
    preview.src = reader.result;
  };

  var imagePreviewShow = function (preview, reader) {
    var node = document.createElement('img');
    node.src = reader.result;
    node.width = '200';
    node.height = '140';
    preview.appendChild(node);
  };

  var fileTypeMatches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  fileImageChooser.addEventListener('change', function () {
    onChangeFiles(fileImageChooser, previewImage, imagePreviewShow);
  });
  fileAvatarChooser.addEventListener('change', function () {
    onChangeFiles(fileAvatarChooser, previewAvatar, avatarPreviewShow);
  });

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), onSubmitData, window.popup.errorMessageShow);
    evt.preventDefault();
  });

  noticeForm.addEventListener('invalid', function (evt) {
    onFormInvalid(evt);
  }, true);

  return {
    enableForm: enableForm,
    address: address
  };
})();
