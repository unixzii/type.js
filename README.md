<h1 align="center">
  <br>
  <img width="500" src="https://github.com/unixzii/type.js/raw/master/.github/screencast.gif" alt="type.js">
  <br>
  <br>
</h1>

> A tool for creating typewriter simulations.

type.js allows you to type anything in terminal, and it will record the whole process of your typing, then generate a JSON that you can later replay it in your pages.

## Install

```console
$ git clone https://github.com/unixzii/type.js.git

$ npm install
```

## Usage

### To Record:

```console
$ bin/type-cli
```

> Pass option `--help` to view detail usage.

### To Replay:

Import the supporting library at `dist/client.js`

```js
const json = /* Grab your recorded JSON file */
const el = /* Grad your DOM element */
const speed = 1.5; // I would like to replay at 1.5x.

new TypePlayer(json, function (text) {
  el.innerText = text;
}, speed).play();
```

## License
The project is available under the MIT license. See the LICENSE file for more info.