/**
 ADD ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

function createAddItem() {

    // Formulario
    let $form_titles = {
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box"
        },
        "1": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera"
        },
        "2": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe"
        },
        "3": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-globe"
        },
        "4": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-map-marker"
        },
        "5": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user"
        },
        "6": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope"
        },
        "7": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone"
        }
    };

    // Genera el contador
    let add_container = new Container({
        padding: 0
    });
    let $add_c = add_container.getDOM();

    // Crea las columnas del formulario
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $add_c.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn">b</div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    // Dibuja los nombres del formulario
    let $ftitle_k = Object.keys($form_titles);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $form_titles[$ftitle_k[i]];
        if ($k.icon !== '') {
            $ocl.append('<div class="add_item_form_line add-item-nameobj"><i class="{1} add-item-nameobj-icon"></i>{0}</div>'.format($k.name, $k.icon));
        } else {
            $ocl.append('<div class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name));
        }

    }
}