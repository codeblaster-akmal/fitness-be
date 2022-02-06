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
db.categories = require("../app/category/category.model")(sequelize, Sequelize);
db.periods = require("../app/period/period.model")(sequelize, Sequelize);
db.category_period_amounts = require("../app/categoryPeriodAmount/categoryPeriodAmount.model")(sequelize, Sequelize);
db.member_transactions = require("../app/memberTransaction/memberTransaction.model")(sequelize, Sequelize);
db.member_transaction_tracks = require("../app/memberTransactionTrack/memberTransactionTrack.model")(sequelize, Sequelize);


// All association will go here...

// members-member_tracks
db.members.hasMany(db.member_tracks, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.member_tracks.belongsTo(db.members);

// categories-category_period_amounts
db.categories.hasMany(db.category_period_amounts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.category_period_amounts.belongsTo(db.categories);

// periods-category_period_amounts
db.periods.hasMany(db.category_period_amounts, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.category_period_amounts.belongsTo(db.periods);

// members-member_transactions
db.members.hasMany(db.member_transactions, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.member_transactions.belongsTo(db.members);

// category_period_amounts-member_transactions
db.category_period_amounts.hasMany(db.member_transactions, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
db.member_transactions.belongsTo(db.category_period_amounts);

// member_transactions-member_transaction_tracks
db.member_transactions.hasMany(db.member_transaction_tracks, { onDelete: 'cascade', hooks: true });
db.member_transaction_tracks.belongsTo(db.member_transactions);

module.exports = db;
