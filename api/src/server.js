const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

// mongoose connection
/* eslint-disable no-console */
mongoose.set('useCreateIndex', true);
mongoose
  .connect(config.db.uri, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to Mongodb: ${config.db.uri}`);
  })
  .catch((err) => {
    console.log(`ERROR connecting to Mongodb: ${config.db.uri}`);
    console.log(`ERROR: ${err}`);
  });

app.listen(config.app.port, config.app.host, () => {
  console.log('Express server listening on port', config.app.port);
});
/* eslint-enable no-console */

module.exports = app;
