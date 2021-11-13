"use strict";

const db = require("../../config/db");

exports.createMemberTransactionTracks = async (memberTrack, memberTransactionId) => {
    try {
        await db.member_transaction_tracks.create({ ...memberTrack, amount: memberTrack.paidAmount, memberTransactionId });
    } catch (err) {
        throw err;
    }
};
