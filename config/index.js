const config = require("./config.json");
const dotenv = require("dotenv");

// Loading .env vars
dotenv.config();

// Extracting data from .env file
const {
  DB_DIALECT = '',
  DB_PORT = '',
  DB_HOST = '',
  DB_DATABASE = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
} = process.env

const db = {
  dialect: DB_DIALECT,
  port: DB_PORT,
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD
}

// Configuration
const { security, server } = config

module.exports = {
  $db: db,
  $security: security,
  $server: server
}
