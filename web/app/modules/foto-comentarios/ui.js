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
 * Almacena la página actual
 * @type {number}
 */
let fotocomentario_page = 0;

/**
 * Crea el módulo en la ui
 * @function
 */
function createFotoComentariosUI() {

    /**
     * ------------------------------------------------------------------------
     * Cambia el título de la página
     * ------------------------------------------------------------------------
     */
    document.title = lang.module_foto_comentarios_title;

    /**
     * ------------------------------------------------------------------------
     * Genera el header y el contenedor
     * ------------------------------------------------------------------------
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
     * ------------------------------------------------------------------------
     * Genera ID principales
     * ------------------------------------------------------------------------
     */
    let $selectorRegionID = generateId(cfg_id_size);
    let $selectorComunaID = generateId(cfg_id_size);
    let $selectorOrdenID = generateId(cfg_id_size);
    let $paginadorID = generateId(cfg_id_size);

    /**
     * ------------------------------------------------------------------------
     * Función de llamado selectores AJAX obtención de artículos
     * ------------------------------------------------------------------------
     */
    let cargarArticulos = function () {

        // Obtiene los valores
        let $comuna = $('#' + $selectorComunaID).val();
        if (notNullUndf($comuna)) $comuna = parseInt($comuna);
        let $desc = stringToBoolean($('#' + $selectorOrdenID).val());

        // Llama a AJAX
        obtenerListaArticulos(fotocomentario_page, $comuna, $desc);

    };

    /**
     * ------------------------------------------------------------------------
     * Dibuja contenedor de ítemes y paginador
     * ------------------------------------------------------------------------
     */
    fotocomentario_container.append('<div class="foto-comentarios-header"><div class="foto-comentario-selector-panel selector-orden"><select id="{2}" class="form-control form-control-sm"></select></div><div class="foto-comentario-selector-panel selector-regioncomuna"><select id="{0}" class="form-control form-control-sm"></select><select id="{1}" class="form-control form-control-sm" disabled></select></div></div><div class="foto-comentarios-contenedor"></div><div class="foto-comentarios-paginador" id="{3}"></div>'.format($selectorRegionID, $selectorComunaID, $selectorOrdenID, $paginadorID));

    /**
     * ------------------------------------------------------------------------
     * Añade opciones a selectores comuna-región
     * ------------------------------------------------------------------------
     */
    let $selectorRegion = $('#' + $selectorRegionID);
    let $selectorComuna = $('#' + $selectorComunaID);
    $selectorRegion.append('<option value="null" selected disabled>{0}</option>'.format(lang.foto_comentarios_r_pick));
    let $rky = Object.keys($r_chile);
    for (let i = 0; i < $rky.length; i++) {
        $selectorRegion.append('<option value="{0}">{1}</option>'.format($rky[i], $r_chile[$rky[i]]));
    }
    $selectorRegion.on('change', function () {
        $selectorComuna.removeAttr('disabled');
        let $r = $selectorRegion.val();
        let $comunas = $rc_chile[$r]; // Obtiene las comunas
        let $cky = Object.keys($comunas);
        $selectorComuna.empty();
        $selectorComuna.off('change');
        $selectorComuna.append('<option value="null" selected disabled>{0}</option>'.format(lang.foto_comentarios_c_pick));
        for (let i = 0; i < $cky.length; i++) {
            $selectorComuna.append('<option value="{0}">{1}</option>'.format($cky[i], $comunas[$cky[i]]));
        }
        // $selectorComuna.openSelect();
        $selectorComuna.on('change', cargarArticulos);
    });

    $selectorComuna.append('<option value="null" selected disabled>{0}</option>'.format(lang.foto_comentarios_c_pick));

    // Mensaje filtrar por comuna
    $('.selector-regioncomuna').tooltipster({
        content: lang.foto_comentarios_filter_by_rc,
        contentAsHTML: false,
        delay: 1000,
        maxWidth: 250,
        side: 'bottom',
        theme: cfg_tooltip_theme,
    });

    /**
     * ------------------------------------------------------------------------
     * Selector orden fecha
     * ------------------------------------------------------------------------
     */
    let $selectorFecha = $('#' + $selectorOrdenID);
    $selectorFecha.append('<option value="false" selected>{0}</option>'.format(lang.foto_comentarios_filter_date_desc));
    $selectorFecha.append('<option value="true">{0}</option>'.format(lang.foto_comentarios_filter_date_asc));
    $selectorFecha.on('change', cargarArticulos);

    // Mensaje filtrar por comuna
    $('.selector-orden').tooltipster({
        content: lang.foto_comentarios_filter_by_date,
        contentAsHTML: false,
        delay: 1000,
        maxWidth: 250,
        side: 'bottom',
        theme: cfg_tooltip_theme,
    });

    /**
     * ------------------------------------------------------------------------
     * Crea paginador
     * ------------------------------------------------------------------------
     */
    if ($art_total > 0) {
        $('#' + $paginadorID).twbsPagination({
            totalPages: Math.ceil($art_total / $art_pp),
            visiblePages: 5,
            onPageClick: function (event, page) {
                fotocomentario_page = page - 1;
                cargarArticulos();
            },
            first: lang.twbs_pagination_first,
            prev: lang.twbs_pagination_prev,
            next: lang.twbs_pagination_next,
            last: lang.twbs_pagination_last,
        });
    }

    /**
     * ------------------------------------------------------------------------
     * Contenedor de los artículos
     * ------------------------------------------------------------------------
     */
    if ($art_total === 0) {
        let $articuloContainer = $('.foto-comentarios-contenedor');
        $articuloContainer.append('<div class="foto-comentarios-articulo-mensaje">{0}</div>'.format(lang.foto_comentarios_no_items));
    } else {
        clearArticleContainer();
    }

    /**
     * ------------------------------------------------------------------------
     * Termina la carga del módulo
     * ------------------------------------------------------------------------
     */
    loadHandler(false);

    // noinspection JSCheckFunctionSignatures
    $(window).on('resize', adjustListItemWidth);

}

/**
 * Limpia el contenedor de artículos y escribe un mensaje cargando
 * @function
 */
function clearArticleContainer() {
    let $articuloContainer = $('.foto-comentarios-contenedor');
    $articuloContainer.empty();
    $articuloContainer.append('<div class="foto-comentarios-articulo-mensaje"><i class="fas fa-circle-notch fa-spin"></i>{0}</div>'.format(lang.foto_comentarios_downloading));
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