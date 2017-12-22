'use strict';
window.popup = (function () {
  var SUCCESS_MESSAGE = 'Поздравляем, ваши данные отправлены!';
  var popupForm = document.querySelector('.popup-form');
  var overlay = document.querySelector('.popup-overlay');
  var close = document.querySelector('.popup-form__close');

  var errorMessageShow = function (error) {
    popupForm.querySelector('.popup-form__text').textContent = error;
    window.util.showElement(overlay);
    window.util.showElement(popupForm);
  };
  var closePopup = function () {
    window.util.hideElement(overlay);
    window.util.hideElement(popupForm);
  };
  var successMessageShow = function () {
    popupForm.querySelector('.popup-form__text').textContent = SUCCESS_MESSAGE;
    window.util.showElement(overlay);
    window.util.showElement(popupForm);
  };

  close.addEventListener('click', closePopup);

  return {
    errorMessageShow: errorMessageShow,
    successMessageShow: successMessageShow
  };
})();
