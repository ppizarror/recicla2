/**
 DIALOGS
 Funciones de la interfaz gráfica que interactúan con el usuario a través de popups y notificaciones.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Muestra una notificación positiva al usuario
 * @function
 * @param {string} message - Mensaje
 */
function throwNotificationOk(message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": cfg_notification_showduration,
        "hideDuration": cfg_notification_hideduration,
        "timeOut": cfg_notification_timeout,
        "extendedTimeOut": cfg_notification_extendedtimeout,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };
    toastr['success'](message);
}

/**
 * Muestra una notificación de información al usuario
 * @function
 * @param {string} message - Mensaje
 */
function throwNotificationInfo(message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": cfg_notification_showduration,
        "hideDuration": cfg_notification_hideduration,
        "timeOut": cfg_notification_timeout,
        "extendedTimeOut": cfg_notification_extendedtimeout,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };
    toastr['info'](message);
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
        "progressBar": true,
        "showDuration": cfg_notification_showduration,
        "showEasing": "swing",
        "showMethod": "fadeIn",
        "timeOut": cfg_notification_timeout,
    };
    toastr['error'](errorid.moreinfo + '.', errorid.msg);
}

/**
 * Lanza un popup de confirmación
 * @function
 * @param {string} title - Título del popup
 * @param {string} content - Contenido del popup
 * @param {object} options - Opciones de creación
 */
function confirmPopup(title, content, options) {

    /**
     * Parámetros creación por defecto
     */
    let $defaults = {
        animation: 'zoom', // Animación de apertura
        backgroundDismiss: 'close', // Evento clickeo fuera del popup
        cancel: null, // Función que se ejecuta al cancelar
        cancelText: lang.answer_no, // Texto en botón cancelar
        confirm: null, // Función que se ejecuta al confirmar
        confirmText: lang.answer_yes, // Texto en botón confirmar
        draggable: true, // Indica si el popup se puede arrastrar
        escapeCancelKey: true, // Evento botón ESC
        icon: '', // Ícono del título
        watchInterval: 250, // Intervalo de observación de eventos
    };
    options = $.extend($defaults, options);
    if (options.escapeCancelKey) options.escapeCancelKey = 'cancel';

    // noinspection JSCheckFunctionSignatures
    /**
     * Crea el confirm
     */
    $.confirm({
        animateFromElement: false,
        animation: options.animation,
        backgroundDismiss: options.backgroundDismiss,
        columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
        containerFluid: cfg_mobile_page_enabled,
        content: content,
        draggable: options.draggable,
        dragWindowGap: 0,
        escapeKey: options.escapeCancelKey,
        icon: !cfg_mobile_page_enabled ? options.icon : '',
        theme: cfg_popup_theme,
        title: !cfg_mobile_page_enabled ? title : '',
        watchInterval: options.watchInterval,
        buttons: {
            confirm: {
                action: options.confirm,
                btnClass: 'btn-info',
                keys: ['y', 'enter'],
                text: options.confirmText
            },
            cancel: {
                action: options.cancel,
                keys: ['n'],
                text: options.cancelText
            }
        },
    });

}