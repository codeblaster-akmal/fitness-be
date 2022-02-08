"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class User extends Model { }
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Respective username already exists!",
            },
            validate: {
                len: {
                    args: [2, 30],
                    msg: 'Username length upto 30'
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { sequelize, modelName: 'user' });
    return User;
}