"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./member.controllers");

module.exports = app => {

    app.get("/members", fetchAll);

    app.post("/members", create);

    app.get("/members/:id", fetchOne);

    app.put("/members/:id", update);

    app.delete("/members/:id", remove);

};
