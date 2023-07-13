const create = require('../interfaces/db/command/create');
const query = require('../interfaces/db/query/fetch');
const update = require('../interfaces/db/command/update');
const del = require('../interfaces/db/command/delete');

const postItem = (async (req, res) => {
    create.createOne(req,res.model)
    .then((result)=>{
        sendResponse(res,result);
    })
})

const patchItem = (async (req, res) => {
    update.updateItem(req,res.item)
    .then((result)=>{
        sendResponse(res,result);
    })
})

const deleteItem = (async (req, res) => {
    del.deleteItem(res.item)
    .then((result)=>{
        sendResponse(res,result);
    })
})

const getAll = (async (req, res) => {
    query.getAll(req,res.model)
    .then((result)=>{
        sendResponse(res,result);
    });
})

const getById = (async (req, res) => {
    res.json(res.content);
})

const getByFilter =(async (req, res) => {
    query.getByFilter(req, res.model, res.filter)
    .then((result)=>{
        sendResponse(res,result);
    });
})

// Middleware to get a item by ID
const getItem = async (req, res, next) => {
    const result = await query.getOneById(req,res.model)
    if (result.statusCode ==200){
      res.item = result.data;
      res.content = result;
      next();
    }
    else{
      res.status(result.statusCode).json(result)
    }
  }

function sendResponse(res,result){
    delete res['model'];
    res.status(result.statusCode).json(result);
}

module.exports = { 
    postItem,
    patchItem,
    deleteItem,
    getAll,
    getById,
    getItem,
    getByFilter
}