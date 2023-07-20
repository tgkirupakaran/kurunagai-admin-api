require('dotenv').config()

const redisOptions={ 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    ssl: True
}

module.exports = redisOptions