module.exports = {
    HOST: "aws.connect.psdb.cloud",
    USER: "9dnzltjc226auy37kam8",
    PASSWORD: "pscale_pw_1VRdvFsvI3eYPkoYDPkL5sRV7J6myoL7WHXBrAMtTd7",
    DB: "kurunagaidb",
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