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

/**
 * Configuraciones de la ui
 */
var cfg_back_to_top = {
    enabled: true, // Indica si la funcionalidad está activa
    px_to_trigger: 600, // Pixeles para activar el botón para subir
};
var cfg_tooltip_theme = 'tooltipster-borderless'; // Tema de los tooltip

/**
 * Configuraciones de las notificaciones
 */
var cfg_always_show_err_notification = true;
var cfg_notification_extendedtimeout = 1000;
var cfg_notification_hideduration = 1000;
var cfg_notification_showduration = 300;
var cfg_notification_timeout = 8000;