const express = require('express');
const { authorizationMiddleware } = require('../auth/middlewares');

const controller = require('./controller');

const router = express.Router();

router.use(authorizationMiddleware);
router.post('/:yyyy/:mm/:dd', controller.toggleDay);

module.exports = router;
