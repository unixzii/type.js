function pick(dict, key, defaultValue) {
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  } else {
    return defaultValue;
  }
}

function bufferIs(buffer, bytes) {
  if (!buffer || !bytes) {
    return false;
  }

  if (buffer.length !== bytes.length) {
    return false;
  }

  return Buffer.compare(buffer, Buffer.from(bytes)) === 0;
}

module.exports = {
  pick,
  bufferIs
};