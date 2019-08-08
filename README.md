# APP Risk Management

APP desarrollada para  **Risk Management**, tiene la responsabilidad de gestionar toda la lógica de negocio para el soporte de *Auditorías* y *Encuestas* a nivel Aplicación Móvil.

Se cuenta con las siguientes funcionalidades.

* Auditorias
	* Auditorias asignadas
	* Auditorias completadas
	* Resolución de auditorias
	* Compartir detalle de auditoría
* Encuestas
	* Encuestas asignadas
	* Encuestas completadas
	* Resolución de Encuestas
	* Resumen de Encuestas
	* Compartir detalle de auditoría


# Instalación

A continuación de describen los escenarios en donde se puede ejecutar la aplicación.

Las características del APP son las siguientes:



| **PROPIEDAD**             | **VALOR**  |
|---------------------------|------------|
| Framework/ | React Native |
| Flujo de datos    | Redux    |
| Entorno de desarrollo  | Expo       |




## Requerimientos

Se requiere un entorno para ejecutar una aplicación en NodeJS, a continuación se describen los requerimientos técnicos.
* Expo

```
npm install -g expo-cli
```
* [NodeJs v8](https://nodejs.org/en/download/) o superior
* YARN 1.12. o superior ( opcional )

## Desarrollo

Para trabajar con la aplicación en modo desarrollo basta con ejecutar los siguientes comandos.
```
$ cd folder-project
$ yarn install
$ yarn start
```

>**Nota:**  Esto generará el entorno de desarrollo para usar la aplicación desde local con Expo.
>

## Build

La APP puede ser exportada para plataformas IOS/Android, para la gestion de build se usa el servicio gratuito de [expo](https://expo.io/).

>**importante**: es recomendable que al momento de ejecutar el build en cualquier plataforma, se esté ejecutando el entorno de desarrollo.

### Android
Para realizar el build de android ejecutar el siguiente comando:
````
expo build:android
````

Se dispara el evento para realizar el build de la aplicación en los servidores de expo, se genera un link para ver el progreso y descargar el APK.


### iOS
Para realizar el build de iOS ejecutar el siguiente comando:
````
expo build:ios
````
Se dispara el evento para realizar el build de la aplicación en los servidores de expo, se genera un link para ver el progreso y descargar el IPA *.

>*Se requeire una configuración previa de la cuenta en Developer Apple

>**nota**: para ambos casos se recomienda que expo gestione las credenciales y la firma.
