'use strict';

const bcrypt = require('bcrypt');

exports.encrypt = async password => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => err ? reject(err) : resolve(hash));
        });
    });
}


exports.decrypt = async (password, storedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, storedPassword, (err, result) => err ? reject(err) : resolve(result));
    });
}