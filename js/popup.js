'use strict';
window.popup = (function () {
  var SUCCESS_MESSAGE = 'Поздравляем, ваши данные отправлены!';
  var popupFormElement = document.querySelector('.popup-form');
  var overlayElement = document.querySelector('.popup-overlay');
  var closeElement = document.querySelector('.popup-form__close');

  var showErrorMessage = function (error) {
    popupFormElement.querySelector('.popup-form__text').textContent = error;
    window.util.showElement(overlayElement);
    window.util.showElement(popupFormElement);
  };
  var closePopup = function () {
    window.util.hideElement(overlayElement);
    window.util.hideElement(popupFormElement);
  };
  var showSuccessMessage = function () {
    popupFormElement.querySelector('.popup-form__text').textContent = SUCCESS_MESSAGE;
    window.util.showElement(overlayElement);
    window.util.showElement(popupFormElement);
  };

  closeElement.addEventListener('click', closePopup);

  return {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };
})();
