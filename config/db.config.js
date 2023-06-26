module.exports = {
    HOST: "aws.connect.psdb.cloud",
    USER: "hu175xn1gzcf5ndr5qt9",
    PASSWORD: "pscale_pw_2EOUjYgeJugRec5c1WIzMAzb2A8PdmFX80QjnQ2t0gd",
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