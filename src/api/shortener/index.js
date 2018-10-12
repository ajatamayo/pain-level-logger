const express = require('express');
const { authorizationMiddleware } = require('../auth/middlewares');

const controller = require('./controller');

const router = express.Router();

router.get('/decode/:encodedPk', controller.decoder);

router.use(authorizationMiddleware);
router.post('/', controller.shortener);

module.exports = router;
