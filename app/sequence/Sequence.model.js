"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Sequence extends Model { }
    Sequence.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        startValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sufix: {
            type: DataTypes.STRING,
        },
        numberofDigit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startFrom: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        separator: {
            type: DataTypes.STRING,
        },
    },
        { sequelize, modelName: "sequence" }
    );
    return Sequence;
};
