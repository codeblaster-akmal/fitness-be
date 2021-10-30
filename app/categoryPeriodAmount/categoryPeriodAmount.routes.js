"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./categoryPeriodAmount.controllers");

module.exports = app => {

    app.get("/category-period-amount", fetchAll);

    app.post("/category-period-amount", create);

    app.get("/category-period-amount/:id", fetchOne);

    app.put("/category-period-amount/:id", update);

    app.delete("/category-period-amount/:id", remove);

};
