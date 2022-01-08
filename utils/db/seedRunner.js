'use strict';

const seed = require("./seed");

module.exports = async db => {
    await db.sequences.bulkCreate(seed.sequences);
    await db.categories.bulkCreate(seed.categories);
    await db.periods.bulkCreate(seed.periods);
    await db.category_period_amounts.bulkCreate(seed.categoryPeriodAmounts);
    await db.configurations.bulkCreate(seed.configurations);
    // await db.members.bulkCreate(seed.members);
}