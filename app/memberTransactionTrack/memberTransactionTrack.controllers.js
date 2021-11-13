"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { updateMemberTrack } = require("./memberTransactionTrack.utils");

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc" } = req.query;
        let response = {}, args = { order: [[sort, order]] };

        if (attr) args.attributes = attr;

        const data = await db.member_transaction_tracks.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        let response = {};
        const memberTransactionTrack = req.body;
        const data = await db.member_transaction_tracks.create(memberTransactionTrack);
        if (memberTransactionTrack.memberTrack) {
            await updateMemberTrack(memberTransactionTrack.memberTrack);
        }
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.POST).json(response);
    } catch (error) {
        next(error);
    }
};

exports.fetchOne = async (req, res, next) => {
    try {
        let response = {};
        const data = await db.member_transaction_tracks.findByPk(req.params.id);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        let response = {};
        const memberTransactionTrack = req.body;
        await db.member_transaction_tracks.update(memberTransactionTrack, { where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let response = {};
        await db.member_transaction_tracks.destroy({ where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.DELETE).send(response);
    } catch (error) {
        next(error);
    }
};
