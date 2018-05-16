/**
 ADD ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */


// noinspection ES6ConvertVarToLetConst
/**
 * Elementos del formulario
 * @ignore
 */
var $add_item_form_titles;

// noinspection ES6ConvertVarToLetConst
/**
 * Imágenes totales añadidas al formulario
 * @ignore
 * @type {number}
 */
var $add_item_total_pics = 1;

/**
 * Crea el módulo en la ui
 * @function
 * @ignore
 */
function createAddItem() {

    /**
     * Inicia el objeto del formulario
     */
    initAddItemFormObject();

    /**
     * Cambia el título de la página
     */
    document.title = lang.module_add_item;

    /**
     * Genera el header y el contenedor
     */
    let additem_header = new Header({
        showAppInfoRight: true,
        showBackButton: true,
        title: lang.module_add_item
    });
    let add_container = new Container({
        padding: 0
    });

    additem_header.init();
    add_container.init();

    let $add_c = add_container.getDOM();

    /**
     * Crea las columnas del formulario
     */
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $add_c.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn"></div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    // noinspection JSUnresolvedFunction
    /**
     * Desactiva selección columna izquierda
     */
    $ocl.on('selectstart dragstart', false);

    /**
     * Dibuja los nombres del formulario
     */
    let $ftitle_k = Object.keys($add_item_form_titles);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $add_item_form_titles[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon hvr-icon-rotate"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
        }
    }

    // noinspection HtmlUnknownTarget
    /**
     * Genera el formulario
     */
    $ocr.append('<form id="{0}" name="addItem" method="post" autocomplete="off" action="src/server/upload_item.php" enctype="multipart/form-data"><input type="hidden" name="MAX_FILE_SIZE" value="4194304" /><input type="hidden" id="addItemformValidated" name="form-validated" value="false" /><input type="submit" style="display: none"></form>'.format(cfg_additem_form_id));
    let $formobj = $('#{0}'.format(cfg_additem_form_id));
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

        // Ejecuta la función de validación si existe
        if ($k.validate !== undefined) {
            $k.validate();
        }
    }

    /**
     * Añade barra botones
     */
    let $b_cancel_id = generateId(cfg_id_size);
    let $b_add_id = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool
    $(ui_main_content).append('<div class="add-item-bottom-bar"><div class="add-item-botton-buttoncontainer"><button id="{2}" type="button" class="btn btn-danger add-item-bottom-button  hvr-shadow">{0}</button><button id="{3}" type="button" class="btn btn-success add-item-bottom-button hvr-shadow">{1}</button></div></div>'.format(lang.add_item_cancel, lang.add_item_add, $b_cancel_id, $b_add_id));

    // Botón cancelar cierra módulo y carga módulo listar
    // noinspection JSUnresolvedFunction
    $('#' + $b_cancel_id).on('click.cancelFormButton', function () {
        confirmPopup(lang.add_item_cancel_title, lang.add_item_cancel_ask, {
            icon: 'fas fa-exclamation-triangle',
            confirm: function () {
                loadModule(modules.listItem);
            }
        });
    });

    // Botón guardar artículo
    // noinspection JSUnresolvedFunction
    $('#' + $b_add_id).on('click.submitFormButtom', function () {
        // Se valida el formulario
        let $validate = validateAddItemForm();

        /**
         * El formulario no tiene errores, se suben los datos al servidor
         */
        if (!$validate.failed) {
            uploadItemToServer();
        }

        /**
         * El formulario tuvo errores, se muestran en pantalla
         */
        else {
            $.alert({
                animateFromElement: false,
                animation: 'scale',
                columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
                content: ($validate.nfail === 1 ? lang.add_item_form_error_1 : lang.add_item_form_error_n.format($validate.nfail)) + '.',
                draggable: true,
                dragWindowGap: 0,
                escapeKey: false,
                icon: 'fas fa-exclamation-triangle',
                theme: cfg_popup_theme,
                title: lang.error,
                buttons: {
                    ok: {
                        /**
                         * Se muestra el tooltip sobre el input al cerrar el diálogo
                         */
                        action: onClosePopupErrorAddItemHandler,
                        btnClass: 'btn-danger',
                        keys: ['enter', 'esc'],
                        text: lang.close
                    }
                }
            });
        }
    });
}

/**
 * Función que se ejecuta después de cerrar el pop-up de errores al intentar enviar el formulario
 * @function
 * @ignore
 */
function onClosePopupErrorAddItemHandler() {
    if (notNullUndf($_validation_add_item_tooltip)) {
        // noinspection JSUnresolvedFunction
        $_validation_add_item_tooltip.tooltipster('open');
    }
}

/**
 * Auto ajusta el tamaño de los títulos de cada entrada del formulario según la altura del formulario
 * @function
 * @param {string} formid - ID del formulario
 * @param {string} titleid - ID del elemento del título
 * @return {function} - Función ajuste del css
 * @ignore
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
 * @function
 * @ignore
 */
function updateFileFormAddItemWatcher() {
    // noinspection JSUnresolvedFunction
    $(document).on('change', ':file', function () {
        let input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    // noinspection JSDeprecatedSymbols
    $(document).ready(function () {
        // noinspection JSUnresolvedFunction
        $(':file').on('fileselect', function (event, numFiles, label) {
            let input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            if (input.length) {
                input.val(log);
            }
            validateAddItemPic(input);
        });
    });
}

/**
 * Inicia el objeto del formulario
 * @function
 * @ignore
 */
function initAddItemFormObject() {
    // noinspection QuirksModeInspectionTool
    $add_item_form_titles = {

        // Nombre artículo
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box",
            "form": "<input type='text' class='form-control add-item-form-text' name='nombre-articulo' maxlength='80' minlength='15' size='40' autocomplete='off' autofocus>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('input[name=nombre-articulo]');
                let $f = function () {
                    return validateAddItemInputText($input, {
                        schars: /^[À-ÿzáéíóúÁÉÍÓÚüÜ\u00f1\u00d1a-z_0-9',.#!;+-?¿():/{}\[\]¡°|"-]+$/i
                    });
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Descripción
        "1": {
            "name": lang.add_item_form_desc,
            "icon": "far fa-comment-alt",
            "form": "<textarea class='form-control add-item-description' rows='4' name='descripcion-articulo' maxlength='1000' autocomplete='off'></textarea>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('textarea[name=descripcion-articulo]');
                let $f = function () {
                    return validateAddItemInputText($input, {
                        cantBeEmpty: false,
                        checkMaxSize: true,
                        checkMinSize: false,
                        schars: /^[À-ÿ\u00f1\u00d1záéíóúÁÉÍÓÚüÜa-z_0-9',.#!$%:;()+*/&?¿<>=\r\n\[\]¡°|"-]+$/i
                    });
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Fotos
        "2": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera",
            "form": '<div class="input-group"><label class="input-group-btn add-item-pic-label"><span class="btn btn-primary add-item-pic-button"><input type="file" name="foto-articulo1" style="display: none;" accept="image/x-png, image/jpeg">{0}</span></label><input type="text" class="form-control add-item-pic-item-text" readonly disabled name="foto-articulo-desc1"><span class="btn btn-success add-item-pic-new-pic hvr-icon-pop hvr-shadow"><i class="fas fa-plus hvr-icon"></i></span></div><input type="hidden" name="foto-counter" value="1" />'.format(lang.look_file),
            "newform": '',
            "resizeThread": false,
            "afterDrawFun": function () {
                let $a = $('.add-item-pic-new-pic');
                $a.tooltipster({
                    content: lang.add_new_photo_tooltip,
                    delay: cfg_additem_add_pic_tooltip_delay,
                    side: 'bottom',
                    theme: cfg_tooltip_theme
                });
                let $id = this.id_form;
                let $resize = this.resizeFun;
                updateFileFormAddItemWatcher();

                // Se valida el ítem
                let $input = $('input[name=foto-articulo-desc1]');
                let $s = function () {
                    return validateAddItemPic($input);
                };

                // Añade evento change
                validation_add_item_fun.push($s);

                // Añade una nueva entrada para agregar imagen
                let $f = function () {
                    if ($add_item_total_pics >= cfg_additem_max_photos) {
                        return;
                    }
                    $add_item_total_pics += 1;
                    if ($add_item_total_pics === cfg_additem_max_photos) {
                        $('.add-item-pic-new-pic').fadeOut();
                    }

                    // noinspection QuirksModeInspectionTool
                    $('#{0}'.format($id)).append('<div class="input-group add-item-pic-new-entry-block"><label class="input-group-btn add-item-pic-label"><span class="btn btn-primary add-item-pic-button" style="cursor: pointer;"><input type="file" name="foto-articulo{1}" style="display: none;" accept="image/x-png, image/jpeg">{0}</span></label><input type="text" class="form-control add-item-pic-item-text" readonly disabled name="foto-articulo-desc{1}" ></div>'.format(lang.look_file, $add_item_total_pics));
                    $resize();
                    updateFileFormAddItemWatcher();

                    let $input = $('input[name=foto-articulo-desc{0}]'.format($add_item_total_pics));
                    let $s = function () {
                        return validateAddItemPic($input);
                    };

                    // Añade evento change
                    validation_add_item_fun.push($s);

                    // Aumenta contador foto-counter
                    let $counter = $('input[name=foto-counter]');
                    $counter.val($add_item_total_pics);

                    if (cfg_additem_center_module) {
                        centerMainContent();
                    }
                };
                // noinspection JSUnresolvedFunction
                $a.on('click.addNewPic', $f);
            }
        },

        // Región
        "3": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe",
            "form": "<select id='formRegiones' class='add-item-rc-selectors' name='region-articulo' autocomplete='off'></select>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('select[name=region-articulo]');
                let $f = function () {
                    return validateAddItemSelector($input);
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Comuna
        "4": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-map-marker-alt",
            "form": "<select id='formComunas' class='add-item-rc-selectors' name='comuna-articulo' autocomplete='off' disabled></select>",
            "resizeThread": false,
            "afterDrawFun": function () {
                addItemUpdateRCForm();
            },
            "validate": function () {
                let $input = $('select[name=comuna-articulo]');
                let $f = function () {
                    return validateAddItemSelector($input);
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Calle
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-home",
            "form": "<input type='text' class='form-control add-item-form-text' name='calle-articulo' maxlength='150' minlength='10' size='60' autocomplete='off'>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('input[name=calle-articulo]');
                let $f = function () {
                    return validateAddItemInputText($input, {
                        schars: /^[À-ÿzáéíóúÁÉÍÓÚüÜ\u00f1\u00d1a-z_0-9',.#/!°-]+$/i
                    });
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Nombre del contacto
        "6": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user",
            "form": "<input type='text' class='form-control add-item-form-text' name='nombre-contacto' maxlength='200' size='60' minlength='10' autocomplete='off'>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('input[name=nombre-contacto]');
                let $f = function () {
                    return validateAddItemInputText($input, {
                        checkMinWords: true,
                        minWords: 2,
                        minWordsErrorMessage: lang.add_item_form_bad_name_words,
                        schars: /^[À-ÿzáéíóúÁÉÍÓÚüÜ\u00f1\u00d1a-z,.]+$/i
                    });
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // E-mail del contacto
        "7": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope",
            "form": "<input type='text' class='form-control add-item-form-text' name='email-contacto' maxlength='100' size='40' autocomplete='off'>",
            "resizeThread": false,
            "validate": function () {
                let $input = $('input[name=email-contacto]');
                let $f = function () {
                    return validateAddItemEmail($input);
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        },

        // Teléfono del contacto
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "form": "<input type='text' class='form-control add-item-form-text' name='fono-contacto' minlength='0' size='20' maxlength='9' autocomplete='off'>",
            "resizeThread": false,
            "afterDrawFun": function () {
            },
            "validate": function () {
                let $input = $('input[name=fono-contacto]');
                let $f = function () {
                    return validateAddItemInputText($input, {
                        cantBeEmpty: false,
                        checkMaxSize: true,
                        checkMinSize: false,
                        multipleWords: false,
                        schars: /^[0-9]+$/i,
                        userMessage: lang.add_item_form_type_phone,
                        userFun: function () { // Chequea el número
                            let $p = $input.val();
                            if ($p.length === 0) {
                                return true;
                            } else {
                                return $p[0] === '9' && $p.length === 9;
                            }
                        }
                    });
                };

                // Añade evento change
                $input.on('change', $f);
                validation_add_item_fun.push($f);
            }
        }
    };
}

/**
 * Actualiza el formulario de las regiones y las comunas
 * @function
 * @ignore
 */
function addItemUpdateRCForm() {
    let $hr = '<option value="sin-region">{0}</option>'.format(lang.add_item_r_pick);
    let $hc = '<option value="sin-region">{0}</option>'.format(lang.add_item_c_pick);

    // Se escriben las regiones
    let rkeys = Object.keys($add_item_r_chile);
    for (let i = 0; i < rkeys.length; i++) {
        $hr += '<option value="{0}">{1}</option>'.format(rkeys[i], $add_item_r_chile[rkeys[i]]);
    }
    let $ohr = $('#formRegiones');
    let $ohc = $('#formComunas');

    $ohr.html($hr);
    $ohc.html($hc);

    // noinspection JSDeprecatedSymbols
    $ohr.change(function () {
        let $ohc = $('#formComunas');
        $ohc.removeAttr('disabled');
        let $valr = $(this).val();

        // Se recorre cada región buscando la seleccionada
        let rkeys = Object.keys($add_item_r_chile);
        for (let i = 0; i < rkeys.length; i++) {
            if (rkeys[i] === $valr) {
                let $htmlc = '';
                let cregion = $add_item_c_chile[$valr];
                let ckeys = Object.keys(cregion);
                for (let i = 0; i < ckeys.length; i++) {
                    $htmlc += '<option value="{0}">{1}</option>'.format(cregion[ckeys[i]], ckeys[i]);
                }
                $ohc.html($htmlc);
                break;
            }
        }
    });
}