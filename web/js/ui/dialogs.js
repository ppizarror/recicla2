/**
 DIALOGS
 Funciones de la interfaz gráfica que interactúan con el usuario a través de popups y notificaciones.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

// noinspection JSUnusedGlobalSymbols
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
        "hideMethod": "fadeOut"
    };
    toastr['success'](message);
}

// noinspection JSUnusedGlobalSymbols
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
        "hideMethod": "fadeOut"
    };
    toastr['info'](message);
}

/**
 * Lanza un popup de confirmación
 * @function
 * @param {string} title - Título del popup
 * @param {string} content - Contenido del popup
 * @param {object} options - Opciones de creación
 */
function confirmPopup(title, content, options) {
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

    // Actualiza parámetros
    if (options.escapeCancelKey) {
        options.escapeCancelKey = 'cancel';
    }

    // Crea el confirm
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