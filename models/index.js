const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: dbConfig.dialectOptions,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User')(sequelize, Sequelize);
db.Invoice = require('../models/Invoice')(sequelize, Sequelize);
db.Payment = require('../models/Payment')(sequelize, Sequelize);
db.Subscription = require('../models/Subscription')(sequelize, Sequelize);
db.Invite = require('../models/Invite')(sequelize, Sequelize);
db.Photo = require('../models/Photo')(sequelize, Sequelize);
db.XrefPhotoAlbum = require('../models/XrefPhotoAlbum')(sequelize, Sequelize);
db.SMS = require('../models/SMS')(sequelize, Sequelize);
db.File = require('../models/File')(sequelize, Sequelize);
db.ImageMeta = require('../models/ImageMeta')(sequelize, Sequelize);
db.Share = require('../models/Share')(sequelize, Sequelize);
db.UserSession = require('../models/UserSession')(sequelize, Sequelize);


module.exports = db;