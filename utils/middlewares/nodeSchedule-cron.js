'use strict';

const schedule = require('node-schedule');

exports.createCronJob = (name, date, cb) => {
    schedule.scheduleJob(name, date, cb);
};

exports.cancelCronJob = name => schedule.cancelJob(name);