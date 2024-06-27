const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let idBuscar="";
    const { pathParameters } = event;
    if(pathParameters.idTransfer!=undefined && pathParameters.idTransfer!=null ) idBuscar=pathParameters.idTransfer
    
    try{

        const data= await dynamoHandler.readItemById(idBuscar);
        if (data?.Item) {
            return  {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Item not found' })
            };
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Ocurrio un error" })
        };
    }

    

};