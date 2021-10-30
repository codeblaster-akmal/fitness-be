"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./memberTransaction.controllers");

module.exports = app => {

    app.get("/member-transactions", fetchAll);

    app.post("/member-transactions", create);

    app.get("/member-transactions/:id", fetchOne);

    app.put("/member-transactions/:id", update);

    app.delete("/member-transactions/:id", remove);

};
