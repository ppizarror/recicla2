/**
 ADD ITEM VALIDATION
 Funciones asociadas a la validación del formulario.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// Arreglo funciones de validación
var validation_add_item_fun = [];
var $_validation_add_item_display_tooltip = true;

/**
 * Valida un input
 * @param $input
 * @param options
 */
function validateAddItemInputText($input, options) {
    let $defaults = {
        cantBeEmpty: true, // Indica si el formulario puede estar vacío
        changeInputStyle: true, // Actualiza el estilo del input
        checkMaxSize: true, // Chequea largo máximo
        checkMinSize: true, // Chequea largo mínimo
        multipleWords: true, // Acepta múltiples palabras
        schars: /^[\u00F1a-z0-9]+$/i, // Expresión regular clásica
        userFun: null, // Función de validación del usuario
        userMessage: '', // Mensaje de error proporcionado por el usuario
    };
    options = $.extend($defaults, options);

    let text = $input.val();

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
 * Valida un número telefónico Chileno
 * @param $input
 */
function validateAddItemPhone($input) {
    console.log(validation_add_item_fun);
}

/**
 * Valida un campo input
 * @param $input
 */
function validateAddItemEmail($input) {
    let email = $input.val();
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
 * Cambia el estilo del input dependiendo del valor de verdad de s
 * @param $input        Objeto jQuery
 * @param s             Valor booleano de verdad
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
        console.log(s);
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
                content: err_str + '.',
                delay: cfg_additem_form_tooltip_error_delay,
                maxWidth: 350,
                side: 'bottom',
                theme: cfg_tooltip_theme,
                timer: 0,
                animation: 'grow'
            });
            $input.tooltipster('open');
        }
    }
}

/**
 * Valida el formulario para agregar artículos.
 */
function validateAddItemForm() {

}