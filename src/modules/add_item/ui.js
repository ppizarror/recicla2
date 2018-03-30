/**
 ADD ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Formulario
var $add_item_form_titles; // Elementos del formulario
var $add_item_form_id; // ID del formulario
var $add_item_total_pics = 1; // Imágenes totales añadidas al formulario
var $rc_chile = {
    "regiones": [{
        "NombreRegion": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
        {
            "NombreRegion": "Tarapacá",
            "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
        },
        {
            "NombreRegion": "Antofagasta",
            "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
        },
        {
            "NombreRegion": "Atacama",
            "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
        },
        {
            "NombreRegion": "Coquimbo",
            "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
        },
        {
            "NombreRegion": "Valparaíso",
            "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
        },
        {
            "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
            "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
        },
        {
            "NombreRegion": "Región del Maule",
            "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
        },
        {
            "NombreRegion": "Región del Biobío",
            "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
        },
        {
            "NombreRegion": "Región de la Araucanía",
            "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",]
        },
        {
            "NombreRegion": "Región de Los Ríos",
            "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
        },
        {
            "NombreRegion": "Región de Los Lagos",
            "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
        },
        {
            "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
            "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
        },
        {
            "NombreRegion": "Región de Magallanes y de la AntárVca Chilena",
            "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
        },
        {
            "NombreRegion": "Región Metropolitana de Santiago",
            "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
        }]
};

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
            "resizeThread": false
        },
        "2": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera",
            "form": '<!--suppress ALL --><div class="input-group"><label class="input-group-btn add-item-pic-label"><span class="btn btn-primary" style="cursor: pointer;"><input type="file" name="foto-articulo1" style="display: none;">{0}</span></label><input type="text" class="form-control add-item-pic-item-text" readonly disabled><span class="btn btn-success add-item-pic-new-pic"><i class="fas fa-plus"></i></span></div>'.format(lang.look_file),
            "newform": '',
            "resizeThread": false,
            "afterDrawFun": function () {
                let $a = $('.add-item-pic-new-pic');
                $a.tooltipster({
                    content: lang.add_new_photo_tooltip,
                    delay: 600,
                    side: 'bottom',
                    theme: cfg_tooltip_theme
                });
                var $id = this.id_form;
                var $resize = this.resizeFun;
                updateFileFormAddItemWatcher();

                // Añade una nueva entrada para agregar imagen
                var $f = function () {
                    if ($add_item_total_pics >= 5) {
                        return;
                    }
                    $add_item_total_pics += 1;
                    $('#{0}'.format($id)).append('<!--suppress ALL --><div class="input-group add-item-pic-new-entry-block"><label class="input-group-btn add-item-pic-label"><span class="btn btn-primary" style="cursor: pointer;"><input type="file" name="foto-articulo{2}"  style="display: none;">{0}</span></label><input type="text" class="form-control add-item-pic-item-text" readonly disabled></div>'.format(lang.look_file, lang.add_new_photo, $add_item_total_pics));
                    $resize();
                    updateFileFormAddItemWatcher();

                    if ($add_item_total_pics === 5) {
                        $('.add-item-pic-new-pic').fadeOut();
                    }
                };
                $a.on('click.addNewPic', $f);
            }
        },
        "3": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe",
            "form": "<select id='formRegiones' class='add-item-rc-selectors' name='region-articulo'></select>",
            "resizeThread": false,
        },
        "4": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-globe",
            "form": "<select id='formComunas' class='add-item-rc-selectors' name='comuna-articulo' disabled></select>",
            "resizeThread": false,
            "afterDrawFun": function () {
                addItemUpdateRCForm();
            }
        },
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-map-marker-alt",
            "form": "<input type='text' class='form-control add-item-form-text' name='calle-articulo' maxlength='150' size='60'>",
            "resizeThread": false
        },
        "6": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user",
            "form": "<input type='text' class='form-control add-item-form-text' name='nombre-contacto' maxlength='200' size='60'>",
            "resizeThread": false
        },
        "7": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope",
            "form": "<input type='text' class='form-control add-item-form-text' name='email-contacto' maxlength='100' size='40'>",
            "resizeThread": false
        },
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "form": "<input type='text' class='form-control add-item-form-text' name='fono-contacto' maxlength='20' size='20'>",
            "resizeThread": false
        }
    };

    // Genera el header
    let header = new Header();

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
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $add_item_form_titles[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
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
 * Actualiza el nombre de las imágenes en los label
 */
function updateFileFormAddItemWatcher() {
    $(document).on('change', ':file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $(document).ready(function () {
        $(':file').on('fileselect', function (event, numFiles, label) {
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if (input.length) {
                input.val(log);
            }
        });
    });
}

/**
 * Actualiza el formulario de las regiones y las comunas
 */
function addItemUpdateRCForm() {
    let iRegion = 0;
    let $hr = '<option value="sin-region">{0}</option>'.format(lang.add_item_r_pick);
    let $hc = '<option value="sin-region">{0}</option>'.format(lang.add_item_c_pick);
    $.each($rc_chile.regiones, function () {
        $hr = $hr + '<option value="' + $rc_chile.regiones[iRegion].NombreRegion + '">' + $rc_chile.regiones[iRegion].NombreRegion + '</option>';
        iRegion++;
    });
    var $ohr = $('#formRegiones');
    var $ohc = $('#formComunas');

    $ohr.html($hr);
    $ohc.html($hc);

    // noinspection JSValidateTypes
    $ohr.change(function () {
        var $ir = 0;
        var $ohc = $('#formComunas');
        $ohc.removeAttr('disabled');
        var $valr = $(this).val();
        var $htmlc = '';
        $.each($rc_chile.regiones, function () {
            if ($rc_chile.regiones[$ir].NombreRegion === $valr) {
                var iComunas = 0;
                $.each($rc_chile.regiones[$ir].comunas, function () {
                    $htmlc = $htmlc + '<option value="' + $rc_chile.regiones[$ir].comunas[iComunas] + '">' + $rc_chile.regiones[$ir].comunas[iComunas] + '</option>';
                    iComunas++;
                });
            }
            $ir++;
        });
        $ohc.html($htmlc);
    });
}