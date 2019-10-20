'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_WIDTH_INACTIVE = 65;
  var PIN_HEIGHT_INACTIVE = 65;
  var PIN_TRIANGLE_HEIGHT = 22;
  var PIN_LEFT = 570;
  var PIN_TOP = 375;
  var setupForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var setupFilters = document.querySelector('.map__filters').querySelectorAll('fieldset');
  var setupActive = document.querySelector('.map__pin--main');
  var setup = document.querySelector('.map');
  var address = document.querySelector('input[id="address"]');
  var writeAddress = function (x, y) {
    address.setAttribute('value', x + ', ' + y);
  };

  var addAddressInactive = function (left, top, width, height) {
    writeAddress(Math.round(left + width / 2), Math.round(top + height / 2));
  };

  var addAddressActive = function (left, top, width, height, triangleHeight) {
    writeAddress(Math.round(left + width / 2), Math.round(top + height + triangleHeight));
  };

  addAddressInactive(PIN_LEFT, PIN_TOP, PIN_WIDTH_INACTIVE, PIN_HEIGHT_INACTIVE);

  var makeFormDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', true);
    }
  };

  var makeFormActive = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  makeFormDisabled(setupForm);
  makeFormDisabled(setupFilters);

  var activateMap = function () {
    setup.classList.remove('map--faded');
    makeFormActive(setupForm);
    makeFormActive(setupFilters);
    addAddressActive(PIN_LEFT, PIN_TOP, PIN_WIDTH_INACTIVE, PIN_HEIGHT_INACTIVE, PIN_TRIANGLE_HEIGHT);
  };

  setupActive.addEventListener('click', function () {
    activateMap();
  });

  setupActive.addEventListener('keydown', function (evt) {
    window.data.isEnterEvent(evt, activateMap);
  });

  var rooms = document.querySelector('select[name="rooms"]');
  var roomsAmount = '';
  rooms.addEventListener('click', function () {
    var roomsNumber = document.querySelector('select[name="rooms"]').selectedIndex;
    roomsAmount = document.querySelector('select[name="rooms"]').options[roomsNumber].text;
  });

  var guests = document.querySelector('select[name="capacity"]');
  guests.addEventListener('click', function () {
    var guestsNumber = document.querySelector('select[name="capacity"]').selectedIndex;
    var guestsAmount = document.querySelector('select[name="capacity"]').options[guestsNumber].text;

    if ((roomsAmount === '1 комната' && guestsAmount === 'для 2 гостей') || (roomsAmount === '1 комната' && guestsAmount === 'для 3 гостей') || (roomsAmount === '1 комната' && guestsAmount === 'не для гостей')) {
      guests.setCustomValidity('Возможно выбрать только для 1 гостя');
    } else if ((roomsAmount === '2 комнаты' && guestsAmount === 'для 3 гостей') || (roomsAmount === '1 комната' && guestsAmount === 'не для гостей')) {
      guests.setCustomValidity('Возможно выбрать только для 1 или 2 гостей');
    } else if (roomsAmount === '3 комнаты' && guestsAmount === 'не для гостей') {
      guests.setCustomValidity('Возможно выбрать только для 1, 2 или 3 гостей');
    } else if ((roomsAmount === '100 комнат' && guestsAmount === 'для 1 гостя') || (roomsAmount === '100 комнат' && guestsAmount === 'для 2 гостей') || (roomsAmount === '100 комнат' && guestsAmount === 'для 3 гостей')) {
      guests.setCustomValidity('Возможно выбрать только не для гостей');
    } else {
      guests.setCustomValidity('');
    }
  });
})();
