const create = require('../interfaces/db/command/create');
const query = require('../interfaces/db/query/fetch');
const userModel = require('../models').User;
const bcrypt = require('bcrypt')

const customerSignUp =  (async (req, res) => {
    req.body.role = 'CUSTOMER'
    req.body.status = 'NEW'
    if(req.body.password){
        const hashedPasswd = await bcrypt.hash(req.body.password,5)
        req.body.password = hashedPasswd
    }
    
    const filter = {
        email: req.body.email
    }
    const usrResp = await query.countItemsByFilter(userModel, filter)
    if(usrResp.data.found){
        res.status(409).json({
            statusCode: 409,
            succeded: false,
            message:'Email id already exists. Try direct/social login if previously registered or change the email id.'
        });
    }
    else
    {
        create.createOne(req,userModel)
        .then((result)=>{
            res.status(result.statusCode).json({
                statusCode: result.statusCode,
                succeded: result.succeded,
                data:{
                    message: 'User created sucessfully.',
                    id: result.data.id
                }
            });
        })
    }
    
})

const adminSignUp =  (async (req, res) => {
    req.body.role = 'ADMIN'
    req.body.status = 'ACTIVE'
    const hashedPasswd = await bcrypt.hash(req.body.password,19)
    const filter = {
        email: req.body.email
    }
    const usrResp = await query.countItemsByFilter(req, userModel, filter)
    if(usrResp.data.found){
        res.status(409).json({
            statusCode: 409,
            succeded: false,
            message:'Email id already exists. Try social login if previously registered or change the email id.'
        });
    }
    else
    {
        req.body.password = hashedPasswd
        create.createOne(req,userModel)
        .then((result)=>{
            res.status(result.statusCode).json(result);
        })
    }
})

module.exports = { customerSignUp, adminSignUp }


// "firstname": "string",
// "lastname": "string",
// "email": "user@example.com",
// "password": "string",