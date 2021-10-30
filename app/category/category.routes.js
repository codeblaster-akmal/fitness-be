"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./category.controllers");

module.exports = app => {

    app.get("/categories", fetchAll);

    app.post("/categories", create);

    app.get("/categories/:id", fetchOne);

    app.put("/categories/:id", update);

    app.delete("/categories/:id", remove);

};
