/**
 HEADER
 Crea un header que incluye el título de la página, un botón para retroceder, herramientas y el ícono de la app.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Crea un header - UI
 *
 * @class
 * @param {object} options - Opciones del constructor
 */
function Header(options) {
    let $defaults = {
        parent: ui_header,
        showAppInfoLeft: false,
        showAppInfoRight: false,
        showBackButton: false,
        showSearchBox: false,
        title: '',
    };
    options = $.extend($defaults, options);
    let self = this;
    let _parentobj = $(options.parent);

    /**
     * Se buscan configuraciones incompatibles
     */
    if (options.showAppInfoLeft && options.showBackButton) {
        throw('Header::@constructor colision showAppInfoLeft/showBackButton');
    }
    if (options.showAppInfoRight && options.showSearchBox) {
        throw('Header::@constructor colision showAppInfoRight/showSearchBox');
    }

    /**
     * Retorna el DOM
     * @function
     * @return {void|jQuery|HTMLElement|*}
     */
    this.getDOM = function () {
        return self._obj;
    };

    /**
     * Inicia el Header
     * @function
     */
    this.init = function () {

        /**
         * Crea los ID
         */
        this._id = generateId();
        this._searchid = generateId();

        // noinspection QuirksModeInspectionTool,HtmlUnknownTarget
        /**
         * Añade el header
         * @ignore
         */
        _parentobj.append('<div id="{0}" class="header-container"><div class="header-module header-app-logo left"><div class="header-app-container left {2}"><img src="res/ui/favicon/favicon.png" alt=""/> Recicla2</div></div><div class="header-module header-back-button"><div class="header-back-button-container"><div class="header-back-button-icon {3}"><i class="fas fa-chevron-circle-left hvr-icon"></i></div><div class="header-back-button-title">{1}</div></div></div><div class="header-module header-title"></div><div class="header-module header-app-logo right"><div class="header-app-container right {2}"><img src="res/ui/favicon/favicon.png" alt=""/> Recicla2</div></div><div class="header-module header-search-box"><div class="header-search-container hvr-shadow" id="{5}"><form autocomplete="off"><input type="search" name="item-name-search" class="header-search-input searchinput" placeholder="{4}" maxlength="40" required></form><div class="header-search-results-container"></div></div></div></div>'.format(self._id, lang.header_index, cfg_header_applogo_effect, cfg_header_indexicon_effect, lang.search_item_placeholder, this._searchid));

        this._obj = $('#{0}'.format(self._id));
        // noinspection JSUnresolvedFunction
        this._obj.on('selectstart dragstart', false);
        this._searchid = '#' + this._searchid;

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
                loadModule(modules.fotoComentarios);
            });
        }

        /**
         * Oculta/Muestra la caja de búsqueda
         */
        self._obj.find('.header-search-box').css('display', 'none');

        /**
         * Eventos botón app
         */
        if (!options.showAppInfoLeft) { // Botón izquierdo
            self._obj.find('.header-app-logo.left').css('display', 'none');
        } else {
            self._obj.find('.header-app-container.left').tooltipster({
                animation: 'grow',
                content: lang.app_about,
                contentAsHTML: true,
                delay: 1000,
                maxWidth: 280,
                side: 'bottom',
                theme: cfg_tooltip_theme,
                timer: 0,
            });
            self._obj.find('.header-back-button').css('display', 'none');
        }
        if (!options.showAppInfoRight) { // Botón derecho
            self._obj.find('.header-app-logo.right').css('display', 'none');
        } else {
            self._obj.find('.header-app-container.right').tooltipster({
                animation: 'grow',
                content: lang.app_about,
                contentAsHTML: true,
                delay: 1000,
                maxWidth: 280,
                side: 'bottom',
                theme: cfg_tooltip_theme,
                timer: 0,
            });
            self._obj.find('.header-search-box').css('display', 'none');
        }

        /**
         * Escribe el título
         */
        self._obj.find('.header-title').html(options.title);

    }
}