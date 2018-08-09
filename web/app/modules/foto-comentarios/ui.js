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
let $paginadorID = generateId();

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
    let $selectorRegionID = generateId();
    let $selectorComunaID = generateId();
    let $selectorOrdenID = generateId();

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
    let $pid = generateId();
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
            let $fotoID = generateId();
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
        let $nombreid = generateId(); // ID nombre
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

    /**
     * Mueve hasta el cielo
     */
    try {
        $('html, body').animate({scrollTop: 0}, 400);
    } catch ($e) {
    } finally {
    }

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

    /**
     * Genera los ID de los elementos
     * @type {string}
     */
    let $btnID = generateId(); // ID botón comentar
    let $comContID = generateId(); // ID contenedor comentarios
    let $textID = generateId(); // ID del textarea
    let $textSanitize = generateId(); // Elemento que se encarga de sanitizar el contenido

    // noinspection HtmlUnknownTarget
    /**
     * Crea el HTML del contenido
     */
    let $content = '<div id="{7}" style="display:none"></div><div class="foto-grande-panel"><img src="{0}" alt="{8}" /></div><div class="foto-grande-panel-com-title">{1}</div><div class="foto-grande-panel-input"><textarea id="{2}" class="form-control" cols="50" rows="10" placeholder="{3}" maxlength="512"></textarea><button type="button" class="btn btn-primary" id="{5}" disabled>{4}</button></div><div class="foto-comentarios-com-contenedor" id="{6}"></div>'.format($photo_path + picData['ruta'], lang.foto_comentarios_title_com, $textID, lang.foto_comentarios_text_com_placeholder, lang.foto_comentarios_com_btn, $btnID, $comContID, $textSanitize, picData['nombre']);

    $.confirm({
        animateFromElement: false,
        boxWidth: cfg_mobile_page_enabled ? '80%' : '60%',
        closeIcon: true,
        content: $content,
        escapeKey: 'cancel',
        theme: 'light',
        title: lang.foto_comentarios_photo_title,
        useBootstrap: false,
        buttons: {
            cancel: {
                text: lang.close,
                action: function () {
                }
            }
        },

        /**
         * Función que se ejecuta cuando se despliega el contenido, asocia evento a textarea
         */
        onContentReady: function () {

            /**
             * Dibuja los comentarios
             */
            let $conk = Object.keys(cdata);
            let $c; // Comentario
            let $conkl = $conk.length;
            for (let i = 0; i < $conkl; i++) {
                $c = cdata[$conk[$conkl - 1 - i]];
                writePicComment($comContID, new Date($c['fecha']), $c['comentario'], false, $c['fecha']);
            }

            // noinspection JSUnusedLocalSymbols
            /**
             * Escribir en el textarea activa o desactiva botón comentar
             */
            $('#' + $textID).on('keyup', function (e) {
                let $c = $('#' + $textID).val();
                let $btn = $('#' + $btnID);
                if ($c.length > 0) {
                    $btn.removeAttr('disabled');
                } else {
                    $btn.attr('disabled', 'disabled');
                }
            });

            /**
             * Asocia evento click botón con el textarea
             */
            $('#' + $btnID).on('click', function (e) {

                // Previene el defaultState
                e.preventDefault();

                // Obtiene elementos
                let $txtArea = $('#' + $textID);
                let $button = $('#' + $btnID);
                let $sanitize = $('#' + $textSanitize);

                // Obtiene el texto
                let $text = $txtArea.val().toString();
                if ($text.length === 0) return;

                // Sanitiza el texto
                $sanitize.empty();
                $sanitize.append($text.trim());
                $text = $sanitize.text();

                // Aplica cambios visuales
                $txtArea.val('');
                $button.attr('disabled', 'disabled');

                // Sube el comentario por Ajax, esta función luego dibujará el comentario
                // en el contenedor.
                enviarComentario($comContID, $text, picData.id);

            })

        },
    });

}

/**
 * Escribe un comentario en el panel de comentarios de una foto
 * @function
 * @param {String} panel - ID del panel
 * @param {Date} date - Fecha del comentario
 * @param {String} com - Comentario
 * @param {boolean} prepend - Indica si el comentario se prepone o no
 * @param {String=} titlef - Título de la fecha
 */
function writePicComment(panel, date, com, prepend, titlef) {

    let $showtf = true;
    if (isNullUndf(titlef) || titlef === "") {
        $showtf = false;
    }

    let $tago = capitalizeFirstLetter($.timeago(date));
    // noinspection HtmlUnknownAttribute
    let $content = '<div class="foto-comentarios-com-item"><div class="foto-comentarios-com-com"><span class="foto-comentarios-com-fecha" {2}>{0}</span>{1}</div></div>'.format($tago, com, $showtf ? 'title="' + titlef + '"' : '');

    let $con = $('#' + panel);
    if ($con.length === 0) return; // Evita error si el contenedor no existe
    if (prepend) {
        $con.prepend($content);
    } else {
        $con.append($content);
    }
    $con.emoticons();

}