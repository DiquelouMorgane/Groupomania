module.exports = {
    HOST: process.env.SECRET_HOST,
    USER: process.env.SECRET_USER,
    PASSWORD: process.env.SECRET_PASSWORD,
    DB: process.env.SECRET_DB,
    dialect: "mysql",
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }