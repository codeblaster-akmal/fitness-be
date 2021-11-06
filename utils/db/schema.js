'use strict';

const db = require("../../config/db");

exports.SCHEMA = {
    CATEGORY: {
        model: db.categories,
    },
    PERIOD: {
        model: db.periods,
    },
    MEMBER_TRANSACTION: {
        model: db.member_transactions,
    },
    MEMBER_TRANSACTION_TRACK: {
        model: db.member_transaction_tracks,
    },
    CATEGORY_PERIOD_AMOUNT: {
        model: db.category_period_amounts,
    }
}