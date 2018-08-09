# Recicla2

Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web. Universidad de Chile.

## Servidor

Esta tarea se desarroll� utilizando la tecnologia <a href="https://es.wikipedia.org/wiki/Java_Servlet">Java Servlets</a> con servidor Tomcat versi�n 9.0.10.

### Librerias utilizadas

Se utilizan las siguientes librer�as:

```
java-json.jar
mysql-connector-java-5.0.8-bin.jar
mysql-connector-java-8.0.12.jar
```

### Base de datos

Se usa MySQL, con driver de conexi�n **com.mysql.cj.jdbc.Driver**, puerto 3306, codificaci�n UTF-8.

## Sobre el desarrollo

### Front-end
En el lado del cliente se desarroll� la tarea 4 sobre la arquitectura de las tareas anteriores, reusando casi todo el c�digo, la interfaz gr�fica, paquetes (librer�as) y otras funciones adicionales son similares.

<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/vistagen.PNG?raw=true" width="70%" alt="" title="Vista general de la aplicaci�n" />
</p>

Se escribi� un m�dulo adicional: **foto-comentarios** el cual se comunica mediante Ajax con el servidor, dibuja la lista de art�culos y permite a�adir comentarios a las fotos.

```bash
foto-comentarios/
    config.js    Configuraciones del m�dulo
    init.js      Inicia el m�dulo
    server.js    Funciones de comunicaci�n con servidor
    style.css    Estilos
    ui.js        Funciones asociadas a la parte gr�fica
```

A continuaci�n se muestra un ejemplo del panel de visualizaci�n de una foto y de los comentarios:

<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/foto1.PNG?raw=true" width="70%" alt="" title="Ejemplo visualizaci�n foto" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/ppizarror/recicla2/java-servlets/docs/examples/foto2.PNG?raw=true" width="70%" alt="" title="Ejemplo comentarios en foto" />
</p>

### Back-end

En el lado del servidor se program� utilizando distintos Servlets y un listener. A continuaci�n se explica brevemente el uso de cada servlet:

```bash
descargaDeComentariosFotos    Permite descargar comentarios de las fotos    [GET]
cargaComentarioDeFotos        Carga comentarios de las fotos                [POST]
descargaArticulo              Descarga lista de articulos                   [POST]
```

A modo de ejercicio se program� el listener **DescargaRegionComuna** el cual escucha el inicio del contenedor para descargar desde la base de datos la lista de regiones y comunas. Esta se mantiene en memoria en una estructura JSON para poder servirla al cliente sin tener que descargarla repetidas veces.

Todo el contenido que se pasa por POST o GET es validado, adem�s se comprueba y sanitiza par�metros. Cualquier estado de error es informado al usuario, se crearon distintos etiquetas de error las cuales se muestran de manera amigable al usuario.

## Validaci�n W3C

Todos los archivos han sido validados previamente y ninguno arroja errores.

## Soporte de navegadores web

La aplicaci�n ha sido testeada en los siguientes navegadores:

```bash
Opera                v54.0
Mozilla-Firefox      v61.0.1
Google Chrome        v68.0
MS Edge              v42.17134  
```

No se garantiza el funcionamiento correcto en otros navegadores.

## Documentaci�n

La documentaci�n es generada con JSDOC3, se puede ver de manera local en la carpeta *docs/index.html*.