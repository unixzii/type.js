const tty = require('tty');
const { EventEmitter } = require('events');

const { pick, bufferIs } = require('./utils');

const stdin = process.stdin;
const stdout = process.stdout;

const StringDecoder = require('string_decoder').StringDecoder;

class Recorder extends EventEmitter {
  constructor(options) {
    super();
    
    this._instructions = [];
    this._lastTimestamp = -1;
    this._echo = pick(options, 'echo', true);
  }

  _getDelay() {
    let delay;
    const now = new Date();
    if (this._lastTimestamp === -1) {
      delay = 0;
    } else {
      delay = now - this._lastTimestamp;
    }

    this._lastTimestamp = now;

    return delay;
  }

  _insertChar(buffer) {
    let str;

    if (buffer.length === 1 && buffer[0] === 13) {
      str = '\n';
    } else {
      str = new StringDecoder('utf-8').end(buffer);
    }

    if (this._echo) {
      stdout.write(str);
      //console.log(buffer);
    }

    this._instructions.push({mode: '+', content: str, delay: this._getDelay()});
  }

  _deleteChar() {
    if (this._echo) {
      stdout.write('\b \b');
    }

    this._instructions.push({mode: '-', delay: this._getDelay()});
  }

  start() {
    this._lastTimestamp = -1;

    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', function (buffer) {
      if (bufferIs(buffer, [0x1b, 0x5b, 0x41])) {
        return;
      }

      if (bufferIs(buffer, [0x1b, 0x5b, 0x42])) {
        return;
      }

      if (bufferIs(buffer, [0x1b, 0x5b, 0x43])) {
        return;
      }

      if (bufferIs(buffer, [0x1b, 0x5b, 0x44])) {
        return;
      }

      if (bufferIs(buffer, [0x03])) {
        // Ctrl-C pressed, stop recording.
        this.stop();
        return;
      }

      if (bufferIs(buffer, [0x7f])) {
        this._deleteChar();
        return;
      }

      this._insertChar(buffer);
    }.bind(this));
  }

  stop() {
    stdin.pause();
    this.emit('end', JSON.stringify(this._instructions));
  }
}

module.exports = Recorder;