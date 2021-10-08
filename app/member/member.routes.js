"use strict";

const { fetchAll, create, fetchOne, update, remove, signin } = require("./member.controllers");

module.exports = app => {

    app.get("/members", fetchAll);

    app.post("/members", create);

    app.post("/members-signin", signin);

    app.get("/members/:id", fetchOne);

    app.put("/members/:id", update);

    app.delete("/members/:id", remove);

};
