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

    <!-- Carga módulo <Añadir artículo ítem> -->
    <script src="src/modules/modules.js"></script>
    <link rel="stylesheet" type="text/css" href="src/modules/add_item/style.css" media="screen">
    <script src="src/modules/add_item/config.js"></script>
    <script src="src/modules/add_item/server.js"></script>
    <script src="src/modules/add_item/ui.js"></script>
    <script src="src/modules/add_item/validation.js"></script>

    <!-- Testing -->
    <script src="test/add_item_test.js"></script>

    <!-- Inicia app -->
    <script src="src/core/init.js"></script>
    <script src="src/modules/add_item/init.js"></script>
</head>

<body>
<div id="root">
    <div id="appBackground"></div>
    <div id="mainContent"></div>
    <div id="errorMsg">
        <div id="errorMsgText"></div>
    </div>
    <div id="footer"></div>
</div>
<a href="#" class="back-to-top" id="scrolls"></a>
<div id="preload_resources"></div>
</body>
</html>