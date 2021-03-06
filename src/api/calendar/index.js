const express = require('express');
const { authorizationMiddleware } = require('../auth/middlewares');

const controller = require('./controller');

const router = express.Router();

router.use(authorizationMiddleware);
router.post('/:yyyy/:mm/:dd', controller.toggleDay);
router.get('/get-dates', controller.getDates);

module.exports = router;
