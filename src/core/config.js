/**
 CONFIG
 Configuraciones de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * ----------------------------------------------------------------------------
 * Configuraciones de la aplicación
 * ----------------------------------------------------------------------------
 */

/**
 * Idioma de la aplicación
 * @type {string}
 */
var cfg_lang_ui = 'es';

/**
 * Activa el otuput en la consola
 * @type {boolean}
 */
var cfg_verbose = true;

/**
 * Cantidad de pixeles para diferenciar versión móvil de escritorio
 * @type {number}
 */
var cfg_width_enable_mobile = 600;


/**
 * ----------------------------------------------------------------------------
 * Configuraciones de la UI
 * ----------------------------------------------------------------------------
 */

/**
 * Configuraciones botón subir hasta el techo
 * @type {{enabled: boolean, px_to_trigger: number}}
 */
var cfg_back_to_top = {
    enabled: true, // Indica si la funcionalidad está activa
    px_to_trigger: 400, // Pixeles para activar el botón para subir
};

/**
 * Efecto cursor sobre ícono app
 * @type {string}
 */
var cfg_header_applogo_effect = 'hvr-wobble-top';

/**
 * Efecto cursor sobre ícono index
 * @type {string}
 */
var cfg_header_indexicon_effect = 'hvr-icon-buzz-out';

/**
 * Largo de las id aleatorias generadas
 * @type {number}
 */
var cfg_id_size = 8;

/**
 * Tema de los pop-up
 * @type {string}
 */
var cfg_popup_theme = 'material';

/**
 * Tema de los tooltip
 * @type {string}
 */
var cfg_tooltip_theme = 'tooltipster-borderless';

/**
 * Intervalo para ver cambios en la ui (ms)
 * @type {number}
 */
var cfg_ui_watchinterval = 250;

/**
 * ----------------------------------------------------------------------------
 * Configuraciones de las notificaciones
 * ----------------------------------------------------------------------------
 */

/**
 * Mostrar siempre notificaciones con los errores
 * @type {boolean}
 */
var cfg_always_show_err_notification = true;

/**
 * Tiempo de timeout en las notificaciones
 * @type {number}
 */
var cfg_notification_extendedtimeout = 1000;

/**
 * Tiempo para .hide() en las notificaciones
 * @type {number}
 */
var cfg_notification_hideduration = 1000;

/**
 * Tiempo de .show() en las notificaciones
 * @type {number}
 */
var cfg_notification_showduration = 300;

/**
 * Tiempo timeout de las notificaciones
 * @type {number}
 */
var cfg_notification_timeout = 8000;