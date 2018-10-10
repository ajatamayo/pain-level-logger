require('dotenv').config();

module.exports = {
  urls: {
    client: process.env.CLIENT_URL || 'http://localhost:3000',
    whitelist: process.env.WHITELIST_DOMAINS || 'http://localhost:3000', // env.WHITELIST_DOMAINS is a string of domains separated by space
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/aqwire_urlshortener_develop',
    test: 'mongodb://localhost:27017/aqwire_urlshortener_test',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 's3cr3t',
    tokenLife: '1h',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'R3fresHT0k3ns3cr3t',
    refreshTokenLife: '30d',
  },
  allowedEmailDomain: 'qwikwire.com',
  defaultFromEmail: '"aqwi.re" <noreply@aqwi.re>',
  app: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
  },
  loginCodeExpiry: process.env.LOGIN_CODE_EXPIRY || 900, // 900 seconds or 15 minutes
};
