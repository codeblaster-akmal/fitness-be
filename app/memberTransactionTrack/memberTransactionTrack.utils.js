"use strict";

const db = require("../../config/db");

exports.updateMemberTransactions = async memberTransaction => {
    try {
        await db.member_transactions.update(memberTransaction, { where: { id: memberTransaction.id } });
    } catch (err) {
    }
};