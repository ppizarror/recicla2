/**
 LIST ITEM INIT
 Inicia el módulo de agregar item.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Inicia el módulo al cargar la página
 */
$(document).ready(function () {

    // Dibuja el módulo
    createListItem();

    // Centra la página
    if (cfg_listitem_center_module) {
        centerMainContent();
        $(window).on('resize.errorPanel', centerMainContent);
    }
});