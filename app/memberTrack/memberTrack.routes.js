"use strict";

const { fetchAll, create, fetchOne, update, remove } = require("./memberTrack.controllers");

module.exports = app => {

    app.get("/member-tracks", fetchAll);

    app.post("/member-tracks", create);

    app.get("/member-tracks/:id", fetchOne);

    app.put("/member-tracks/:id", update);

    app.delete("/member-tracks/:id", remove);

};
