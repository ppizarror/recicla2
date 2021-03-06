/**
 SHOW ITEM INIT
 Inicia el módulo para visualizar un ítem.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Inicia el módulo al cargar la página
 * @ignore
 */
$(function () {

    // Carga el artículo
    if (items === null) {
        // noinspection JSUnresolvedVariable
        throwErrorID(errordb.itemNotExist);
        return;
    }

    // Dibuja el módulo
    createShowItem(items);

    // Centra la página
    if (cfg_showitem_center_module) {
        let $f = function () {
            centerMainContent();
        };
        // noinspection JSUnresolvedFunction
        $(window).on('resize.errorPanel', $f);
        $f();
    }

    // Ajusta el fondo al reajustar
    let $f = function () {
        showItemBackgroundResize();
    };
    // noinspection JSUnresolvedFunction
    $(window).on('resize.backgroundItem', $f);
    $f();

    // Llamada a los callbacks
    afterInitModuleCallback();

});