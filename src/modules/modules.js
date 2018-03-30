/**
 MODULES
 Módulos de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// noinspection JSUnusedGlobalSymbols
/**
 * Módulos de la aplicación
 */
var modules = {
    'addItem': {
        'file': 'add_item.html'
    },
    'listItem': {
        'file': 'list_item.html'
    },
    'showItem': {
        'file': 'show_item.html?id={0}'
    }
};

// noinspection JSUnusedGlobalSymbols
/**
 * Carga el archivo definido por el módulo m
 * @param m {String}        Archivo del módulo
 */
function loadModule(m) {
    window.location.href = m;
}