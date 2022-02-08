"use strict";

const db = require("../../config/db");
// const { createAccessToken, createRefreshToken } = require("../../utils/auth/jwt");
const { HTTP_STATUS_CODES } = require("../../utils/constants/httpStatusCodes");
const { decrypt } = require("../../utils/middlewares/bcrypt-encrypt");

exports.adminLogin = async (req, res, next) => {
    try {
        let response = {}, args = {};
        const { username, password } = req.body;

        args.where = { username };

        const data = await db.users.findOne(args);
        const errorMsg = "Invalid username & password";
        if (!data)
            res.status(HTTP_STATUS_CODES.FAILURE.UN_AUTHORIZED).json({ error: errorMsg });
        else {
            if (data.username !== username) {
                res.status(HTTP_STATUS_CODES.FAILURE.UN_AUTHORIZED).json({ error: errorMsg });
            }

            const match = await decrypt(password, data.password);
            if (!match) {
                res.status(HTTP_STATUS_CODES.FAILURE.UN_AUTHORIZED).json({ error: errorMsg });
            } else {
                // const token = createAccessToken({ data });
                // const refreshToken = createRefreshToken({ data });

                response.data = data;
                // response.token = token;
                // response.refreshToken = refreshToken;
                res.status(HTTP_STATUS_CODES.SUCCESS.GET).json(response);
            }
        }
    } catch (err) {
        next(err);
    }
};