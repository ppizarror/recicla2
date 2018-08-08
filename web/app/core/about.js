/**
 ABOUT
 Provee la información del autor del software y de las bibliotecas.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Infomación del proyecto
 */
let aboutinfo = {
    "author": {
        "email": "pablo.pizarro@ing.uchile.cl",
        "github": "https://github.com/ppizarror",
        "name": "Pablo Pizarro R.",
        "tag": "@ppizarror",
        "website": "http://ppizarror.com/",
    },
    "dependencies": {
        "bootstrap": "4.0.0-beta",      // https://github.com/twbs/bootstrap
        "dataTables": "1.10.16",        // https://datatables.net/
        "fontawesome": "5.0.9",         // https://fontawesome.com
        "hover": "2.3.0",               // https://github.com/IanLunn/Hover
        "jquery": "3.3.1",              // https://github.com/jquery/jquery
        "jquery-confirm": "3.3.0",      // https://github.com/craftpip/jquery-confirm
        "jquery-dateFormat": "1.0.2",   // https://github.com/phstc/jquery-dateFormat
        "photoswipe": "4.1.2",          // http://photoswipe.com
        "slick": "1.8.0",               // http://kenwheeler.github.io
        "toastr": "2.1.4",              // https://github.com/CodeSeven/toastr
        "tooltipster": "4.2.6",         // https://github.com/iamceege/tooltipster
        "twbs-pagination": "1.4.2",     // https://github.com/josecebe/twbs-pagination
    },
    "productname": "Recicla2-Tarea4",
    "version": {
        "date": "08/08/2018",
        "v": "0.13",
    }
};

/**
 * Imprime un acerca-de en consola
 * @function
 * @ignore
 */
function printAboutInfo() {
    console.log('{0} v{1} ({2})'.format(aboutinfo.productname, aboutinfo.version.v, aboutinfo.version.date));
    console.log('{0} | {1}'.format(aboutinfo.author.name, aboutinfo.author.website));
    console.log('');
}