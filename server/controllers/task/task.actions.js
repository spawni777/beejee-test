const db = require('../../db');

const SORT_DIRECTIONS = {
  'ASC': true,
  'DESC': true,
};
const SORT_BY_COLUMNS = {
  username: true,
  email: true,
  completed: true,
};

const getTasks = async (req, res, next) => {
  try {
    const {
      pageSize = 3,
      page = 0,
      sortBy = 'username',
      sortDirection = 'ASC',
    } = req.query;

    if (!['DESC', 'ASC'].includes(sortDirection)) {
      res.status(422);
      return res.end('Unprocessable Entity');
    }

    if (
      !SORT_DIRECTIONS[sortDirection] ||
      !SORT_BY_COLUMNS[sortBy] ||
      page < 0 ||
      pageSize <= 0
    ) {
      res.status(422);
      return res.end('Unprocessable Entity');
    }

    const tasks = await db.tasks.findAll({
      order: [[sortBy, sortDirection]],
      offset: parseInt(pageSize) * parseInt(page),
      limit: parseInt(pageSize) + 1,
    });

    const isLastPage = tasks.length < parseInt(pageSize) + 1;

    if (tasks.length > pageSize) {
      tasks.pop();
    }

    res.send({
      isLastPage,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    const {username, email, text} = req.body;

    if (!username || !email || !text) {
      res.status(422);
      return res.end('Unprocessable Entity');
    }

    await db.tasks.create({username, email, text});

    res.status(201);
    res.end('Created');
  } catch (err) {
    next(err);
  }
};

const editTask = async (req, res, next) => {
  try {
    const {taskId} = req.params;
    const {text, completed} = req.body;

    if (!taskId || (!text && completed === undefined)) {
      res.status(422);
      return res.end('Unprocessable Entity');
    }

    const task = await db.tasks.findByPk(taskId);

    if (!task) {
      res.status(404);
      return res.end('Not Found');
    }

    if (!task.edited) {
      task.edited = (text !== undefined) && (text !== task.text);
    }
    task.text = text ?? task.text;
    task.completed = completed ?? task.completed;

    await task.save();

    res.status(201);
    res.end('Created');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  addTask,
  editTask,
}
