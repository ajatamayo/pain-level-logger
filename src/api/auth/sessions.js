const ip = require('public-ip');
const geoip = require('geoip-lite');
const detect = require('browser-detect');
const Session = require('./sessionModel.js');

async function createSession(data) {
  const ipAddress = await ip.v4();
  const { city, country } = await geoip.lookup(ipAddress);
  const location = `${city},${country}`;
  const { name, version, os } = detect(data.userAgent);
  data.userAgent = `${os} / ${name} ${version}`; // eslint-disable-line no-param-reassign

  const sessionInfo = {
    ipAddress,
    location,
    ...data,
  };

  const { refreshToken } = data;

  let session = await Session.find({ refreshToken });
  if (!session) {
    session = await Session.create(sessionInfo);
  }

  return session;
}

module.exports = {
  createSession,
};
