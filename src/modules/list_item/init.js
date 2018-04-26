/**
 LIST ITEM INIT
 Inicia el módulo de agregar item.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Inicia el módulo al cargar la página
 */
$(function () {

    // Muestra panel cargando
    loadHandler(true);

    // Dibuja el módulo
    createListItem();

    // Oculta el panel principal
    hideMainContent();

    // Centra la página
    if (cfg_listitem_center_module) {
        centerMainContent();
        $(window).on('resize.listItemPanel', centerMainContent);
    }

    // Borra parámetros de la url
    removeUrlParam('status');

    // Ajusta el tamaño del contenido
    adjustListItemWidth();

    // Llamada a los callbacks
    afterInitModuleCallback();
});