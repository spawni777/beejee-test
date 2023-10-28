const express = require('express');
const actions = require('./user.actions');

const router = express.Router();

router.post('/api/users/login', actions.login);
router.get('/api/users/logout', actions.logout);

module.exports = router;
