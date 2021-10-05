"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr } = req.query;
        let response = {}, args = {};

        if (attr) args.attr = attr;

        const data = await db.sequences.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        let response = {};
        const sequence = req.body;
        const data = await db.sequences.create(sequence);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.POST).json(newSequence);
    } catch (err) {
        next(err);
    }
};

exports.fetchOne = async (req, res, next) => {
    try {
        let response = {};
        const data = await db.sequences.findByPk(req.params.id);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        let response = {};
        const sequence = req.body;
        await db.sequences.update(sequence, { where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let response = {};
        await db.sequences.destroy({ where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.DELETE).send(response);
    } catch (err) {
        next(err);
    }
};
