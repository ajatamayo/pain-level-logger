const { compose } = require('lodash/fp');
const config = require('../config');
const sendEmail = require('./sendEmail');

function getOptions(to, code, uid) {
  const magicUrl = `${config.urls.client}/?code=${encodeURIComponent(code)}&uid=${encodeURIComponent(uid)}`;
  const content = `
    <p style="color: #4a4a4a;"><strong style="font-size: 26px;">Login</strong></p>
    <p style="color: #4a4a4a;"><a href="${magicUrl}">Click here to log in with this magic link</a></p>
    <p style="color: #4a4a4a;">Or, copy and paste this temporary login code:</p>
    <pre style="padding: 16px 24px; border: 1px solid #eeeeee; background-color: #f4f4f4; border-radius: 3px; font-family: monospace; margin-bottom: 24px">${code}</pre>
    <p style="color: #aaaaaa;">(If you didn't try to log in, you can safely ignore this email.)</p>
`;

  return {
    to,
    subject: `Your temporary aqwi.re login code is "${code}"`,
    message: content,
  };
}

const sendLoginCode = compose(sendEmail, getOptions);

module.exports = sendLoginCode;
