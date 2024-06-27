serverless plugin install -n serverless-offline
serverless deploy    Deploy changes
serverless info      View deployed endpoints and resources
serverless invoke    Invoke deployed functions
serverless --help    Discover more commands


serverless offline


# Servicios web
Se genero un crud de servicios web que permiten leer, insertar, modificar y eliminar registros de transferencias.


## Environment Variables


1.- Datos de usuario AWS para autenticar y desplegar los servicios de AWS

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`AWS_DEFAULT_REGION` default: us-east-1

2.-Variable para especificar el entorno a desplegar: dev, QA, Prod, etc.

`STAGE` default; dev

3.- Esta variable de entorno es muy importante, se necesita un número ramdom para que no genere conflito al momento de nombrar el s3, pues los nombres del s3 son globales

`POSTFIX_RANDOM`


## Deployment

Se necesita tener instalado docker y la herramienta make

Para desplegar los componentes necesarios

```bash
  make deploy
```

Para eliminar los componentes generados

```bash
   make remove
```

Si requiere ejecutar el proyecto de manera local
 
```bash
  make run-local
```


Si se desea ejecutar sin docker se requiere:
NodeJs 18 y asegurase de que esten configuradas las variables de entorno.

Comandos: 

Instalar dependencias
```bash
  npm install
```

Desplegar componentes
```bash
  npx serverless deploy
```
Eliminar componentes
```bash
  npx serverless remove
```
Ejecutar de manera local
```bash
  npx serverless offline
```

## Carga Inicial
## Servicios
CRUD para insertar, leer, eliminar y modificar registros de tranferencias 

#### Obtener todas las tranferencias

```http
  GET https://y9056g5nu3.execute-api.us-east-1.amazonaws.com/transferencias/
```

#### Obtener tranferencias por id
```http
  GET https://y9056g5nu3.execute-api.us-east-1.amazonaws.com/tranferencias/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Insertar una tranferencia
Recibe un objeto JSON

```http
  POST https://y9056g5nu3.execute-api.us-east-1.amazonaws.com/tranferencias/
```

```JSON

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `placa` | `string` |placa de vehículo |
| `numero_economico` | `string` ||
| `vim` | `string` |  |
| `asientos` | `number` | El número de asientosque tiene el vehículo |
| `numero_deseguro` | `number` | El número de seguro del vehículo |
| `seguro` | `string` | El nombre de seguro del vehículo|
| `marca` | `string` | La marca del vehículo|
| `modelo` | `string` | El modelo del vehículo|
| `anio` | `number` | El anio del vehículo|
| `color` | `string` | El color del vehículo|
| `latitud` | `decimal` | La latitud de la ubicación del vehículo|
| `longitud` | `deciaml` |La longitud  de la ubicación del vehículo |

#### Eliminar tranferencias por id
```http
  DELETE https://y9056g5nu3.execute-api.us-east-1.amazonaws.com/tranferencias/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del vehiculo a eliminar|


```http
  PUT https://y9056g5nu3.execute-api.us-east-1.amazonaws.com/tranferencias/${id}
```
#### Editar tranferencia por id

```JSON


```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. Id del vehiculo a eliminar|
| `placa` | `string` |placa de vehículo |
| `numero_economico` | `string` ||
| `vim` | `string` |  |
| `asientos` | `number` | El número de asientosque tiene el vehículo |
| `numero_deseguro` | `number` | El número de seguro del vehículo |
| `seguro` | `string` | El nombre de seguro del vehículo|
| `marca` | `string` | La marca del vehículo|
| `modelo` | `string` | El modelo del vehículo|
| `anio` | `number` | El anio del vehículo|
| `color` | `string` | El color del vehículo|
| `latitud` | `decimal` | La latitud de la ubicación del vehículo|
| `longitud` | `deciaml` |La longitud  de la ubicación del vehículo |


## Infraestuctura



