/**
 ERRORS
 Maneja los códigos de errores y los mensajes al usuario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Código de errores

/**
 * Establece los mensajes de error una vez cargado el idioma
 */
function initErrors() {
    var errid = Object.keys(errordb);
    var i, j, lng;
    for (i = 0; i < errid.length; i++) {
        j = errid[i];
        if (errordb[j].code > 1) {
            lng = lang['errordb_{0}_msg'.format(j)];
            if (lng == null) {
                console.error(lang.error_errordb_langinit_msg.format(j));
                break;
            }
            errordb[j].msg = lng;
            lng = lang['errordb_{0}_moreinfo'.format(j)];
            if (lng == null) {
                console.error(lang.error_errordb_langinit_moreinfo.format(j));
                break;
            }
            errordb[j].moreinfo = lng;
            errordb[j].id = j;
        }
    }
}

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
    var $tooltipTheme;
    try {
        $tooltipTheme = theme.tooltipTheme;
    } catch (e) {
        $tooltipTheme = 'tooltipster-borderless';
    } finally {
    }
    $errormsg.tooltipster({
        content: errorid.moreinfo + '.',
        maxWidth: $errormsg.width() * 0.8,
        side: 'bottom',
        theme: $tooltipTheme
    });

    // Muestra una notificación
    if (cfg_always_show_err_notification) {
        throwErrorNotification(errorid);
    }
    var resizeObject = function () {
        $errormsg.css('top', (getElementHeight($(document)) - getElementHeight($('#header')) - getElementHeight($errormsg)) / 2 + 'px');
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

/**
 * Escribe un error en toda la página
 * @param {object} errorid      Objeto de errordb
 */
function throwFullErrorId(errorid) {
    $('#header').css('display', 'none');
    $('#menu').css('display', 'none');
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
    loadHandler(false, '');
}

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
        consoleLogException(exceptionmsg);
    }
    loadHandler(false, '');
}

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