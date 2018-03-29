/**
 ERRORS
 Maneja los códigos de errores y los mensajes al usuario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Código de errores
var errordb = {
    "langNotExist": {
        "code": 0,
        "id": "langNotExist",
        "moreinfo": "La configuración cfg_lang_ui es incorrecta, compruebe el archivo de configuraciones de la app",
        "msg": "Configuración de idioma incorrecta"
    }
};

/**
 * Inicia mensajes de error
 */
function initErrors() {
    let $add = function (id, msg, moreinfo) {
        errordb[id] = {
            id: id,
            moreinfo: moreinfo,
            msg: msg
        }
    };

    /**
     * Añade errores
     */
}

// noinspection JSUnusedGlobalSymbols
/**
 * Oculta mensajes de error
 */
function cleanErrorMsg() {
    $('#errorMsg').css('display', 'none');
    $('#errorMsgText').html('');
    $(window).off('resize.errorPanel');
}

/**
 * Escribe el error en el panel con una excepción
 * @param {object} errorid          Objecto de errordb
 * @param {object} exceptionmsg     Objeto de exepción
 */
function throwErrorIDException(errorid, exceptionmsg) {
    var $maincontent = $('#mainContent');
    var $errormsg = $('#errorMsg');

    // Muestra el recuadro del error
    $maincontent.empty();
    $maincontent.css('display', 'none');
    $('#footer').css('display', 'none');
    $errormsg.css('display', 'block');
    $('#errorMsgText').html('<span class="errAlertIcon">{0}</span> {1}'.format('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>', errorid.msg));

    // Crea el tooltip
    try {
        $errormsg.tooltipster('delete');
    } catch (e) {
    } finally {
    }
    $errormsg.tooltipster({
        content: errorid.moreinfo + '.',
        maxWidth: $errormsg.width() * 0.8,
        side: 'bottom',
        theme: cfg_tooltip_theme
    });

    // Muestra una notificación
    if (cfg_always_show_err_notification) {
        throwErrorNotification(errorid);
    }
    var resizeObject = function () {
        $errormsg.css('top', (getElementHeight($(document)) - getElementHeight($errormsg)) / 2 + 'px');
    };
    resizeObject();
    $(window).on('resize.errorPanel', resizeObject);

    // Crea una entrada de la excepción en la consola
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
 * @param {object} errorid      Objeto de errordb
 */
function throwErrorID(errorid) {
    throwErrorIDException(errorid, null);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Escribe un error en toda la página
 * @param {object} errorid      Objeto de errordb
 */
function throwFullErrorId(errorid) {
    throwErrorID(errorid);
}

/**
 * Lanza una notificación de error
 * @param {object} errorid      Objeto de errordb
 */
function throwErrorNotification(errorid) {
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
    toastr['error'](errorid.moreinfo + '.', errorid.msg);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Lanza una notificación de error más un mensaje en la página web
 * @param {object} errorid      Objeto de errordb
 */
function throwErrorMessage(errorid) {
    throwErrorNotification(errorid);
    if (cfg_verbose) {
        console.error('Error #{0} <{2}>: {1}'.format(errorid.code, errorid.msg, errorid.id));
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Lanza un mensaje de exepción
 * @param {object} exceptionmsg     Objeto de la exepción
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
    loadHandler(false, '');
}

// noinspection JSUnusedGlobalSymbols
/**
 * Muestra una advertencia al usuario
 * @param {string} message      Mensaje de error
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