const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
   
    let response = await dynamoHandler.readItems();

    return {
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
};