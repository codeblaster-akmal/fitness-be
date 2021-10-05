'use strict';

const jwt = require('jsonwebtoken');
const { CONSTANTS } = require('../constants/dbErrorMsgs');
const { HTTP_STATUS_CODES } = require('../constants/httpStatusCodes');
require("dotenv").config();

exports.createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

exports.createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.jwtToken = decode;
        next();
    } catch (err) {
        res.status(HTTP_STATUS_CODES.FAILURE.JWT).json({ error: CONSTANTS.JWT_ERROR_MESSAGE });
    }
}

exports.verifyRefreshToken = async (req, res, next) => {
    try {
        const rf_token = req.cookies.refreshToken;
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(HTTP_STATUS_CODES.FAILURE.JWT).json({ error: CONSTANTS.JWT_ERROR_MESSAGE });
    }
}