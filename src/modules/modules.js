/**
 MODULES
 Módulos de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Módulos de la aplicación
 * @var
 */
var modules = {
    'addItem': {
        'file': 'add_item.php'
    },
    'listItem': {
        'file': 'index.php'
    },
    'showItem': {
        'file': 'show_item.php?id={0}'
    },
    'home': {
        'file': 'index.php'
    }
};

/**
 * Carga el archivo definido por el módulo m
 * @function
 * @param m {object} - Archivo del módulo
 */
function loadModule(m) {
    window.location.href = m.file;
}

// noinspection ES6ConvertVarToLetConst
/**
 * Contiene los llamados a las funciones a ejecutar tras iniciar un módulo
 * @function
 * @type {Array}
 * @private
 * @ignore
 */
var __afterModuleInit = [];

/**
 * Añade una función a afterModuleInit
 * @function
 * @param {function} $f - Función
 */
function addAfterInitModuleCallback($f) {
    __afterModuleInit.push($f);
}

/**
 * Llama a todas las funcionesafterModuleInit
 * @function
 */
function afterInitModuleCallback() {
    let $f;
    for (let i = 0; i < __afterModuleInit.length; i++) {
        $f = __afterModuleInit[i];
        $f();
    }
}