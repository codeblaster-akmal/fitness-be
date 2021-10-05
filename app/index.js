"use strict";

const routes = [
    require("./status"),
    require("./configuration/configuration.routes"),
    require("./sequence/sequence.routes"),
    require("./member/member.routes"),
    require("./memberInOutTxn/memberInOutTxn.routes")
];

module.exports = function router(app) {
    routes.forEach((route) => {
        route(app);
    });
};
