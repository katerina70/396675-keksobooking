'use strict';
window.popup = (function () {
  var SUCCESS_MESSAGE = 'Поздравляем, ваши данные отправлены!';
  var popupForm = document.querySelector('.popup-form');
  var overlay = document.querySelector('.popup-overlay');
  var close = document.querySelector('.popup-form__close');
  var showElement = function (element) {
    element.classList.remove('hidden');
  };
  var hideElement = function (element) {
    element.classList.add('hidden');
  };
  var errorMessageShow = function (error) {
    popupForm.querySelector('.popup-form__text').textContent = error;
    showElement(overlay);
    showElement(popupForm);
  };
  var closePopup = function () {
    hideElement(overlay);
    hideElement(popupForm);
  };
  var successMessageShow = function () {
    popupForm.querySelector('.popup-form__text').textContent = SUCCESS_MESSAGE;
    showElement(overlay);
    showElement(popupForm);
  };

  close.addEventListener('click', closePopup);

  return {
    errorMessageShow: errorMessageShow,
    successMessageShow: successMessageShow
  };
})();
