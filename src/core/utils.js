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
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// noinspection JSUnusedGlobalSymbols
/**
 * Genera un string aleatorio
 * @param {number} len      Largo del string a generar
 * @return {string}         String aleatorio
 */
function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}

// noinspection JSUnusedGlobalSymbols
/**
 * Borra un diccionario
 * @param {object} $dict        Diccionario
 */
function clearDict($dict) {
    var props = Object.keys($dict);
    for (var i = 0; i < props.length; i++) {
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
        return elem.outerHeight(true);
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
        return elem.outerWidth(true);
    } catch (e) {
        return -1;
    } finally {
    }
}