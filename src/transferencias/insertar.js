const dynamoHandler = require('../sdk/dynamodb/index.js');

exports.handler = async (event) => {
    let dataInsert={}
    const {body } = event;
    const{monto ,tipo,originName,originRut,originAccount,receiverRut,receiverAccount,originBankCode,originBankName,
        originAccountType,comment} = JSON.parse(body);

    if( monto && tipo && originName && originRut && originAccount && receiverRut && receiverAccount 
        && originBankCode && originBankName && originAccountType
    ){
        let prefijo="";
        if(tipo.toLowerCase()=="cargo")prefijo="C";
        if(tipo.toLowerCase()=="abono")prefijo="A";
        let idGenerado=prefijo+"_"+Date.now().toString();

            dataInsert ={
                id: idGenerado,
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