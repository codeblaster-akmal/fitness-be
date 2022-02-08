"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./user.controllers");

module.exports = app => {

    app.get('/users', fetchAll);

    app.post('/users', create);

    app.get('/users/:id', fetchOne);

    app.put('/users/:id', update);

    app.delete('/users/:id', remove);

};