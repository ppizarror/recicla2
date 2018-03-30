/**
 ADD ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Formulario
var $add_item_form_titles; // Elementos del formulario
var $add_item_form_id; // ID del formulario

function createAddItem() {

    // Genera los títulos del formulario
    $add_item_form_titles = {
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box",
            "form": "<input type='text' class='form-control add-item-form-text' name='nombre-articulo' maxlength='80' size='40'>",
            "resizeThread": false
        },
        "1": {
            "name": lang.add_item_form_desc,
            "icon": "far fa-comment-alt",
            "form": "<textarea class='form-control add-item-description' rows='3' name='descripcion-articulo' maxlength='1000'></textarea>",
            "resizeThread": true
        },
        "2": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera",
            "form": "",
            "resizeThread": false
        },
        "3": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe",
            "form": "",
            "resizeThread": false
        },
        "4": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-globe",
            "form": "",
            "resizeThread": false
        },
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-map-marker",
            "form": "",
            "resizeThread": false
        },
        "6": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user",
            "form": "",
            "resizeThread": false
        },
        "7": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope",
            "form": "",
            "resizeThread": false
        },
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "form": "",
            "resizeThread": false
        }
    };

    // Genera el contador
    let add_container = new Container({
        backgroundColor: '#393939',
        padding: 0
    });
    let $add_c = add_container.getDOM();

    // Crea las columnas del formulario
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $add_c.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn"></div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    // Dibuja los nombres del formulario
    let $ftitle_k = Object.keys($add_item_form_titles);
    console.log($ftitle_k);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $add_item_form_titles[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
        }
    }

    // Genera el formulario
    $add_item_form_id = generateId(cfg_id_size);
    $ocr.append('<form id="{0}" name="addItem"></form>'.format($add_item_form_id));
    let $formobj = $('#{0}'.format($add_item_form_id));
    let $resizef;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $add_item_form_titles[$ftitle_k[i]];
        $k.id_form = generateId(cfg_id_size);
        $formobj.append('<div id={1} class="add_item_form_line">{0}</div>'.format($k.form, $k.id_form));

        // Genera el thread de ajuste del tamaño de cada título
        $resizef = autoResizeTitles($k.id_form, $k.id_title);
        $resizef();
        if ($k.resizeThread) {
            setInterval($resizef, cfg_ui_watchinterval); // Comprueba la altura del elemento
            $k.resizeFun = $resizef;
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