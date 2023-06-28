async function deleteItem(model) {
    let response = {'statusCode':200,'succeded': true};
    try {
        await model.destroy();
        response.data = {'message':'Item deleted successfully'};
        
    } catch (err) {
        response.statusCode = 500;
        response.succeded = false;
        response.message = err.message;
    }
    return response;
}

module.exports.deleteItem = deleteItem;