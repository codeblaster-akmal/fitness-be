"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Member extends Model { }
    Member.init({
        memberId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Id already exists",
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Maximum firstname length upto 30",
                },
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Maximum lastname length upto 30",
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Username already exists",
            },
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Maximum username length upto 30",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Phone number already exists",
            },
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Maximum Phone length upto 30",
                },
            },
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 10],
                    msg: "Maximum weight length upto 10",
                },
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 9],
                    msg: "Maximum age length upto 9",
                },
            },
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["MALE", "FEMALE", "OTHER"],
            defaultValue: "MALE",
        },
        vaccinated: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        addressLine1: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 40],
                    msg: "Maximum addressLine1 length upto 40",
                },
            },
        },
        landmark: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30],
                    msg: "Maximum landmark length upto 30",
                },
            },
        },
        image: {
            type: DataTypes.STRING,
        },
        referral: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30],
                    msg: "Maximum referral length upto 30",
                },
            },
        },
        aadhaarNo: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30],
                    msg: 'Maximum aadhaar length upto 30'
                }
            }
        },
        notes: {
            type: DataTypes.TEXT
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        passcode: {
            type: DataTypes.STRING,
        },
        isSignup: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        joinDate: {
            type: DataTypes.DATE,
            // defaultValue: sequelize.NOW,
        },
    },
        { sequelize, modelName: "member" }
    );
    return Member;
};
