/**
 ERRORS
 Maneja los códigos de errores y los mensajes al usuario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Código de errores
 * @type {{langNotExist: {code: number, id: string, moreinfo: string, msg: string}}}
 * @ignore
 */
let errordb = {
    "langNotExist": {
        "code": 0,
        "id": "langNotExist",
        "moreinfo": "La configuración cfg_lang_ui es incorrecta, compruebe el archivo de configuraciones de la app",
        "msg": "Configuración de idioma incorrecta",
    }
};

/**
 * Añade un código de error a la base de datos
 * @function
 * @param {String} id - Identificador del error
 * @param {String} msg - Mensaje del error
 * @param {String} moreinfo - Más información
 * @param {number=} code - Código del error
 */
function $addError(id, msg, moreinfo, code) {
    if (isNullUndf(code)) code = -1; // Si el código no se define se deja como 99
    if (notNullUndf(errordb[id])) return; // Si el error ya existe retorna
    errordb[id] = {
        code: code,
        id: id,
        moreinfo: moreinfo,
        msg: msg,
    }
}

/**
 * Inicia mensajes de error
 * @function
 */
function initErrors() {
    $addError('coreAppDbConn', 'Error al conectar con la base de datos', 'Ocurrió un error fatal al conectar con la base de datos', 0);
    $addError('coreAppRCDescarga', 'Error al descargar datos de regiones y comunas', 'Ocurrió un error fatal al descargar datos de regiones y comunas en la aplicación', 1);
    $addError('errorErrorObt', 'Error al obtener el error de la aplicación', 'Ocurrió un error fatal al obtener el código del error obtenido en la aplicación, contacte con su Administrador', 2);
    $addError('corePostGetError', 'Error al acceder de forma incorrecta a Servlet', 'Servlet no soporta el llamado especificado', 3);
    $addError('descargaArticulo', 'Error al descargar artículos', 'Ocurrió un error al descargar los artículos', 4);
    $addError('errorConsultaArticulos', 'Error al generar la consulta al servidor para obtener los artículos', 'Ocurrió un error fatal al generar la consulta al servidor para obtener los artículos', 5);
    $addError('descargaFotoComentario', 'Error al descargar comentarios de la fotografía', 'Ocurrió un error al consultar los comentarios de la fotografía seleccionada', 6);
}

/**
 * Oculta mensajes de error
 * @function
 */
function cleanErrorMsg() {
    $('#errorMsg').css('display', 'none');
    $('#errorMsgText').html('');
    // noinspection JSCheckFunctionSignatures
    $(window).off('resize.errorPanel');
}

/**
 * Escribe el error en el panel con una excepción
 * @function
 * @param {object} errorid - Objecto de errordb
 * @param {object} exceptionmsg - Objeto de excepción
 */
function throwErrorIDException(errorid, exceptionmsg) {

    /**
     * Obtiene contenedores
     * @type {JQuery<HTMLElement> | jQuery | HTMLElement}
     */
    let $maincontent = $('#mainContent');
    let $errormsg = $('#errorMsg');

    // Muestra el recuadro del error
    $maincontent.empty();
    $maincontent.css('display', 'none');
    $('#footer').css('display', 'none');
    $errormsg.css('display', 'block');
    $('#errorMsgText').html('<span class="errAlertIcon">{0}</span> {1}'.format('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span></span>', errorid.msg));

    /**
     * Elimina recuadro previo de errores
     */
    $('.err-back-home').each(function () {
        $(this).remove();
    });

    // noinspection HtmlUnknownTarget,QuirksModeInspectionTool,HtmlUnknownTarget
    /**
     * Crea mensaje reenvió a inicio
     */
    $errormsg.append('<a href="index.jsp" class="err-back-home hvr-bounce-in">{0} <i class="fas fa-home"></i></a>'.format(lang.back_home));

    /**
     * Crea el tooltip
     */
    try {
        $errormsg.tooltipster('delete');
    } catch (e) {
    } finally {
    }
    $errormsg.tooltipster({
        content: errorid.moreinfo + '.',
        contentAsHTML: true,
        maxWidth: $errormsg.width() * 0.8,
        side: 'bottom',
        theme: cfg_tooltip_theme,
    });

    /**
     * Muestra una notificación
     */
    if (cfg_always_show_err_notification) throwErrorNotification(errorid);
    let resizeObject = function () {
        // noinspection JSCheckFunctionSignatures
        $errormsg.css('top', (getElementHeight($(document)) - getElementHeight($errormsg)) / 2 + 'px');
    };
    resizeObject();
    // noinspection JSCheckFunctionSignatures
    $(window).on('resize.errorPanel', resizeObject);

    /**
     * Crea una entrada de la excepción en la consola
     */
    consoleLogError('Error #{0} <{2}>: {1}.'.format(errorid.code, errorid.msg, errorid.id), false);
    if (exceptionmsg != null) {
        console.error('EXCEPTION: {0} {1}.'.format(exceptionmsg.message, exceptionmsg.stack));
    }
    if (cfg_always_show_err_notification) {
        throwErrorNotification(errorid);
    }

}

/**
 * Escribe el error en el panel
 * @function
 * @param {object} errorid - Objeto de errordb
 */
function throwErrorID(errorid) {
    throwErrorIDException(errorid, null);
}

/**
 * Escribe un error añadiendo un código
 * @function
 * @param {object} errorid -  ID del error
 * @param {string} code - Código de error
 */
function throwErrorIDPlusCode(errorid, code) {
    let $newerror = $.extend({}, errorid);
    $newerror.moreinfo += '.<br /><span class="err-code">' + lang.error_code.format(code) + '</span>';
    throwErrorID($newerror);
}

/**
 * Escribe un error en toda la página
 * @function
 * @param {object} errorid - Objeto de errordb
 */
function throwFullErrorId(errorid) {
    throwErrorID(errorid);
}

/**
 * Lanza una notificación de error más un mensaje en la página web
 * @function
 * @param {object} errorid - Objeto de errordb
 */
function throwErrorMessage(errorid) {
    throwErrorNotification(errorid);
    if (cfg_verbose) {
        console.error('Error #{0} <{2}>: {1}'.format(errorid.code, errorid.msg, errorid.id));
    }
}

/**
 * Lanza un mensaje de exepción
 * @function
 * @param {object} exceptionmsg - Objeto de la excepción
 */
function throwExceptionMessage(exceptionmsg) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "extendedTimeOut": cfg_notification_extendedtimeout,
        "hideDuration": cfg_notification_hideduration,
        "hideEasing": "linear",
        "hideMethod": "fadeOut",
        "newestOnTop": false,
        "onclick": null,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "progressBar": false,
        "showDuration": cfg_notification_showduration,
        "showEasing": "swing",
        "showMethod": "fadeIn",
        "timeOut": cfg_notification_timeout
    };
    toastr['error'](exceptionmsg.message, 'Exception');
    if (cfg_verbose) {
        consoleLogException(exceptionmsg, false);
    }
    loadHandler(false);
}

/**
 * Muestra una advertencia al usuario
 * @function
 * @param {string} message - Mensaje de error
 */
function throwNotificationWarning(message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "extendedTimeOut": cfg_notification_extendedtimeout,
        "hideDuration": cfg_notification_hideduration,
        "hideEasing": "linear",
        "hideMethod": "fadeOut",
        "newestOnTop": false,
        "onclick": null,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "progressBar": false,
        "showDuration": cfg_notification_showduration,
        "showEasing": "swing",
        "showMethod": "fadeIn",
        "timeOut": cfg_notification_timeout
    };
    toastr['warning'](message);
}