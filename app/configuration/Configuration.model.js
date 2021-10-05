"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Configuration extends Model { }
    Configuration.init({
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
        { sequelize, modelName: "configuration" }
    );
    return Configuration;
};
