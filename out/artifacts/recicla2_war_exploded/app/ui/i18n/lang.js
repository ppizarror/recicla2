/**
 LANG
 Achivo general de idiomas y localización (i10n).

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Almacena los distintos idiomas
 * @ignore
 */
let $lang_db = {};

/**
 * Idioma seleccionado
 * @ignore
 */
let lang;

/**
 * Retorna un arreglo con todos los idiomas disponibles
 * @function
 * @return {Array} - Arreglo de strings del idioma
 */
function getAllLangAvaiable() {
    let k = Object.keys(lang);
    let l = [];
    for (let i = 0; i < k.length; i++) {
        l.push([k[i], $lang_db[k]['name_lang']]);
    }
    return l;
}

/**
 * Indica si un idioma existe
 * @function
 * @param langid {string} - ID del idioma
 * @returns {boolean}
 */
function langExists(langid) {
    return Object.keys($lang_db).indexOf(langid) !== -1;
}