const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let idBuscar="";
    let dataUpdate=null;
    //const {pathParameters,body:rawBody} = event; 
    //const body=JSON.parse(rawBody);

    const {pathParameters,body} = event; 
    if(pathParameters.idTransfer!=undefined && pathParameters.idTransfer!=null ) idBuscar=pathParameters.idTransfer;

    const{monto ,tipo,originName,originRut,originAccount,receiverRut,receiverAccount,originBankCode,originBankName,
        originAccountType,comment} = JSON.parse(body);

    if( monto && tipo && originName && originRut && originAccount && receiverRut && receiverAccount 
        && originBankCode && originBankName && originAccountType
    ){
        dataUpdate ={
            updatedAt: new Date().toISOString(),
            monto ,tipo,originName,originRut,originAccount,receiverRut,receiverAccount,originBankCode,originBankName,
            originAccountType,
            comment: comment || 'NA'
        }
    }
    

    try {
        const data = await dynamoHandler.updateItemById(idBuscar, dataUpdate);
        response= { statusCode: 200, body: JSON.stringify(data.Attributes) };
    } catch (err) {
        console.error(err);
        response= { statusCode: 403, message: "Ocurrio un error" };
    }
      
   
    console.log(response);
    return response;
};