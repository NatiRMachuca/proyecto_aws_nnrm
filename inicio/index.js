const AWS = require('aws-sdk');

// Configurar las credenciales de AWS y la región
AWS.config.update({
    region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'et-paytransferencias'; // Cambia esto al nombre de tu tabla

// Crear un nuevo ítem
const createItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };

    try {
        await dynamodb.put(params).promise();
        return { status: 'success', message: 'Item created successfully' };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

// Leer un ítem por ID
const readItem = async (id) => {
    const params = {
        TableName: TABLE_NAME
    };

    

    try {
        const data = await dynamodb.scan(params).promise();
        return { status: 'success', data: data.Items };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

// Actualizar un ítem por ID
const updateItem = async (id, updateData) => {
    const updateExpression = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    for (const key in updateData) {
        updateExpression.push(`#${key} = :${key}`);
        ExpressionAttributeNames[`#${key}`] = key;
        ExpressionAttributeValues[`:${key}`] = updateData[key];
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `set ${updateExpression.join(', ')}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await dynamodb.update(params).promise();
        return { status: 'success', data: data.Attributes };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

// Eliminar un ítem por ID
const deleteItem = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };

    try {
        await dynamodb.delete(params).promise();
        return { status: 'success', message: 'Item deleted successfully' };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

// Handler principal para Lambda
exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;
    let response;

    switch (httpMethod) {
        case 'POST':
            response = await createItem(JSON.parse(body));
            break;
        case 'GET':
            response = await readItem(pathParameters.id);
            break;
        case 'PUT':
            response = await updateItem(pathParameters.id, JSON.parse(body));
            break;
        case 'DELETE':
            response = await deleteItem(pathParameters.id);
            break;
        default:
            response = { status: 'error', message: 'Unsupported method' };
    }
    console.log(JSON.stringify(response));
    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};