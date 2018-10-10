// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  const data = { success: false, message: err.message };
  res.status(err.statusCode).json(Object.assign({}, data, err.extraData));
}

module.exports = { errorHandler };
