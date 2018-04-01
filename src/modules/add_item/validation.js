/**
 ADD ITEM VALIDATION
 Funciones asociadas a la validación del formulario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Arreglo funciones de validación
var $_add_item_is_valid = false; // Indica que el ítem actual es válido
var $_validation_add_item_display_tooltip = true; // Puede dibujar un tooltip sobre un campo
var validation_add_item_fun = []; // Funciones validadoras

/**
 * Valida un input
 * @param $input {object}       Input del formulario
 * @param options {object}      Parámetros validación
 */
function validateAddItemInputText($input, options) {
    let $defaults = {
        cantBeEmpty: true, // Indica si el formulario no puede estar vacío
        changeInputStyle: true, // Actualiza el estilo del input
        checkMaxSize: true, // Chequea largo máximo
        checkMinSize: true, // Chequea largo mínimo
        multipleWords: true, // Acepta múltiples palabras
        schars: /^[À-ÿ\u00f1\u00d1a-z0-9]+$/i, // Expresión regular clásica
        trim: true, // Aplica trim a los datos
        userFun: null, // Función de validación del usuario
        userMessage: '', // Mensaje de error proporcionado por el usuario
    };
    options = $.extend($defaults, options);

    let text = $input.val();
    if (options.trim) {
        text = $.trim(text);
    }

    // Se obtienen los tamaños mínimos y máximos si es que existen
    let min_size = $input.attr('minlength');
    if (min_size === undefined) {
        min_size = 0;
    } else {
        min_size = parseInt(min_size);
    }
    let max_size = $input.attr('maxlength');
    if (max_size === undefined) {
        max_size = 9999999;
    } else {
        max_size = parseInt(max_size);
    }
    let size = text.length;

    let s = false; // Estado del input
    let smin = false; // Indica que es menor que el tamaño mínimo
    let smax = false; // Indica que es mayor que el tamaño máximo

    if (!options.checkMinSize && !options.checkMaxSize) {
        s = true;
    } else {
        if (options.checkMinSize && size < min_size) {
            smin = true;
        } else if ((options.checkMinSize || options.checkMaxSize) && min_size <= size && size <= max_size) {
            s = true;
        } else if (options.checkMaxSize) {
            smax = true;
        }
    }

    // Expresión regular
    let re = options.schars;
    let sreg;

    // Se ajusta el string si acepta o no múltiples palabras (espacios en blanco)
    if (!options.multipleWords) {
        text = text.split(' ').join('');
        $input.val(text);
        if (re === null) {
            sreg = true;
        } else {
            sreg = re.test(text);
        }
    } else {
        text = text.replace(/\s\s+/g, ' ');
        $input.val(text);
        let ktexts = text.split(' ');
        sreg = true;
        if (re === null) {
            sreg = true;
        } else {
            for (let i = 0; i < ktexts.length; i++) {
                sreg = sreg && re.test(ktexts[i]);
                if (!sreg) {
                    break;
                }
            }
        }
    }
    s = s && sreg;

    // Aplica la función del usuario
    let $ufun = true;
    if (options.userFun !== null) {
        $ufun = options.userFun();
    }
    s = s && $ufun;

    // El contenido está vacío
    if (!options.cantBeEmpty && text === '') {
        s = true;
    }

    // Genera el estado
    let st = {
        message: options.userMessage, // Mensaje del usuario
        samelength: max_size === min_size, // Indica que la respuesta debe tener un largo fijo
        size: size, // Tamaño de la respuesta
        slreq: smax || smin, // Indica que no se cumplió el largo requerido
        smax: smax, // Indica que el error fue de largo mínimo
        smaxv: max_size, // Tamaño mínimo de la respuesta
        smin: smin, // Indica que el error fue de largo máximo
        sminv: min_size, // Tamaño máximo de la respuesta
        sreg: !sreg, // Indica que hubieron carácteres inválidos
        status: s, // Indica el estado de la validación
        userFun: $ufun, // Indica el estado del usuario
    };
    if (options.changeInputStyle) {
        validateAddItemChangeStyleInput($input, st);
    }

    return st;
}

/**
 * Valida que un selector haya cambiado de valor
 * @param $input {object}   Input del formulario
 */
function validateAddItemSelector($input) {
    let st = {
        message: lang.add_item_form_pick_sel,
        status: $input.val() !== 'sin-region'
    };
    validateAddItemChangeStyleInput($input, st);

    return st;
}

/**
 * Valida un campo input
 * @param $input {object}   Input del formulario
 */
function validateAddItemEmail($input) {
    let email = $input.val();
    email = $.trim(email);
    $input.val(email);
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let s = re.test(String(email).toLowerCase());

    // Genera el estado
    let st = {
        message: lang.add_item_form_bad_email,
        status: s,
    };
    validateAddItemChangeStyleInput($input, st);

    return st;
}

/**
 * Valida un campo file añadido de forma dinámica
 * @param $input {object}   Input añadido
 */
function validateAddItemPic($input) {
    let $file = $input.val();
    let st = {
        message: lang.add_item_form_bad_pic,
        status: $file !== '',
    };
    validateAddItemChangeStyleInput($input, st);
}

/**
 * Cambia el estilo del input dependiendo del valor de verdad de s
 * @param $input {object}   Objeto jQuery
 * @param s {boolean}       Valor booleano de verdad
 */
function validateAddItemChangeStyleInput($input, s) {
    $input.removeClass('add-item-input-ok');
    $input.removeClass('add-item-input-bad');
    try {
        $input.tooltipster('destroy');
    } catch (e) {
    } finally {
    }
    if (s.status) {
        $input.addClass('add-item-input-ok');
    } else {
        $input.addClass('add-item-input-bad');

        // Genera el string del error
        if (s.cantBeEmpty) {
            return;
        }
        var err_str = '';
        let $addmsg = function (m) {
            if (err_str !== '') {
                err_str += '. ';
            }
            err_str += m;
        };
        if (s.message !== '') {
            $addmsg(s.message);
        } else {
            if (s.sreg) {
                $addmsg(lang.add_item_form_bad_reg);
            }
            if (s.samelength) {
                if (s.slreq) {
                    $addmsg(lang.add_item_form_bad_lreq.format(s.sminv, s.size));
                }
            } else {
                if (s.smin) {
                    $addmsg(lang.add_item_form_bad_min.format(s.sminv, s.size));
                } else if (s.smax) {
                    $addmsg(lang.add_item_form_bad_max.format(s.smaxv, s.size));
                }
            }
        }

        if (err_str !== '' && $_validation_add_item_display_tooltip) {
            $input.tooltipster({
                animation: 'grow',
                content: err_str + '.',
                delay: cfg_additem_form_tooltip_error_delay,
                distance: 0,
                maxWidth: 350,
                side: 'bottom',
                theme: cfg_tooltip_theme,
                timer: 0
            });
            $input.tooltipster('open');
        }
    }
}

/**
 * Valida el formulario para agregar artículos.
 */
function validateAddItemForm() {
    var $f; // Función validadora
    var $r; // Resultado de cada validador
    var $nerr = 0; // Número de errores

    // Se recorre cada item validador del formulario
    for (let i = 0; i < validation_add_item_fun.length; i++) {
        $f = validation_add_item_fun[i];
        $r = $f();
        if ($r === undefined) {
            continue;
        }
        if (!$r.status) {
            $nerr += 1;
            $_validation_add_item_display_tooltip = false;
        }
    }
    $_validation_add_item_display_tooltip = true;
    $_add_item_is_valid = ($nerr !== 0);

    return {
        failed: $_add_item_is_valid,
        nfail: $nerr
    }
}