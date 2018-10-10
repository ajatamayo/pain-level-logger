const JWT = require('jsonwebtoken');
const config = require('../../config');
const Client = require('./clientModel');
const { cryptoRandom } = require('./utils');

function createSignFn(secret, globalOptions = {}) {
  return (data, options = {}) => (
    new Promise((resolve, reject) => {
      JWT.sign(data, secret, Object.assign({}, globalOptions, options), (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
    })
  );
}

const signToken = createSignFn(config.jwt.secret, { expiresIn: config.jwt.tokenLife });

const generateAccessTokenData = user => ({
  user: {
    _id: user._id,
    scopes: user.scopes,
    email: user.email,
    displayName: user.displayName,
  },
});

async function generateAuthTokens(user, clientId) {
  const data = generateAccessTokenData(user);
  const accessToken = await signToken(data);

  let client;
  client = await Client.findOne({ clientId });
  if (!client) {
    const refreshToken = await cryptoRandom(40);
    client = await Client.create({ clientId, user, refreshToken });
  }

  return {
    accessToken,
    refreshToken: client.refreshToken,
  };
}

module.exports = {
  generateAuthTokens,
  generateAccessTokenData,
};
