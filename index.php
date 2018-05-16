<?php
/**
 * Chequea cookies
 */
if (isset($_COOKIE['additem'])) {
    setcookie('additem', '', -1, '/'); // Borra la cookie
}
?>
    <!DOCTYPE html>
    <?php
    /**
     * RECICLA2
     * Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web, 2018, Otoño.
     *
     * @author Pablo Pizarro R. @ppizarror.com
     * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor
     */

    // Importación de archivos
    require_once('src/server/dbconfig.php');
    require_once('src/server/item.php');

    // Obtiene conexión a base de datos
    $db = DbConfig::getConnection();
    ?>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Recicla2</title>

        <!-- Meta tags -->
        <meta name="viewport" content="width=device-width">
        <meta name="description" content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
        <meta name="googlebot" content="noindex, noarchive"/>
        <meta name="robots" content="noindex, noarchive"/>
        <meta name="twitter:description"
              content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
        <meta name="twitter:title" content="Recicla2"/>
        <meta property="og:description"
              content="Proyecto reciclaje, tarea curso CC5002-1 Desarrollo de Aplicaciones Web."/>
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
        <script src="lib/jquery/jquery-3.3.1.js"></script>
        <script src="lib/toastr/toastr.min.js"></script>
        <script src="lib/jquery-confirm/jquery-confirm.min.js"></script>
        <script src="lib/tooltipster/tooltipster.bundle.min.js"></script>
        <script src="lib/dataTables/jquery.dataTables.min.js"></script>
        <script src="lib/dataTables/dataTables.responsive.min.js"></script>
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

        <!-- Carga módulo <Listar ítem> -->
        <link rel="stylesheet" type="text/css" href="src/modules/list_item/style.css?v=<?php echo uniqid(); ?>">
        <script src="src/modules/modules.js?v=<?php echo uniqid(); ?>"></script>
        <script src="src/modules/list_item/config.js?v=<?php echo uniqid(); ?>"></script>
        <script src="src/modules/list_item/ui.js?v=<?php echo uniqid(); ?>"></script>
        <?php
        /**
         * Chequea que un ítem se subió, se manda un popup
         */
        _item_check_add_status();

        /**
         * Chequea existencia de más ítems y añade botones
         */
        $from_page = 0;
        if (isset($_GET['from']) and is_numeric($_GET['from'])) {
            $from_page = htmlspecialchars($_GET['from']);
            $from_page = max(0, intval($_GET['from']));
        }

        // Se aplica módulo
        $from_page = $from_page - $from_page % ITEM_CAT_MAX_LIST;
        $next_page = item_exists_after($db, $from_page);

        // El usuario escribe una página muy avanzada, se recalcula reseteando
        if ($next_page == 0 and $from_page != 0) {
            $from_page = 0;
            $next_page = item_exists_after($db, $from_page);
        }

        // Cálculo página siguiente
        $next_page_var = 0;
        if ($next_page === ITEM_CAT_MAX_LIST) {
            $next_page_var = $from_page + ITEM_CAT_MAX_LIST;
        }

        // Cálculo página previa
        $prev_page_var = 0;
        if ($next_page > 0 or $next_page === -1) {
            $prev_page_var = $from_page - ITEM_CAT_MAX_LIST;
            if ($prev_page_var === 0) { // Si da la primera página se deja como -1
                $prev_page_var = -1;
            } else if ($prev_page_var < 0) { // Se está en página 0
                $prev_page_var = 0;
            }
        }

        echo "<script>
            list_item_prev_page = " . $prev_page_var . ";
            list_item_next_page = " . $next_page_var . ";\n\t\t\t";

        /**
         * Descarga los ítems
         */
        /** @noinspection JSUnusedLocalSymbols */
        /** @noinspection ES6ConvertVarToLetConst */
        echo "items = " . json_encode(item_download_by_desc($db, $from_page)) . ";
            for (let i = 0; i < items.length; i++) {
                items[i] = new Item(items[i]);
            }
        </script>\n";
        ?>

        <!-- Inicia app -->
        <script src="src/core/init.js"></script>
        <script src="src/modules/list_item/init.js"></script>
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

<?php
// Cierra la conexión
$db->close();
?>