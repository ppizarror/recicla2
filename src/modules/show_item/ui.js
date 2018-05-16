/**
 SHOW ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
 */

// noinspection ES6ConvertVarToLetConst
/**
 * Objeto contenedor de los comentarios
 * @ignore
 */
var $show_item_comment_container;

// noinspection ES6ConvertVarToLetConst
/**
 * Contenedor de la página mostrar artículo
 * @ignore
 */
var $show_item_container;

// noinspection ES6ConvertVarToLetConst
/**
 * Indica si hay o no comentarios
 * @ignore
 * @type {boolean}
 */
var $show_item_empty_comment = true;

// noinspection ES6ConvertVarToLetConst
/**
 * Elemento header de la página
 * @ignore
 */
var $show_item_header_container;

// noinspection ES6ConvertVarToLetConst
/**
 * Secciones del artículo
 * @ignore
 */
var $show_item_sections;

/**
 * Crea el módulo en la ui
 * @function
 * @param {Item} $item - Artículo cargado
 * @ignore
 */
function createShowItem($item) {

    /**
     * Cambia el título de la página
     */
    document.title = lang.show_item_title;

    /**
     * Genera el header y el contenedor
     */
    let show_header = new Header({
        showBackButton: true,
        showSearchBox: true,
        title: lang.show_item_title
    });
    let show_container = new Container({
        padding: 0
    });
    $show_item_container = show_container.getDOM();
    $show_item_header_container = show_header.getDOM();

    /**
     * Inicia los datos del objeto
     */
    initShowItemSections($item);

    /**
     * Crea las columnas del formulario
     */
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $show_item_container.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn"></div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    // noinspection JSUnresolvedFunction
    /**
     * Desactiva selección columna izquierda
     */
    $ocl.on('selectstart dragstart', false);

    /**
     * Dibuja los nombres del formulario
     */
    let $ftitle_k = Object.keys($show_item_sections);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $show_item_sections[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon hvr-icon-rotate"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
        }
    }

    /**
     * Genera el formulario
     */
    let $resizef;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $show_item_sections[$ftitle_k[i]];
        $k.id_value = generateId(cfg_id_size);
        $ocr.append('<div id={1} class="add_item_form_line">{0}</div>'.format($k.value, $k.id_value));

        // Genera el thread de ajuste del tamaño de cada título
        $resizef = autoResizeTitles($k.id_value, $k.id_title);
        $k.resizeFun = $resizef;
        $resizef();
        if ($k.resizeThread) {
            setInterval($resizef, cfg_ui_watchinterval); // Comprueba la altura del elemento
        }

        // Ejecuta la función afterDraw si existe
        if ($k.afterDrawFun !== undefined) {
            $k.afterDrawFun();
        }
    }

    /**
     * Escribe los comentarios
     */
    let $comment_button_id = generateId(cfg_id_size);
    let $comment_container_id = generateId(cfg_id_size);
    // noinspection QuirksModeInspectionTool
    $(ui_main_content).append('<div class="show-item-comments-container"><div class="show-item-comment-menu"><div class="show-item-comment-menu-title">{1}</div><div class="show-item-comment-buttons"><button id="{2}" type="button" class="btn btn-primary show-item-add-comment-button hvr-shadow">{0}</button></div></div><div class="show-item-comment-list" id="{3}"></div></div>'.format(lang.show_item_add_comment, lang.show_item_comments_title, $comment_button_id, $comment_container_id));
    $show_item_comment_container = $('#' + $comment_container_id);
    // noinspection JSUnresolvedFunction
    $('.show-item-comment-menu').on('selectstart dragstart', false);

    let $comments = $item.getComments();

    /**
     * Sortea los comentarios
     */
    if (cfg_sort_comments_by_date_desc) {
        $comments = $comments.reverse();
    }

    /**
     * @type {ItemComment}
     */
    if ($item.getTotalComments() === 0) {
        $show_item_comment_container.append('<div class="show-item-comment-entry show-item-no-comments">{0}</div>'.format(lang.show_item_no_comments));
    } else {
        for (let i = 0; i < $item.getTotalComments(); i++) {
            addCommentItem($comments[i]);
        }
        $show_item_empty_comment = false;
    }

    // noinspection JSUnresolvedFunction
    /**
     * Añade evento añadir comentario
     */
    $('#' + $comment_button_id).on('click', function () {
        $.confirm({
            animateFromElement: false,
            animation: 'scale',
            columnClass: 'col-md-{0} col-sm-8'.format($(window).width() < 400 ? '6' : '4'),
            title: lang.add_comment_title,
            icon: 'far fa-comment',
            draggable: true,
            dragWindowGap: 0,
            theme: cfg_popup_theme,
            content: '' +
            '<form autocomplete="off">' +
            '<div class="form-group">' +
            '<label>' + lang.add_comment_name_title + '</label>' +
            '<input type="text" name="comment-author" placeholder="' + lang.add_comment_name_input + '" class="name form-control" maxlength="200" required autofocus/>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>' + lang.add_comment_comment_title + '</label>' +
            '<textarea name="comment-text" rows="2" type="text" placeholder="' + lang.add_comment_comment_input + '" class="comment form-control show-item-comment-textarea" maxlength="500" required></textarea>' +
            '</div>' +
            '</form>',
            buttons: {
                formSubmit: {
                    text: lang.add_comment_button_submit,
                    btnClass: 'btn-blue',
                    action: function () {
                        let name = this.$content.find('.name').val();
                        let comment = this.$content.find('.comment').val();
                        this.$content.find('.validated').val('false');
                        if (!name || name.length < 5 || name.length > 200) {
                            $.alert(lang.add_comment_bad_name);
                            return false;
                        }
                        if (!comment || comment.length < 10 || comment.length > 500) {
                            $.alert(lang.add_comment_bad_comment);
                            return false;
                        }
                        this.$content.find('.validated').val('true');

                        /**
                         * Se crea la consulta ajax
                         * @type {*|{readyState, getResponseHeader, getAllResponseHeaders, setRequestHeader, overrideMimeType, statusCode, abort}}
                         */
                        let $request = $.ajax({
                            data: 'validated=true&itemid={0}&comment-author={2}&comment-text={1}'.format($item.getID(), comment, name),
                            timeout: 10000,
                            type: 'post',
                            url: 'src/server/upload_comment.php'
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

                                    // Se agrega el comentario en el dom
                                    addCommentItem(new ItemComment({
                                        comment: comment,
                                        date: data.date,
                                        user: name
                                    }));

                                    // Alerta comentario agregado
                                    $.alert(lang.add_comment_ok);

                                } else {
                                    $.alert(lang.add_comment_query_error);
                                }
                            } catch ($e) {
                                console.log($e.message);
                            } finally {
                            }
                        });

                        // noinspection JSUnresolvedFunction
                        /**
                         * Server falló, se alerta al usuario
                         */
                        $request.fail(function () {
                                $.alert(lang.add_comment_server_error);
                            }
                        );
                    }
                },

                // Se cancela el comentario
                cancel: {
                    text: lang.add_comment_button_cancel,
                    action: function () {
                        $.alert({
                            animateFromElement: false,
                            animation: 'scale',
                            columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
                            content: lang.show_item_comment_canceled,
                            draggable: true,
                            dragWindowGap: 0,
                            escapeKey: false,
                            icon: 'far fa-comment',
                            theme: cfg_popup_theme,
                            title: lang.add_comment_title,
                            buttons: {
                                ok: {
                                    keys: ['enter', 'esc'],
                                    btnClass: 'btn-danger',
                                    text: lang.close
                                }
                            }
                        });
                    },
                }
            },
            onContentReady: function () {
                let jc = this;
                this.$content.find('form').on('submit', function (e) {
                    e.preventDefault();
                    // noinspection JSUnresolvedVariable
                    jc.$$formSubmit.trigger('click');
                });
            }
        });
    });
}

/**
 * Añade un comentario en la página
 * @function
 * @param {ItemComment} $c - Comentario
 * @ignore
 */
function addCommentItem($c) {
    if ($show_item_empty_comment) {
        $show_item_comment_container.empty();
        $show_item_empty_comment = false;
    }
    let $dateclockid = generateId(cfg_id_size);
    let $commentid = generateId(cfg_id_size);
    if (cfg_sort_comments_by_date_desc) {
        $show_item_comment_container.append('<div class="show-item-comment-entry"><div class="show-item-comment-header"><div class="show-item-comment-user-name">{0}</div><div class="show-item-comment-date">{1}</div><div class="show-item-comment-dateicon" id="{3}"><i class="far fa-clock"></i></div></div><div class="show-item-comment-content" id="{4}">{2}</div></div>'.format($c.getUser(), $c.getDate(), $c.getComment(), $dateclockid, $commentid));
    } else {
        $show_item_comment_container.prepend('<div class="show-item-comment-entry"><div class="show-item-comment-header"><div class="show-item-comment-user-name">{0}</div><div class="show-item-comment-date">{1}</div><div class="show-item-comment-dateicon" id="{3}"><i class="far fa-clock"></i></div></div><div class="show-item-comment-content" id="{4}">{2}</div></div>'.format($c.getUser(), $c.getDate(), $c.getComment(), $dateclockid, $commentid));
    }
    $('#' + $commentid).emoticons();
    $('#' + $dateclockid).tooltipster({
        content: lang.show_item_comment_date_tooltip.format($c.getDate()),
        delay: 400,
        maxWidth: 200,
        side: 'bottom',
        theme: cfg_tooltip_theme
    });
}

/**
 * Auto ajusta el tamaño de los títulos de cada entrada del formulario según la altura del formulario
 * @function
 * @param {string} formid - ID del formulario
 * @param {string} titleid - ID del elemento del título
 * @return {function}
 * @ignore
 */
function autoResizeTitles(formid, titleid) {
    return function () {
        // noinspection JSValidateTypes
        let h = $('#{0}'.format(formid)).outerHeight();
        $('#{0}'.format(titleid)).css('height', h + 'px');
    };
}

/**
 * Inicia el objeto del formulario
 * @function
 * @param {Item} $item - Artículo
 * @ignore
 */
function initShowItemSections($item) {
    // Selecciona el tema para la descripción
    let $theme_description = '';
    if ($item.getDescription().length > 400) {
        $theme_description = 'show-item-description-extended';
    }

    // noinspection QuirksModeInspectionTool
    $show_item_sections = {

        // Nombre artículo
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box",
            "value": "<div class='show-item-name'>{0}</div>".format($item.getName()),
            "resizeThread": true
        },

        // Descripción
        "1": {
            "name": lang.add_item_form_desc,
            "icon": "far fa-comment-alt",
            "value": "<div class='show-item-description {1}'>{0}</div>".format($item.getDescription(), $theme_description),
            "resizeThread": true,
            "afterDrawFun": function () {
                $('.show-item-description').emoticons();
            }
        },

        // Fotos
        "2": {
            "name": lang.add_item_form_photo,
            "icon": "fas fa-camera",
            "value": "<div class='show-item-gallery'></div>",
            "resizeThread": true,
            "afterDrawFun": function () {
                let $pics = $item.getPhotos();
                let $container = $('.show-item-gallery');
                let $imageid;
                let $imageswipe;

                /**
                 * Recorre cada foto y añade a la galería
                 */
                for (let i = 0; i < $item.getTotalPhotos(); i++) {
                    $imageid = generateId(cfg_id_size);
                    let $imagesrc = $pics[i];

                    // noinspection QuirksModeInspectionTool,HtmlUnknownTarget
                    $container.append('<div id="{2}" class="show-item-small-pic hvr-grow"><img src="{0}" alt="{1}"/></div>'.format($imagesrc, lang.show_item_pic_n.format(i + 1), $imageid));

                    // Se crea listener de click para abrir photoswipe en la imagen
                    $imageswipe = function ($src, $i) {
                        return function () {
                            let pswpElement = document.querySelectorAll('.pswp')[0];
                            let items = [{
                                src: $src,
                                w: 800,
                                h: 600,
                                title: lang.show_item_pic_n.format($i)
                            }];
                            let options = {
                                index: 0,
                                showAnimationDuration: 400,
                                hideAnimationDuration: 400,
                                shareEl: false,
                                counterEl: false,
                                history: true,
                                fullscreenEl: false,
                                zoomEl: false
                            };
                            let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                            gallery.listen('close', function () {
                                $('a.back-to-top').fadeIn('slow');
                            });
                            gallery.init();
                            $('a.back-to-top').fadeOut('slow');
                        }
                    };
                    $imageswipe = $imageswipe($imagesrc, i + 1);

                    // El click activa la galería
                    $('#' + $imageid).on('click', $imageswipe);
                }

                /**
                 * Se crea objeto slick que hace un slider
                 */
                $container.slick({
                    adaptiveHeight: true,
                    centerMode: false,
                    dots: true,
                    infinite: false,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    speed: 300,
                    variableWidth: true
                });
                this.resizeFun();

                // noinspection JSUnresolvedFunction
                /**
                 * Desactiva selección del contenedor
                 */
                $('#' + this.id_value).on('selectstart dragstart', false);
            }
        },

        // Región
        "3": {
            "name": lang.add_item_form_r_e,
            "icon": "fas fa-globe",
            "value": "<div class='show-item-text'><a href='https://www.google.com/maps/search/{0},Chile'>{0}</a></div>".format($item.getRegion()),
            "resizeThread": false
        },

        // Comuna
        "4": {
            "name": lang.add_item_form_c_e,
            "icon": "fas fa-map-marker-alt",
            "value": "<div class='show-item-text'><a href='https://www.google.com/maps/search/{0},{1},Chile'>{0}</a></div>".format($item.getComuna(), $item.getRegion()),
            "resizeThread": false
        },

        // Calle
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-home",
            "value": "<div class='show-item-text'><a href='https://www.google.com/maps/search/{0}, {1}, {2}, Chile'>{0}</a></div>".format($item.getUserStreet(), $item.getComuna(), $item.getRegion()),
            "resizeThread": false
        },

        // Nombre del contacto
        "6": {
            "name": lang.add_item_form_nc,
            "icon": "fas fa-user",
            "value": "<div class='show-item-text'>{0}</div>".format($item.getUserName()),
            "resizeThread": false
        },

        // E-mail del contacto
        "7": {
            "name": lang.add_item_form_email,
            "icon": "far fa-envelope",
            "value": "<div class='show-item-text'><a href='mailto:{0}' class='disable-a-hover'>{0}</a></div>".format($item.getUserEmail()),
            "resizeThread": false
        },

        // Teléfono del contacto
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "value": "<div class='show-item-text data-item-user-phone'><a href='tel:{0}' class='disable-a-hover'>+56{0}</a></div>".format($item.getUserPhone()),
            "resizeThread": false,
            "afterDrawFun": function () {
                // Si el teléfono está vacío se oculta
                if ($item.getUserPhone() === '') {
                    $('#' + this.id_value).hide();
                    $('#' + this.id_title).hide();

                }
            }
        },

        // Publicado el
        "9": {
            "name": lang.show_item_publish_date,
            "icon": "far fa-clock",
            "value": "<div class='show-item-text'>{0}</div>".format($item.getPublishDate()),
            "resizeThread": false
        }
    };
}

/**
 * Centra el panel principal
 * @function
 * @ignore
 */
function showItemBackgroundResize() {
    let $appbackground = $('#appBackground');
    let $maincontent = $(ui_main_content);

    // Aplica css
    $maincontent.css('position', 'relative');
    $(ui_main_content).css('top', Math.max(0, (getElementHeight($(window)) - getElementHeight($(ui_main_content))) / 2) + 'px');
    $appbackground.css('width', getElementInnerWidth($('#root')) + 'px');
    $appbackground.css('height', getElementHeight($show_item_container) + 100 + 'px')
}