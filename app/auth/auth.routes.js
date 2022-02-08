'use strict';

const { adminLogin } = require("./auth.controllers");

module.exports = app => {

    app.post('/admin-login', adminLogin);

};