<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recicla2</title>
    <!--
    Recicla2
    Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web, 2018, Otoño.

    Autor: Pablo Pizarro R. @ppizarror.com
    Copyright 2018, no copiar o distribuír sin permiso directo del autor.
    -->

    <!-- Meta tags -->
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
    <meta name="googlebot" content="noindex, noarchive"/>
    <meta name="robots" content="noindex, noarchive"/>
    <meta name="twitter:description"
          content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
    <meta name="twitter:title" content="Recicla2"/>
    <meta property="og:description" content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
    <meta property="og:title" content="Recicla2"/>

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="resources/ui/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resources/ui/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resources/ui/favicon/favicon-16x16.png">
    <link rel="manifest" href="resources/ui/favicon/site.webmanifest">
    <link rel="mask-icon" href="resources/ui/favicon/safari-pinned-tab.svg" color="#5bd59d">
    <link rel="shortcut icon" href="resources/ui/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Recicla2">
    <meta name="application-name" content="Recicla2">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-TileImage" content="resources/ui/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="resources/ui/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <!-- Importación de librerías -->
    <script src="js/jquery/jquery-3.3.1.js"></script>
    <script src="js/toastr/toastr.min.js"></script>
    <script src="js/jquery-confirm/jquery-confirm.min.js"></script>
    <script src="js/tooltipster/tooltipster.bundle.min.js"></script>
    <script src="js/dataTables/jquery.dataTables.min.js"></script>
    <script src="js/dataTables/dataTables.responsive.min.js"></script>
    <script src="js/slick/slick.min.js"></script>
    <script src="js/photoswipe/photoswipe.min.js"></script>
    <script src="js/photoswipe/photoswipe-ui-default.min.js"></script>

    <!-- Estilos de librerías -->
    <link rel="stylesheet" type="text/css" href="css/font-awesome-v5/css/fontawesome-all.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap-4.0.0-beta.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/toastr/toastr.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/tooltipster.bundle.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/themes/sideTip-borderless.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/themes/sideTip-light.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/themes/sideTip-noir.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/themes/sideTip-punk.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/tooltipster/themes/sideTip-shadow.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/hover/hover.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm/jquery-confirm.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/slick/slick.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/slick/slick-theme.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/photoswipe/photoswipe.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css/photoswipe/default-skin/default-skin.css" media="screen">

    <!-- Estilo de la aplicación -->
    <link rel="stylesheet" type="text/css" href="src/stylesheets/root.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/stylesheets/mobile.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/stylesheets/errors.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/stylesheets/container.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/stylesheets/header.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/stylesheets/loading.css" media="screen">

    <!-- Carga núcleo js -->
    <script src="src/core/config.js"></script>
    <script src="src/core/about.js"></script>
    <script src="src/core/errors.js"></script>
    <script src="src/core/date.js"></script>
    <script src="src/core/utils.js"></script>

    <!-- Carga elementos interfaz gráfica -->
    <script src="src/ui/i10n/lang.js"></script>
    <script src="src/ui/i10n/es.js"></script>
    <script src="src/ui/globals.js"></script>
    <script src="src/ui/mobile.js"></script>
    <script src="src/ui/dialogs.js"></script>
    <script src="src/ui/utils.js"></script>
    <script src="src/ui/container.js"></script>
    <script src="src/ui/header.js"></script>
    <script src="src/ui/loading.js"></script>
    <script src="src/ui/resources.js"></script>

    <!-- Carga componentes -->
    <script src="src/components/item.js"></script>
    <script src="src/components/comment.js"></script>

    <!-- Testing -->
    <script src="test/test.item.js"></script>

    <!-- Carga módulo <Mostrar ítem> -->
    <link rel="stylesheet" type="text/css" href="src/modules/add_item/style.css" media="screen">
    <link rel="stylesheet" type="text/css" href="src/modules/show_item/style.css" media="screen">
    <script src="src/modules/modules.js"></script>
    <script src="src/modules/show_item/server.js"></script>
    <script src="src/modules/show_item/config.js"></script>
    <script src="src/modules/show_item/ui.js"></script>

    <!-- Inicia app -->
    <script src="src/core/init.js"></script>
    <script src="src/modules/show_item/init.js"></script>
</head>

<body>
<div id="root">
    <div id="appBackground" class="show-item-transform"></div>
    <div id="mainContent">
    </div>
    <div id="errorMsg">
        <div id="errorMsgText"></div>
    </div>
    <div id="footer"></div>
</div>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Cerrar (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Compartir"></button>
                <button class="pswp__button pswp__button--fs" title="Cerrar pantalla completa"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom"></button>
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Anterior (Flecha izquierda)"></button>
            <button class="pswp__button pswp__button--arrow--right" title="Siguiente (Flecha derecha)"></button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>
<a href="#" class="back-to-top" id="scrolls"></a>
<div id="preload_resources"></div>
</body>
</html>