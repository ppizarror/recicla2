/**
 ADD_ITEM_TEST
 Testeo módulo añadir ítem.
 Añade texto en distintos campos.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

// noinspection JSUnusedGlobalSymbols
/**
 * Agrega un ítem.
 * @return
 */
function __addItemTest() {
    let $form = document.addItem;
    let $comunas = $('#formComunas');

    // Se escribe texto en el formulario
    $form['nombre-articulo'].value = 'Huawei P9 en perfecto estado, 64GB memoria interna';
    $form['descripcion-articulo'].value = 'Regalo teléfono huawei en perfectas condiciones, 64 gb memoria interna, tiene unos pequeños detalles en la parte trasera pero nada muy grave, fácilmente reparable';
    $('#formRegiones').val(1);
    $comunas.append($('<option>', {
        value: '130204',
        text: 'Las Condes'
    }));
    $comunas.val('130204');
    $form['calle-articulo'].value = 'Avenida Circunvalación 1716';
    $form['nombre-contacto'].value = 'Juan Antonio Ríos Mauleu';
    $form['email-contacto'].value = 'juanito@fbi.com';
    $form['fono-contacto'].value = '981244568';
}

/**
 * Agrega un botón para setear el formulario.
 * @private
 */
function __buttonAddItemTest() {
    let $id = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool
    $('.add-item-bottom-bar').append('<button id="{0}" type="button" class="btn btn-info add-item-test-button hvr-shadow">{1}</button>'.format($id, lang.test_add_item));

    // Se agrega evento
    $('#' + $id).on('click', __addItemTest);
}

// Añade callback a module
addAfterInitModuleCallback(__buttonAddItemTest);