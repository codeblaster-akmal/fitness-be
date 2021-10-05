"use strict";

require("dotenv").config();

// Application level configurations will go here..

const {
  PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_REFRESH,
  DATABASE_RUN_SEED,
} = process.env;

const configuration = {
  port: PORT || 8080, // PORT Number
  logger: {
    file: {
      level: "info",
      filename: `logs/app.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  },
  db: {
    host: DATABASE_HOST || "localhost",
    port: DATABASE_PORT || 3306,
    database: DATABASE_NAME,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    dialect: "mysql",
    force: +DATABASE_REFRESH,
  },
  runSeed: +DATABASE_RUN_SEED,
};

module.exports = configuration;
