const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression')
const logger = require("../config/winston");
const config = require("../config");
const db = require("../config/db");
const api = require("../app");
const seedRunner = require("../utils/db/seedRunner");
const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const { HTTP_STATUS_CODES } = require("../utils/constants/httpStatusCodes");
const { verifyToken } = require("../utils/middlewares/jwt-secure-api");

const app = express();

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        httpServer = http.createServer(app);

        app.use(compression({
            threshold: 0
        }))
        app.use(express.json());
        app.use(morgan("combined", { stream: logger.stream }));
        app.use(cors("*"));
        app.use("/public", express.static("public"));
        app.use((req, res, next) => {
            if (req.url === "/admin-login" || req.url === "/" || req.url.includes("public")) return next()
            return verifyToken(req, res, next)
        });

        api(app);
        app.use((err, req, res, next) => {
            console.log(`SERVER ERROR: ${err.stack}`);
            res.status(HTTP_STATUS_CODES.FAILURE.DB).json({
                error: errorHandler(err),
            });
        });

        db.sequelize
            .sync({ force: config.db.force, logging: console.log })
            .then(() => {
                console.log("Connection has been established successfully");

                httpServer
                    .listen(config.port)
                    .on("listening", () => {
                        if (config.db.force && config.runSeed) {
                            seedRunner(db);
                        }
                        resolve();
                        console.log(
                            `Started application on http://localhost:${config.port}`
                        );
                    })
                    .on("error", (err) => {
                        console.error("Error while starting the server.");
                        reject(err);
                    });
                return;
            })
            .catch((err) => {
                console.error("Unable to connect to the database:", err);
            });
    });
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;
