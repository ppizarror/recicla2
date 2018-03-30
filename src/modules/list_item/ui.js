/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Crea el módulo en la ui.
 */
function createListItem() {

    /**
     * Cambia el título de la página
     */
    document.title = lang.module_list_item;

    /**
     * Genera el header y el contenedor
     */
    new Header({
        title: lang.list_item_title,
        showBackButton: false
    });
    let add_container = new Container({
        padding: 0
    });
    let $add_c = add_container.getDOM();
}