const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let dataInsert={}
    const {body } = event;
    const{monto ,tipo,originName,originRut,originAccount,receiverRut,receiverAccount,originBankCode,originBankName,
        originAccountType,comment,id} = JSON.parse(body);

    if( monto && tipo && originName && originRut && originAccount && receiverRut && receiverAccount 
        && originBankCode && originBankName && originAccountType
    ){
            dataInsert ={
                id: (id || Date.now().toString()),
                fechaMovimiento: new Date().getTime(),
                createdAt: new Date().toISOString(),
                monto ,tipo,originName,originRut,originAccount,receiverRut,receiverAccount,originBankCode,originBankName,
                originAccountType,
                comment: comment || 'NA'
            }
        }
        
        try {
            console.log("dataInsert:::::::::::::::",dataInsert);
            await dynamoHandler.createItem(dataInsert);
            return { statusCode: 204}
        } catch (err) {
            console.error(err);
            return { statusCode: 403, message: "Ocurrio un error" };
        }

};