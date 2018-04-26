<?php
/**
 * Administra los ítems.
 */

const ITEM_CAT_MAX_LIST = 5; // Número de ítems por lista

/**
 * Descarga un ítem raw por id.
 * @param $db
 * @param $id
 */
function item_download_by_id($db, $id)
{

}

/**
 * Descarga un ítem raw por orden.
 * @param mysqli $db
 * @param int $from
 * @return array
 */
function item_download_by_desc($db, $from)
{
    // Next
    $next = $from + ITEM_CAT_MAX_LIST;

    // Genera la consulta
    $sql = "SELECT id, nombre, descripcion, fecha_ingreso, comuna_id, calle_numero, nombre_contacto, email_contacto, fono_contacto FROM articulo ORDER BY id DESC LIMIT {$from}, {$next}";
    $results = $db->query($sql);

    // Almacena todos los registros
    $rows = array();
    while ($row = $results->fetch_assoc()) {
        $rows[] = $row;
    }
    mysqli_free_result($results);
    return generate_item_list($db, $rows);
}

/**
 * Genera una lista de ítems a partir de un resultado raw.
 * @param mysqli $db
 * @param array $rows
 * @return array array
 */
function generate_item_list($db, $rows)
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
            $photos[] = $row;
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
        $item['date'] = $ritem['fecha_ingreso'];
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