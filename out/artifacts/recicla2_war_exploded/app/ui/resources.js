/**
 RESOURCES
 Funciones asociadas al manejo de recursos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Ubicación loading img
 * @global
 * @ignore
 */
let res_loading_image = 'res/ui/loading_flower.gif';

/**
 * Precarga los recursos de la plataforma
 * @function
 */
function preloadResources() {
    let $d = $('#preload_resources');
    $d.append('<img src="' + res_loading_image + '" alt="" />');
}