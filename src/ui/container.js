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
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        shadow: true,
        width: 100
    };
    options = $.extend($defaults, options);
    var self = this;

    /**
     * Crea el container en el DOM
     */
    let _mainContent = $('#mainContent');
    this._id = generateId(cfg_id_size);
    _mainContent.append('<div id="{0}" class="ui-container"></div>'.format(self._id));
    this._obj = $('#{0}'.format(this._id));

    /**
     * Aplica css
     */
    self._obj.css({
        'background-color': options.backgroundColor,
        'border-radius': options.borderRadius + 'px',
        'padding': options.padding !== 0 ? options.padding + 'px' : '0',
        'width': Math.max(Math.min(100, options.width), 0) + '%'
    });
    if (options.shadow) {
        self._obj.css('box-shadow', '3px 3px 20px rgba(0, 0, 0, 0.3)')
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Retorna el id
     * @return {string|*}
     */
    this.getId = function () {
        return self._id;
    };

    /**
     * Retorna el objeto del contenido
     * @return {jQuery|HTMLElement|*}
     */
    this.getDOM = function () {
        return self._obj;
    }
}