# Recicla2

Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web. Universidad de Chile.

## Servidor

Esta tarea se desarrolló utilizando la tecnologia <a href="https://es.wikipedia.org/wiki/Java_Servlet">Java Servlets</a> con servidor Tomcat versión 9.0.10.

### Librerias utilizadas

Se utilizan las siguientes librerías:

```
java-json.jar
mysql-connector-java-5.0.8-bin.jar
mysql-connector-java-8.0.12.jar
```

### Base de datos

Se usa MySQL, con driver de conexión **com.mysql.cj.jdbc.Driver**, puerto 3306, codificación UTF-8.

## Sobre el desarrollo

### Front-end
En el lado del cliente se desarrolló la tarea 4 sobre la arquitectura de las tareas anteriores, reusando casi todo el código, la interfaz gráfica, paquetes (librerías) y otras funciones adicionales son similares.

<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/vistagen.PNG?raw=true" width="70%" alt="" title="Vista general de la aplicación" />
</p>

Se escribió un módulo adicional: **foto-comentarios** el cual se comunica mediante Ajax con el servidor, dibuja la lista de artículos y permite añadir comentarios a las fotos.

```bash
foto-comentarios/
    config.js    Configuraciones del módulo
    init.js      Inicia el módulo
    server.js    Funciones de comunicación con servidor
    style.css    Estilos
    ui.js        Funciones asociadas a la parte gráfica
```

A continuación se muestra un ejemplo del panel de visualización de una foto y de los comentarios:

<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/foto1.PNG?raw=true" width="70%" alt="" title="Ejemplo visualización foto" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/foto2.PNG?raw=true" width="70%" alt="" title="Ejemplo comentarios en foto" />
</p>

### Back-end

En el lado del servidor se programó utilizando distintos Servlets y un listener. A continuación se explica brevemente el uso de cada servlet:

```bash
descargaDeComentariosFotos    Permite descargar comentarios de las fotos    [GET]
cargaComentarioDeFotos        Carga comentarios de las fotos                [POST]
descargaArticulo              Descarga lista de articulos                   [POST]
```

A modo de ejercicio se programó el listener **DescargaRegionComuna** el cual escucha el inicio del contenedor para descargar desde la base de datos la lista de regiones y comunas. Esta se mantiene en memoria en una estructura JSON para poder servirla al cliente sin tener que descargarla repetidas veces.

Todo el contenido que se pasa por POST o GET es validado, además se comprueba y sanitiza parámetros. Cualquier estado de error es informado al usuario, se crearon distintos etiquetas de error las cuales se muestran de manera amigable al usuario.

## Validación W3C

Todos los archivos han sido validados previamente y ninguno arroja errores.

## Soporte de navegadores web

La aplicación ha sido testeada en los siguientes navegadores:

```bash
Opera                v54.0
Mozilla-Firefox      v61.0.1
Google Chrome        v68.0
MS Edge              v42.17134  
```

No se garantiza el funcionamiento correcto en otros navegadores.

## Documentación

La documentación es generada con JSDOC3, se puede ver de manera local en la carpeta *docs/index.html*.