// The alphabet is just 123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ but scrambled
const alphabet = 'sCt8fwuW9ioaxM6DJSKE3dc47gLVRhpUYqB1rnGP2kmzjHZvTQb5FyeXAN';
const base = alphabet.length;

function encode(num) {
  let encoded = '';
  let n = num;
  while (n) {
    const remainder = n % base;
    n = Math.floor(n / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function decode(str) {
  let decoded = 0;
  let s = str;
  while (s) {
    const index = alphabet.indexOf(s[0]);
    const power = s.length - 1;
    decoded += index * (base ** power);
    s = s.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;

// 195231 = 58*58*58 + 58*2 + 3
// ensures base58 is at least 4 characters, and start with different chars
module.exports.initialPk = 195231;
