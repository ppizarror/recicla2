/**
 COMUNICACIÓN CON EL SERVIDOR
 Configuraciones del módulo.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Carga un artículo en el servidor.
 */
function uploadItemToServer() {
    var $o = $('#' + cfg_additem_form_id);
    $o.on('submit', function (e) {

        // El formulario es válido
        if ($_add_item_is_valid) {

            /**
             * TODO
             * Se cargan los datos al servidor
             */
            e.preventDefault();
            $.alert({
                columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
                content: lang.add_item_form_ok_upload,
                title: lang.module_add_item,
                onClose: function () {
                    loadModule(modules.home);
                },
            });

        }

        // El formulario tiene errores
        else {
            e.preventDefault(); // Cancela el submit
        }
    });
    $o.submit();
}