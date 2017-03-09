/**
 * TypePlayer - play what type.js recorded
 * Copyright (c) 2016-2017, Cyandev. (MIT Licensed)
 * https://github.com/unixzii/type.js
 */

;(function () {
  class TypePlayer {
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
    constructor(data, cb, speedRatio) {
      this._instructions = JSON.parse(data);
      this._speedRatio = speedRatio | 1;
      this._currentFrame = 0;
      this._callback = cb;
      this._str = '';
      this._isPlaying = true;
    }

    _nextFrame() {
      if (!this._isPlaying) {
        return;
      }

      const frame = this._instructions[this._currentFrame++];
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
      setTimeout(() => { this._nextFrame() }, frame.delay * (1 / this._speedRatio));
    }

    /**
     * Begin the playback.
     */
    play() {
      this._currentFrame = 0;
      this._isPlaying = true;
      this._nextFrame();
    }

    /**
     * End the playback.
     */
    stop() {
      this._isPlaying = false;
    }
  }

  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = TypePlayer;
  } else if (typeof define === 'function' && define.amd) {
    define(function () { return TypePlayer; });
  } else {
    this.TypePlayer = TypePlayer;
  }
}).call(function () {
  return this || (typeof window !== 'undefined' ? window : global);
}());
