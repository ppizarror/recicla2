/**
 LIST ITEM SERVER
 Funciones asociadas a la comunicación con el servidor para el listado de artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Carga los artículos desde el servidor
 * @param options
 */
function loadLastItemsFromServer(options) {
    let $defaults = {
        itemsToLoad: 5
    };
    options = $.extend($defaults, options);
}

