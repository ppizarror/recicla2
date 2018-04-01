/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

var list_item_container; // Contenedor listar ítems

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
    let list_item_c = new Container({
        elementClass: 'list-item-container',
        padding: 0
    });
    list_item_container = list_item_c.getDOM();

    /**
     * Carga los artículos y los dibuja
     */
    let $items = loadLastItemsFromServer();
    let $item;
    let $tableid = generateId(cfg_id_size);
    list_item_container.append('<table id="{0}" style="width:100%" class="display list-item-table nowrap"><thead><tr><th>{1}</th><th>{2}</th><th>{3}</th><th>{4}</th><th>{5}</th><th>{6}</th><th>{7}</th></tr></thead><tbody class="itemsContent"></tbody></table>'.format($tableid, lang.list_item_date, lang.list_item_item, lang.list_item_r, lang.list_item_c, lang.list_item_ncoments, lang.list_item_npics, lang.list_item_user_email));
    let $tablecontent = $('#' + $tableid).find('.itemsContent');

    /**
     * Dibuja los artículos
     */
    let $itemname;
    for (let i = 0; i < $items.length; i++) {
        /**
         * @type{Item}
         */
        $item = $items[i];

        // Acorta el nombre
        $itemname = trimShowItemName($item.getName());

        // noinspection HtmlUnknownTarget
        $tablecontent.append('<tr><td>{0}</td><td><a href="{7}" class="list-item-link-view" id="{8}">{1}</a></td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td><a href="mailto:{6}">{6}</a></td></tr>'.format($item.getDate(), $itemname.name, $item.getRegion(), $item.getComuna(), $item.getTotalComments(), $item.getTotalPhotos(), $item.getUserEmail(), modules.showItem.file.format($item.getID()), $itemname.id));

        // Si el nombre fue acordado añadir un tooltip
        $('#' + $itemname.id);
    }

    /**
     * Crea el Datatables
     */
        // noinspection JSCheckFunctionSignatures
    var $table = $('#{0}'.format($tableid));
    $table.DataTable({
        responsive: true,
        columnDefs: [{
            className: 'dt-center',
        }],
        language:
            {
                'url':
                lang.datatable_json_file
            }
        ,
        order:
            [
                [0, 'desc']
            ],
        initComplete: // Función que se carga al generar la tabla
            function () {
                if (cfg_listitem_center_module) { //Centra la página
                    centerMainContent();
                }
                fadeInMainContent(function () {
                    $(window).off('resize.listItemPanel');
                    var $f = function () {
                        if (cfg_listitem_center_module) { //Centra la página
                            centerMainContent();
                        }
                        adjustListItemWidth();
                        consoleLogInfo('w');
                    };
                    $(window).on('resize.listItemPanel', $f);
                    $f();
                })
            },
    });

    /**
     * Añade botón informar artículo
     */
    let $new_item_id = generateId(cfg_id_size);
    $(ui_main_content).append('<!--suppress ALL --><div class="list-item-bottom-bar"><div class="list-item-botton-buttoncontainer"><button id="{0}" type="button" class="btn btn-success list-item-bottom-button hvr-shadow">{1}</button></div></div>'.format($new_item_id, lang.list_item_new_item));
    $('#' + $new_item_id).on('click', function () {
        loadModule(modules.addItem);
    });
}

/**
 * Ajusta el contenido al ancho de la página a un 80%
 */
function adjustListItemWidth() {
    let $min = parseInt($(ui_main_content).css('min-width'), 10);
    let $max = parseInt($(ui_main_content).css('max-width'), 10);

    // Calcula nuevo ancho
    let $w = getElementWidth($(window)) * 0.8;

    // Ajusta el ancho según mínimo y máximo
    $w = Math.min($max, Math.max($min, $w));
    list_item_container.css('width', $w + 'px');
}

/**
 * Acorta el nombre de un artículo a lo pedido por configuración página visualización
 * @param name      Nombre de un artículo
 * @return {object}
 */
function trimShowItemName(name) {
    let $n = name; // Nombre
    let $s = false; // Indica si se acortó o no
    if (name.length > cfg_showitem_max_chars_name) {
        $n = name.substring(0, cfg_showitem_max_chars_name) + '…';
        $s = true;
    }

    return {
        id: generateId(cfg_id_size),
        name: $n,
        trimmed: $s
    }
}