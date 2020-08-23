const mailgunjs = require('mailgun-js');
const path = require('path');
const stripHtml = require('string-strip-html');

const config = require('../config');
const { getHtml } = require('./templates');

const mailgun = mailgunjs({ apiKey: config.mailgun.apikey, domain: config.mailgun.domain });

function sendMail(options) {
  const logoPath = path.join(__dirname, 'logo.png');

  const defaults = {
    from: config.emails.from,
    subject: 'Hey!',
    message: '<b>What\'s up?</b>',
    inline: logoPath,
  };

  const mailOpts = Object.assign({}, defaults, options);
  mailOpts.html = getHtml(mailOpts.message);
  mailOpts.text = stripHtml(mailOpts.message);

  mailgun.messages().send(mailOpts, function (error, body) {
    console.log(body);
  });
}

module.exports = sendMail;
