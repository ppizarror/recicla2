/**
 HEADER
 Crea un header que incluye el título de la página, un botón para retroceder, herramientas y el ícono de la app.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Crea un header
 * @class
 * @param {object} options - Opciones del constructor
 */
function Header(options) {
    let $defaults = {
        parent: ui_main_content,
        showAppInfo: true,
        showBackButton: true,
        title: ''
    };
    options = $.extend($defaults, options);
    let self = this;
    let _parentobj = $(options.parent);

    /**
     * Añade el header
     * @ignore
     */
    this._id = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool,HtmlUnknownTarget
    _parentobj.append('<div id="{0}" class="header-container"><div class="header-module header-back-button"><div class="header-back-button-container"><div class="header-back-button-icon {3}"><i class="fas fa-chevron-circle-left hvr-icon"></i></div><div class="header-back-button-title">{1}</div></div></div><div class="header-module header-title"></div><div class="header-module header-app-logo"><div class="header-app-container {2}"><img src="resources/ui/favicon/favicon.png" alt="" /> Recicla2</div></div>'.format(self._id, lang.header_index, cfg_header_applogo_effect, cfg_header_indexicon_effect));
    this._obj = $('#{0}'.format(self._id));
    // noinspection JSUnresolvedFunction
    this._obj.on('selectstart dragstart', false);

    /**
     * Eventos botón retornar al inicio
     * @ignore
     */
    let $backb = self._obj.find('.header-back-button');
    if (!options.showBackButton) {
        $backb.css('visibility', 'hidden');
    } else {
        // noinspection JSDeprecatedSymbols
        $backb.click(function () {
            loadModule(modules.home);
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
            delay: 1000,
            maxWidth: 280,
            side: 'bottom',
            theme: cfg_tooltip_theme,
            timer: 0
        });
    }

    // Escribe el título
    self._obj.find('.header-title').html(options.title);

    /**
     * Retorna el DOM
     * @function
     * @return {void|jQuery|HTMLElement|*}
     */
    this.getDOM = function () {
        return self._obj;
    }
}