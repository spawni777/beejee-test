const dbConfig = require('../configs/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
const modelsDir = path.join(__dirname, '..', 'models');

db.users = require(path.join(modelsDir, 'user.model.js'))(sequelize, DataTypes);
db.tasks = require(path.join(modelsDir, 'task.model.js'))(sequelize, DataTypes);

module.exports = db;
