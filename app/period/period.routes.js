"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./period.controllers");

module.exports = app => {

    app.get("/periods", fetchAll);

    app.post("/periods", create);

    app.get("/periods/:id", fetchOne);

    app.put("/periods/:id", update);

    app.delete("/periods/:id", remove);

};
