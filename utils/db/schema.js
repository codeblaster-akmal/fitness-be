'use strict';

const db = require("../../config/db");

exports.SCHEMA = {
    CATEGORY: {
        model: db.categories,
    },
    PERIOD: {
        model: db.periods,
    }
}