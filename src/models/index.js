'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database');
const db = {};

let Sequelize;
let sequelize;

try {
  Sequelize = require('sequelize');
  sequelize = new Sequelize(config.database, config.username, config.password, config);

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
} catch (err) {
  console.warn('Database initialization failed, using in-memory fallback. Error:', err && err.message);

  class ProdutoFallback {
    static _data = [];
    static async findAll() {
      return ProdutoFallback._data;
    }
    static async create(obj) {
      ProdutoFallback._data = ProdutoFallback._data || [];
      const id = ProdutoFallback._data.length + 1;
      const item = { id, ...obj };
      ProdutoFallback._data.push(item);
      return item;
    }
  }

  db.Produto = ProdutoFallback;
  db.sequelize = null;
  db.Sequelize = Sequelize || null;
}

module.exports = db;
