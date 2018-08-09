/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Contenedor
 * @type {jQuery}
 * @private
 */
let fotocomentario_container;

/**
 * Almacena la página actual
 * @type {number}
 * @private
 */
let fotocomentario_page = 0;

/**
 * Paginador
 * @type {string}
 * @private
 */
let $paginadorID = generateId(cfg_id_size);

/**
 * Función global que carga los artículos
 * @type{function}
 * @private
 */
let cargarArticulos;

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

    /**
     * ------------------------------------------------------------------------
     * Función de llamado selectores AJAX obtención de artículos
     * ------------------------------------------------------------------------
     */
    cargarArticulos = function () {

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
    fotocomentario_container.append('<div class="foto-comentarios-header"><div class="foto-comentario-selector-panel selector-orden"><select id="{2}" class="form-control form-control-sm"></select></div><div class="foto-comentario-selector-panel selector-regioncomuna"><select id="{0}" class="form-control form-control-sm"></select><select id="{1}" class="form-control form-control-sm" disabled></select></div></div><div class="foto-comentarios-contenedor"></div><div class="foto-comentarios-paginador foto-comentarios-paginador-vacio" id="{3}"></div>'.format($selectorRegionID, $selectorComunaID, $selectorOrdenID, $paginadorID));

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
     * Contenedor de los artículos
     * ------------------------------------------------------------------------
     */
    if ($art_total === 0) {
        let $articuloContainer = $('.foto-comentarios-contenedor');
        $articuloContainer.append('<div class="foto-comentarios-articulo-mensaje">{0}</div>'.format(lang.foto_comentarios_no_items));
        loadHandler(false);
    } else {
        clearArticleContainer();
        cargarArticulos();
    }

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

/**
 * Crea el paginador
 * @function
 * @param {number} totalp - Total de artículos
 */
function createPaginator(totalp) {

    /**
     * Calcula la cantidad de páginas
     * @type {number}
     */
    let $totalp = Math.ceil(totalp / $art_pp);

    /**
     * Obtiene el contenedor
     */
    let $pagcontainer = $('#' + $paginadorID);
    let $pid = generateId(cfg_id_size);
    $pagcontainer.empty();
    $pagcontainer.append('<div class="foto-comentarios-paginador-linea" id="{0}"></div>'.format($pid));

    /**
     * Dependiendo del total de páginas se muestra u oculta el paginador
     */
    if ($totalp <= 1) {
        $pagcontainer.addClass('foto-comentarios-paginador-vacio');
        return;
    } else {
        $pagcontainer.removeClass('foto-comentarios-paginador-vacio');
    }

    fotocomentario_page = 0;
    $('#' + $pid).twbsPagination({
        totalPages: $totalp,
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
 * Función que dibuja los resultados obtenidos desde el servidor
 * @function
 * @param {object} results - Resultados descargados
 */
function drawResults(results) {

    /**
     * Obtiene el contenedor de los fotos y comentarios
     * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
     */
    let $articuloContainer = $('.foto-comentarios-contenedor');
    $articuloContainer.empty();

    /**
     * Obtiene los keys de los resultados
     */
    let $rk = Object.keys(results);

    /**
     * Si no hay resultados se muestra un mensaje
     */
    if ($rk.length === 0) {
        $articuloContainer.append('<div class="foto-comentarios-articulo-mensaje">{0}</div>'.format(lang.foto_comentarios_no_results));
        return;
    }

    /**
     * Dibuja cada elemento en el contenedor
     */
    let $r; // Ítem resultado
    for (let i = 0; i < $rk.length; i++) {

        /**
         * Carga el artículo
         */
        $r = results[$rk[i]];
        let $listaFotos = '';
        let $listaFotoID = [];

        /**
         * Genera lista de fotos
         */
        let $fotoObj = Object.keys($r['fotos']);
        let $f;
        if ($fotoObj.length === 0) {
            $listaFotos = lang.foto_comentarios_item_no_pics;
        }
        for (let j = 0; j < $fotoObj.length; j++) {
            $f = $r['fotos'][$fotoObj[j]];
            let $fotoID = generateId(cfg_id_size);
            // noinspection HtmlUnknownTarget
            $listaFotos += '<div class="art-foto-item" id="{2}"><img src="{0}" alt="{1}" width="120" height="120"/></div>'.format($photo_path + $f['ruta'], $f['nombre'], $fotoID);
            $listaFotoID.push({
                domID: $fotoID,
                picData: $f,
            });
        }

        /**
         * Escribe el elemento en el contenedor
         */
        let $nombreid = generateId(cfg_id_size); // ID nombre
        $articuloContainer.append('<div class="foto-comentario-nuevo-articulo"><div class="art-nombre"><span id="{2}">{0}</span></div><div class="art-foto-lista">{1}</div></div>'.format($r['nombre'], $listaFotos, $nombreid));

        /**
         * Agrega tooltip
         */
        $('#' + $nombreid).tooltipster({
            content: lang.foto_comentarios_item_name.format($r['fecha'], buscarComuna($r['comuna'])),
            contentAsHTML: true,
            delay: 500,
            maxWidth: 300,
            side: 'bottom',
            theme: cfg_tooltip_theme,
        });

        /**
         * Establece eventos clickeos de fotos
         */
        let $elem; // Contiene referencia foto
        for (let j = 0; j < $listaFotoID.length; j++) {
            $elem = $listaFotoID[j];
            $('#' + $elem.domID).on('click', {
                data: $elem.picData,
            }, loadPicCommentsPanel);
        }

    }

    /**
     * Centra el contenido
     */
    centerMainContent();

}

/**
 * Función que carga el panel de comentarios, obtiene ID foto, carga Ajax comentarios y despliega panel
 * @function
 * @param {Object} ev - Evento click
 */
function loadPicCommentsPanel(ev) {

    /**
     * Obtiene la ID de la imagen clickeada
     */
    let $picData = ev.data.data;

    /**
     * Descarga las comentarios de la foto, dicha función luego llamará a abrir la ventana
     * y desplegar el contenido
     */
    descargarComentariosFoto($picData);

}

/**
 * Crea un panel para visualizar los comentarios de la foto y la foto
 * @function
 * @param {Object} cdata - Comentarios de la foto
 * @param {Object} picData - Datos de la foto
 */
function picPanelComment(cdata, picData) {
    console.log(cdata, picData);
}