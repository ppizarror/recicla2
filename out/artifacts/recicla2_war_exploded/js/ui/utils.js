/**
 UI UTILS
 Funciones utilitarias.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Centra el panel principal
 * @function
 * @public
 */
function centerMainContent() {
    let $maincontent = $(ui_main_content);
    $maincontent.css('position', 'relative');
    $maincontent.css('top', Math.max(0, (getElementHeight($(window)) - getElementHeight($(ui_main_content))) / 2) + 'px');
}

/**
 * Oculta el panel principal
 * @function
 * @public
 */
function hideMainContent() {
    let $maincontent = $(ui_main_content);
    $maincontent.css('display', 'none');
}

/**
 * Muestra el panel principal
 * @function
 * @public
 * @param {function} $f - Callback finalización
 */
function fadeInMainContent($f) {
    let $maincontent = $(ui_main_content);
    if (notNullUndf($f)) {
        $f();
        $maincontent.fadeIn(400);
    } else {
        $maincontent.fadeIn(400);
    }
}