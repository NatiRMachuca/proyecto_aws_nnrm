const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_DEFAULT_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;


const createItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };
    return dynamodb.put(params).promise();

};

const readItems = async () => {
    let items=[];
    const params = {
        TableName: TABLE_NAME
    };
    
    try {
        let data;
        do {
            data = await dynamodb.scan(params).promise();
            items = items.concat(data.Items);
            params.ExclusiveStartKey = data.LastEvaluatedKey;
        } while (typeof data.LastEvaluatedKey !== 'undefined');

        return { status: 'success', data:items };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

const readItemById = async (idBuscar) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar}
    };

    try {
        const data = await dynamodb.get(params).promise();
        if (data.Item) {
            response= {
                statusCode: 200,
                body: JSON.stringify(data.Item),
                headers: { 'Content-Type': 'application/json' }
            };
        } else {
            response= {
                statusCode: 404,
                body: JSON.stringify({ message: 'Item not found' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    } catch (err) {
        console.error(err);
        response= {
            statusCode: 500,
            body: JSON.stringify({ message: "Ocurrio un error" }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
}



module.exports = {
    createItem, readItems
}