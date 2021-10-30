"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class MemberTransactionTrack extends Model { }
    MemberTransactionTrack.init({
        amount: {
            type: DataTypes.FLOAT,
        },
        setCurrentDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
        { sequelize, modelName: "member_transaction_track" }
    );
    return MemberTransactionTrack;
};
