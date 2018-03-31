/**
 SHOW ITEM UI
 Funciones asociadas a la interfaz gráfica.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

var $show_item_comment_container; // Objeto contenedor de los comentarios
var $show_item_empty_comment = true; // Indica si hay o no comentarios
var $show_item_sections; // Secciones del artículo

/**
 * Crea el módulo en la ui.
 * @param $item
 */
function createShowItem($item) {

    /**
     * Cambia el título de la página
     */
    document.title = lang.show_item_title;

    /**
     * Genera el header y el contenedor
     */
    new Header({
        title: lang.show_item_title
    });
    let add_container = new Container({
        padding: 0
    });
    let $add_c = add_container.getDOM();

    /**
     * Inicia los datos del objeto
     */
    initShowItemSections($item);

    /**
     * Crea las columnas del formulario
     */
    let $cl = generateId(cfg_id_size);
    let $cr = generateId(cfg_id_size);
    $add_c.append('<div id="{0}" class="add-item-form-column add-item-form-leftcolumn"></div><div id="{1}" class="add-item-form-column add-item-form-rightcolumn"></div>'.format($cl, $cr));
    let $ocl = $('#{0}'.format($cl));
    let $ocr = $('#{0}'.format($cr));

    /**
     * Dibuja los nombres del formulario
     */
    let $ftitle_k = Object.keys($show_item_sections);
    let $k;
    for (let i = 0; i < $ftitle_k.length; i++) {
        $k = $show_item_sections[$ftitle_k[i]];
        $k.id_title = generateId(cfg_id_size);
        if ($k.icon !== '') {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{2}" class="add_item_form_line add-item-nameobj"><div class="add-item-form-title-inner"><i class="{1} add-item-nameobj-icon hvr-icon-rotate"></i>{0}</div></div>'.format($k.name, $k.icon, $k.id_title));
        } else {
            $ocl.append('<!--suppress QuirksModeInspectionTool --><div id="{1}" class="add_item_form_line add-item-nameobj">{0}</div>'.format($k.name, $k.id_title));
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

    let $comments = $item.getComments();

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

    /**
     * Añade evento añadir comentario
     */
    $('#' + $comment_button_id).on('click', function () {
        $.confirm({
            animateFromElement: false,
            animation: 'scale',
            columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
            title: lang.add_comment_title,
            icon: 'far fa-comment',
            draggable: true,
            dragWindowGap: 0,
            theme: cfg_popup_theme,
            content: '' +
            '<form method="post">' +
            '<div class="form-group">' +
            '<label>' + lang.add_comment_name_title + '</label>' +
            '<input type="text" placeholder="' + lang.add_comment_name_input + '" class="name form-control" required />' +
            '</div>' +
            '<div class="form-group">' +
            '<label>' + lang.add_comment_comment_title + '</label>' +
            '<textarea rows="2" type="text" placeholder="' + lang.add_comment_comment_input + '" class="comment form-control show-item-comment-textarea" required></textarea>' +
            '</div>' +
            '</form>',
            buttons: {
                formSubmit: {
                    text: lang.add_comment_button_submit,
                    btnClass: 'btn-blue',
                    action: function () {
                        let name = this.$content.find('.name').val();
                        let comment = this.$content.find('.comment').val();
                        if (!name || name.length < 5) {
                            $.alert(lang.add_comment_bad_name);
                            return false;
                        }
                        if (!comment || comment.length < 10) {
                            $.alert(lang.add_comment_bad_comment);
                            return false;
                        }

                        // TODO: Guardar comentario
                        $.alert(lang.add_comment_ok);

                        // Se agrega el comentario en el dom
                        addCommentItem(new ItemComment({
                            comment: comment,
                            date: getLocalDateElement(),
                            user: name
                        }));
                        return true;
                    }
                },

                // Se cancela el comentario
                cancel: function () {
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
            },
            onContentReady: function () {
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    });
}

/**
 * Añade un comentario en la página
 * @param $c {ItemComment}      Comentario
 */
function addCommentItem($c) {
    if ($show_item_empty_comment) {
        $show_item_comment_container.empty();
        $show_item_empty_comment = false;
    }
    $show_item_comment_container.append('<div class="show-item-comment-entry"><div class="show-item-comment-header"><div class="show-item-comment-user-name">{0}</div><div class="show-item-comment-date">{1}</div></div><div class="show-item-comment-content">{2}</div></div>'.format($c.getUser(), $c.getDate(), $c.getComment()));
}

/**
 * Auto ajusta el tamaño de los títulos de cada entrada del formulario según la altura del formulario
 * @param formid            ID del formulario
 * @param titleid           ID del elemento del título
 * @return {function}
 */
function autoResizeTitles(formid, titleid) {
    return function () {
        // noinspection JSValidateTypes
        let h = $('#{0}'.format(formid)).outerHeight();
        $('#{0}'.format(titleid)).css('height', h + 'px');
    };
}

/**
 * Inicia el objeto del formulario.
 * @param $item
 */
function initShowItemSections($item) {
    // noinspection QuirksModeInspectionTool
    $show_item_sections = {

        // Nombre artículo
        "0": {
            "name": lang.add_item_form_name,
            "icon": "fas fa-box",
            "value": "<div class='show-item-name'>{0}</div>".format($item.getName()),
            "resizeThread": false
        },

        // Descripción
        "1": {
            "name": lang.add_item_form_desc,
            "icon": "far fa-comment-alt",
            "value": "<div class='show-item-description'>{0}</div>".format($item.getDescription()),
            "resizeThread": true
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
                for (let i = 0; i < $item.getTotalPhotos(); i++) {
                    $imageid = generateId(cfg_id_size);
                    var $imagesrc = $pics[i];

                    // noinspection QuirksModeInspectionTool
                    $container.append('<!--suppress ALL --><div id="{2}" class="show-item-small-pic hvr-grow"><img src="{0}" alt="{1}"/></div>'.format($imagesrc, lang.show_item_pic_n.format(i + 1), $imageid));

                    // Se crea listener de click para abrir photoswipe en la imagen
                    $imageswipe = function ($src, $i) {
                        return function () {
                            var pswpElement = document.querySelectorAll('.pswp')[0];
                            var items = [{
                                src: $src,
                                w: 800,
                                h: 600,
                                title: lang.show_item_pic_n.format($i)
                            }];
                            var options = {
                                index: 0,
                                showAnimationDuration: 400,
                                hideAnimationDuration: 400,
                                shareEl: false,
                                counterEl: false,
                                history: true,
                                fullscreenEl: false,
                                zoomEl: false
                            };
                            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
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
                $container.slick({
                    centerMode: false,
                    dots: true,
                    infinite: false,
                    slidesToShow: 1,
                    speed: 300,
                    variableWidth: true,
                    adaptiveHeight: true
                });
                this.resizeFun();
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
            "icon": "fas fa-globe",
            "value": "<div class='show-item-text'><a href='https://www.google.com/maps/search/{0},{1},Chile'>{0}</a></div>".format($item.getComuna(), $item.getRegion()),
            "resizeThread": false
        },

        // Calle
        "5": {
            "name": lang.add_item_form_sn,
            "icon": "fas fa-map-marker-alt",
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
            "value": "<div class='show-item-text'><a href='mailto:{0}' class='show-item-email'>{0}</a></div>".format($item.getUserEmail()),
            "resizeThread": false
        },

        // Teléfono del contacto
        "8": {
            "name": lang.add_item_form_phone,
            "icon": "fas fa-phone",
            "value": "<div class='show-item-text'>+56{0}</div>".format($item.getUserPhone()),
            "resizeThread": false
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