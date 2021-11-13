"use strict";

const db = require("../../config/db");

exports.updateMemberTrack = async memberTrack => {
    try {
        await db.member_transactions.update(memberTrack, { where: { id: memberTrack.id } });
    } catch (err) {
    }
};