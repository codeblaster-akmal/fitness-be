"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { SCHEMA } = require("../../utils/db/schema");

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc", categories, categories_attr, periods, periods_attr } = req.query;
        let response = {}, args = { order: [[sort, order]] }, includes = [];

        if (attr) args.attributes = attr;

        if (+categories) {
            includes.push({
                ...SCHEMA.CATEGORY,
                attributes: categories_attr
            });
        }

        if (+periods) {
            includes.push({
                ...SCHEMA.PERIOD,
                attributes: periods_attr
            });
        }

        if (includes.length) {
            args.include = includes;
        }

        const data = await db.category_period_amounts.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        let response = {};
        const memberTrack = req.body;
        const data = await db.category_period_amounts.create(memberTrack);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.POST).json(response);
    } catch (error) {
        next(error);
    }
};

exports.fetchOne = async (req, res, next) => {
    try {
        let response = {};
        const data = await db.category_period_amounts.findByPk(req.params.id);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        let response = {};
        const memberTrack = req.body;
        await db.category_period_amounts.update(memberTrack, { where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let response = {};
        await db.category_period_amounts.destroy({ where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.DELETE).send(response);
    } catch (error) {
        next(error);
    }
};
