/**
 LIST ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Contenedor listar ítems
 * @type {jQuery|HTMLElement|*}
 */
var list_item_container;

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
    let $items = items;
    let $item;
    let $tableid = generateId(cfg_id_size);
    list_item_container.append('<table id="{0}" style="width:100%" class="display list-item-table nowrap"><thead><tr><th>{1}</th><th>{2}</th><th>{3}</th><th>{4}</th><th>{5}</th><th>{6}</th><th>{7}</th><th>{8}</th><th>{9}</th><th>{10}</th></tr></thead><tbody class="itemsContent"></tbody></table>'.format($tableid, lang.list_item_date, lang.list_item_item, lang.list_item_r, lang.list_item_c, lang.list_item_ncoments, lang.list_item_npics, lang.list_item_user_email, lang.list_item_user_name, lang.list_item_user_phone, lang.list_item_user_street));
    let $tablecontent = $('#' + $tableid).find('.itemsContent');

    /**
     * Dibuja los artículos
     */
    let $itemname;
    for (let i = 0; i < $items.length; i++) {

        // Verifica que no se hayan cargado más de los elementos límite
        if (i === cfg_listitem_initial_loads) {
            break;
        }

        /**
         * Carga el ítem
         * @type    {Item}
         */
        $item = $items[i];

        // Acorta el nombre
        $itemname = trimShowItemName($item.getName());

        // noinspection HtmlUnknownTarget
        $tablecontent.append('<tr><td>{0}</td><td><a href="{7}" class="list-item-link-view" id="{8}">{1}</a></td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td><a href="mailto:{6}">{6}</a></td><td>{9}</td><td>{10}</td><td>{11}</td></tr>'.format($item.getDate(), $itemname.name, $item.getRegion(), $item.getComuna(), $item.getTotalComments(), $item.getTotalPhotos(), $item.getUserEmail(), modules.showItem.file.format($item.getID()), $itemname.id, $item.getUserName(), $item.getUserPhone(), $item.getUserStreet()));

        // Si el nombre fue acordado añadir un tooltip
        if ($itemname.trimmed) {
            $('#' + $itemname.id).tooltipster({
                animation: 'grow',
                content: $itemname.original,
                contentAsHTML: true,
                delay: cfg_listitem_user_hoverdelay_tooltip_maxchars,
                maxWidth: 280,
                side: 'bottom',
                theme: cfg_tooltip_theme,
                timer: 0
            });
        }
    }

    /**
     * Crea el Datatables
     */
        // noinspection JSCheckFunctionSignatures
    let $table = $('#{0}'.format($tableid));
    $table.DataTable({
        responsive: true,
        paging: false,
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

                //Centra la página
                if (cfg_listitem_center_module) {
                    centerMainContent();
                }

                // Muestra el contenido de la página
                fadeInMainContent(function () {
                    $(window).off('resize.listItemPanel');
                    let $f = function () {
                        if (cfg_listitem_center_module) { //Centra la página
                            centerMainContent();
                        }
                        adjustListItemWidth();
                    };
                    $(window).on('resize.listItemPanel', $f);
                    $f();
                });

                // Oculta el panel de carga
                loadHandler(false);
            },
    });

    /**
     * Añade botones paginadores
     */
    let $paginator_id = generateId(cfg_id_size);
    let $pag_prev = generateId(cfg_id_size);
    let $pag_post = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool
    list_item_container.append('<div id="{0}"><button id="{4}" type="button" class="btn list-item-paginator-button hvr-shadow">{2}</button><button type="button" class="btn list-item-paginator-button hvr-shadow" id="{3}">{1}</button></div>'.format($paginator_id, lang.page_prev, lang.page_post, $pag_prev, $pag_post));

    /**
     * Se comprueba botón página previa
     */
    $pag_prev = $('#' + $pag_prev);
    if (list_item_prev_page === 0) {
        $pag_prev.prop('disabled', true);
        $pag_prev.removeClass('hvr-shadow');
        $pag_prev.css('cursor', 'default');
    } else {
        if (list_item_prev_page === -1) {
            list_item_prev_page = 0;
        }
        $pag_prev.on('click', function () {
            window.location.href = 'index.php?from={0}'.format(list_item_prev_page);
        });
    }

    /**
     * Se comprueba botón página posterior
     */
    $pag_post = $('#' + $pag_post);
    if (list_item_next_page === 0) {
        $pag_post.prop('disabled', true);
        $pag_post.removeClass('hvr-shadow');
        $pag_post.css('cursor', 'default');
    } else {
        $pag_post.on('click', function () {
            window.location.href = 'index.php?from={0}'.format(list_item_next_page);
        });
    }

    /**
     * Añade botón informar artículo
     */
    let $new_item_id = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool
    $(ui_main_content).append('<div class="list-item-bottom-bar"><div class="list-item-botton-buttoncontainer"><button id="{0}" type="button" class="btn btn-success list-item-bottom-button hvr-shadow">{1}</button></div></div>'.format($new_item_id, lang.list_item_new_item));
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
 * @param name {string}     Nombre de un artículo
 * @return {object}         Retorna objeto status trim
 */
function trimShowItemName(name) {
    let $n = name; // Nombre
    let $s = false; // Indica si se acortó o no
    if (name.length > cfg_listitem_max_chars_name) {
        $n = name.substring(0, cfg_listitem_max_chars_name) + '…';
        $s = true;
    }

    return {
        id: generateId(cfg_id_size),
        name: $n,
        original: name,
        trimmed: $s
    }
}