"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./sequence.controllers");

module.exports = app => {

    app.get("/sequences", fetchAll);

    app.post("/sequences", create);

    app.get("/sequences/:id", fetchOne);

    app.put("/sequences/:id", update);

    app.delete("/sequences/:id", remove);

};
