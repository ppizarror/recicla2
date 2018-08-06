/**
 MOBILE
 Eventos página móvil.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Indica si el modo móvil está activado
 * @public
 */
let cfg_mobile_page_enabled = false;

/**
 * Chequea que el modo móvil está activado
 * @function
 * @public
 * @ignore
 */
function checkMobileStatus() {
    let $f = function () {
        cfg_mobile_page_enabled = $(window).width() < cfg_width_enable_mobile;
    };
    $f();
    // noinspection JSUnresolvedFunction
    $(window).on('resize.mobileStatusChecker', $f);
}