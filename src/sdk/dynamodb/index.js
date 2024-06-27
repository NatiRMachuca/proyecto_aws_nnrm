
const TABLE_NAME = process.env.TABLE_NAME;
const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, GetCommand,PutCommand,DeleteCommand,UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({region: process.env.AWS_DEFAULT_REGION});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const createItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };
    const command = new PutCommand(params);
    const data = await ddbDocClient.send(command);
     
    //return dynamodb.put(params).promise();

};

const readItems = async (tipo,fechaInicio,fechaFin,limite) => {
    let items=[];

    const filterExpression = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    if(!!tipo){
        filterExpression.push(`#tipo= :tipo`);
        ExpressionAttributeNames[`#tipo`] = 'tipo';
        ExpressionAttributeValues[`:tipo`] = tipo;
    }

    if(!!fechaInicio && !!fechaFin){
        filterExpression.push(`#fecha BETWEEN :fechaInicio AND :fechaFin`);
        ExpressionAttributeNames[`#fecha`] = 'fecha';
        ExpressionAttributeValues[`:fechaInicio`] = fechaInicio;
        ExpressionAttributeValues[`:fechaFin`] = fechaFin;
    }


    //console.log(filterExpression,ExpressionAttributeNames,ExpressionAttributeValues,filterExpression.length);

    let params = {
        TableName: TABLE_NAME,
        Limit: parseInt(limite, 10) || 10
    };

    if(filterExpression.length>0){
        params.ExpressionAttributeNames=ExpressionAttributeNames;
        params.ExpressionAttributeValues=ExpressionAttributeValues;
        params.FilterExpression=`${filterExpression.join(' AND ')}`;
    }
    
    let data;
    do {
        const command = new ScanCommand(params);
        const data = await ddbDocClient.send(command);
        //data = await dynamodb.scan(params).promise();
        items = items.concat(data.Items);
        params.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (typeof data?.LastEvaluatedKey !== 'undefined');

    return items;
};

const readItemById = async (idBuscar) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar}
    };

    const command = new GetCommand(params);
    return ddbDocClient.send(command);
    
    //return dynamodb.get(params).promise();
        
}

const deleteItemById = async (idBuscar) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar}
    };
    const command= new DeleteCommand(params);
    return ddbDocClient.send(command);
    //return dynamodb.delete(params).promise();
        
}

const updateItemById = async (idBuscar,updateData) => {
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
        Key: { id: idBuscar},
        UpdateExpression: `set ${updateExpression.join(', ')}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW'
    };
    const command=new UpdateCommand(params);
    return ddbDocClient.send(command);
    //return dynamodb.update(params).promise();
        
}



module.exports = {
    createItem, readItems,readItemById,deleteItemById,updateItemById
}