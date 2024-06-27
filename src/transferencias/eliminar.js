const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let idBuscar="";
    const {pathParameters } = event;
    if(pathParameters.idTransfer!=undefined && pathParameters.idTransfer!=null ) idBuscar=pathParameters.idTransfer
    
    try {
        await dynamoHandler.deleteItemById(idBuscar);
        return { statusCode: 204}
    } catch (err) {
        console.error(err);
        return { statusCode: 403, message: "Ocurrio un error" };
    }
};