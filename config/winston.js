"use strict";

const winston = require("winston");
const config = require("../config");

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(config.logger.file),
        new winston.transports.Console(config.logger.console),
    ],
});

logger.stream = {
    write: (info) => {
        logger.info(info);
    },
};

module.exports = logger;
