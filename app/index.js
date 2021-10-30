"use strict";

const routes = [
    require("./status"),
    require("./configuration/configuration.routes"),
    require("./sequence/sequence.routes"),
    require("./member/member.routes"),
    require("./memberTrack/memberTrack.routes"),
    require("./category/category.routes"),
    require("./period/period.routes"),
    require("./categoryPeriodAmount/categoryPeriodAmount.routes"),
    require("./memberTransaction/memberTransaction.routes"),
    require("./memberTransactionTrack/memberTransactionTrack.routes")
];

module.exports = function router(app) {
    routes.forEach((route) => {
        route(app);
    });
};
