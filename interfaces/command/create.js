async function createOne(req ,model) {
    let response = {'statusCode':200,'succeded': true};
    try {
        const item = await model.create(req.body);
        response.data = item;
        
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response;
}

module.exports.createOne = createOne;