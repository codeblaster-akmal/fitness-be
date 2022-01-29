"use strict";

const db = require("../../config/db");

exports.createMemberTransactionTracks = async (memberTrack, memberTransactionId) => {
    try {
        await db.member_transaction_tracks.create({ ...memberTrack, amount: memberTrack.paidAmount, memberTransactionId });
    } catch (err) {
        throw err;
    }
};

const compareDateFunc = (value) => {
    var date = value;
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    
    return date = `${yyyy}-${mm}-${dd}`;
};

exports.updateMemberFeeStatus = async memberId => {
    try {
        const memberTransactions = await db.member_transactions.findAll({ where: { memberId } });
        let feeStatus = false;
        try {
            memberTransactions.forEach(txn => {
                if (txn.status === "PAID") {
                    if (compareDateFunc(new Date()) <= compareDateFunc(new Date(txn.to))) {
                        feeStatus = true;
                        throw 'Break';
                    } else {
                        feeStatus = false;
                    }
                } else {
                    return
                }
            });
          } catch (e) {
            if (e !== 'Break') throw e
          }
        await db.members.update({ feeStatus }, { where: { id: memberId } });
    } catch (err) {
        throw err;
    }
};
