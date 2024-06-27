const consultar = require("./src/consultar.js");
const buscarid = require("./src/consultarId.js");
const insertar = require("./src/insertar.js");
const eliminar = require("./src/eliminar.js");
const actualizar = require("./src/actualizar.js");

/*
insertar.handler({
    httpMethod: "POST",
    pathParameters: "",
    body: {
        "validated": true,
        "inUse": false,
        "monto": "100",
        "tipo": "abono",
        "fecha": "14-04-2022 00:15",
        "originName": "NOMBRE EMPRESA",
        "originRut": "0223335554",
        "originAccount": "00000000000087654321",
        "receiverRut": "0112223334",
        "receiverAccount": "00000012345678",
        "originBankCode": "cl_bci",
        "originBankName": "Banco BCI",
        "comment": "Prueba desde lambda",
        "originAccountType": "cuenta_corriente",
      }
});

consultar.handler({
    httpMethod: "GET",
    pathParameters: "",
    body: {},
});


 buscarid.handler({
  httMethod: "GET",
  pathParameters: {id: "qwet"},  
})


eliminar.handler({
    httMethod: "GET",
    pathParameters: {id: "1719459779185"},  
})*/


actualizar.handler({
    httMethod: "PUT",
    pathParameters: {id: "1719458328956"},  
    body: {
    "validated": true,
    "inUse": true,
    "monto": "200",
    }
})
