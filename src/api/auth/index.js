const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.post('/send-code', controller.sendCode);
router.post('/login', controller.login);
router.delete('/token', controller.deleteToken);

module.exports = router;
