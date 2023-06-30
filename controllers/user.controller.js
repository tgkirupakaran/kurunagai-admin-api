const create = require('../interfaces/command/create');
const sha256 = require('sha256');

const postItem = ((req, res) => {
    req.body.id = sha256(req.body.email);
    req.body.password = sha256(req.body.password);

    create.createOne(req,res.model)
    .then((result)=>{
        delete res['model']
        res.status(result.statusCode).json(result);
    })
})

module.exports = { postItem }