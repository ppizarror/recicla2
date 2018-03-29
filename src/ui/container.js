/**
 CONTAINER
 Crea los contenedores, unidad básica de la página web en donde va el contenido.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 *
 * @param options
 * @constructor
 */
function Container(options) {
    let $defaults = {
        centering: true
    };
    options = $.extend(options, $defaults);
    var self = this;

    /**
     * Crea el container en el DOM
     */
    let _mainContent = $('#mainContent');
    this._id = generateId(cfg_id_size);
    _mainContent.append('<div id="{0}" class="ui-container"></div>'.format(self._id));
}