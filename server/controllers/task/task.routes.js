const express = require('express');
const actions = require('./task.actions');

const router = express.Router();

router.get('/api/tasks', actions.getTasks);
router.post('/api/tasks', actions.addTask);
router.put('/api/admin/tasks/:taskId', actions.editTask);

module.exports = router;
