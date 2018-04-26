/**
 UTILS
 Funciones utilitarias.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// String format
if (!String.prototype.format) {
    String.prototype.format = function () {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ?
                args[number] :
                match;
        });
    };
}

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna un color aleatorio
 * @return {string}
 */
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Aplica padding
 * @param nr
 * @param n
 * @returns {string}
 */
function padLeft(nr, n) {
    return Array(n - String(nr).length + 1).join('0') + nr;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Redondea un número
 * @param {number} num      Número
 * @param {number} scale    Cantidad de decimales
 * @return {number}         Número redondeado
 */
function roundNumber(num, scale) {
    // noinspection JSUnresolvedFunction
    if (!('' + num).includes('e')) {
        // noinspection JSCheckFunctionSignatures
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        let arr = ('' + num).split('e');
        let sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        let i = +arr[0] + 'e' + sig + (+arr[1] + scale);
        // noinspection JSCheckFunctionSignatures
        return +(Math.round(i) + 'e-' + scale);
    }
}

/**
 * Convierte un número decimal en hexadecimal
 * @param {number} dec      Número decimal
 * @return {string}         Número hexadecimal
 */
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
}

// noinspection JSUnusedGlobalSymbols
/**
 * Genera un string aleatorio
 * @param {number} len      Largo del string a generar
 * @return {string}         String aleatorio
 */
function generateId(len) {
    let arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}

// noinspection JSUnusedGlobalSymbols
/**
 * Borra un diccionario
 * @param {object} $dict        Diccionario
 */
function clearDict($dict) {
    let props = Object.keys($dict);
    for (let i = 0; i < props.length; i++) {
        delete $dict[props[i]];
    }
}

/**
 * Retorna verdadero si el objeto no es nulo e indefinido
 * @param {object} obj      Objeto a comprobar
 * @return {boolean}        Booleano de comprobación
 */
function notNullUndf(obj) {
    return (obj !== null && obj !== undefined);
}

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna verdadero si el objeto es nulo o indefinido
 * @param {object} obj      Objeto a comprobar
 * @return {boolean}
 */
function isNullUndf(obj) {
    return (obj === null || obj === undefined)
}

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna verdadero si el objeto es falso y no nulo
 * @param {object} obj      Objeto a comprobar
 * @return {boolean}
 */
function isFalseNotNull(obj) {
    return notNullUndf(obj) && !obj
}

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna verdadero si el objeto es verdadero y no nulo
 * @param {object} obj      Objeto a comprobar
 * @return {boolean}
 */
function isTrueNotNull(obj) {
    return notNullUndf(obj) && obj
}

/**
 * Muestra el botón para subir al tope de la página
 */
function showBackToTopButton() {
    if (cfg_back_to_top.enabled) {
        $(window).scroll(function () {
            location.pathname.replace(/^\//, '');
            // noinspection JSValidateTypes
            if ($(window).scrollTop() > cfg_back_to_top.px_to_trigger) {
                $('a.back-to-top').fadeIn('slow');
            } else {
                $('a.back-to-top').fadeOut('slow');
            }
        });
    }
}

/**
 * Retorna la altura en px del elemento en el DOM
 * @param elem {Object}         Elemento jQuery
 * @return {number}
 */
function getElementHeight(elem) {
    try {
        // noinspection JSValidateTypes
        return elem.outerHeight();
    } catch (e) {
        return -1;
    } finally {
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna el ancho en px del elemento en el DOM
 * @param elem {Object}         Elemento jQuery
 * @return {number}
 */
function getElementWidth(elem) {
    try {
        // noinspection JSValidateTypes
        return elem.outerWidth();
    } catch (e) {
        return -1;
    } finally {
    }
}

/**
 * Retorna el ancho en px del elemento en el DOM sin padding
 * @param elem {Object}         Elemento jQuery
 * @return {number}
 */
function getElementInnerWidth(elem) {
    try {
        // noinspection JSValidateTypes
        return elem.innerWidth();
    } catch (e) {
        return -1;
    } finally {
    }
}

/**
 * Muestra un mensaje de error en la consola
 * @param {string} msg      Mensaje
 * @param {boolean} w       Indica si se escribe el encabezado o no
 */
function consoleLogError(msg, w) {
    let $m;
    if (cfg_verbose) {
        if (w) {
            $m = 'ERROR: ';
        } else {
            $m = '';
        }
        console.error('{2}{1} [{0}]'.format(new Date().format('d/m/y H:i:s'), msg, $m));
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Muestra un mensaje de advertencia en la consola
 * @param {string} msg      Mensaje
 * @param {boolean} w       Indica si se escribe el encabezado o no
 */
function consoleLogWarn(msg, w) {
    let $m;
    if (cfg_verbose) {
        if (w) {
            $m = 'ERROR: ';
        } else {
            $m = '';
        }
        console.warn('{2}{1} [{0}]'.format(new Date().format('d/m/y H:i:s'), msg, $m));
    }
}

/**
 * Escribe un error en consola
 * @param exceptionmsg      Excepción
 * @param {boolean} w       Indica si se escribe el encabezado o no
 */
function consoleLogException(exceptionmsg, w) {
    let $m;
    if (cfg_verbose) {
        if (w) {
            $m = 'EXCEPTION: ';
        } else {
            $m = '';
        }
        console.error('{2}{0} {1}'.format(exceptionmsg.message, exceptionmsg.stack, $m));
    }
}

// noinspection JSUnusedGlobalSymbols
/**
 * Muestra un mensaje de información en la consola
 * @param {string} msg      Mensaje
 */
function consoleLogInfo(msg) {
    if (cfg_verbose) {
        console.log('[{0}] {1}'.format(new Date().format('d/m/y H:i:s'), msg));
    }
}

/**
 * Obtiene parámetro url
 * @param {string} name     Nombre del parámetro
 * @return {string}         Valor del parámetro
 */
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

// noinspection ES6ConvertVarToLetConst
/**
 * Funciones que se ejecutan luego de iniciar la aplicación.
 * @private
 */
var __initAppCallback = [];

// noinspection JSUnusedGlobalSymbols
/**
 * Agrega función al callback inicial.
 * @param {function} $f
 */
function pushInitAppCallbackFunction($f) {
    __initAppCallback.push($f);
}

/**
 * Llama a todas las funciones iniciales.
 */
function initAppCallback() {
    for (let i = 0; i < __initAppCallback.length; i++) {
        __initAppCallback[i]();
    }
}