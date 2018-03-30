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
        elementClass: 'list-item-container',
        padding: 0
    });
    let $add_c = add_container.getDOM();

    // Carga los artículos y los dibuja
    let $items = loadLastItemsFromServer();
    let $item;
    let $tableid = generateId(cfg_id_size);
    $add_c.append('<table id="{0}" width="100%" class="display list-item-table responsive" cellspacing="0" ><thead><tr><th>{1}</th><th>{2}</th><th>{3}</th><th>{4}</th><th>{5}</th><th>{6}</th><th>{7}</th></tr></thead><tbody class="itemsContent"></tbody></table>'.format($tableid, lang.list_item_date, lang.list_item_item, lang.list_item_r, lang.list_item_c, lang.list_item_ncoments, lang.list_item_npics, lang.list_item_user_email));
    let $tablecontent = $('#' + $tableid).find('.itemsContent');

    // Dibuja los artículos
    for (let i = 0; i < $items.length; i++) {
        /**
         * @type{Item}
         */
        $item = $items[i];
        $tablecontent.append('<tr><td>{0}</td><td><a href="{7}" class="list-item-link-view">{1}</a></td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td></tr>'.format($item.getDate(), $item.getName(), $item.getRegion(), $item.getComuna(), $item.getTotalComments(), $item.getTotalPhotos(), $item.getUserEmail(), modules.showItem.file.format($item.getID())));
    }

    // noinspection JSCheckFunctionSignatures
    var $table = $('#{0}'.format($tableid));
    var $tobj;
    $tobj = $table.DataTable({
        responsive: true,
        columnDefs: [
            {responsivePriority: 1, targets: 0},
            {responsivePriority: 2, targets: -2}
        ],
        'language':
            {
                'url':
                lang.datatable_json_file
            }
        ,
        'order':
            [
                [0, 'desc']
            ],
        'initComplete':

            function () {
                // Centra la página
                if (cfg_listitem_center_module) {
                    centerMainContent();
                    $(window).off('resize.errorPanel');
                    $(window).on('resize.errorPanel', centerMainContent);
                }
            }
    })
    ;
}