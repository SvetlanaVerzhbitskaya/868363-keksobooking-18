'use strict';

(function () {
  var neighbours = [];
  var ARR_LENGTH = 8;
  var imagesNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  var numbers = [];
  var imageAddress = '';
  var PRICE_VALUE = 150;
  var typeVariants = ['palace', 'flat', 'house', 'bungalo'];
  var featuresVariants = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosVariants = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ROOMS_AMOUNT = 2;
  var GUESTS_AMOUNT = 3;
  var chekInOutVariants = ['12:00', '13:00', '14:00'];
  var MIN_X = 100;
  var MAX_X = 660;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var similarPinElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var fragment = document.createDocumentFragment();


  // var similarPhotoElement = document.querySelector('.map__card');
  // var similarPhotoTemplate = document.querySelector('.popup__photos')
  //   .content
  //   .querySelector('.popup__photo');


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
          features: getRandomNumber(featuresVariants),
          description: 'Описание',
          photos: getRandomNumber(photosVariants)
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

  var getRussianType = function (arr) {
    if (arr.offer.type === 'flat') {
      arr.offer.type = 'Квартира';
    } else if (arr.offer.type === 'bungalo') {
      arr.offer.type = 'Бунгало';
    } else if (arr.offer.type === 'house') {
      arr.offer.type = 'Дом';
    } else if (arr.offer.type === 'palace') {
      arr.offer.type = 'Дворец';
    }
    return (arr.offer.type);
  };

  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getRussianType(card);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features li').textContent = card.offer.features;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').querySelector('img').setAttribute('src', card.offer.photos);
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    return cardElement;
  };

  var createPin = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i]));
      fragment.appendChild(renderCard(arr[i]));
    }
    similarPinElement.appendChild(fragment);
  };

  createPin(neighbours);


  // var createCard = function () {
  //   for (var i = 0; i < arr.length; i++) {
  //     fragment.appendChild(renderCard(arr[i]))
  //   }
  // }
})();
