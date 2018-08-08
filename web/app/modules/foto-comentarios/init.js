/**
 FOTO COMENTARIOS
 Inicia el módulo de mostrar lista de fotografías con soporte de comentarios, tarea 4.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Inicia el módulo al cargar la página
 * @ignore
 */
$(function () {

    // Muestra panel cargando
    loadHandler(true);

    // Dibuja el módulo
    createFotoComentariosUI();

    // Oculta el panel principal
    hideMainContent();

    // Centra la página
    if (cfg_fotocomentarios_center_module) {
        centerMainContent();
        // noinspection JSCheckFunctionSignatures
        $(window).on('resize.listItemPanel', centerMainContent);
    }

    // Ajusta el tamaño del contenido
    adjustListItemWidth();

    // Llamada a los callbacks
    afterInitModuleCallback();

});