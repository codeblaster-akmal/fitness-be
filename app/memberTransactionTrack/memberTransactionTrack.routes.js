"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./memberTransactionTrack.controllers");

module.exports = app => {

    app.get("/member-transaction-tracks", fetchAll);

    app.post("/member-transaction-tracks", create);

    app.get("/member-transaction-tracks/:id", fetchOne);

    app.put("/member-transaction-tracks/:id", update);

    app.delete("/member-transaction-tracks/:id", remove);

};
