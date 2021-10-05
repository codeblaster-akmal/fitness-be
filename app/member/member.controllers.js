"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { MULTER_ERR_MSGS } = require("../../utils/constants/multerErrorMsgs");
const { MULTER_FIELD_NAME } = require("../../utils/constants/multerFieldName");
const { SEQ_NAME } = require("../../utils/constants/sequenceDBTRName");
const { sequenceGenerator, updateSequence } = require("../../utils/functions/sequenceGenerator");
const { upload } = require("../../utils/middlewares/multer-fileUpload");
const { delFile } = require("../../utils/utils");
const imageUpload = upload.single(MULTER_FIELD_NAME.MEMBER_PIC);

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc" } = req.query;
        let response = {}, args = { order: [[sort, order]] };

        if (attr) args.attr = attr;

        const data = await db.members.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    imageUpload(req, res, async (err) => {
        if (err) {
            res.status(HTTP_STATUS_CODES.FAILURE.MULTER).json({
                error: MULTER_ERR_MSGS.MEMBER_PIC
            });
        } else {
            try {
                console.log(7657578587)
                let response = {};

                const member = req.body;

                const { uniqueId: memberId, startValue, seqId } = await sequenceGenerator(SEQ_NAME.MEMBER_ID);

                const data = await db.members.create({
                    ...member,
                    image: !req.file ? null : req.file.path,
                    memberId
                });
                response.data = data;

                await updateSequence(seqId, { startValue: startValue + 1 });

                res.status(HTTP_STATUS_CODES.SUCCESS.POST).json(response);

            } catch (error) {
                if (req && req.file && req.file.path) delFile(req.file.path);
                next(error);
            }
        }
    });
};

exports.fetchOne = async (req, res, next) => {
    try {
        let response = {};
        const data = await db.members.findByPk(req.params.id);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        let response = {};
        const member = req.body;
        await db.members.update(member, { where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let response = {};
        await db.members.destroy({ where: { id: req.params.id } });
        res.status(HTTP_STATUS_CODES.SUCCESS.DELETE).send(response);
    } catch (error) {
        next(error);
    }
};
