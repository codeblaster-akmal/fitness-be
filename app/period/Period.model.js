"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Period extends Model { }
    Period.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
        { sequelize, modelName: "period" }
    );
    return Period;
};
