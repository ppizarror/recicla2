/**
 COMUNICACIÓN CON EL SERVIDOR
 Configuraciones del módulo.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Carga un artículo en el servidor.
 * @return
 */
function uploadItemToServer() {
    let $o = $('#' + cfg_additem_form_id);
    $o.on('submit', function (e) {

        // El formulario es válido
        if ($_add_item_is_valid) {
        }

        // El formulario tiene errores
        else {
            e.preventDefault(); // Cancela el submit
        }
    });
    $o.submit();
}