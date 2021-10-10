"use strict";

const db = require("../../config/db");
const { BCRYPT_ERR_MSGS } = require("../../utils/constants/bcryptErrorMsgs");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { decrypt } = require("../../utils/middlewares/bcrypt-encrypt");

exports.createMemberTrack = async memberData => {
    try {
        await db.member_tracks.create(memberData);
    } catch (err) {
        throw err;
    }
};

exports.validateMember = async (id, reqBody, res) => {
    try {
        const member = await db.members.findByPk(id);
        const match = await decrypt(reqBody.passcode, member.passcode);
        if (!match) {
            res.status(HTTP_STATUS_CODES.FAILURE.BCRYPT).json({
                error: BCRYPT_ERR_MSGS.NOT_MATCH
            });
        } else {
            return true;
        }
    } catch (err) {
        throw err;
    }
};
