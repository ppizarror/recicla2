# Recicla2

Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web. Universidad de Chile.

## Importante

#### Algunas configuraciones

Configuraciones de php.ini:
```bash
post_max_size=64M
```

Servidor:
```bash
Apache puertos: 80, 8080
Mysql puertos: 3306
```

#### Sobre la base de datos
En el archivo sql/tarea2.sql se encuentra la base de datos con los registros ya añadidos, pruebe a añadir este sql a phpmyadmin para tener todos los registros de la aplicación.

En la carpeta:
```bash
resources/photos/
```

Se encuentran los archivos de las imágenes añadidos al servidor.

#### Sobre el desarrollo

La aplicación tiene una ideologia fuerte en javascript. Esta basada en módulos, los cuales son:

```bash
add_item: Añade un ítem.
list_item: Lista los ítem (index).
show_item: Muestra un ítem por una id.
```

Cada módulo está compuesto de, al menos:
```bash
config.js    Configuraciones
init.js      Inicia el módulo
style.css    Estilos
ui.js        Funciones asociadas a la parte gráfica, añade divs, etc.
```

El **php** lo que hace es cargar un ítem como un arreglo JSON según las distintas solicitaciones del navegador. Para ello inserta en el head:

```json
items = [{"comments":[],"comuna":"Llay Llay","date":"2018-04-26 22:31:48","desc":"","id":"26","name":"Una plei4 nuevita","photos":["resources\/photos\/11618377305ae27d8500ed0.PNG"],"region":"Regi\u00f3n de Valpara\u00edso","userContac....
```

Estos datos son trabajados por las clases **Item** e **ItemComment** definidas en *src/components*. Básicamente se castean, pasan a listas y se definen distintas funciones *getters* para retornar cada resultado.

Para la comunicación con el servidor se utiliza:
```
- Ítem: Todo se usa por $_POST, se llama a src/server/add_item.php para añadir elementos.
- Comentarios: Se llama mediante Ajax, utilizando jQuery.
- Fotos: Se añaden en add_item.php
```

Para llevar a cabo las validaciones se utilizaron funciones propias, por lo general se valido:

```bash
1. Largo mínimo o máximo
2. Expresiones regulares
```

Por el lado del servidor también se aplicaron validaciones, solo de tamaño (largo de los strings). Cabe destacar que para ciertos datos (nombre, descripción, calle, email) se validó como un string, para la región, comuna, teléfono se valido como un entero.
