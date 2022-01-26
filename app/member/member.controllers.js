"use strict";

const db = require("../../config/db");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { MULTER_ERR_MSGS } = require("../../utils/constants/multerErrorMsgs");
const { MULTER_FIELD_NAME } = require("../../utils/constants/multerFieldName");
const { SEQ_NAME } = require("../../utils/constants/sequenceDBTRName");
const { SCHEMA } = require("../../utils/db/schema");
const {
    sequenceGenerator,
    updateSequence,
} = require("../../utils/functions/sequenceGenerator");
const { encrypt } = require("../../utils/middlewares/bcrypt-encrypt");
const { upload } = require("../../utils/middlewares/multer-fileUpload");
const { delFile } = require("../../utils/utils");
const { createMemberTrack, validateMember } = require("./member.utils");
const imageUpload = upload.single(MULTER_FIELD_NAME.MEMBER_PIC);

exports.fetchAll = async (req, res, next) => {
    try {
        const { attr, sort = "id", order = "asc" } = req.query;
        let response = {},
            args = { order: [[sort, order]] };

        if (attr) args.attributes = attr;

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
                error: MULTER_ERR_MSGS.MEMBER_PIC,
            });
        } else {
            try {
                let response = {};

                const member = req.body;

                const {
                    uniqueId: memberId,
                    startValue,
                    seqId,
                } = await sequenceGenerator(SEQ_NAME.MEMBER_ID);
                const data = await db.members.create({
                    ...member,
                    image: !req.file ? null : req.file.path,
                    memberId,
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
        const { id } = req.params;
        const {
            attr,
            signin,
            member_transactions,
            member_transactions_attr,
            member_transaction_tracks,
            member_transaction_tracks_attr,
            category_period_amounts,
            category_period_amounts_attr,
            categories,
            categories_attr,
            periods,
            periods_attr,
            member_tracks,
            member_tracks_attr,
        } = req.query;

        let response = {},
            args = { where: {} },
            includes = [],
            memberTransactionIncludes = [],
            categoryPeriodAmountIncludes = [];

        const memberTransactionSchema = {
            ...SCHEMA.MEMBER_TRANSACTION,
            attributes: member_transactions_attr,
        };

        const memberTrackSchema = {
            ...SCHEMA.MEMBER_TRACK,
            attributes: member_tracks_attr,
        };

        const categoryPeriodAmountSchema = {
            ...SCHEMA.CATEGORY_PERIOD_AMOUNT,
            attributes: category_period_amounts_attr,
        };

        if (attr) args.attributes = attr;

        if (id !== "null") args.where.id = id;

        if (signin) {
            args.where = {
                [db.Sequelize.Op.or]: [{ memberId: signin }, { username: signin }],
            };
        }

        if (member_transaction_tracks) {
            memberTransactionIncludes.push({
                ...SCHEMA.MEMBER_TRANSACTION_TRACK,
                attributes: member_transaction_tracks_attr,
            });
        }

        if (categories) {
            categoryPeriodAmountIncludes.push({
                ...SCHEMA.CATEGORY,
                attributes: categories_attr,
            });
        }

        if (periods) {
            categoryPeriodAmountIncludes.push({
                ...SCHEMA.PERIOD,
                attributes: periods_attr,
            });
        }

        if (categoryPeriodAmountIncludes.length) {
            categoryPeriodAmountSchema.include = categoryPeriodAmountIncludes;
        }

        if (category_period_amounts) {
            memberTransactionIncludes.push(categoryPeriodAmountSchema);
        }

        if (memberTransactionIncludes.length) {
            memberTransactionSchema.include = memberTransactionIncludes;
        }

        if (member_transactions) {
            includes.push(memberTransactionSchema);
        }

        if (member_tracks) {
            includes.push(memberTrackSchema);
        }

        if (includes.length) {
            args.include = includes;
        }

        const data = await db.members.findOne(args);
        response.data = data;

        res.status(HTTP_STATUS_CODES.SUCCESS.GET_PARAMS).json(response);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    imageUpload(req, res, async (err) => {
        if (err) {
            res.status(HTTP_STATUS_CODES.FAILURE.MULTER).json({
                error: MULTER_ERR_MSGS.MEMBER_PIC,
            });
        } else {
            try {
                const { id } = req.params;
                const { passcode, member_track } = req.query;
                const member = req.body;
                let response = {};

                if (passcode) {
                    member.passcode = await encrypt(member.passcode);
                    member.isSignup = true;
                }

                if (member_track) {
                    const check = await validateMember(id, member, res);
                    if (!check) return
                    if (check) await createMemberTrack(id, member);
                    if (!check) delete member.isAvailable;
                    delete member.passcode;
                    delete member.memberId;
                }

                if (member.existProfilePic && req.file) {
                    delFile(member.existProfilePic);
                    member.image = req.file.path;
                }

                await db.members.update(member, { where: { id } });

                res.status(HTTP_STATUS_CODES.SUCCESS.PUT).json(response);
            } catch (error) {
                next(error);
            }
        }
    });
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
