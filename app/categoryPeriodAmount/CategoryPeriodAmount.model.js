"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class CategoryPeriodAmount extends Model { }
    CategoryPeriodAmount.init({
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
        { sequelize, modelName: "category_period_amount" }
    );
    return CategoryPeriodAmount;
};
