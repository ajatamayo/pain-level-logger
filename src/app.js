require('dotenv').load();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
// const forceSSL = require('express-force-ssl');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');

const apiRoot = require('./api');

const app = express();

// express-rate-limit setup
app.enable('trust proxy');
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  delayMs: 0,
});
//  apply to all requests
app.use(limiter);

// // Enforce SSL in production
// if (process.env.NODE_ENV === 'production') {
//   app.set('forceSSLOptions', {
//     enable301Redirects: true,
//     trustXFPHeader: false,
//     httpsPort: 443,
//     sslRequiredMessage: 'SSL Required.',
//   });
//   app.use(forceSSL);
// }

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: ['json', 'application/csp-report'] }));
app.use(passport.initialize());

app.use('/api', apiRoot);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../webclient/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../webclient/build/index.html'));
  });
}

// global catch-all for errors
/* eslint-disable no-console */
process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
  // TODO: send the information to sentry.io
});

process.on('uncaughtException', (err) => {
  console.log('========== there was an uncaughtException ==========');
  // TODO: send the information to sentry.io
  console.log('Server Error:', err);
  process.exit(1);
});
/* eslint-enable no-console */

module.exports = app;
