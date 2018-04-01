/**
 SHOW ITEM SERVER
 Funciones asociadas a la comunicación con el servidor para la visualización de un artículo.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Carga un artículo con un ID determinado
 * @param id {string}   ID del artículo
 * @return {Item}       Artículo
 */
function loadItemID(id) {
    let $item;
    for (let i = 0; i < test_items.length; i++) {
        /**
         * @type{Item}
         */
        $item = test_items[i];
        if ($item.getID() === id) {
            return $item;
        }
    }
    return null;
}