const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    try {
        let items=await dynamoHandler.readItems();
         return { statusCode: 200, body: JSON.stringify(items)}
        
    } catch (err) {
        console.error(err);
        return { statusCode: 403, message: "Ocurrio un error" };
    }

};