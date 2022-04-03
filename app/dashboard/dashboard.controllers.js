"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { SCHEMA } = require("../../utils/db/schema");

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc", member_transactions,
            member_transactions_attr, } = req.query;
        let response = {}, args = { order: [[sort, order]] }, includes = [];

        const memberTransactionSchema = {
            ...SCHEMA.MEMBER_TRANSACTION,
            attributes: member_transactions_attr,
        };

        if (member_transactions) {
            includes.push(memberTransactionSchema);
        }

        if (attr) args.attributes = attr;

        if (includes.length) {
            args.include = includes;
        }

        const data = await db.members.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (error) {
        next(error);
    }
};
