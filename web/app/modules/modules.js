/**
 MODULES
 Módulos de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Contiene los llamados a las funciones a ejecutar tras iniciar un módulo
 * @type {Array}
 * @private
 */
let __afterModuleInit = [];

/**
 * Módulos de la aplicación
 */
let modules = {
    'fotoComentarios': {
        'file': 'index.jsp'
    },
};

/**
 * Carga el archivo definido por el módulo m
 * @function
 * @param m {object} - Archivo del módulo
 */
function loadModule(m) {
    window.location.href = m.file;
}

/**
 * Añade una función a afterModuleInit
 * @function
 * @param {function} $f - Función
 */
function addAfterInitModuleCallback($f) {
    __afterModuleInit.push($f);
}

/**
 * Llama a todas las funciones {@link __afterModuleInit}
 * @function
 */
function afterInitModuleCallback() {
    let $f;
    for (let i = 0; i < __afterModuleInit.length; i++) {
        $f = __afterModuleInit[i];
        $f();
    }
}