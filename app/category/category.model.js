"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Category extends Model { }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
        { sequelize, modelName: "category" }
    );
    return Category;
};
