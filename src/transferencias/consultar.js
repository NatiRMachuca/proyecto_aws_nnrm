const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let tipofiler="", fechaIFiler="", fechaFFilter="", limiteFilter=10;
    console.log(event.queryStringParameters);
    if(event.queryStringParameters){
        const { tipo, fechaInicio, fechaFin, limite } = event.queryStringParameters;
        tipofiler=tipo || "";
        fechaIFiler=fechaInicio|| "";
        fechaFFilter=fechaFin || "";
        limiteFilter=limite || 10;
    }

    try {
        let items=await dynamoHandler.readItems(tipofiler, fechaIFiler, fechaFFilter, limiteFilter);
         return { statusCode: 200, body: JSON.stringify(items)}
        
    } catch (err) {
        console.error(err);
        return { statusCode: 403, message: "Ocurrio un error" };
    }

};