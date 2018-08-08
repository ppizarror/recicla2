/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Contenedor
 * @type {jQuery | HTMLElement}
 */
let fotocomentario_container;

/**
 * Crea el módulo en la ui
 * @function
 */
function createFotoComentariosUI() {

    /**
     * Cambia el título de la página
     */
    document.title = lang.module_list_item;

    /**
     * Genera el header y el contenedor
     */
    let _hfcm = new Header({
        showAppInfoLeft: true,
        showSearchBox: false,
        title: lang.foto_comentarios_title,
    });
    let _cfcm = new Container({
        elementClass: 'list-item-container',
        padding: 0,
    });
    _hfcm.init();
    _cfcm.init();

    // Obtiene el contenedor
    fotocomentario_container = _cfcm.getDOM();
}

/**
 * Ajusta el contenido al ancho de la página a un 80%
 * @function
 * @ignore
 */
function adjustListItemWidth() {
    let $min = parseInt($(ui_content).css('min-width'), 10);
    let $max = parseInt($(ui_content).css('max-width'), 10);

    // Calcula nuevo ancho
    // noinspection JSCheckFunctionSignatures
    let $w = getElementWidth($(window)) * 0.8;

    // Ajusta el ancho según mínimo y máximo
    $w = Math.min($max, Math.max($min, $w));
    // noinspection JSUnresolvedFunction
    fotocomentario_container.css('width', $w + 'px');
}