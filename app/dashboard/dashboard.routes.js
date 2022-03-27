"use strict";

const { fetchAll } = require("./dashboard.controllers");

module.exports = app => {

    app.get("/dashboards", fetchAll);

};
