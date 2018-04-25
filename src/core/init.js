/**
 INIT
 Inicia la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Inicia la aplicación
 */
$(function () {

    // Imprime el acerca-de
    printAboutInfo();

    // Establece el idioma
    if (langExists(cfg_lang_ui)) {
        lang = $lang_db[cfg_lang_ui];
    } else {
        throwErrorID(errordb.langNotExist);
    }

    // Inicia los errores
    initErrors();

    // Activa el botón back to top
    showBackToTopButton();

    // Verifica el modo móvil
    checkMobileStatus();

    // Precarga recursos
    preloadResources();

    // Llamada a callbacks
    initAppCallback();
});