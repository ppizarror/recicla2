// noinspection ES6ConvertVarToLetConst
/**
 ABOUT
 Provee la información del autor del software y de las bibliotecas.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Infomación del proyecto
var aboutinfo = {
    "author": {
        "email": "pablo.pizarro@ing.uchile.cl",
        "github": "https://github.com/ppizarror",
        "name": "Pablo Pizarro R.",
        "tag": "@ppizarror",
        "website": "http://ppizarror.com/"
    },
    "dependencies": {
        "bootstrap": "4.0.0-beta",      // https://github.com/twbs/bootstrap
        "dataTables": "1.10.16",        // https://datatables.net/
        "fontawesome": "5.0.9",         // https://fontawesome.com
        "hover": "2.3.0",               // https://github.com/IanLunn/Hover
        "jquery": "3.3.1",              // https://github.com/jquery/jquery
        "jquery-confirm": "3.3.0",      // https://github.com/craftpip/jquery-confirm
        "photoswipe": "4.1.2",          // http://photoswipe.com
        "slick": "1.8.0",               // http://kenwheeler.github.io
        "toastr": "2.1.4",              // https://github.com/CodeSeven/toastr
        "tooltipster": "4.2.6"          // https://github.com/iamceege/tooltipster
    },
    "productname": "Recicla2",
    "version": {
        "date": "25/04/2018",
        "v": "0.5.0"
    }
};

/**
 * Imprime un acerca-de en consola
 */
function printAboutInfo() {
    console.log('{0} v{1} ({2})'.format(aboutinfo.productname, aboutinfo.version.v, aboutinfo.version.date));
    console.log('{0} | {1}'.format(aboutinfo.author.name, aboutinfo.author.website));
    console.log('');
}