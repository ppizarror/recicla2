<?php
/**
 * Administración y descarga de ítems.
 * @author Pablo Pizarro R. @ppizarror.com
 * @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

require_once('utils.php');

/**
 * Constantes
 */
const ITEM_CAT_MAX_LIST = 5; // Número de ítems por lista

/**
 * Descarga un ítem raw por id.
 * @param mysqli $db
 * @param int $id
 * @return array
 */
function item_download_by_id($db, $id)
{
    $sql = "SELECT id, nombre, descripcion, fecha_ingreso, comuna_id, calle_numero, nombre_contacto, email_contacto, fono_contacto FROM articulo WHERE id={$id}";
    $results = $db->query($sql);

    // Almacena todos los registros
    $rows = array();
    while ($row = $results->fetch_assoc()) {
        $rows[] = $row;
    }
    mysqli_free_result($results);
    return item_generate_list($db, $rows);
}

/**
 * Descarga un ítem raw por orden.
 * @param mysqli $db
 * @param int $from
 * @return array
 */
function item_download_by_desc($db, $from)
{
    // Comprueba from
    $from = max(0, $from);

    // Next
    $next = ITEM_CAT_MAX_LIST;

    // Genera la consulta
    if ($from === 0) {
        $sql = "SELECT id, nombre, descripcion, fecha_ingreso, comuna_id, calle_numero, nombre_contacto, email_contacto, fono_contacto FROM articulo ORDER BY id DESC LIMIT {$next}";
    } else {
        $sql = "SELECT id, nombre, descripcion, fecha_ingreso, comuna_id, calle_numero, nombre_contacto, email_contacto, fono_contacto FROM articulo ORDER BY id DESC LIMIT {$from},{$next}";
    }
    $results = $db->query($sql);

    // Almacena todos los registros
    $rows = array();
    while ($row = $results->fetch_assoc()) {
        $rows[] = $row;
    }
    mysqli_free_result($results);
    return item_generate_list($db, $rows);
}

/**
 * Indica si existen más items en una siguiente página a partir de un cierto índice
 * @param mysqli $db
 * @param int $from
 * @return int
 */
function item_exists_after($db, $from)
{
    // Índice incial siguiente página
    $np_to = ITEM_CAT_MAX_LIST + 1;

    // Genera la consulta
    $sql = "SELECT id FROM articulo ORDER BY id DESC LIMIT {$from},{$np_to}";
    $results = $db->query($sql);

    // Total entradas
    $total = mysqli_num_rows($results);
    mysqli_free_result($results);

    if ($total > 0) {
        if ($total == ITEM_CAT_MAX_LIST) {
            return -1;
        } else if ($total > ITEM_CAT_MAX_LIST) {
            return ITEM_CAT_MAX_LIST;
        } else {
            return $total;
        }
    } else {
        return 0;
    }
}

/**
 * Genera una lista de ítems a partir de un resultado raw.
 * @param mysqli $db
 * @param array $rows
 * @return array array
 */
function item_generate_list($db, $rows)
{
    $items = array();
    for ($i = 0; $i < count($rows); $i++) {

        // Crea ítem
        $item = array();
        $ritem = $rows[$i];

        /**
         * Obtiene nombre de comuna e id de región.
         */
        $sql = "SELECT nombre,region_id FROM comuna WHERE id={$ritem['comuna_id']}";
        $result = $db->query($sql) or die('ERROR EN CONEXIÓN CON SERVIDOR');
        $data = mysqli_fetch_row($result);

        // Guarda comuna y región
        $i_c = $data[0];
        $i_r = $data[1];
        mysqli_free_result($result);

        /**
         * Nombre de región
         */
        $sql = "SELECT nombre FROM region WHERe id={$i_r}";
        $result = $db->query($sql) or die('ERROR EN CONEXIÓN CON SERVIDOR');
        $data = mysqli_fetch_row($result);
        $i_r = $data[0];
        mysqli_free_result($result);
        $i_id = $ritem['id'];

        /**
         * Obtiene fotos
         */
        $photos = array();
        $sql = "SELECT ruta_archivo FROM fotografia WHERE articulo_id={$i_id}";
        $result = $db->query($sql);
        while ($row = $result->fetch_assoc()) {
            $photos[] = PHOTO_PATH . $row['ruta_archivo'];
        }
        mysqli_free_result($result);

        /**
         * Obtiene comentarios
         */
        $comments = array();
        $sql = "SELECT comentario,fecha,nombre_comentarista FROM comentario WHERE articulo_id={$i_id}";
        $result = $db->query($sql);
        while ($row = $result->fetch_assoc()) {
            $comments[] = array('comment' => $row['comentario'], 'date' => $row['fecha'], 'user' => $row['nombre_comentarista']);
        }
        mysqli_free_result($result);

        /**
         * Guarda datos
         */
        $item['comments'] = $comments;
        $item['comuna'] = $i_c;
        $item['date'] = date(DATE_FORMAT, strtotime($ritem['fecha_ingreso']));
        $item['desc'] = $ritem['descripcion'];
        $item['id'] = $i_id;
        $item['name'] = $ritem['nombre'];
        $item['photos'] = $photos;
        $item['region'] = $i_r;
        $item['userContact'] = $ritem['nombre_contacto'];
        $item['userEmail'] = $ritem['email_contacto'];
        $item['userPhone'] = $ritem['fono_contacto'];
        $item['userStreet'] = $ritem['calle_numero'];

        /**
         * Añade a lista
         */
        $items[] = $item;
    }
    return $items;
}

/**
 * Chequea que un ítem se subió, se manda una alerta.
 */
function _item_check_add_status()
{
    if (isset($_COOKIE['additem'])) {
        // Se escribe un popup al cargar
        echo "<script>
        function uploadItemOkPopup() {
            $.alert({
                columnClass: 'col-md-{0} col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1'.format($(window).width() < 1000 ? '6' : '4'),
                content: lang.add_item_form_ok_upload,
                title: lang.module_add_item
            });
        }
        addAfterInitModuleCallback(uploadItemOkPopup);
    </script>\n";
    }
}