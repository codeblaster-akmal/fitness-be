"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./memberInOutTxn.controllers");

module.exports = app => {

    app.get("/member-in-out-txns", fetchAll);

    app.post("/member-in-out-txns", create);

    app.get("/member-in-out-txns/:id", fetchOne);

    app.put("/member-in-out-txns/:id", update);

    app.delete("/member-in-out-txns/:id", remove);

};
