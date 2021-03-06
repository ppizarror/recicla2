/**
 RESOURCES
 Funciones asociadas al manejo de recursos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Ubicación loading img
 * @global
 * @ignore
 */
var res_loading_image = 'resources/ui/loading_flower.gif';

/**
 * Precarga los recursos de la plataforma
 * @function
 * @ignore
 */
function preloadResources() {
    let $d = $('#preload_resources');

    // Añade cada recurso a cargar
    $d.append('<img src="' + res_loading_image + '" alt="" />');
}