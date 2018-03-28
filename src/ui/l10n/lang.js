/**
 LANG
 Achivo general de idiomas y localización (l10n)

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Globales
var $lang_db = {
    'es': {
        'name_lang': 'Español'
    }
};
var lang;

// noinspection JSUnusedGlobalSymbols
/**
 * Retorna un arreglo con todos los idiomas disponibles
 * @return {Array}
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
 * Indica si un idioma existe.
 * @param langid {string}       ID del idioma
 * @return {boolean}
 */
function langExists(langid) {
    return Object.keys($lang_db).indexOf(langid) !== -1;
}