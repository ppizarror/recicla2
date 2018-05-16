/**
 HEADER
 Crea un header que incluye el título de la página, un botón para retroceder, herramientas y el ícono de la app.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

/**
 * Crea un header - UI
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
        title: ''
    };
    options = $.extend($defaults, options);
    let self = this;
    let _parentobj = $(options.parent);
    let _lastquery = '';
    let _lastresults = -1;

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
     * Muestra los resultados de la búsqueda
     * @function
     * @param {Array} items - Ítems de la búsqueda
     * @private
     * @ignore
     */
    this._showSearchResults = function (items) {
        let $results = $(this._searchid + ' .header-search-results-container');
        let $search = $(this._searchid + ' .searchinput');

        // Borra el recuadro
        $results.empty();

        // Si existen resultados
        if (items.length !== 0) {

            // Alterna entre even y odd para cambiar el color de fondo
            let j = '';

            // Recorre cada ítem y lo añade como entrada en el recuadro de búsqueda
            for (let i = 0; i < items.length; i++) {
                j = i % 2 === 0 ? 'odd' : 'even';
                // noinspection QuirksModeInspectionTool, HtmlUnknownTarget
                $results.append('<div class="header-search-results-entry {2}"><a href="{1}">{0}</a></div>'.format(items[i]['nombre'], modules.showItem.file.format(items[i]['id']), j));
            }

            // Actualiza últimos resultados
            _lastresults = items.length;
        } else {
            $results.append('<div class="header-search-results-none">{0}</div>'.format(lang.search_item_noresults));
            _lastresults = -1;
        }

        // Muestra el recuadro
        $results.fadeIn(400);
        $search.addClass('displaybox');
        $(ui_content).css('opacity', 0.75);
    };

    /**
     * Oculta los resultados de la búsqueda
     * @function
     * @private
     * @ignore
     */
    this._hideSearchResults = function () {
        let $results = $(this._searchid + ' .header-search-results-container');
        let $search = $(this._searchid + ' .searchinput');

        // Aplica efectos
        $search.removeClass('displaybox');
        $results.fadeOut(200);
        $(ui_content).css('opacity', 1.0);

        // Borra última búsqueda
        _lastresults = -1;
    };

    /**
     * Establece el evento de búsqueda
     * @private
     * @ignore
     */
    this._initSearch = function () {

        /**
         * Obtiene el objeto DOM del input de búsqueda
         */
        let $search = $(this._searchid + ' .searchinput');

        // noinspection JSUnresolvedFunction
        /**
         * Previene el submit del input
         */
        $(this._searchid).find('form').on('submit', function (e) {
            e.preventDefault();
        });

        // noinspection JSUnresolvedFunction
        /**
         * Añade evento keyup, si hay más de 3 caracteres -> carga con ajax, si no oculta recuadro de búsqueda
         */
        $search.on('keyup', function () {

            // Si hay menos de tres caracteres oculta recuadro de búsqueda
            if ($search.val().length < 3) {
                self._hideSearchResults();
            }

            // Hay más de tres caracteres, hace consulta ajax y escribe resultados en el recuadro de búsqueda
            else {

                // Obtiene el texto y lo formatea
                let $query = $search.val();

                // Si el query es distinto al anteriormente realizado entonces hace una consulta Ajax
                if ($query !== _lastquery) {

                    /**
                     * Se crea la consulta Ajax
                     * @type {JQuery.jqXHR}
                     */
                    let $request = $.ajax({
                        data: 'item-name-search={0}'.format($query),
                        timeout: 10000,
                        type: 'post',
                        url: 'src/server/search_item.php'
                    });

                    // noinspection JSUnresolvedFunction
                    /**
                     * Respuesta correcta
                     */
                    $request.done(function (response) {
                        try {
                            let data = JSON.parse(response);
                            // Si no se encontraron errores se procede
                            if (Object.keys(data).indexOf('error') !== -1 && data.error === '') {
                                let items = data['items'];

                                // Si los resultados son distintos en número a los anteriores se borra el recuadro
                                if (items.length !== _lastresults) {
                                    self._showSearchResults(items);
                                }

                            } else {
                                $.alert(lang.search_item_server_error);
                            }
                        } catch ($e) {
                            $.alert(lang.search_item_server_error);
                            console.error($e.message);
                        } finally {
                        }
                    });

                    // noinspection JSUnresolvedFunction
                    /**
                     * Server falló, se alerta al usuario
                     */
                    $request.fail(function () {
                            $.error(lang.search_item_server_error);
                        }
                    );
                }
                _lastquery = $query;
            }

        });

    };

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
        this._id = generateId(cfg_id_size);
        this._searchid = generateId(cfg_id_size);

        // noinspection QuirksModeInspectionTool,HtmlUnknownTarget
        /**
         * Añade el header
         * @ignore
         */
        _parentobj.append('<div id="{0}" class="header-container"><div class="header-module header-app-logo left"><div class="header-app-container left {2}"><img src="resources/ui/favicon/favicon.png" alt=""/> Recicla2</div></div><div class="header-module header-back-button"><div class="header-back-button-container"><div class="header-back-button-icon {3}"><i class="fas fa-chevron-circle-left hvr-icon"></i></div><div class="header-back-button-title">{1}</div></div></div><div class="header-module header-title"></div><div class="header-module header-app-logo right"><div class="header-app-container right {2}"><img src="resources/ui/favicon/favicon.png" alt=""/> Recicla2</div></div><div class="header-module header-search-box"><div class="header-search-container hvr-shadow" id="{5}"><form autocomplete="off"><input type="search" name="item-name-search" class="header-search-input searchinput" placeholder="{4}" maxlength="40" required></form><div class="header-search-results-container"></div></div></div></div>'.format(self._id, lang.header_index, cfg_header_applogo_effect, cfg_header_indexicon_effect, lang.search_item_placeholder, this._searchid));

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
                loadModule(modules.home);
            });
        }

        /**
         * Oculta/Muestra la caja de búsqueda
         */
        if (!options.showSearchBox) {
            self._obj.find('.header-search-box').css('display', 'none');
        } else {
            self._obj.find('.header-app-logo.right').css('display', 'none');
            self._initSearch();
        }

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
                timer: 0
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
                timer: 0
            });
            self._obj.find('.header-search-box').css('display', 'none');
        }

        /**
         * Escribe el título
         */
        self._obj.find('.header-title').html(options.title);

    }
}