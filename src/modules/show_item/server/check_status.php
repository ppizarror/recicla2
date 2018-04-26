<?php
/**
 * Chequea el status de upload en index.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Chequea que un ítem se subió, se manda una alerta.
 */
function checkAddItemStatus()
{
    global $DISPLAY_ADDITEM_POPUP;
    if ($DISPLAY_ADDITEM_POPUP) {
        // Se escribe un popup al cargar
        echo "<script>
        function uploadItemOkPopup() {
            $.alert({
                columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
                content: lang.add_item_form_ok_upload,
                title: lang.module_add_item
            });
        }
        addAfterInitModuleCallback(uploadItemOkPopup);
    </script>\n";
    }
}