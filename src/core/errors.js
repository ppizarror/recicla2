/**
 ERRORS
 Maneja los códigos de errores y los mensajes al usuario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Código de errores
 * @type {{langNotExist: {code: number, id: string, moreinfo: string, msg: string}}}
 */
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
 * @function
 */
function initErrors() {
    let $add = function (id, msg, moreinfo, code) {
        errordb[id] = {
            code: code,
            id: id,
            moreinfo: moreinfo,
            msg: msg
        }
    };

    /**
     * Añade errores
     */
    $add('itemNotExist', lang.item_not_exist_msg, lang.item_not_exist_moreinfo, 1);
    $add('badErrorId', lang.bad_error_id_msg, lang.bad_error_id_moreinfo, 2);
    $add('uploadItemNotValid', lang.upload_item_failed_validation_msg, lang.upload_item_failed_validation_moreinfo, 3);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Oculta mensajes de error
 * @function
 */
function cleanErrorMsg() {
    $('#errorMsg').css('display', 'none');
    $('#errorMsgText').html('');
    $(window).off('resize.errorPanel');
}

/**
 * Escribe el error en el panel con una excepción
 * @function
 * @param {object} errorid - Objecto de errordb
 * @param {object} exceptionmsg - Objeto de excepción
 */
function throwErrorIDException(errorid, exceptionmsg) {
    let $maincontent = $('#mainContent');
    let $errormsg = $('#errorMsg');

    // Muestra el recuadro del error
    $maincontent.empty();
    $maincontent.css('display', 'none');
    $('#footer').css('display', 'none');
    $errormsg.css('display', 'block');
    $('#errorMsgText').html('<span class="errAlertIcon">{0}</span> {1}'.format('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><span></span>', errorid.msg));

    // noinspection HtmlUnknownTarget,QuirksModeInspectionTool
    $errormsg.append('<a href="index.php" class="err-back-home hvr-bounce-in">{0} <i class="fas fa-home"></i></a>'.format(lang.back_home));

    // Crea el tooltip
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
        theme: cfg_tooltip_theme
    });

    // Muestra una notificación
    if (cfg_always_show_err_notification) {
        throwErrorNotification(errorid);
    }
    let resizeObject = function () {
        $errormsg.css('top', (getElementHeight($(document)) - getElementHeight($errormsg)) / 2 + 'px');
    };
    resizeObject();
    // noinspection JSUnresolvedFunction
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
 * @function
 * @param {object} errorid - Objeto de errordb
 */
function throwErrorID(errorid) {
    throwErrorIDException(errorid, null);
}

// noinspection JSUnusedGlobalSymbols
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

// noinspection JSUnusedGlobalSymbols
/**
 * Escribe un error en toda la página
 * @function
 * @param {object} errorid - Objeto de errordb
 */
function throwFullErrorId(errorid) {
    throwErrorID(errorid);
}

/**
 * Lanza una notificación de error
 * @function
 * @param {object} errorid - Objeto de errordb
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
 * @function
 * @param {object} errorid - Objeto de errordb
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
    loadHandler(false, '');
}

// noinspection JSUnusedGlobalSymbols
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