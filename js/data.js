'use strict';

window.data = (function () {
  var ENTER_KEYCODE = 13;

  return {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
