const nodemailer = require('nodemailer');
const path = require('path');
const stripHtml = require('string-strip-html');

const config = require('../config');
const { getHtml } = require('./templates');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
  dkim: config.emails.dkim,
});

function sendMail(options) {
  const logoPath = path.join(__dirname, 'logo.png');

  const defaults = {
    from: '"AJ Tamayo" <aj@atamayo.io>',
    subject: 'Hey!',
    message: '<b>What\'s up?</b>',
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: 'logo_cid',
    }],
  };

  const mailOpts = Object.assign({}, defaults, options);
  mailOpts.html = getHtml(mailOpts.message);
  mailOpts.text = stripHtml(mailOpts.message);

  return new Promise(((resolve, reject) => {
    transporter
      .sendMail(mailOpts)
      .then((info) => {
        // eslint-disable-next-line no-console
        console.log(info);
        info.message.pipe(process.stdout);
        return resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        return reject(false); // eslint-disable-line
      });
  }));
}

module.exports = sendMail;
