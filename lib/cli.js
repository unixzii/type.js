#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const pify = require('pify');
const program = require('commander');
const chalk = require('chalk');

const Recorder = require('./recorder');

const writeFile = pify(fs.writeFile);

program
  .version('0.1.0')
  .option('-o, --out-file <filename>', 'write generated code to specific file')
  .option('-e, --escape', 'escape quote characters')
  .parse(process.argv)

console.log(chalk.red('Recording started! Press Ctrl-C to finish.\n'));

const recorder = new Recorder();
recorder.start();
recorder.on('end', function (data) {
  console.log('\n');
  let result = data;
  if (program.escape) {
    result = result.replace(/\\/g, '\\\\');
    result = result.replace(/\'/g, '\\\'');
    result = result.replace(/\"/g, '\\"');
  }

  if (program.outFile) {
    const filename = path.resolve(program.outFile);
    writeFile(filename, result).then(function () {
      console.log(chalk.bgGreen.white('SUCC') + ` saved to ${filename}`);
    }).catch(function (err) {
      console.log(chalk.bgRed.white('ERR') + ` failed to write to '${filename}'.`);
    });
  } else {
    console.log(chalk.bold(result));
  }
});