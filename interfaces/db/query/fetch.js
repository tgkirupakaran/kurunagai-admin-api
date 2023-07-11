
async function getAll(req ,model) {
    let offset = 0
    if(!req.query.limit){
        req.query.limit = 5
    }else{
        req.query.limit = Number(req.query.limit)
    }
    if(!req.query.page){
        req.query.page = 1
    }else{
        req.query.page = Number(req.query.page)
    }
    if(req.query.page > 1)
    {
        offset = ((req.query.page - 1) * req.query.limit)
    }
    console.log("");
    let response = {'statusCode':200,'succeded': true};
    try {
        const items = await model.findAndCountAll({
            limit: req.query.limit,
            offset: offset
        });
        response.data = {}
        response.data.totalItems = items.count
        response.data.hasPrevious = (req.query.page != 1)
        response.data.hasNext = (req.query.page * req.query.limit < items.count)
        response.data.page = req.query.page

        response.data.items = items.rows;
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response;
}

async function getOneById(req ,model) {
    let response = {'statusCode':200,'succeded': true};
    try {
        const item = await model.findByPk(req.params.id);
        if (!item) {
            response.statusCode = 404;
            response.succeded = false;
            response.message = 'Item not found for key ' + req.params.id;
            return response;
        }
        else{
            response.data = item;
        }
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response
}

async function getByFilter(req ,model, filter) {
    let offset = 0
    if(!req.query.limit){
        req.query.limit = 5
    }else{
        req.query.limit = Number(req.query.limit)
    }
    if(!req.query.page){
        req.query.page = 1
    }else{
        req.query.page = Number(req.query.page)
    }
    if(req.query.page > 1)
    {
        offset = ((req.query.page - 1) * req.query.limit)
    }
    console.log("");
    let response = {'statusCode':200,'succeded': true};
    try {
        const items = await model.findAndCountAll({
            limit: req.query.limit,
            offset: offset,
            where:  filter
        });
        response.data = {}
        response.data.totalItems = items.count
        response.data.hasPrevious = (req.query.page != 1)
        response.data.hasNext = (req.query.page * req.query.limit < items.count)
        response.data.page = req.query.page

        response.data.items = items.rows;
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response;
}

async function countItemsByFilter(model, filter) {
    let response = {'statusCode':200,'succeded': true};
    try {
        const items = await model.findAndCountAll({
            where:  filter
        });
        response.data = {}
        response.data.found = (items.count>0)
        response.data.noOfItems = items.count
        response.data.items = items
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response;
}

module.exports.getAll = getAll;
module.exports.getOneById = getOneById; 
module.exports.getByFilter = getByFilter; 
module.exports.countItemsByFilter = countItemsByFilter;