/**
 FOTO COMENTARIOS
 Funciones asociadas comunicación con servidor.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Indica última búsqueda realizada
 * @type {number}
 * @private
 */
let lastPaginadorLength = 0;

/**
 * Hash última búsqueda
 * @type {number}
 * @private
 */
let lastQueryHash = 0;

/**
 * Función que obtiene por AJAX artículos
 * @function
 * @param {number} npag - Número de página
 * @param {number} comunaID - ID de comuna
 * @param {boolean=} ascendente - Orden descendente/ascendente por fecha artículo
 */
function obtenerListaArticulos(npag, comunaID, ascendente) {

    /**
     * Verifica comuna
     */
    let $comuna = '';
    if (!isNullUndf(comunaID) && !isNaN(comunaID)) {
        $comuna = '&comuna=' + comunaID;
    }

    /**
     * Verifica orden descendente/ascendente
     */
    let descendente = true;
    if (isBoolean(ascendente) && ascendente) {
        descendente = false;
    }

    /**
     * Verifica número de página
     */
    if (isNaN(npag)) npag = 0;
    let $data = 'pag={0}&asc={1}'.format(npag, !descendente) + $comuna;
    let $hash = $data.hashCode();
    if (lastQueryHash === $hash) return;
    lastQueryHash = $hash;

    let $descargaArticulos = $.ajax({
        crossOrigin: false,
        data: $data,
        timeout: 10000,
        type: 'get',
        url: 'obtenArticulo',
    });
    console.info(lang.foto_comentarios_ajax_info.format($hash));

    /**
     * Respuesta correcta desde el servidor
     */
    $descargaArticulos.done(function (response) {
        try {

            let data = JSON.parse(response);

            /**
             * Se obtuvo de manera satisfactoria el contenido desde el servidor
             */
            if (Object.keys(data).indexOf('error') === -1) {

                /**
                 * Actualiza total de artículos
                 */
                let $totalArt = data.total;
                delete data.total;
                if (lastPaginadorLength !== $totalArt) {
                    createPaginator($totalArt);
                }
                lastPaginadorLength = $totalArt;

                /**
                 * Reordena los datos dependiendo del orden del filtro
                 */
                if (descendente) {
                    data = reverseObject(data);
                }

                /**
                 * Dibuja los resultados
                 */
                drawResults(data);

            }

            /**
             * Ocurrió un error
             */
            else {
                throwErrorID(errordb['errorConsultaArticulos']);
            }

        } catch ($e) {
            throwErrorID(errordb['errorConsultaArticulos']);
        } finally {
        }
    });

    // noinspection JSUnusedLocalSymbols
    /**
     * Respuesta fallida desde el servidor
     */
    $descargaArticulos.fail(function (response, textStatus, jqXHR) {
        throwErrorID(errordb['errorConsultaArticulos']);
    });

    loadHandler(false);

}

/**
 * Retorna el nombre de una comuna a partir de los datos cargados
 * @function
 * @param {number} id - ID de la comuna
 * @returns {String}
 */
function buscarComuna(id) {

    /**
     * Itera por las regiones de cada grupo de comunas
     */
    let $r = Object.keys($rc_chile);
    for (let i = 0; i < $r.length; i++) {

        // Paquete de comunas
        let $pc = $rc_chile[$r[i]];
        let $pk = Object.keys($pc);

        // Recorre cada elemento del paquete y verifica igualdad de ID
        for (let j = 0; j < $pk.length; j++) {
            let $pi = parseInt($pk[j]);
            if ($pi === id) {
                return $pc[$pk[j]]; // Retona el nombre de la comuna
            }
        }
    }

    /**
     * Si no se encuentra entonces retorna error
     */
    return lang.foto_comentarios_comuna_inv;

}

/**
 * Función que obtiene por AJAX artículos
 * @function
 * @param {Object} picData - Datos de la foto
 */
function descargarComentariosFoto(picData) {

    let $descargaComentario = $.ajax({
        crossOrigin: false,
        data: 'id={0}'.format(picData.id),
        timeout: 10000,
        type: 'get',
        url: 'obtenComentariosFoto',
    });
    console.info(lang.foto_comentarios_ajax_descarga_comentarios.format(picData.id));

    /**
     * Respuesta correcta desde el servidor
     */
    $descargaComentario.done(function (response) {
        try {

            let data = JSON.parse(response);

            /**
             * Se obtuvo de manera satisfactoria el contenido desde el servidor
             */
            if (Object.keys(data).indexOf('error') === -1) {
                picPanelComment(data, picData);
            }

            /**
             * Ocurrió un error
             */
            else {
                throwErrorID(errordb['descargaFotoComentario'])
            }

        } catch ($e) {
            throwErrorID(errordb['descargaFotoComentario'])
        } finally {
        }
    });

    // noinspection JSUnusedLocalSymbols
    /**
     * Respuesta fallida desde el servidor
     */
    $descargaComentario.fail(function (response, textStatus, jqXHR) {
        throwErrorID(errordb['descargaFotoComentario']);
    });

    loadHandler(false);

}

/**
 * Envía el comentario hacia el servidor
 * @function
 * @param {String} contenedor - Contenedor de los mensajes
 * @param {String} comentario - Comentario
 * @param {number} fotoID - ID de la fotografía
 */
function enviarComentario(contenedor, comentario, fotoID) {

    /**
     * Verifica contenidos
     */
    if (isNaN(fotoID)) return;
    if (comentario.length === 0 || comentario.length > 512) return;

    let $descargaComentario = $.ajax({
        crossOrigin: false,
        data: 'c={0}&id={1}'.format(encodeURI(comentario)),
        timeout: 10000,
        type: 'post',
        url: 'obtenComentariosFoto',
    });
    console.info(lang.foto_comentarios_ajax_carga_comentario.format(comentario.hashCode()));

    /**
     * Respuesta correcta desde el servidor
     */
    $descargaComentario.done(function (response) {
        try {

            let data = JSON.parse(response);

            /**
             * Se obtuvo de manera satisfactoria el contenido desde el servidor
             */
            if (Object.keys(data).indexOf('error') === -1) {
                picPanelComment(data, picData);
            }

            /**
             * Ocurrió un error
             */
            else {
                throwErrorID(errordb['descargaFotoComentario'])
            }

        } catch ($e) {
            throwErrorID(errordb['descargaFotoComentario'])
        } finally {
        }
    });

    // noinspection JSUnusedLocalSymbols
    /**
     * Respuesta fallida desde el servidor
     */
    $descargaComentario.fail(function (response, textStatus, jqXHR) {
        throwErrorID(errordb['descargaFotoComentario']);
    });

}