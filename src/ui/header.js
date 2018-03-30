/**
 HEADER
 Crea un header que incluye el título de la página, un botón para retroceder, herramientas y el ícono de la app.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Crea un header
 * @param options
 * @constructor
 */
function Header(options) {
    let $defaults = {
        backText: '',
        backUrl: '',
        parent: ui_main_content,
        title: ''
    };
    options = $.extend($defaults, options);
    var self = this;
    let _parentobj = $(options.parent);

    /**
     * Añade el header
     */
    this._id = generateId(cfg_id_size);
    _parentobj.append('<div id="{0}" class="header-container"><div class="header-module header-back-button-container"><div class="header-back-button-icon"><i class="fas fa-chevron-circle-left"></i></div><div class="header-back-button-title">Ir a Inicio</div></div><div class="header-module header-title">Ingresar nuevo artículo</div><div class="header-module header-app-logo">Recicla2</div></div>'.format(self._id));
    this._obj = $('#{0}'.format(self._id));
}