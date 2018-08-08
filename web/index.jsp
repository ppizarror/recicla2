<!DOCTYPE html>
<html lang="es">
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.recicla2.Recicla2Const" %>
<%
    /*
    Obtiene el contexto, si hay errores redigige el flujo a error.jsp
     */
    ServletContext sc = request.getServletContext();
    if (sc.getAttribute(Recicla2Const.APP_ATTR_ERROR) != null) {
        request.setAttribute(Recicla2Const.APP_ATTR_USERR, false);
        sc.getRequestDispatcher("/error.jsp").forward(request, response);
    }
%>
<head>
    <meta charset="UTF-8">
    <title>Recicla2</title>

    <!-- Meta tags -->
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web"/>
    <meta name="googlebot" content="noindex, noarchive"/>
    <meta name="robots" content="noindex, noarchive"/>
    <meta name="twitter:description" content="Proyecto reciclaje, tarea curso CC5002-1"/>
    <meta name="twitter:title" content="Recicla2"/>
    <meta property="og:description" content="Proyecto reciclaje, tarea curso CC5002-1"/>
    <meta property="og:title" content="Recicla2"/>

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="res/ui/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="res/ui/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="res/ui/favicon/favicon-16x16.png">
    <link rel="manifest" href="res/ui/favicon/site.webmanifest">
    <link rel="mask-icon" href="res/ui/favicon/safari-pinned-tab.svg" color="#5bd59d">
    <link rel="shortcut icon" href="res/ui/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Recicla2">
    <meta name="application-name" content="Recicla2">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-TileImage" content="res/ui/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="res/ui/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <!-- Librerías js -->
    <script src="packages/jquery/jquery-3.3.1.js"></script>
    <script src="packages/toastr/toastr.min.js"></script>
    <script src="packages/jquery-confirm/jquery-confirm.min.js"></script>
    <script src="packages/tooltipster/tooltipster.bundle.min.js"></script>
    <script src="packages/jquery-dateFormat/jquery-dateFormat.min.js"></script>
    <script src="packages/twbs-pagination/jquery.twbsPagination.min.js"></script>

    <!-- Estilos de librerías -->
    <link rel="stylesheet" type="text/css" href="packages/font-awesome-v5/css/fontawesome-all.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/bootstrap/bootstrap-4.0.0-beta.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/toastr/toastr.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/tooltipster/tooltipster.bundle.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/tooltipster/themes/sideTip-borderless.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/hover/hover.css" media="screen">
    <link rel="stylesheet" type="text/css" href="packages/jquery-confirm/jquery-confirm.css" media="screen">

    <!-- Estilo de la aplicación -->
    <link rel="stylesheet" type="text/css" href="app/stylesheets/root.css" media="screen">
    <link rel="stylesheet" type="text/css" href="app/stylesheets/mobile.css" media="screen">
    <link rel="stylesheet" type="text/css" href="app/stylesheets/errors.css" media="screen">
    <link rel="stylesheet" type="text/css" href="app/stylesheets/container.css" media="screen">
    <link rel="stylesheet" type="text/css" href="app/stylesheets/header.css" media="screen">
    <link rel="stylesheet" type="text/css" href="app/stylesheets/loading.css" media="screen">

    <!-- Carga núcleo js -->
    <script src="app/core/config.js"></script>
    <script src="app/core/about.js"></script>
    <script src="app/core/errors.js"></script>
    <script src="app/core/date.js"></script>
    <script src="app/core/utils.js"></script>

    <!-- Carga elementos interfaz gráfica -->
    <script src="app/ui/i18n/lang.js"></script>
    <script src="app/ui/i18n/es.js"></script>
    <script src="app/ui/globals.js"></script>
    <script src="app/ui/mobile.js"></script>
    <script src="app/ui/dialogs.js"></script>
    <script src="app/ui/utils.js"></script>
    <script src="app/ui/container.js"></script>
    <script src="app/ui/header.js"></script>
    <script src="app/ui/loading.js"></script>
    <script src="app/ui/resources.js"></script>

    <!-- Escribe los datos de las comunas y regiones -->
    <script>
        $rc_chile = <%=sc.getAttribute(Recicla2Const.APP_DATA_JSON_COMUNA).toString()%>;
        $r_chile = <%=sc.getAttribute(Recicla2Const.APP_DATA_JSON_REGION).toString()%>;
    </script>

    <!-- Carga el módulo -->
    <script src="app/modules/modules.js"></script>
    <script src="app/modules/foto-comentarios/config.js"></script>
    <script src="app/modules/foto-comentarios/ui.js"></script>
    <script src="app/modules/foto-comentarios/style.css"></script>

    <!-- Inicia app -->
    <script src="app/core/init.js"></script>
    <script src="app/modules/foto-comentarios/init.js"></script>
</head>

<body>
<div id="root">
    <div id="appBackground"></div>
    <div id="mainContent">
        <div id="header"></div>
        <div id="content"></div>
    </div>
    <div id="errorMsg">
        <div id="errorMsgText"></div>
    </div>
    <div id="footer"></div>
</div>
<a href="#" class="back-to-top" id="scrolls"></a>
<div id="preload_resources"></div>
</body>
</html>