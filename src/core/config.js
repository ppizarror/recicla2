/**
 CONFIG
 Configuraciones de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Configuraciones principales de la app
 */
var cfg_lang_ui = 'es'; // Idioma de la aplicación
var cfg_verbose = true; // Activa el output en consola
var cfg_width_enable_mobile = 600; // Pixeles activa modo móvil

/**
 * Configuraciones de la ui
 */
var cfg_back_to_top = {
    enabled: true, // Indica si la funcionalidad está activa
    px_to_trigger: 400, // Pixeles para activar el botón para subir
};
var cfg_header_applogo_effect = 'hvr-wobble-top'; // Efecto cursor sobre ícono app
var cfg_header_indexicon_effect = 'hvr-icon-buzz-out'; // Efecto cursor sobre ícono index
var cfg_id_size = 8; // Largo de las id aleatorias generadas
var cfg_popup_theme = 'material'; // Tema de los pop-up
var cfg_tooltip_theme = 'tooltipster-borderless'; // Tema de los tooltip
var cfg_ui_watchinterval = 250; // Intervalo para ver cambios en la ui (ms)

/**
 * Configuraciones de las notificaciones
 */
var cfg_always_show_err_notification = false;
var cfg_notification_extendedtimeout = 1000;
var cfg_notification_hideduration = 1000;
var cfg_notification_showduration = 300;
var cfg_notification_timeout = 8000;