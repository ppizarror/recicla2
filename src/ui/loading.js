/**
 LOADING
 Funciones de barras y paneles de carga.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

/**
 * Handler de la función loading
 * @param {boolean} status          Indica si se muestra o no el spinner de carga
 */
function loadHandler(status) {
    Loading(status, null);
}

/**
 * Muestra una pantalla de carga
 * @param {boolean} Checker         Indica el estado
 * @param {Function} callback       Función que se llama tras la función
 */
function Loading(Checker, callback) {
    var h, hh, w, posX, posY;
    var $body = $('body');
    var $rootHtml = $('#root');
    var $backtotop = $('a.back-to-top');
    if (typeof(Checker) === 'boolean') {
        h = getElementHeight($(window));
        hh = getElementHeight($body);
        hh = Math.max(h, hh);
        w = $(window).width();
        posX = (w - 69) / 2;
        posY = (h - 69) / 2;
        if (Checker) {
            if (document.getElementById('LoadingDivLayer') == null) {
                var loadingTag = '<div id="LoadingDivLayer" class="LoadingDivLayerClass" style="height:' + String(hh) + 'px">';
                loadingTag += '<div class="LoadingForeground" style="height:' + String(hh) + 'px;">';
                loadingTag += '<div class="LoadingBox" style="top:' + String(posY) + "px;left:" + String(posX) + 'px;">';
                loadingTag += '<img src="' + res_loading_image + "\" alt=\"Loading...\" />";
                loadingTag += '</div>';
                loadingTag += '</div>';
                loadingTag += '<div class="LoadingBackground" style="height:' + String(hh) + 'px">';
                loadingTag += "</div>";
                loadingTag += "</div>";
                $body.prepend(loadingTag);
                /**
                 * Se añade blur
                 * $rootHtml.css({
                    'filter': 'blur(' + theme.loadingBackgroundBlur + 'px)',
                    '-webkit-filter': 'blur(' + theme.loadingBackgroundBlur + 'px)'
                });
                 */
                // $('html').css('overflow-y', 'hidden');
                $backtotop.css('visibility', 'hidden');
                $('#LoadingDivLayer').fadeIn(350, function () {
                    if (callback != null) {
                        callback();
                    }
                });
            }
        } else {
            if (document.getElementById('LoadingDivLayer') != null) {
                $('#LoadingDivLayer').remove();
                /**
                 * $rootHtml.css({
                    'filter': 'blur(0px)',
                    '-webkit-filter': 'blur(0px)'
                });
                 */
                // $('html').css('overflow-y', 'visible');
                $backtotop.css('visibility', 'visible');
                if (callback != null) {
                    callback();
                }
            }
        }
    }
}

/**
 * Añade evento de redimensionado del objeto loadingDiv
 */
$(window).resize(function () {
    console.log('k');
    var h, hh, w, posX, posY;
    if (document.getElementById('LoadingDivLayer') != null) {
        h = $(window).height();
        hh = $('body').height();
        w = $(window).width();
        posX = (w - 69) / 2;
        posY = (h - 69) / 2;
        var $loadinglayer = $('#LoadingDivLayer');
        h = Math.max(h, hh);
        $loadinglayer.css({
            height: String(h) + 'px'
        });
        $loadinglayer.find('> .LoadingForeground').css({
            height: String(h) + 'px'
        });
        $loadinglayer.find('> .LoadingBackground').css({
            height: String(h) + 'px'
        });
        $loadinglayer.find('> .LoadingForeground > .LoadingBox').css({
            left: String(posX) + 'px'
        });
        $('.LoadingBox').css({
            'left': posX + 'px',
            'top': posY + 'px'
        })
    }
});