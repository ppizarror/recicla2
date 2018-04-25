/**
 SHOW ITEM INIT
 Inicia el módulo para visualizar un ítem.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Inicia el módulo al cargar la página
 */
$(function () {

    // Carga el artículo
    let $item_id = parseInt(getURLParameter('id'));
    let $loaded_item = loadItemID($item_id);

    if ($loaded_item === null) {
        throwErrorID(errordb.itemNotExist);
    }

    // Dibuja el módulo
    createShowItem($loaded_item);

    // Centra la página
    if (cfg_showitem_center_module) {
        let $f = function () {
            centerMainContent();
        };
        $(window).on('resize.errorPanel', $f);
        $f();
    }

    // Ajusta el fondo al reajustar
    let $f = function () {
        showItemBackgroundResize();
    };
    $(window).on('resize.backgroundItem', $f);
    $f();

    // Llamada a los callbacks
    afterInitModuleCallback();
});