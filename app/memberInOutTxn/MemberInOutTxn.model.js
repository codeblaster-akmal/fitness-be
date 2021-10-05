"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class MemberInOutTxn extends Model { }
    MemberInOutTxn.init({
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        setCurrentDateTime: {
            type: DataTypes.DATE,
            // defaultValue: sequelize.NOW,
        },
    },
        { sequelize, modelName: "member_in_out_txn" }
    );
    return MemberInOutTxn;
};
