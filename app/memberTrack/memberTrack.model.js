"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class MemberTrack extends Model { }
    MemberTrack.init({
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        setCurrentDateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
        { sequelize, modelName: "member_track" }
    );
    return MemberTrack;
};
