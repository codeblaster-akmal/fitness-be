"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc" } = req.query;
        let response = {}, args = { order: [[sort, order]] };

        if (attr) args.attr = attr;

        const data = await db.configurations.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        let response = {};
        const configuration = req.body;
        const data = await db.configurations.create(configuration);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.POST).json(response);
    } catch (err) {
        next(err);
    }
};

exports.fetchOne = async (req, res, next) => {
    try {
        let response = {};
        const data = await db.configurations.findByPk(req.params.id);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        let response = {};
        const configuration = req.body;
        if (configuration && configuration.length) {
            configuration.forEach(async (config) => {
                await db.configurations.update(
                    { value: config[Object.keys(config)[0]] },
                    { where: { key: Object.keys(config)[0] } }
                );
            });
        }
        res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let response = {};
        await db.configurations.destroy({ where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.DELETE).send(response);
    } catch (err) {
        next(err);
    }
};
