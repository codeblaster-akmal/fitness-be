'use strict';

const fs = require('fs');

/* convert JSON stringify into parse */
exports.parseJson = data => JSON.parse(data);

/* delete keys in objects */
exports.deleteKeysInObj = (obj, keys) => {
    keys.forEach(key => delete obj[key]);
    return obj;
}

/* delete file */
exports.delFile = filePath => {
    fs.access(filePath, err => {
        if (!err) {
            fs.unlink(filePath, errOnUnlink => {
                if (errOnUnlink) console.error(errOnUnlink);
            });
        }
    });
}