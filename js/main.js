'use strict';
var neighbours = [];
var arrLength = 8;
var IMAGES_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var number;
var imageAddress;
var PRICE_VALUE = 150;
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_AMOUNT = 2;
var GUESTS_AMOUNT = 3;
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var MIN_X = 100;
var MAX_X = 660;
var MIN_Y = 130;
var MAX_Y = 630;

var getRandomNumber = function (arr) {
  number = arr[Math.floor(Math.random() * arr.length)];
  return number;
}

var getImageAddress = function (arr) {
  imageAddress = `img/avatars/user0${getRandomNumber(arr)}.png`;
  for (var i = 0; i < arr.length ; i++) {
    if (number === arr[i]) {
      arr.splice(i, 1);
    }
  };
  return imageAddress;
}

var getRandomCoordinate = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getNeighbours = function (arr) {
  for (var i = 0; i < arrLength; i++) {
    arr[i] = {
      author: {
        avatar: getImageAddress(IMAGES_NUMBERS)
      },
      offer: {
        title: 'Лучшее предложение',
        address: '600, 350',
        price: PRICE_VALUE,
        type: getRandomNumber(TYPE_LIST),
        rooms: ROOMS_AMOUNT,
        guests: GUESTS_AMOUNT,
        checkin: getRandomNumber(CHECK_IN_OUT),
        checkout: getRandomNumber(CHECK_IN_OUT),
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: getRandomCoordinate(MIN_X, MAX_X),
        y: getRandomCoordinate(MIN_Y, MAX_Y)
      }
    };
  };

  return arr;
};

getNeighbours(neighbours);

document.querySelector('.map').classList.remove('map--faded');

var similarPinElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);


  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pin.offer.title);

  return pinElement;
}

var fragment = document.createDocumentFragment();

var createPin = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  similarPinElement.appendChild(fragment);
}

createPin(neighbours);
