/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Contenedor
 * @type {jQuery}
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

    /**
     * Dibuja contenedor de ítemes y paginador
     */
    let $selectorRegion = generateId(cfg_id_size);
    let $selectorComuna = generateId(cfg_id_size);
    let $selectorOrden = generateId(cfg_id_size);
    fotocomentario_container.append('<div class="foto-comentarios-header"><div class="foto-comentario-selector-panel selector-orden"><select id="{2}" class="form-control form-control-sm"></select></div><div class="foto-comentario-selector-panel selector-regioncomuna"><select id="{0}" class="form-control form-control-sm"></select><select id="{1}" class="form-control form-control-sm"></select></div></div><div class="foto-comentarios-contenedor">hola</div>'.format($selectorRegion, $selectorComuna, $selectorOrden));

    /**
     * Añade opciones a selectores
     */
    $selectorRegion = $('#' + $selectorRegion);
    $selectorRegion.append('<option value="null" selected disabled>hoa</option>');

    /**
     * Desactiva carga
     */
    loadHandler(false);

    // noinspection JSCheckFunctionSignatures
    /**
     * Redimensionado de ventana aplica adjust
     */
    $(window).on('resize', adjustListItemWidth);

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