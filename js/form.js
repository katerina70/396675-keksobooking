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
  var previewImageElement = document.querySelector('.form__photo-container .drop-zone');
  var previewAvatarElement = document.querySelector('.notice__preview img');
  var noticeFormElement = document.querySelector('.notice__form');
  var addressElement = noticeFormElement.querySelector('#address');
  var fieldsNoticeElements = noticeFormElement.querySelectorAll('fieldset');
  var typePlaceElement = noticeFormElement.querySelector('#type');
  var pricePlaceElement = noticeFormElement.querySelector('#price');
  var timeInElement = noticeFormElement.querySelector('#timein');
  var timeOutElement = noticeFormElement.querySelector('#timeout');
  var roomNumberElement = noticeFormElement.querySelector('#room_number');
  var capacityElement = noticeFormElement.querySelector('#capacity');

  var disableFields = function () {
    for (var i = 0; i < fieldsNoticeElements.length; i++) {
      fieldsNoticeElements[i].disabled = true;
    }
  };
  disableFields();
  var enableFields = function () {
    for (var i = 0; i < fieldsNoticeElements.length; i++) {
      fieldsNoticeElements[i].disabled = false;
    }
  };
  var enableForm = function () {
    enableFields();
    noticeFormElement.classList.remove('notice__form--disabled');
  };

  var onTypePlaceChange = function (fieldFirst, fieldSecond) {
    fieldSecond.min = MIN_PRICES[fieldFirst.value];
  };
  window.synchronizeFields(typePlaceElement, pricePlaceElement, onTypePlaceChange);

  var syncTime = function (timeFirst, timeSecond) {
    timeSecond.selectedIndex = timeFirst.selectedIndex;
  };
  window.synchronizeFields(timeOutElement, timeInElement, syncTime);
  window.synchronizeFields(timeInElement, timeOutElement, syncTime);

  var onCapacityChange = function (evt) {
    var roomNumberValue = 'rooms' + evt.currentTarget.value;
    for (var i = 0; i < capacityElement.options.length; i++) {
      var shownOptions = CAPACITY_ROOMS[roomNumberValue];
      var optionValue = capacityElement.options[i].value;
      capacityElement.options[i].hidden = shownOptions.indexOf(optionValue) === -1;
      if (shownOptions[0] === optionValue) {
        var selectedOption = i;
      }
    }
    capacityElement.options[selectedOption].selected = true;
  };

  roomNumberElement.addEventListener('change', onCapacityChange);

  var onFormInvalid = function (evt) {
    evt.target.style.borderColor = '#ff5635';
  };

  var removeFotos = function (previews) {
    previews.forEach(function (item) {
      item.remove();
    });
    previewAvatarElement.src = 'img/muffin.png';
  };
  var onSubmitData = function () {
    window.popup.successMessageShow();
    var images = previewImageElement.querySelectorAll('img');
    removeFotos(images);
    noticeFormElement.reset();
  };
  var onChangeFiles = function (input, preview, cb) {
    var file = input.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      if (fileTypeMatches(fileName)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          cb(preview, reader);
        });
        reader.readAsDataURL(file);
      }
    }
  };
  var fileTypeMatches = function (fileName) {
    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
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

  fileImageChooser.addEventListener('change', function () {
    onChangeFiles(fileImageChooser, previewImageElement, imagePreviewShow);
  });
  fileAvatarChooser.addEventListener('change', function () {
    onChangeFiles(fileAvatarChooser, previewAvatarElement, avatarPreviewShow);
  });

  noticeFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeFormElement), onSubmitData, window.popup.errorMessageShow);
    evt.preventDefault();
  });

  noticeFormElement.addEventListener('invalid', function (evt) {
    onFormInvalid(evt);
  }, true);

  return {
    enable: enableForm,
    address: addressElement
  };
})();
