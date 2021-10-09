"use strict";

const config = require("../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    underscored: true,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: "+00:00", // for writing to database
  }
);

// Connect all the tables / models to the db object,
// so that, everything is accessible via a single object.

const db = {};

// Sequelize instance
db.Sequelize = Sequelize;

// Sequelize connection instance
db.sequelize = sequelize;

// Models/tables - Initializing

db.configurations = require("../app/configuration/Configuration.model")(sequelize, Sequelize);
db.sequences = require("../app/sequence/Sequence.model")(sequelize, Sequelize);
db.members = require("../app/member/Member.model")(sequelize, Sequelize);
db.member_tracks = require("../app/memberTrack/memberTrack.model")(sequelize, Sequelize);


// All association will go here...

// members-member_in_out_txns
db.members.hasMany(db.member_tracks, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.member_tracks.belongsTo(db.members);

module.exports = db;
