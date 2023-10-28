const readDir = require('fs-readdir-recursive');
const path = require('path');
const db = require('../db');
const middlewaresDir = path.join(__dirname, '..', 'middlewares');
const controllersDir = path.join(__dirname, '..', 'controllers');

const initDB = () => {
  db.sequelize.sync()
    .then(() => {
      console.log('DB was synced!');
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message);
    });
}

const initMiddlewares = (app) => {
  readDir(middlewaresDir)
    .filter(filePath => filePath.endsWith('middleware.js'))
    .map(filePath => require(path.resolve(middlewaresDir, filePath)))
    .sort((a, b) => b.priority - a.priority)
    .forEach(middleware => {
      app.use(middleware.function);
    });
}

const initControllers = (app) => {
  readDir(controllersDir)
    .filter(filePath => filePath.endsWith('routes.js'))
    .forEach(filePath => {
      const routesPath = path.resolve(controllersDir, filePath)
      const router = require(routesPath);

      app.use(router);
    })
}

module.exports = {
  initDB,
  initMiddlewares,
  initControllers,
}
