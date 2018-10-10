const { sendLoginCode } = require('../../emails');
const { BaseError, InternalServerError } = require('../../errors/systemErrors');
const config = require('../../config');
const {
  generateHash,
  compareCodes,
  generateCode,
} = require('./utils');
const { generateAuthTokens } = require('./jwt');
const { createSession } = require('./sessions');
const Client = require('./clientModel');
const LoginCode = require('./loginCodeModel');
const Session = require('./sessionModel');
const User = require('./userModel');

const sendCode = async (req, res, next) => {
  try {
    const randomCode = await generateCode();
    const { email } = req.body;
    const encryptedCode = await generateHash(randomCode);
    const loginCode = await LoginCode.create({ email, encryptedCode });
    const displayName = email.split('@')[0];
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, displayName });
    }
    sendLoginCode(email, randomCode, loginCode._id);
    return res.status(200).json({ success: true, message: 'Success!', uid: loginCode._id });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

const login = async (req, res, next) => {
  try {
    const { uid, code, clientId } = req.body;

    const loginCode = await LoginCode.findOne({ _id: uid });

    if (!loginCode) {
      return next(new BaseError(400, 'Wrong login code'));
    }
    const timeElapsed = (new Date() - loginCode.createdAt) / 1000;
    const loginCodeExpiry = parseInt(config.loginCodeExpiry, 10);
    if (timeElapsed > loginCodeExpiry) {
      return next(new BaseError(400, 'Login code expired.'));
    }

    const authResult = await compareCodes(code, loginCode.encryptedCode);

    if (authResult) {
      const user = await User.findOne({ email: loginCode.email });
      const tokens = await generateAuthTokens(user, clientId);
      await createSession({
        clientId,
        userId: user._id,
        refreshToken: tokens.refreshToken,
        userAgent: req.headers['user-agent'],
      });

      return res.status(200).json({
        success: true,
        tokenType: 'Bearer',
        clientId,
        ...tokens,
      });
    }

    return next(new BaseError(400, 'Wrong login code.'));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

const deleteToken = async (req, res, next) => {
  try {
    const { clientId, refreshToken } = req.body;
    if (!clientId || !refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Client ID and refresh tokens are required.',
      });
    }
    await Client.deleteOne({ clientId, refreshToken });
    await Session.deleteOne({ clientId, refreshToken });
    return res.status(200).json({
      success: true,
      message: 'Successfully logged out.',
    });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

module.exports = {
  sendCode,
  login,
  deleteToken,
};
