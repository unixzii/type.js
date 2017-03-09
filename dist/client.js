'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TypePlayer - play what type.js recorded
 * Copyright (c) 2016-2017, Cyandev. (MIT Licensed)
 * https://github.com/unixzii/type.js
 */

;(function () {
  var TypePlayer = function () {
    /**
     * Constructor of TypePlayer class.
     * @param {string} data - the JSON format recorded string.
     * @param {function} cb - callback to call when a frame is ticked.
     * @param {number} speedRatio - speed ratio for playing back.
     *
     * A possible callback:
     *
     * function exampleCallback(text) {
     *   yourSpanEl.innerText = text;
     * }
     */
    function TypePlayer(data, cb, speedRatio) {
      _classCallCheck(this, TypePlayer);

      this._instructions = JSON.parse(data);
      this._speedRatio = speedRatio | 1;
      this._currentFrame = 0;
      this._callback = cb;
      this._str = '';
      this._isPlaying = true;
    }

    _createClass(TypePlayer, [{
      key: '_nextFrame',
      value: function _nextFrame() {
        var _this = this;

        if (!this._isPlaying) {
          return;
        }

        var frame = this._instructions[this._currentFrame++];
        if (!frame) {
          // No more frames, stop it.
          this.stop();
          return;
        }

        if (frame.mode === '+') {
          this._str += frame.content;
        } else {
          this._str = this._str.slice(0, -1);
        }

        if (this._callback) {
          this._callback(this._str);
        }

        // Schedule the next frame.
        setTimeout(function () {
          _this._nextFrame();
        }, frame.delay * (1 / this._speedRatio));
      }

      /**
       * Begin the playback.
       */

    }, {
      key: 'play',
      value: function play() {
        this._currentFrame = 0;
        this._isPlaying = true;
        this._nextFrame();
      }

      /**
       * End the playback.
       */

    }, {
      key: 'stop',
      value: function stop() {
        this._isPlaying = false;
      }
    }]);

    return TypePlayer;
  }();

  if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = TypePlayer;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return TypePlayer;
    });
  } else {
    this.TypePlayer = TypePlayer;
  }
}).call(function () {
  return this || (typeof window !== 'undefined' ? window : global);
}());