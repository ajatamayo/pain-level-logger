const nodemailer = require('nodemailer');
const path = require('path');
const stripHtml = require('string-strip-html');
const { defaultFromEmail } = require('../config');

const { getHtml } = require('./templates');

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  streamTransport: true,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

function sendMail(options) {
  const logoPath = path.join(__dirname, 'logo.png');

  const defaults = {
    from: defaultFromEmail,
    subject: 'test subject',
    message: '<b>test html message</b>',
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
        console.log(info.envelope);
        console.log(info.messageId);
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
