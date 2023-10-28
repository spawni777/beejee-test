const express = require('express');
const actions = require('./user.actions');

const router = express.Router();

router.post('/api/users/login', actions.login);

module.exports = router;
