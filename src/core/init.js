/**
 INIT
 Inicia la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Inicia el programa
 */
$(document).ready(function () {
    // Imprime el acerca-de
    printAboutInfo();

    // Establece el idioma
    if (langExists(cfg_lang_ui)) {
        console.log($lang_db);
        lang = $lang_db[cfg_lang_ui];
    } else {

    }

    // Activa el botón back to top
    showBackToTopButton();
});