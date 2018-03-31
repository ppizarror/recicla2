/**
 SHOW ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

var $show_item_sections; // Secciones del artículo

/**
 * Crea el módulo en la ui.
 * @param $item
 */
function createShowItem($item) {

    /**
     * Cambia el título de la página
     */
    document.title = lang.show_item_title;

    /**
     * Genera el header y el contenedor
     */
    new Header({
        title: lang.show_item_title
    });
    let add_container = new Container({
        padding: 0
    });
    let $add_c = add_container.getDOM();

    /**
     * Inicia los datos del objeto
     */
    initShowItemSections($item);

    /**
     * Crea las columnas del formulario
     */
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $add_c.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn"></div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    /**
     * Dibuja los nombres del formulario
     */
    let $ftitle_k = Object.keys($show_item_sections);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $show_item_sections[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon hvr-icon-rotate"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
        }
    }

    /**
     * Genera el formulario
     */
    let $resizef;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $show_item_sections[$ftitle_k[i]];
        $k.id_value = generateId(cfg_id_size);
        $ocr.append('<div id={1} class="add_item_form_line">{0}</div>'.format($k.value, $k.id_value));

        // Genera el thread de ajuste del tamaño de cada título
        $resizef = autoResizeTitles($k.id_value, $k.id_title);
        $k.resizeFun = $resizef;
        $resizef();
        if ($k.resizeThread) {
            setInterval($resizef, cfg_ui_watchinterval); // Comprueba la altura del elemento
        }

        // Ejecuta la función afterDraw si existe
        if ($k.afterDrawFun !== undefined) {
            $k.afterDrawFun();
        }
    }
}

/**
 * Auto ajusta el tamaño de los títulos de cada entrada del formulario según la altura del formulario
 * @param formid            ID del formulario
 * @param titleid           ID del elemento del título
 * @return {function}
 */
function autoResizeTitles(formid, titleid) {
    return function () {
        // noinspection JSValidateTypes
        let h = $('#{0}'.format(formid)).outerHeight();
        $('#{0}'.format(titleid)).css('height', h + 'px');
    };
}

/**
 * Inicia el objeto del formulario.
 * @param $item
 */
function initShowItemSections($item) {
    $show_item_sections = {

        // Nombre artículo
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box",
            "value": "<div class='list-item-name'>{0}</div>".format($item.getName()),
            "resizeThread": false
        },

        // Descripción
        "1": {
            "name": lang.add_item_form_desc,
            "icon": "far fa-comment-alt",
            "value": "<div class='list-item-description'>{0}</div>".format($item.getDescription()),
            "resizeThread": false
        },

        // Fotos
        "2": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera",
            "value": "<div class='show-item-gallery'></div>",
            "resizeThread": true,
            "afterDrawFun": function () {
                let $pics = $item.getPhotos();
                let $container = $('.show-item-gallery');
                for (let i = 0; i < $item.getTotalPhotos(); i++) {
                    // noinspection QuirksModeInspectionTool
                    $container.append('<!--suppress ALL --><div class="show-item-small-pic hvr-grow"><img src="{0}" alt="{1}"/></div>'.format($pics[i], lang.show_item_pic_n.format(i + 1)));
                }
                $container.slick({
                    centerMode: false,
                    dots: true,
                    infinite: false,
                    slidesToShow: 1,
                    speed: 300,
                    variableWidth: true,
                    adaptiveHeight: true
                });
                this.resizeFun();
            }
        },

        // Región
        "3": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe",
            "value": "<div class='list-item-text'><a href='https://www.google.com/maps/search/{0},Chile'>{0}</a></div>".format($item.getRegion()),
            "resizeThread": false
        },

        // Comuna
        "4": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-globe",
            "value": "<div class='list-item-text'><a href='https://www.google.com/maps/search/{0},{1},Chile'>{0}</a></div>".format($item.getComuna(), $item.getRegion()),
            "resizeThread": false
        },

        // Calle
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-map-marker-alt",
            "value": "<div class='list-item-text'><a href='https://www.google.com/maps/search/{0}, {1}, {2}, Chile'>{0}</a></div>".format($item.getUserStreet(), $item.getComuna(), $item.getRegion()),
            "resizeThread": false
        },

        // Nombre del contacto
        "6": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user",
            "value": "<div class='list-item-text'>{0}</div>".format($item.getUserName()),
            "resizeThread": false
        },

        // E-mail del contacto
        "7": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope",
            "value": "<div class='list-item-text'><a href='mailto:{0}' class='show-item-email'>{0}</a></div>".format($item.getUserEmail()),
            "resizeThread": false
        },

        // Teléfono del contacto
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "value": "<div class='list-item-text'>+56{0}</div>".format($item.getUserPhone()),
            "resizeThread": false
        }
    };
}