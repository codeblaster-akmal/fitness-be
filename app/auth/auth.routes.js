'use strict';

const { adminLogin, adminLogout } = require("./auth.controllers");

module.exports = app => {

    app.post('/admin-login', adminLogin);

    app.post('/admin-logout', adminLogout);

};