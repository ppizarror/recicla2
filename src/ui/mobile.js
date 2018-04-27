/**
 MOBILE
 Eventos página móvil.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Indica si el modo móvil está activado
 */
var mobile_page_enabled = false;

/**
 * Chequea que el modo móvil está activado.
 */
function checkMobileStatus() {
    let $f = function () {
        mobile_page_enabled = $(window).width() < cfg_width_enable_mobile;
    };
    $f();
    $(window).on('resize.mobileStatusChecker', $f);
}