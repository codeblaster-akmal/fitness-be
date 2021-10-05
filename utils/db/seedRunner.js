'use strict';

const seed = require("./seed");

module.exports = async db => {
    await db.sequences.bulkCreate(seed.sequences);
}