"use strict";

const { HTTP_STATUS_CODES } = require("../utils/constants/httpStatusCodes");

module.exports = app => {

    app.get("/", (req, res, next) => {
        try {
            res.status(HTTP_STATUS_CODES.SUCCESS.GET).json({
                applicationName: "FITNESS_BACKEND",
                status: "Up",
                date: new Date(),
            });
        } catch (err) {
            next(err);
        }
    });

    app.get("/ping", (req, res, next) => {
        try {
            res.status(HTTP_STATUS_CODES.SUCCESS.GET).send("<h2>Pong</h2>");
        } catch (err) {
            next(err);
        }
    });
};
