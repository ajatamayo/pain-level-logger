const JWT = require('jsonwebtoken');
const config = require('../../config');
const { InternalServerError, BaseError } = require('../../errors/systemErrors');
const Client = require('./clientModel');
const { generateAccessTokenData } = require('./jwt');

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

const authorizationMiddleware = async (req, res, next) => {
  const refreshToken = req.headers['x-refresh-token'];
  const clientId = req.headers['x-client-id'];

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const validation = await verify(token);
      req.user = validation.user;
      return next();
    } catch (error) {
      if (refreshToken && clientId) {
        const client = await Client.findOne({ clientId, refreshToken })
          .populate('user')
          .populate({ path: 'user', select: '+scopes' })
          .exec();

        if (!client) {
          return next(new BaseError(400, 'Authentication error.'));
        }

        const data = await generateAccessTokenData(client.user);
        const accessToken = await signToken(data);

        res.set('x-access-token', accessToken);
        req.user = data.user;
        return next();
      }

      return next(new InternalServerError(error));
    }
  }

  return next(new BaseError(401, 'Not authenticated'));
};

function verify(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, config.jwt.secret, { maxAge: config.jwt.tokenLife }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  authorizationMiddleware,
};
