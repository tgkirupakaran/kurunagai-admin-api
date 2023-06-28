require('dotenv').config()

module.exports = {
  HOST: process.env.PLANET_SOURCE_DB_HOST,
  USER: process.env.PLANET_SOURCE_DB_USER,
  PASSWORD: process.env.PLANET_SOURCE_DB_PASSWORD,
  DB: process.env.PLANET_SOURCE_DB_NAME,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
        rejectUnauthorized: true,        
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};