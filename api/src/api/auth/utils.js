const bcrypt = require('bcrypt');
const crypto = require('crypto');
const XKCDPassword = require('xkcd-password');

const pw = new XKCDPassword();
const saltRounds = process.env.NODE_ENV === 'test' ? 1 : 12;

const generateHash = async plainText => bcrypt.genSalt(saltRounds)
  .then(salt => bcrypt.hash(plainText, salt).then(hash => hash));

const compareCodes = async (code, encryptedCode) => bcrypt.compare(code, encryptedCode);

function cryptoRandom(length = 24) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

const generateCode = () => {
  const options = {
    numWords: 4,
    minLength: 3,
    maxLength: 6,
  };

  return pw.generate(options).then(result => (
    result.join('-')
  )).catch((err) => {
    if (!err) {
      // eslint-disable-next-line no-console
      console.log('No errors here!');
    }
  });
};

module.exports = {
  generateHash,
  compareCodes,
  cryptoRandom,
  generateCode,
};
