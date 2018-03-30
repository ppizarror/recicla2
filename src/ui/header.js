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
        parent: ui_main_content,
        showAppInfo: true,
        showBackButton: true,
        title: ''
    };
    options = $.extend($defaults, options);
    var self = this;
    let _parentobj = $(options.parent);

    /**
     * Añade el header
     */
    this._id = generateId(cfg_id_size);
    _parentobj.append('<!--suppress ALL --><div id="{0}" class="header-container"><div class="header-module header-back-button"><div class="header-back-button-container"><div class="header-back-button-icon"><i class="fas fa-chevron-circle-left"></i></div><div class="header-back-button-title">{1}</div></div></div><div class="header-module header-title"></div><div class="header-module header-app-logo"><div class="header-app-container"><img src="resources/ui/favicon/favicon.png" /> Recicla2</div></div>'.format(self._id, lang.header_index));
    this._obj = $('#{0}'.format(self._id));

    /**
     * Eventos botón retornar al inicio
     */
    let $backb = self._obj.find('.header-back-button');
    if (!options.showBackButton) {
        $backb.css('visibility', 'hidden');
    } else {
        $backb.click(function () {
            loadModule(modules.listItem);
        });
    }

    /**
     * Eventos botón app
     */
    if (!options.showAppInfo) {
        self._obj.find('.header-app-logo').css('visibility', 'hidden');
    } else {
        self._obj.find('.header-app-container').tooltipster({
            animation: 'grow',
            content: lang.app_about,
            contentAsHTML: true,
            delay: 1200,
            maxWidth: 280,
            side: 'left',
            theme: cfg_tooltip_theme
        });
    }

    // Escribe el título
    self._obj.find('.header-title').html(options.title);
}