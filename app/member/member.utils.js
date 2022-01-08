"use strict";

const db = require("../../config/db");
const { BCRYPT_ERR_MSGS } = require("../../utils/constants/bcryptErrorMsgs");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { decrypt } = require("../../utils/middlewares/bcrypt-encrypt");
const { createCronJob, cancelCronJob } = require("../../utils/middlewares/nodeSchedule-cron");

const memberTrackCronJob = async (data) => {
    try {
        await db.member_tracks.create({ memberId: data.id, isAvailable: 0, setCurrentDateTime: new Date() });
        await db.members.update({ isAvailable: 0 }, { where: { id: data.id } });
    } catch (err) {
        throw err;
    }
}

exports.createMemberTrack = async (id, memberData) => {
    try {
        await db.member_tracks.create(memberData);
        if (memberData.isAvailable) {
            const addHours = (date, h) => {
                date.setTime(date.getTime() + (h * 60 * 60 * 1000));
                return date;
            }
            createCronJob(`member${id}`, addHours(new Date(), 5), (args) => {
                memberTrackCronJob({ id, memberData, ...args })
            })
        } else {
            cancelCronJob(`member${id}`)
        }
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
