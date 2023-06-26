module.exports = {
    HOST: "aws.connect.psdb.cloud",
    USER: "0md3vmi0ov1er6a2fyf8",
    PASSWORD: "pscale_pw_tKjj1wveGPZ8htn8WIbnPuhfWJ8f2Q5vti0I42qVaCV",
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