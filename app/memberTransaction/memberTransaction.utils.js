"use strict";

const db = require("../../config/db");

exports.createMemberTransactionTracks = async (memberTrack, memberTransactionId) => {
    try {
        await db.member_transaction_tracks.create({ ...memberTrack, amount: memberTrack.paidAmount, memberTransactionId });
    } catch (err) {
        throw err;
    }
};

exports.updateMemberFeeStatus = async memberId => {
    try {
        const memberTransactions = await db.member_transactions.findAll({ where: { memberId } });
        let feeStatus = false;
        memberTransactions.forEach(txn => {
            if (txn.status === "PAID") {
                if (new Date().toLocaleString() <= new Date(txn.to).toLocaleString()) {
                    feeStatus = true;
                } else {
                    feeStatus = false;
                }
            } else {
                return
            }
        });
        await db.members.update({ feeStatus }, { where: { id: memberId } });
    } catch (err) {
        throw err;
    }
};
