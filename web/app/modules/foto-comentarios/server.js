/**
 FOTO COMENTARIOS
 Funciones asociadas comunicación con servidor.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Función que obtiene por AJAX artículos desde un cierto número de página
 * @param {number} npag - Número de página
 */

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

    // noinspection JSUnresolvedFunction
    let $downloadIssues = $.ajax({
        crossOrigin: false,
        data: 'pag={0}&asc={1}'.format(npag, !descendente) + $comuna,
        timeout: 10000,
        type: 'get',
        url: 'obtenArticulo',
    });

    // noinspection JSCheckFunctionSignatures
    /**
     * Respuesta correcta desde el servidor
     */
    $downloadIssues.done(function (response) {
        try {

            let data = JSON.parse(response);

            /**
             * Se obtuvo de manera satisfactoria el contenido desde el servidor
             */
            if (Object.keys(data).indexOf('error') === -1) {
                // Dibujar en .foto-comentarios-contenedor
                console.log(data);
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
    $downloadIssues.fail(function (response, textStatus, jqXHR) {
        throwErrorID(errordb['errorConsultaArticulos']);
    });

    loadHandler(false);
}