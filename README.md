serverless plugin install -n serverless-offline
serverless deploy    Deploy changes
serverless info      View deployed endpoints and resources
serverless invoke    Invoke deployed functions
serverless --help    Discover more commands


serverless offline




# Servicios web
Se genero un crud de servicios web que permiten leer, insertar, modificar y eliminar registros transferencias


## Environment Variables

`STAGE`
Variable para especificar el entorno a desplegar: dev, QA, Prod, etc

`AWS_ACCESS_KEY_ID`Se requiere el KEY_ID de las credenciales de su usuario de AWS para autenticar y autorizar el acceso a los servicios de AWS 

`AWS_SECRET_ACCESS_KEY`
Se requiere el KEY_SECRET de su usuario de AWS para autenticar y autorizar el acceso a los servicios de AWS

`AWS_DEFAULT_REGION`

`POSTFIX_RANDOM`
Esta variable de etorno es muy importante, se necesita un ramdom para que no genere conflito al momento de nombrar el s3.


## Deployment

Para correr el proyecto de manera local
 

```bash
  make run-local
```

Para desplegar los componentes necesarios

```bash
  make deploy
```

Para eliminar los componentes generados

```bash
   make remove
```

## Servicios
CRUD para insertar, leer, eliminar y modificar registros de tranferencias 

#### Obtener todas las tranferencias

```http
  GET https://nnrm.talachas.dev/transferencias/?tipo=cargo&fechaInicio=27-06-2024&fechaFin=28-06-2024&limite=10
```


```http
  GET https://nnrm.talachas.dev/api/
```


#### Obtener tranferencias por id
```http
  GET https://nnrm.talachas.dev/tranferencias/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Insertar una tranferencia
Recibe un objeto JSON

```http
  POST https://nnrm.talachas.dev/tranferencias/
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
  DELETE https://nnrm.talachas.dev/tranferencias/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del vehiculo a eliminar|


```http
  PUT https://nnrm.talachas.dev/tranferencias/${id}
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



