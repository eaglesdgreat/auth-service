const db = require("../../config").$db;
const Sequelize = require("sequelize");

const { dialect, port, host, database, username, password } = db;

const sequelize = new Sequelize(
  database, 
  username,
  password, 
  {
    host,
    dialect,
    operationsAliases: false
	}
);

const models = {
  User: require("./User")(sequelize, Sequelize.DataTypes),
  sequelize,
};

module.exports = models;
