const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
       return res.status(401).json({
            statusCode: 401,
            succeded: true,
            data: {message: 'Unauthorized access.'} ,
        });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKET_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({
                statusCode: 401,
                succeded: true,
                data: {message: 'Invalid access token'} ,
            });
            req.user = decoded
            next()
        }

    )
}

module.exports =  verifyJWT