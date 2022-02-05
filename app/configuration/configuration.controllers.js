"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { MULTER_ERR_MSGS } = require("../../utils/constants/multerErrorMsgs");
const { MULTER_FIELD_NAME } = require("../../utils/constants/multerFieldName");
const { upload } = require("../../utils/middlewares/multer-fileUpload");
const { delFile } = require("../../utils/utils");
const imageUpload = upload.single(MULTER_FIELD_NAME.QR_CODE);

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc" } = req.query;
        let response = {}, args = { order: [[sort, order]] };

        if (attr) args.attributes = attr;

        const data = await db.configurations.findAll(args);
        response.data = data;
        res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    imageUpload(req, res, async (err) => {
        if (err) {
            res.status(HTTP_STATUS_CODES.FAILURE.MULTER).json({
                error: MULTER_ERR_MSGS.QR_CODE,
            });
        } else {
            try {
                let response = {};
                console.log(8768767868, req.body, req.file)
                // return
                // const configuration = req.body;
                // const { configurations = [] } = configuration;
                // if (configurations.length) {
                //     configurations.forEach(async (config) => {
                //         console.log(876876786800, req.body, req.file)

                //         // await db.configurations.update(
                //         //     { value: config[Object.keys(config)[0]] },
                //         //     { where: { key: Object.keys(config)[0] } }
                //         // );
                //     });
                // }

                // if (configuration.existQrCode && req.file) {
                //     delFile(configuration.existQrCode);
                //     await db.configurations.update(
                //         { value: req.file.path },
                //         { where: { key: "QR_CODE_FILE_PATH" } }
                //     );
                // }

                res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
            } catch (err) {
                next(err);
            }
        }
    });
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
