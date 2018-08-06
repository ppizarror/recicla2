<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="com.recicla2.Recicla2Const" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.datos.estructura.*" %>
<!DOCTYPE html>
<html lang="es">

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

    <!-- Librerías js -->
    <script src="lib/jquery/jquery-3.3.1.js"></script>
    <script src="lib/toastr/toastr.min.js"></script>
    <script src="lib/jquery-confirm/jquery-confirm.min.js"></script>
    <script src="lib/tooltipster/tooltipster.bundle.min.js"></script>
    <script src="lib/dataTables/jquery.dataTables.min.js"></script>
    <script src="lib/dataTables/dataTables.responsive.min.js"></script>
    <script src="lib/dataTables/date-euro.js"></script>
    <script src="lib/jquery-dateFormat/jquery-dateFormat.min.js"></script>

    <!-- Estilos de librerías -->
    <link rel="stylesheet" type="text/css" href="lib/font-awesome-v5/css/fontawesome-all.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/dataTables/jquery.dataTables.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/dataTables/responsive.dataTables.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/bootstrap-4.0.0-beta.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/toastr/toastr.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/tooltipster.bundle.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/themes/sideTip-borderless.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/themes/sideTip-light.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/themes/sideTip-noir.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/themes/sideTip-punk.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/tooltipster/themes/sideTip-shadow.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/hover/hover.css" media="screen">
    <link rel="stylesheet" type="text/css" href="lib/jquery-confirm/jquery-confirm.css" media="screen">
</head>

<body>
<%
    ServletContext sc = request.getServletContext();
    //noinspection unchecked
    ArrayList<Region> regiones = (ArrayList<Region>) sc.getAttribute(Recicla2Const.APP_DATA_REGION);
    for (Region r : regiones) {
        out.print(r.obtenerNombre());
        out.print(r.obtenerID());
    }
%>
</body>
</html>