"use strict";

exports.DB_ERR_MSGS = {
    DATA_LENGTH_ERROR_MESSAGE(args, min, max) {
        return `${args} length between ${min} to ${max}`;
    },
    INVALID_ERROR_MESSAGE(args) {
        return `Invalid ${args}`;
    },
};
