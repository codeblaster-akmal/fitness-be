"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class MemberTransaction extends Model { }
    MemberTransaction.init({
        amount: {
            type: DataTypes.FLOAT,
        },
        paidAmount: {
            type: DataTypes.FLOAT,
        },
        from: {
            type: DataTypes.DATE,
        },
        to: {
            type: DataTypes.DATE,
        },
        setCurrentDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.ENUM,
            values: ["PAID", "UNPAID", "PARTIALLY"],
            defaultValue: "PAID",
        },
    },
        { sequelize, modelName: "member_transaction" }
    );
    return MemberTransaction;
};
