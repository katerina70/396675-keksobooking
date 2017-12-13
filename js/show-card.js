'use strict';
window.showCard = (function () {

  var cardsClose = document.querySelector('.popup__close');
  cardsClose.setAttribute.tabIndex = 0;

  var activePin = null;

  var setPinActive = function (clickedPin) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    clickedPin.classList.add('map__pin--active');
    activePin = clickedPin;
  };
  var removeActivePin = function () {
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }
  };
  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
      removeActivePin();
    }
  };
  var onCloseEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      closeCard();
      removeActivePin();
    }
  };

  var openCard = function (index) {
    window.card.fillCard(index);
    window.card.card.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closeCard = function () {
    window.card.card.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };
  var onCloseClick = function () {
    closeCard();
    removeActivePin();
  };

  var showCard = function (index) {
    return function (evt) {
      openCard(index);
      setPinActive(evt.currentTarget);
      cardsClose.addEventListener('click', onCloseClick);
      cardsClose.addEventListener('keydown', onCloseEnterPress);
    };
  };

  return {
    showCard: showCard
  };
})();
