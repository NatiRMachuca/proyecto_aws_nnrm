const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    const {body } = event;
    const item = JSON.parse(body);
    item.id = item.id || Date.now().toString();
    
            
    try {
        await dynamoHandler.createItem(item);
        return { statusCode: 204}
    } catch (err) {
        console.error(err);
        return { statusCode: 403, message: "Ocurrio un error" };
    }
    
};