require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const query = require('../interfaces/db/query/fetch');
const userModel = require('../models').User;
const sessionModel = require('../models/UserSessions').UserSession

const googleAuthSuccess = (async (req, res) => {
    if (req.user) {
        const filter = {
            email: req.user._json.email,
            google_id: req.user._json.sub
        }
        const usrResp = await query.countItemsByFilter(userModel, filter)
        if(usrResp.data.found){
            const userObj={
                id: usrResp.data.items.rows[0].id,
                firstname: req.user._json.firstname,
                lastname: req.user._json.lastname,
                role: usrResp.data.items.rows[0].role,
                picture: req.user._json.picture
            }
            const accessToken = jwt.sign(userObj,process.env.ACCESS_TOKET_SECRET,{expiresIn: '15m'})
            const refreshToken = jwt.sign(userObj,process.env.REFRESH_TOKET_SECRET,{expiresIn: '1d'})

            res.cookie('jwt',refreshToken,{httpOnly: true,maxAge: 24*60*60*1000})
            res.status(200).json({
                statusCode: 200,
                succeded: true,
                data: { accessToken, userObj } ,
            });
        }
        else
        {
            res.status(200).json({
                statusCode: 404,
                succeded: true,
                message: 'Unable to find the google user in our system. Please try Signing up first.' ,
            });
        }
		
	} else {
		res.status(403).json({
             statusCode: 403,
             succeded: false,
		    message: "Not Authorized",
        });
	}
})

const googleAuthFailed = ((req, res) => {
	res.status(401).json({
        succeded: false,
		message: "Authentication failed",
	});
})

const googleLogout = ((req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
})

const kurunagaiAuth =(async (req, res) => {
    const filter = {
        email: req.body.email,
    }
    const usrResp = await query.countItemsByFilter(userModel, filter)
    if(usrResp.data.found){
        const pwdMatch = await bcrypt.compare(req.body.password,usrResp.data.items.rows[0].password)
        if(pwdMatch){
            const userObj={
                id: usrResp.data.items.rows[0].id,
                firstname: usrResp.data.items.rows[0].firstname,
                lastname: usrResp.data.items.rows[0].lastname,
                role: usrResp.data.items.rows[0].role
            }
            const accessToken = jwt.sign(userObj,process.env.ACCESS_TOKET_SECRET,{expiresIn: '15m'})
            const refreshToken = jwt.sign(userObj,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'})

            res.cookie('jwt',refreshToken,{httpOnly: true,maxAge: 24*60*60*1000})
            res.status(200).json({
                statusCode: 200,
                succeded: true,
                data: { accessToken,userObj } ,
            });
        }
        else{
            sendUnauthorized('Email or password incorrect.');
        }
    }
    else
    {
        sendUnauthorized('Unauthorized user.')
    }
})


const kurunagaiLogout = ((req, res) => {
	res.redirect(process.env.CLIENT_URL);
})

function sendUnauthorized(message){
    res.status(401).json({
        statusCode: 401,
        succeded: true,
        message: message ,
    });
}


module.exports = { 
    googleLogout,
    googleAuthFailed,
    googleAuthSuccess,
    kurunagaiAuth,
    kurunagaiLogout
}

// https://www.youtube.com/watch?v=favjC6EKFgw&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=11