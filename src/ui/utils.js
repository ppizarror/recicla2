/**
 UI UTILS
 Funciones utilitarias.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Centra el panel principal
 */
function centerMainContent() {
    $(ui_main_content).css('position', 'relative');
    $(ui_main_content).css('top', Math.max(0, (getElementHeight($(window)) - getElementHeight($(ui_main_content))) / 2) + 'px');
}