'use strict';
var neighbours = [];
var ARR_LENGTH = 8;
var imagesNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var numbers = [];
var imageAddress = '';
var PRICE_VALUE = 150;
var typeVariants = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_AMOUNT = 2;
var GUESTS_AMOUNT = 3;
var chekInOutVariants = ['12:00', '13:00', '14:00'];
var MIN_X = 100;
var MAX_X = 660;
var MIN_Y = 130;
var MAX_Y = 630;
var ENTER_KEYCODE = 13;
var PIN_WIDTH_INACTIVE = 65;
var PIN_HEIGHT_INACTIVE = 65;
var PIN_TRIANGLE_HEIGHT = 22;
var PIN_LEFT = 570;
var PIN_TOP = 375;
var similarPinElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var setupForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
var setupFilters = document.querySelector('.map__filters').querySelectorAll('fieldset');
var setupActive = document.querySelector('.map__pin--main');
var setup = document.querySelector('.map');

var getRandomNumber = function (arr) {
  numbers = arr[Math.floor(Math.random() * arr.length)];
  return numbers;
};

var getImageAddress = function (arr) {
  imageAddress = 'img/avatars/user0' + getRandomNumber(arr) + '.png';
  for (var i = 0; i < arr.length; i++) {
    if (numbers === arr[i]) {
      arr.splice(i, 1);
    }
  }
  return imageAddress;
};

var getRandomCoordinate = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getNeighbours = function (arr) {
  for (var i = 0; i < ARR_LENGTH; i++) {
    arr[i] = {
      author: {
        avatar: getImageAddress(imagesNumbers)
      },
      offer: {
        title: 'Лучшее предложение',
        address: '600, 350',
        price: PRICE_VALUE,
        type: getRandomNumber(typeVariants),
        rooms: ROOMS_AMOUNT,
        guests: GUESTS_AMOUNT,
        checkin: getRandomNumber(chekInOutVariants),
        checkout: getRandomNumber(chekInOutVariants),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: getRandomCoordinate(MIN_X, MAX_X),
        y: getRandomCoordinate(MIN_Y, MAX_Y)
      }
    };
  }

  return arr;
};

getNeighbours(neighbours);

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);

  return pinElement;
};

var createPin = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  similarPinElement.appendChild(fragment);
};

createPin(neighbours);


var address = document.querySelector('input[id="address"]');
var writeAddress = function (x, y) {
  address.setAttribute('value', x + ', ' + y);
}
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
}

makeFormDisabled(setupForm);
makeFormDisabled(setupFilters);

var activateMap = function () {
  setup.classList.remove('map--faded');
  makeFormActive(setupForm);
  makeFormActive(setupFilters);
  addAddressActive(PIN_LEFT, PIN_TOP, PIN_WIDTH_INACTIVE, PIN_HEIGHT_INACTIVE, PIN_TRIANGLE_HEIGHT);
};

setupActive.addEventListener('click', function() {
  activateMap();
});

setupActive.addEventListener('keydown', function() {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});

var rooms = document.querySelector('select[name="rooms"]');
var roomsAmount;
rooms.addEventListener('click', function() {
  var roomsNumber = document.querySelector('select[name="rooms"]').selectedIndex;
  roomsAmount = document.querySelector('select[name="rooms"]').options[roomsNumber].text;
  console.log(roomsAmount);
  return roomsAmount;
});

var guests = document.querySelector('select[name="capacity"]');
guests.addEventListener('click', function() {
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
