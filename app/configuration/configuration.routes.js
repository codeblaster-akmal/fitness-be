"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./configuration.controllers");

module.exports = app => {

    app.get("/configurations", fetchAll);

    app.post("/configurations", create);

    app.get("/configurations/:id", fetchOne);

    app.put("/configurations/:id", update);

    app.delete("/configurations/:id", remove);

};
