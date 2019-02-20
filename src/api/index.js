const express = require('express');

const { errorHandler } = require('../errors/middlewares');
const auth = require('./auth');
const shortener = require('./shortener');
const calendar = require('./calendar');
const { authorizationMiddleware } = require('./auth/middlewares');

const router = express.Router();

router.use('/auth', auth);
router.use('/shortener', shortener);
router.use('/calendar', calendar);
router.use(authorizationMiddleware);
router.get('/protected', async (req, res) => res.status(200).json({ success: true, message: 'Protected!' }));
router.use(errorHandler);

module.exports = router;
