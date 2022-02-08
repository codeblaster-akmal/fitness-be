"use strict";

exports.HTTP_STATUS_CODES = {
    SUCCESS: {
        GET: 200,
        GET_PARAMS: 201,
        POST: 202,
        PUT: 203,
        DELETE: 204,
    },
    FAILURE: {
        JWT: 400,
        MULTER: 401,
        BCRYPT: 402,
        VALIDATION: 403,
        DB: 404,
        UN_AUTHORIZED: 405,
    },
};
