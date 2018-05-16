/**
 UI UTILS
 Funciones utilitarias.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Centra el panel principal
 * @function
 */
function centerMainContent() {
    let $maincontent = $(ui_main_content);
    $maincontent.css('position', 'relative');
    $(ui_main_content).css('top', Math.max(0, (getElementHeight($(window)) - getElementHeight($(ui_main_content))) / 2) + 'px');
}

/**
 * Oculta el panel principal
 * @function
 */
function hideMainContent() {
    let $maincontent = $(ui_main_content);
    $maincontent.css('display', 'none');
}

/**
 * Muestra el panel principal
 * @function
 * @param {function} $f - Callback finalización
 */
function fadeInMainContent($f) {
    let $maincontent = $(ui_main_content);
    if (notNullUndf($f)) {
        $maincontent.fadeIn(400, $f);
    } else {
        $maincontent.fadeIn(400);
    }
}