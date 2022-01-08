"use strict";

module.exports = (sequelize, { DataTypes, Model }) => {
    class Member extends Model { }
    Member.init({
        memberId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Respective member id already exists!",
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Character length of 'firstname' should be at most 30",
                },
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Character length of 'lastname' should be at most 30",
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Respective username already exists!",
            },
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Character length of 'username' should be at most 30",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Respective phone number already exists!",
            },
            validate: {
                len: {
                    args: [1, 30],
                    msg: "Character length of 'phone' should be at most 30",
                },
            },
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 10],
                    msg: "Character length of 'weight' should be at most 10",
                },
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 9],
                    msg: "Character length of 'age' should be at most 9",
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
        address: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 40],
                    msg: "Character length of 'address' should be at most 40",
                },
            },
        },
        landmark: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30],
                    msg: "Character length of 'landmark' should be at most 30",
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
                    msg: "Character length of 'referral' should be at most 30",
                },
            },
        },
        aadhaarNo: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30],
                    msg: "Character length of 'aadhaarNo' should be at most 30"
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
            defaultValue: DataTypes.NOW
        },
        feeStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    },
        { sequelize, modelName: "member" }
    );
    return Member;
};
