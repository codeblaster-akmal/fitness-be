'use strict';

const sequences = require("./seedData/sequences");
const categories = require("./seedData/categories");
const periods = require("./seedData/periods");
const categoryPeriodAmounts = require("./seedData/categoryPeriodAmounts.json");
const configurations = require("./seedData/configurations.json");
const users = require("./seedData/users.json");
const members = require("./seedData/members-dummy.json");

module.exports = {
    sequences,
    categories,
    periods,
    categoryPeriodAmounts,
    configurations,
    users,
    members
}