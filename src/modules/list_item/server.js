/**
 LIST ITEM SERVER
 Funciones asociadas a la comunicación con el servidor para el listado de artículos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Carga los artículos desde el servidor
 * @param options {object}      Parámetros de carga
 */
function loadLastItemsFromServer(options) {
    let $defaults = {
        itemsToLoad: cfg_listitem_initial_loads
    };

    // noinspection JSUnusedAssignment
    options = $.extend($defaults, options);

    // TEST
    return test_items;
}

